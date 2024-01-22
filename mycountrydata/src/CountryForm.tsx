import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import axios from "axios";

const backgroundImg =
  "https://images.unsplash.com/photo-1610892415063-d89a504ce049";
const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5%",
    marginLeft: "40%",
    backgroundImage: `url(${backgroundImg})`,
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

const CountryForm = () => {
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const classes = useStyles();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchCountryData();
  };
  const fetchCountryData = async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${country}?fullText=true`
      );
      const data = response.data;
      navigate(`/${country}`, { state: { Res: data } });
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography variant="h5">
        Welcome to the Country Data App Enter a country to get started!
      </Typography>
      <TextField
        label="Enter country"
        variant="outlined"
        value={country}
        type="string"
        //onChange={(e) => setCountry(e.target.value)}
        onChange={(e) => {
          setCountry(e.target.value.trim());
          const value = e.target.value;
          if (value.startsWith(" ")) {
            setCountry(value.trimStart());
          } else {
            setCountry(value);
          }
        }}
        className={classes.input}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Submit
      </Button>
    </form>
  );
};

export default CountryForm;
