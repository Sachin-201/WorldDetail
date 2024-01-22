import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import CountryInfo from "./CountryInfo";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

describe("CountryInfo Component", () => {
  const fakeCountryData = {
    name: {
      common: "Fake Country",
      official: "Fake Republic",
    },
    capital: "New Delhi",
    population: 1000000,
    latlng: [12.34, 56.78],
    flags: {
      png: "fake-image-url",
    },
  };

  beforeEach(() => {
    mockAxios.reset();
  });

  test("renders CountryInfo component with country data", async () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/details/FakeCountry", state: { Res: [fakeCountryData] } },
        ]}
      >
        <CountryInfo />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Fake Country/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Country Flag/i)).toBeInTheDocument();
    //   expect(screen.getByText(/New Delhi/i)).toBeInTheDocument();
      expect(screen.getByText(/1000000/i)).toBeInTheDocument();
      expect(screen.getByText(/12.34/i)).toBeInTheDocument();
      expect(screen.getByText(/56.78/i)).toBeInTheDocument();
    });
  });

  test("Go back", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/country", state: { Res: [fakeCountryData] } }]}>
        <CountryInfo />
      </MemoryRouter>
    );
    const backButton = screen.getByText(/Go Back/i);
    fireEvent.click(backButton);
    expect(window.location.pathname).toBe("/");
  });

  test("fetches weather data on button click", async () => {
    const fakeWeatherData = {
      main: {
        temp: 298.15,
      },
      wind: {
        speed: 5.5,
      },
    };
    mockAxios.onGet(/openweathermap/).reply(200, fakeWeatherData);

    render(
      <MemoryRouter
        initialEntries={[{ pathname: "/country", state: { Res: [fakeCountryData] } }]}
      >
        <CountryInfo />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Capital Weather/i));

    await waitFor(() => {
      expect(screen.getByText(/Weather Information:/i)).toBeInTheDocument();
      expect(screen.getByText(/Temperature: 25 Celsius/i)).toBeInTheDocument();
     //  expect(screen.getByText(/Wind Speed: 5.5 meter\/sec/i)).toBeInTheDocument();
    });
  });
});
