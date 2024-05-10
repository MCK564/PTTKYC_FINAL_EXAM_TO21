import { tokens } from "../../../theme";
import {
  Box,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  TextField,
  FormControl,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { Formik, yupToFormErrors, Form, Field } from "formik";
import Header from "../../../Components/Header";
import { useState, useEffect } from "react";
import * as yup from "yup";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SystemUpdateAltOutlinedIcon from "@mui/icons-material/SystemUpdateAltOutlined";
import { Link } from "react-router-dom";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";


const AccountEdit = (object) => {
  const [staffs, setStaffs] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [roles, setRoles] = useState([]);
  const [thisAccountID, setThisAccountID] = useState(null);
  const mainAccount = object.account;

  //handleThisAccountID
 
  const [account, setAccount] = useState({
    id: "",
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    roleIDs: [],
    status:"1"
  });
  useEffect(() => {
    const thisURL = window.location.href;
    if (thisURL.includes("?")) {
      let url_split = thisURL.split("=");
      setThisAccountID(url_split[1]);
    }
  }, [thisAccountID]);
  //end handleThisAccountID
  useEffect(() => {
    if (account && account.roleIDs) {
      setSelectedRoles(account.roleIDs);
    }
  }, [account]);
  //getAccount
  useEffect(() => {
    if (thisAccountID != null) {
      fetch("http://localhost:8080/api/user?id=" + thisAccountID, {
        method: "GET",
      })
        .then((response) => {
          if (response != null) {
            return response.json();
          }
        })
        .then((data) => {
          setAccount(data[0]);
          setSelectedRoles(data[0].roleIDs)
        });
    }
  }, [thisAccountID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //endGetAccount

  

  //handle Roles
  const [selectedRoles, setSelectedRoles] = useState([]);
  useEffect(() => {
    const getRoles = () => {
      let roleFetchURL = "http://localhost:8080/api/roles";

      if (thisAccountID!=null && account.roleIDs && account.roleIDs.length > 0) {
        roleFetchURL += "?roleid=" + account.roleIDs[0];
      } else if(mainAccount.roleIDs.includes(1)){
        roleFetchURL += "?roleid=1";
      }else if(mainAccount.roleIDs.includes(2) &&!mainAccount.roleIDs.includes(1)){
        roleFetchURL += "?roleid=2";
      }else if(mainAccount.roleIDs.includes(3) &&!mainAccount.roleIDs.includes(1)){
        roleFetchURL += "?roleid=3";
      }

      fetch(roleFetchURL, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Failed to fetch");
        })
        .then((data) => {
          setRoles(data);
         
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getRoles();
  }, [thisAccountID]);

  const handleCheckboxChange = (e, id) => {
    const updatedRoles = [...selectedRoles]; 
    const index = updatedRoles.indexOf(id);
    if (index !== -1) {
      updatedRoles.splice(index, 1); 
    } else {
      updatedRoles.push(id); 
    }
    setSelectedRoles(updatedRoles);
    setAccount({ ...account, roleIDs: updatedRoles });
  };
  
  //end handleRoles
//handleSubmit 
const [successOpen, setSucccessOpen] = useState(false);
const [snackOpen,setSnackOpen] = useState(false);
const handleSubmit = (e) => {
  e.preventDefault();
  if(selectedRoles.length===0 || account.fullname==="" || account.username === ""){
    setSnackOpen(true);
    return;
  }
  else{
  
  let jsondata = JSON.stringify(account);
  let modifileJsonData = jsondata.replace(/null/g,'""');
  console.log(modifileJsonData);
  fetch("http://localhost:8080/api/user",{
    method:"PUT",
    headers:{
      "Content-Type":"application/json"
    },
    body:modifileJsonData
  })
    .then((response)=>{
      console.log(response);
    })
  setSucccessOpen(true);
  }
};
const handleSnackClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }
  setSnackOpen(false);
};
const handleDeleteAlertClose = (event,reason) =>{
  if (reason === "clickaway") {
    return;
  }
  setSucccessOpen(false);
}

const SnackAction = (
  <React.Fragment>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleSnackClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  </React.Fragment>
);

//EndHandleSubmit
  
  return (
    <Box m="5px 20px">
      <Header
        title={thisAccountID != null ? "Team Edit" : "Team Create"}
        subtitle={
          thisAccountID != null
            ? "Edit the team member information below"
            : "Create a new team member by filling the form below"
        }
      />
      <form onSubmit={handleSubmit}>
        <Box display="flex">
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              border: "1px solid #131926",
              flexDirection: "column",
              maxWidth: "350px",
              flex: "1",
            }}
          >
            <TextField
              label="ID"
              name="id"
              value={account.id}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              disabled
            />
            <TextField
              label="User Name"
              name="username"
              value={account.username}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              required
            />
            <TextField
              label="Full Name"
              name="fullname"
              value={account.fullname}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              placeholder="Nguyễn Văn A"
              required
            />
            <TextField
              label="Email"
              name="email"
              value={account.email}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              placeholder="abc@gmail.com"
            />
            <TextField
              label="Phone number"
              name="phone"
              value={account.phone}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
          </Box>
          <Box ml="15px">
            {(mainAccount.roleIDs.includes(1) ||
              mainAccount.roleIDs.includes(2)) && (
              <Box
                sx={{
                  flex: 1,
                  flexGrow: 1,
                 
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                }}
                backgroundColor={colors.blackCustom[900]}
                p="16px 2px"
                borderBottom="0.1px solid #fff"
                alignItems="center"
              >
                
                  <Typography variant="h5">Select Role</Typography>
                  <Box display="flex" flexDirection="column">
                  {roles.map((item, index) => (

                    
                      <Box display="flex" key={item.id}>
                      <input
                        type="checkbox"
                        value={item.id}
                        checked={selectedRoles.includes(item.id)}
                        onChange={(e) => {
                          handleCheckboxChange(e,item.id)
                        }}
                      />
                    <Typography variant="h6" >
                        {item.name}
                    </Typography></Box>
                    
                  ))}</Box>
             
              </Box>
            )}
            <Box mt="15px">
              
            <Button
            variant="contained"
            color="success"
            endIcon={<SystemUpdateAltOutlinedIcon />}
            sx={{ marginRight: "10px", border: "1px solid #255" }}
            onClick={handleSubmit}
            type="submit"
          >
            {thisAccountID!= null ? "Update" : "Create"}
          </Button>
          <Link to="/admin/team">
            <Button
              variant="contained"
              color="warning"
              endIcon={<ArrowCircleLeftOutlinedIcon />}
              sx={{ marginRight: "10px", border: "1px solid #255" }}
            >
              Back
            </Button>
          </Link>
            </Box>
          </Box>
        </Box>
      </form>
      <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          message="Success Assigment"
          action={SnackAction}
        >
          <Alert
            onClose={handleSnackClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {selectedRoles.length===0 && <Typography>You have to choose at least one role</Typography>}
            {(account.fullname==="" || account.username ==="") && <Typography>Username and fullname must not be null</Typography>}
          </Alert>
        </Snackbar>
        <Snackbar
          open={successOpen}
          autoHideDuration={6000}
          onClose={handleDeleteAlertClose}
          message={"Success Deleting"}
          action={SnackAction}
        >
          <Alert
            onClose={handleDeleteAlertClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {thisAccountID!=null ?"Success Updating!":"Success Creating!"}
          </Alert>
        </Snackbar>
    </Box>
  );
};
export default AccountEdit;
