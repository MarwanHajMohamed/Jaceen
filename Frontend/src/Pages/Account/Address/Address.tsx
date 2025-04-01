import "./address.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getCode, getNames } from "country-list";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { updateAddress } from "../../../api/api";

export default function Address() {
  const countries: string[] = getNames();
  const { user } = useAuth(); // Get user from auth hook

  // SHIPPING DETAILS
  const [country, setCountry] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [county, setCounty] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [city, setCity] = useState<string>("");

  // PERSONAL DETAILS
  const [firstName, setFirstName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

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
          setCountry(countryName);
        }
      } catch (error) {
        console.error("Error fetching user country:", error);
      }
    };

    fetchUserCountry();

    if (user) {
      // Prefill personal details
      setFirstName(user.firstName || "");
      setSurname(user.surname || "");
      setPhone(user.phoneNumber || "");
      setEmail(user.email || "");
      setCountry(user.shippingAddress.country);
      setStreet(user.shippingAddress.street || "");
      setCounty(user.shippingAddress.county || "");
      setApartment(user.shippingAddress.apartment || "");
      setPostcode(user.shippingAddress.postcode || "");
      setCity(user.shippingAddress.city || "");
    }
  }, [user]);

  const saveAddress = async () => {
    const updatedUser = updateAddress({
      city: city,
      country: country,
      postcode: postcode,
      street: street,
      apartment: apartment,
      county: county,
    });
    console.log("Address updated:", updatedUser);
  };

  return (
    <div className="address-container">
      <FormControl fullWidth className="form">
        <div className="name">
          <TextField
            variant="standard"
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            variant="standard"
            label="Surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <FormControl fullWidth variant="standard">
          <InputLabel id="country-label">Select a country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
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
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
        <TextField
          variant="standard"
          label="Apartment, suite, unit, etc. (optional)"
          type="text"
          value={apartment}
          onChange={(e) => setApartment(e.target.value)}
        />
        <TextField
          variant="standard"
          label="Town / City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <TextField
          variant="standard"
          label="County (optional)"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
          type="text"
        />
        <TextField
          variant="standard"
          label="Postcode"
          type="text"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          required
        />
        <TextField
          variant="standard"
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <TextField
          variant="standard"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button onClick={saveAddress}>Save</button>
      </FormControl>
    </div>
  );
}
