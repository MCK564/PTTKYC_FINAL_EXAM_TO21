import { useContext } from "react";
import { AccountContext } from "../../contexts/AccountContext";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { gridAdditionalRowGroupsSelector } from "@mui/x-data-grid/internals";
import Header from "../../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
const currentURL = window.location.href;

const LoginForm = ({ onLogin, onAccount }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setIsLoggedIn } = useContext(AccountContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: username,
      password: password,
    };
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data != null) {
          onAccount(data);
          onLogin(true);
          setIsLoggedIn(true);
          if (!data.roleIDs.includes(4)) {
            navigate("/admin/dashboard");
          }
          else{navigate("/home");
        
        }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };
  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  
  return (
    <Box p="100px 500px" display="flex">
      <Box
        backgroundColor="#131926"
        width="100%"
        height="100%"
        borderRadius="10px"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        padding="20px 80px"
        textAlign="center"
      >
        <Header title="LOGIN" subtitle="Have an account?" />
        <form onSubmit={handleFormSubmit}>
          <Box display="grid" gap="20px">
            <TextField
              variant="filled"
              type="text"
              label="Username"
              required
              onChange={handleUserNameChange}
            />
            <TextField
              variant="filled"
              type="password"
              label="Password"
              required
              onChange={handlePasswordChange}
            />
            <Box display="flex" justifyContent="space-between">
              <Box>
                {" "}
                <input type="checkbox" id="remembercheck" />
                <label for="remembercheck" style={{ color: "gray" }}>
                  Remember me
                </label>{" "}
              </Box>

              <Link
                to="/forgot-password"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  textDecoration: "none",
                  color: "gray",
                  gap: "0px",
                }}
              >
                <Typography>Forgot password?</Typography>
              </Link>
            </Box>
            <Box display="flex" padding="">
              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ flex: "1" }}
              >
                Login
              </Button>
              <Button
                onClick={handleSignUpClick}
                variant="contained"
                color="error"
                sx={{ flex: "1" }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </form>

        <hr style={{ borderColor: "gray", margin: "20px 30px" }}></hr>
        <Typography color={colors.gray[400]}>
            OR LOGIN WITH
        </Typography>
        <Box display="flex" justifyContent="center" margin="10px">
                <Button variant="contained" color="info" startIcon={<FacebookOutlinedIcon/>} sx={{marginRight:"10px"}}>
                    Facebook
                </Button>
                <Button variant="contained" sx={{backgroundColor:"orange"}} startIcon={<GoogleIcon/>}>
                    Google+
                </Button>
        </Box>
        <Link to="/loginWithToken">
          <Button>
            Login with JWT
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
