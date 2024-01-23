import { Component } from "react";
import withRouter from "../withRouter";

interface WeatherData {
  wind: {
    speed: number;
  };
  main: {
    temp: number;
  };
}

class CountryDetail extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isWeatherVisible: false,
      weatherData: null as WeatherData | null,
    };
  }

  fetchData = async () => {
    const { apiData } = this.props.location.state;
    const API_KEY = "e3736c59809579a0c2080ae39ebc7d67";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${apiData.capital?.[0]}&appid=${API_KEY}`
    );
    const weatherData = await res.json();
    this.setState({
      isWeatherVisible: true,
      weatherData: weatherData,
    });
  };

  handleBack = () => {
    this.props.navigate("/");
  };

  render() {
    const { apiData } = this.props.location.state;
    const { isWeatherVisible, weatherData } = this.state;
    return (

      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100vw",
          }}
        >
          <div style={{ height: "10%" }}>
            <button
              style={{ color: "allue", width: "5%" }}
              onClick={this.handleBack}
            >
              &lt; Go Back
            </button>
          </div>
          <div
            style={{
              display: "flex",
              height: "30%",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              gap: "3%",
              fontSize: "2em",
            }}
          >
            <img src={apiData.flags.png} alt="Country Flag" />
            <p>{apiData.name.common.toUpperCase()}</p>
          </div>
          <div
            style={{
              display: "flex",
              height: "60%",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                alignItems: "center",
                width: "70%",
                fontSize: "1.3em",
              }}
            >
              <p>Capital: {apiData.capital[0]}</p>
              <p>Population: {apiData.population}</p>
              <p>Latitude: {apiData.latlng[0]} °</p>
              <p>Longitude: {apiData.latlng[1]} °</p>
            </div>
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "40%",
                flexDirection: "column",
                fontSize: "1.3em",
              }}
            >
              <button
                style={{
                  backgroundColor: "black",
                  color: "aliceblue",
                  height: "40px",
                  width: "160px",
                }}
                onClick={this.fetchData}
              >
                Show Weather
              </button>
              {isWeatherVisible && (
                <>
                  <p data-testid="wind-speed">
                    Wind Speed:{" "}
                    {weatherData ? weatherData.wind.speed : "Wind Loading..."}{" "}
                    meter/sec
                  </p>
                  <p data-testid="temperature">
                    Temperature:{" "}
                    {weatherData
                      ? (weatherData.main.temp - 273.15).toFixed(2)
                      : "Temp Loading..."}{" "}
                    °C
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(CountryDetail);
