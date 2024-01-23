import {Component} from 'react';
import { Button } from '@mui/material';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import withRouter from '../withRouter';

interface WeatherData {
  wind: {
    speed: number;
  };
  main: {
    temp: number;
  };
}


const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      padding: 2,
      backgroundSize: "cover",
      minHeight: "100vh",
    },
    paper: {
      textAlign: "center",
      backgroundColor: 'transparent'
    },
    flagImage: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "8px",
    },
    weatherContainer: {
      marginTop: 2,
      borderRadius: "10px",
      backgroundColor: 'transparent',
      padding: 3,
    },
    button: {
      borderRadius: "20px",
      marginTop: "20px",
      paddingTop: "10px",
    },
  }));



class CountryDetail extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isWeatherVisible: false,
      weatherData: null as WeatherData | null,
    };
  }

  fetchData = async () => {
    const { data } = this.props.location.state; //.data;
    const API_KEY = "e3736c59809579a0c2080ae39ebc7d67";
    const res = await fetch(
     `https://api.openweathermap.org/data/2.5/weather?q=${data[0].capital?.[0]}&appid=${API_KEY}`
     );
    const weatherData = await res.json();
    this.setState({        
        isWeatherVisible: true,    
        weatherData: weatherData,
    });
  };



  handleBack = () => {
    this.props.navigate('/');
  };

  render() {
    const { data } = this.props.location.state;
    const { isWeatherVisible, weatherData } = this.state;
   // const flag_img = data.flags.png;
    const classes = useStyles();
    return (
         <div className={classes.root}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4">
              Welcome to the Country {data.name.official}
            </Typography>
            <Typography variant="h6">
              <strong>Name:</strong> {data.name.common}
            </Typography>
            <Typography variant="h6">
              <strong>Capital:</strong> {data.capital?.[0]}
            </Typography>
            <Typography variant="h6">
              <strong>Population:</strong> {data.population}
            </Typography>
            <Typography variant="h6">
              <strong>Latitude/Longitude:</strong>{" "}
              {data.latlng?.join(", ")}
            </Typography>
            <Typography variant="h6">
              <strong>Flag:</strong>{" "}
              <img
                src={data.flags?.png}
                alt={`Flag of ${data.name.common}`}
                className={classes.flagImage}
              />
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={this.fetchData}
              className={classes.button}
            >
                Capital Weather
              </Button>
              </Paper>
          <Typography variant="h4">
              <Button  className={classes.button} onClick={this.handleBack} >Go Back</Button>
              </Typography>
        </Grid>
      </Grid>
              {isWeatherVisible && (
            <Grid container justifyContent="center" className={classes.weatherContainer}>
            <Grid item xs={12} sm={8} md={6}>
            <Typography variant="h5">Weather Information:</Typography>
            <Typography variant="body1">
              <strong>Temperature:</strong>{" "}
              {Math.round(weatherData.main?.temp - 273.15)} Celsius
            </Typography>
            <Typography variant="body1">
              <strong>Wind Speed:</strong> {(weatherData.wind?.speed.toFixed(2))}. meter/sec
            </Typography>
          </Grid>
        </Grid>
    )}
</div>
    );
};

export default withRouter(CountryDetail);