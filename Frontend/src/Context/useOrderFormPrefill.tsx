import { useState, useEffect } from "react";

// Order Form Prefill Hook
export const useOrderFormPrefill = (user?: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Prefill form if user exists
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        firstName: user.firstName || "",
        surname: user.lastName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
      }));
    }
  }, [user]);

  // Handler to update form data manually
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    formData,
    setFormData,
    handleInputChange,
  };
};

// Example component usage
export const OrderForm = ({ user }: { user?: any }) => {
  const { formData, handleInputChange } = useOrderFormPrefill(user);

  return (
    <form>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        placeholder="First Name"
        disabled={!!user} // Optional: disable if user is logged in
      />
      <input
        name="surname"
        value={formData.surname}
        onChange={handleInputChange}
        placeholder="Last Name"
        disabled={!!user}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        disabled={!!user}
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Phone Number"
        disabled={!!user}
      />
    </form>
  );
};
