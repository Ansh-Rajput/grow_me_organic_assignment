import React, { useEffect, useState } from "react";
import { Button, TextField, Container, Typography, Alert } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const UserForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const isDisabled = !name || !phone || !email;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const message = params.get("message");
    if (message) {
      setMessage(message);
    }
  }, [location]);

  const handleSubmit = () => {
    if (isDisabled) {
      setMessage("All fields are required!");
      return;
    }
    localStorage.setItem("user", JSON.stringify({ name, phone, email }));
    navigate("/second-page");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Enter Your Details
      </Typography>
      {message && <Alert severity="warning">{message}</Alert>}
      <form noValidate autoComplete="off">
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          disabled={isDisabled}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;
