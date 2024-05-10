import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../Components/Header";
import { useState } from "react";

const Forgotpassword = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [code,setCode] = useState("");
  const handleClick = () => {
    // gửi email về server
    // server gửi code đi qua email đã nhập từ email của server
    // hiện form xác nhận code
    setSent(true);
  };
  return (
    <Box display="flex" padding="100px 500px">
      <Box
        backgroundColor={colors.primary[700]}
        width="100%"
        height="100%"
        borderRadius="10px"
        textAlign="center"
        padding="15px"
      >
        <Header
          title="FORGOT PASSWORD"
          subtitle="Enter your registed email to receive change password code"
        />
        <Box padding="0 40px" display="flex" justifyContent="space-between">
          <TextField
            name="email"
            label="Email"
            type="email"
            placeholder="abc@gmail.com"
            sx={{ flex: "1", paddingRight: "15px" }}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Button variant="contained" color="warning" onClick={handleClick}>
            {!sent ? "Get code" : "Send again"}
          </Button>
        </Box>
        {sent && (
          <Box padding="10px 40px">
            <hr></hr>
            <Typography color={colors.gray[400]}>Confirm code</Typography>
            <Box  padding="10px 0" display="flex" justifyContent="space-between">
              <TextField
                name="text"
                label="Code"
                type="text"
                sx={{ flex: "1", paddingRight: "15px" }}
                required
                onChange={(e) => {
                  
                }}
              />
              <Button variant="contained" color="error" onClick={handleClick}>
                Confirm
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Forgotpassword;
