import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../Components/Header";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleUserNameChange = (e)=>{
    setUserName(e.target.value);
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value);
  }
  const handleEmail = (e)=>{
    setEmail(e.target.value);
  }
  const handlePhone = (e)=>{
    setPhone(e.target.value);
  }
  const handleFullname = (e)=>{
    setFullname(e.target.value);
  }
  return (
    <Box padding="100px 500px" display="flex">
      <Box
        backgroundColor={colors.primary[700]}
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        borderRadius="10px"
        textAlign="center"
        padding="15px"
      >
        <Header title="SIGNUP" subtitle="Create a new account" />

        <form>
          
          <Box display="grid" gap="20px" padding="0 50px">
            <TextField
              fullWidth
              name="username"
              type="text"
              variant="filled"
              required
              label="Username"
              onChange={handleUserNameChange}
            />
            <TextField
              fullWidth
              name="password"
              type="password"
              variant="filled"
              required
              label="Password"
            />
            <TextField
              fullWidth
              name="confirmPassword"
              type="text"
              variant="filled"
              required
              label="Password confirm"
            />
            <TextField
              fullWidth
              name="fullname"
              type="text"
              variant="filled"
              required
              label="Fullname"
            />
             <TextField
              fullWidth
              name="email"
              type="text"
              variant="filled"
              required
              label="Email"
              placeholder="abc@gmail.com"
            />
            <TextField
              fullWidth
              name="phone"
              type="text"
              variant="filled"
              required
              label="phone"
              placeholder="abc@gmail.com"
              error=""
            />
            <Button type="submit" variant="contained" color="success">
                Sign up
            </Button>
          </Box>
        </form>
        <hr></hr>
        <Box
        display="flex"
        justifyContent="end"
        textAlign="center"
        padding="0 20px"
        >
            <Typography paddingRight="5px">
                Already have an account?
            </Typography>
            <Link to="/login" style={{textDecoration:"none",color:"gray"}}> 
            <Typography >
                Login
            </Typography>
            </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
