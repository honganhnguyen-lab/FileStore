import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert
} from "@mui/material";

import * as Yup from "yup";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik, Form, FormikProvider } from "formik";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";




const Login = () => {
  let history = useHistory();
 

  const [account, setAccount] = useState({})


  const loadAccount = () => {
      axios
        .get("http://localhost:3004/account")
        .then((resp) => {
          setAccount(resp.data)
        })
        .catch((error) => console.log(error));
    };
  
  //Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = snackbar;

  const handleClick = () => () => {
    setSnackbar({ open: true, vertical: "top", horizontal: "center" });
  };

  //Account
 

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("Please enter email field"),
    password: Yup.string().required("Please enter password field"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
        account.map((account)=>{
      if (account.email !== values.email) {
        setError("Please input all field");
      } else {
        if (account.password !== values.password) {
          setError("Wrong email or wrong password");
        } else {
          loadAccount(values);
      
          history.push("/dashboard");
          setError("Login success");
         
        }
      }
        })
    },
  });

  const { errors, touched, handleChange, handleSubmit } = formik;

  

  const [error, setError] = useState("");

  useEffect(() => {
    loadAccount();
  }, []);

  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <FormikProvider value={formik}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: "#0062cc" }}>
              <AccountCircleSharpIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              LOGIN
            </Typography>

            {error && (
              <Snackbar
                severity="error"
                anchorOrigin={{ vertical, horizontal }}
                open={open}
              >
                <Alert severity="error">{error}</Alert>
              </Snackbar>
            )}

            <Form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                label="Email "
                name="email"
                onChange={handleChange}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                sx={{ mt: 4 }}
                onChange={handleChange}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleClick({
                  vertical: "top",
                  horizontal: "center",
                })}
              >
                Sign In
              </Button>
            </Form>
          </Box>
        </Container>
      </FormikProvider>
    </ThemeProvider>
  );
};

export default Login;
