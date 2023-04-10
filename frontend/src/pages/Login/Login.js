import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const theme = createTheme();

function Login() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.currentTarget);
    const email = dataForm.get("email");
    const password = dataForm.get("password");
    const data = { email, password };
    // const data = { email, password };
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // Parse the response to JSON
        if (!response.ok) {
          setLoginSuccess(false);
          throw new Error("Invalid credentials");
        }
        setLoginSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        return response.json();
      })
      .then((data) => {
        // Save the token in localStorage

        const decoded = jwt_decode(data.token);
        const id = decoded.id;
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", id);
        console.log("id is", id);
      })
      .catch((error) => console.error(error));
  };
  return (
    <ThemeProvider theme={theme}>
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
          {loginSuccess && (
            <Alert severity="success">
              <span>
                <span>Alert!</span> you successfully logged in
              </span>
            </Alert>
          )}
          {loginSuccess == false && (
            <Alert severity="error">
              <span>
                <span>Alert!</span> Invalid credentials
              </span>
            </Alert>
          )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
// return (
//   <div>
//     <h1>Login</h1>
//     <form onSubmit={handleSubmit}>
//       <label>
//         Username:
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>
//       <br />
//       <button type="submit">Submit</button>
//     </form>
//   </div>
// );

export default Login;
