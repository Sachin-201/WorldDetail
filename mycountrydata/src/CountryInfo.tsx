import React, {  useState } from "react";
import {  useLocation, Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

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

const CountryInfo = () => {
  const location = useLocation();

  const data = location.state.Res;

  const [showWeather, setShowWeather] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<any>({});
  const classes = useStyles();
  const API_KEY = "e3736c59809579a0c2080ae39ebc7d67";


  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${data[0].capital?.[0]}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      setShowWeather(true);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };


  return (
    <div className={classes.root}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={8} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4">
              Welcome to the Country {data[0].name.official}
            </Typography>
            <Typography variant="h6">
              <strong>Name:</strong> {data[0].name.common}
            </Typography>
            <Typography variant="h6">
              <strong>Capital:</strong> {data[0].capital?.[0]}
            </Typography>
            <Typography variant="h6">
              <strong>Population:</strong> {data[0].population}
            </Typography>
            <Typography variant="h6">
              <strong>Latitude/Longitude:</strong>{" "}
              {data[0].latlng?.join(", ")}
            </Typography>
            <Typography variant="h6">
              <strong>Flag:</strong>{" "}
              <img
                src={data[0].flags?.png}
                alt={`Flag of ${data[0].name.common}`}
                className={classes.flagImage}
              />
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchWeatherData}
              className={classes.button}
            >
              Capital Weather
            </Button>
          </Paper>
          <Typography variant="h4">
              <Link  className={classes.button} to="/">Go Back</Link>
              </Typography>
        </Grid>
      </Grid>
      {showWeather && weatherData && (
        <Grid container justifyContent="center" className={classes.weatherContainer}>
          <Grid item xs={12} sm={8} md={6}>
            <Typography variant="h5">Weather Information:</Typography>
            <Typography variant="body1">
              <strong>Temperature:</strong>{" "}
              {Math.round(weatherData.main?.temp - 273.15)} Celsius
            </Typography>
            <Typography variant="body1">
              <strong>Wind Speed:</strong> {weatherData.wind?.speed} meter/sec
            </Typography>
          </Grid>
        
        </Grid>
      )}
    </div>
  );
};

export default CountryInfo;
