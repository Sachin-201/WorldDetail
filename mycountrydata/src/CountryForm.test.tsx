import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import CountryForm from "./CountryForm";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const MockCountryForm = () => {
  return (
    <BrowserRouter>
      <CountryForm />
    </BrowserRouter>
  );
};

describe("CountryForm Component", () => {
  const mockAxios = new MockAdapter(axios);
  beforeEach(() => {
    mockAxios.reset();
  });

  test("renders form without errors", () => {
    render(<MockCountryForm />);
    const submitButton = screen.getByLabelText("SUBMIT");
    const inputField = screen.getByLabelText("Enter country");
    expect(submitButton).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
  });

  describe("validation checks", () => {
    test("only accepts non-empty values", () => {
      render(<MockCountryForm />);

      const inputField = screen.getByLabelText("Enter country");
      fireEvent.change(inputField, { target: { value: "" } });
      expect(inputField).toHaveValue("");
      fireEvent.change(inputField, { target: { value: "India" } });
      expect(inputField).toHaveValue("India");
    });

    test("submit button is disabled when input field is empty", () => {
      render(<MockCountryForm />);

      const submitButton = screen.getByLabelText("SUBMIT");
      const inputField = screen.getByLabelText("Enter country");
      expect(submitButton).toBeDisabled();
      fireEvent.change(inputField, { target: { value: "India" } });
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe("API requests", () => {
    test("fetches country data on form submission", async () => {
      render(<MockCountryForm />);

      fireEvent.change(screen.getByLabelText("Enter country"), {
        target: { value: "India" },
      });

      fireEvent.click(screen.getByRole("button", { name: /submit/i }));

      await waitFor(() => {
        expect(mockAxios.history.get.length).toBe(1);
        expect(mockAxios.history.get[0].url).toBe(
          "https://restcountries.com/v3.1/name/India?fullText=true"
        );
      });
    });

    test("handles API error gracefully", async () => {
      mockAxios.onGet().reply(404);
      render(<MockCountryForm />);
      fireEvent.change(screen.getByLabelText("Enter country"), {
        target: { value: "Kya he bole hum abb" },
      });
      fireEvent.click(screen.getByRole("button", { name: /submit/i }));
      await waitFor(() => {
        expect(screen.getByText(/Error Occurred/i)).toBeInTheDocument();
      });
    });
  });
});
