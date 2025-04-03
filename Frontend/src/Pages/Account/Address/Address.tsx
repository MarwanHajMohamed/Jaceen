import "./address.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getNames } from "country-list";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { updateAddress } from "../../../api/userApi";

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

  useEffect(() => {
    if (user) {
      // Prefill address
      setCountry(user.shippingAddress.country);
      setStreet(user.shippingAddress.street || "");
      setCounty(user.shippingAddress.county || "");
      setApartment(user.shippingAddress.apartment || "");
      setPostcode(user.shippingAddress.postcode || "");
      setCity(user.shippingAddress.city || "");
    }
  }, [user]);

  const saveAddress = async () => {
    updateAddress({
      city: city,
      country: country,
      postcode: postcode,
      street: street,
      apartment: apartment,
      county: county,
    });
  };

  return (
    <div className="address-container">
      <FormControl fullWidth className="form">
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
        />
        <button onClick={saveAddress}>Save</button>
      </FormControl>
    </div>
  );
}
