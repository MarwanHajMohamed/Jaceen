import "./billingform.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getCode, getNames } from "country-list";
import { useEffect } from "react";

interface Props {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  surname: string;
  setSurname: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  street: string;
  setStreet: React.Dispatch<React.SetStateAction<string>>;
  county: string;
  setCounty: React.Dispatch<React.SetStateAction<string>>;
  apartment: string;
  setApartment: React.Dispatch<React.SetStateAction<string>>;
  postcode: string;
  setPostcode: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

export default function BillingForm(props: Props) {
  const countries: string[] = getNames();

  useEffect(() => {
    const fetchUserCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        const userCountryCode = data.country;
        const countryName = getNames().find(
          (name) => getCode(name) === userCountryCode
        );

        if (countryName) {
          props.setCountry(countryName);
        }
      } catch (error) {
        console.error("Error fetching user country:", error);
      }
    };

    fetchUserCountry();
  }, []);
  return (
    <div>
      <FormControl fullWidth className="form">
        <div className="name">
          <TextField
            variant="standard"
            label="First Name"
            type="text"
            value={props.firstName}
            onChange={(e) => props.setFirstName(e.target.value)}
            required
          />
          <TextField
            variant="standard"
            label="Surname"
            type="text"
            value={props.surname}
            onChange={(e) => props.setSurname(e.target.value)}
            required
          />
        </div>
        <FormControl fullWidth variant="standard">
          <InputLabel id="country-label">Select a country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            value={props.country}
            onChange={(e) => props.setCountry(e.target.value)}
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="standard"
          label="Street name and house number"
          type="text"
          required
          value={props.street}
          onChange={(e) => props.setStreet(e.target.value)}
        />
        <TextField
          variant="standard"
          label="Apartment, suite, unit, etc. (optional)"
          type="text"
          value={props.apartment}
          onChange={(e) => props.setApartment(e.target.value)}
        />
        <TextField
          variant="standard"
          label="Town / City"
          type="text"
          required
          value={props.city}
          onChange={(e) => props.setCity(e.target.value)}
        />
        <TextField
          variant="standard"
          label="County (optional)"
          type="text"
          value={props.county}
          onChange={(e) => props.setCounty(e.target.value)}
        />
        <TextField
          variant="standard"
          label="Postcode"
          type="text"
          required
          value={props.postcode}
          onChange={(e) => props.setPostcode(e.target.value)}
        />
        <TextField
          variant="standard"
          label="Phone Number"
          type="tel"
          value={props.phone}
          onChange={(e) => props.setPhone(e.target.value)}
          required
        />
        <TextField
          variant="standard"
          label="Email"
          type="email"
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
          required
        />
      </FormControl>
    </div>
  );
}
