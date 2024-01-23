import { Component, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import withRouter from "../withRouter";
import "../global.css";

class CountryForm extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      country_input: "",
    };
  }

  backgroundImg =
    "https://images.unsplash.com/photo-1610892415063-d89a504ce049";
  useStyles = makeStyles(() => ({
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "5%",
      marginLeft: "40%",
      backgroundImage: `url(${this.backgroundImg})`,
      backgroundSize: "cover", // Adjust as needed
      minHeight: "80vh",
      width: "500px",
      justifyContent: "center",
      padding: 4,
    },
    input: {
      marginBottom: 2,
      marginBlockStart: 20,
      width: "300px",
    },
    button: {
      borderRadius: "20px",
      marginTop: "20px",
      paddingTop: "10px",
    },
  }));

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({
      country_input: value.startsWith(" ") ? value.trimStart() : value,
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.fetchData();
  };

  fetchData = async () => {
    const { country_input } = this.state;
    const { navigate } = this.props;
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${country_input}?fullText=true`
    );
    const data = await res.json();
    //If we take data by fetch we have  to send data[0] but by axios  we can send data  by data
    if (data.status !== 404) {
      navigate(`/${country_input}`, { state: { data: data[0] } });
    } else {
      toast.error("Country not found");
    }
  };

  render() {
    const { country_input } = this.state;
    const isSearchDisabled = country_input.length === 0;
    const classes = this.useStyles();

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <Toaster position="top-center" reverseOrder={false} />
        <Box
          sx={{
            display: "flex",
            marginBottom: "460px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ marginBottom: "50px", fontSize: "3em" }}>
            Geo Discovery🌍
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <TextField
              label="Enter Country Name"
              variant="outlined"
              value={country_input}
              onChange={this.handleChange}
              inputProps={{
                style: { color: "aliceblue" },
              }}
              InputLabelProps={{
                style: { color: "aliceblue" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "aliceblue",
                  },
                  "&:hover fieldset": {
                    borderColor: "aliceblue",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "aliceblue",
                  },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={isSearchDisabled}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    );
  }
}

export default withRouter(CountryForm);
