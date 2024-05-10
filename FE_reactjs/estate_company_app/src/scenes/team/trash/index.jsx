import Header from "../../../Components/Header";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ThemeProvider from "@mui/material";
import { useState, useEffect } from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import { tokens } from "../../../theme";
import ReplayCircleFilledOutlinedIcon from "@mui/icons-material/ReplayCircleFilledOutlined";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { TransitionProps } from "@mui/material/transitions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import AdminPanelIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityIcon from "@mui/icons-material/SecurityOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const Team_trash = () => {
  const [deletedBulidings, setDeletedBuildings] = useState([]);
  const [Open, setOpen] = useState(false);
  const [singleSelectedBuilding, setSingleSelectedBuilding] = useState(null);
  const [selectedIDs, setSelectedIDs] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [alertOpen, setAlertOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false); 


  useEffect(() => {
    const getDeletedBuildings = () => {
      fetch("http://localhost:8080/api/user/trash", {
        method: "GET",
      })
        .then((response) => {
          if (response != null) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          setDeletedBuildings(data);
        });
    };
    getDeletedBuildings();
  }, []);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
        field: "username",
        headerName: "User name",
        cellClassname: "name-column--cell",
      },
      {
        field: "fullname",
        headerName: "Full name",
        type: "text",
      },
  
      {
        field: "email",
        headerName: "Email",
        headerAlign: "left",
      },
      {
        field: "phone",
        headerName: "Phone Number",
      },
  
      {
        field: "roleIDs",
        headerName: "Roles",
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row: { roleIDs,id } }) => {
          return (
            <Box display="flex" justifyContent="center">
              <Box
                width="auto"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor={colors.greenAccent[600]}
                borderRadius="4px"
              >
                {(roleIDs.includes(1)  )&& (
                  <Box display="flex" sx={{
                    padding:"2px",
                    marginRight: "10px",
                    borderBottom: "1px solid #255",
                 
                  }}>
                    <AdminPanelIcon />
                    <Typography>Quản lí</Typography>
                  </Box>
                )}
                {roleIDs.includes(3) && (
                  <Box display="flex" sx={{
                    padding:"2px",
                    marginRight: "10px",
                    borderBottom: "1px solid #255",
                   
                  }}>
                    <SecurityIcon />
                    <Typography>Nhân viên</Typography>
                  </Box>
                )}
                {roleIDs.includes(2) && (
                  <Box display="flex" sx={{
                    padding:"2px",
                    marginRight: "10px",
                    borderBottom: "1px solid #255",
                    
                  }}>
                    <ManageAccountsIcon />
                    <Typography>Admin</Typography>
                  </Box>
                )}
                 {roleIDs.includes(4) && (
                  <Box display="flex" sx={{
                    padding:"2px",
                    marginRight: "10px",
                    borderBottom: "1px solid #255",
                    
                  }}>
                    <EmojiPeopleOutlinedIcon color="warning"/>
                    <Typography>Khách hàng</Typography>
                  </Box>
                )}
  
              </Box>
            </Box>
          );
        },
      },
    {
      field: "access",
      headerName: "Action",
      headerAlign: "center",
      width: 150,
      renderCell: ({ row: { access, id } }) => {
        return (
          <Box m="0 auto" p="5px" display="flex" justifyContent="center">
            <IconButton
              title="Delete"
              onClick={() => handleSingleDeleteClick(id)}
            >
              <ClearOutlinedIcon color="error" />
            </IconButton>
            <IconButton
              title="Recover"
              onClick={() => handleRecoverDeletedBuilding(id)}
            >
              <ReplayCircleFilledOutlinedIcon color="success" />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  const handleRecoverDeletedBuilding = (id) => {
    const updatedRows = deletedBulidings.filter((row) => row.id !== id);
    setDeletedBuildings(updatedRows);
    let listID = [id];
    
    fetch("http://localhost:8080/api/user/trash",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(listID)
    })
    .catch((error)=>{
        console.log(error);
    })
    setSnackOpen(true);
  };
  const handleDeleteSingleBuilding = () => {
    const updatedRows = deletedBulidings.filter((row) => row.id !== singleSelectedBuilding);
    setDeletedBuildings(updatedRows);
    if (singleSelectedBuilding != null) {
      let deleleData = {
        listID: [singleSelectedBuilding],
      };
      fetch("", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleleData),
      }).then((response) => {
        if (response.ok) {
            console.log("haha");
        }
      });
      setDeleteAlert(true);
      setOpen(false);
    }
  };

  const handleSelectionChange = (selection) => {
    let selectedRows = deletedBulidings.filter((row) => {
        if(selection.includes(row.id)){
            return row;
        }
    });
    let IDs = selectedRows.map((row)=>row.id);
    setSelectedIDs(IDs);
  };

  //Dialog

  const handleSingleDeleteClick = (id) => {
    setSingleSelectedBuilding(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSingleSelectedBuilding(null);
  };
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };
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
  const handleDeleteAlertClose = ()=>{
    setDeleteAlert(false);
  }
  //End dialog
  //clear all
    const handleMultipleDelete = ()=>{
      const updateRows = deletedBulidings.filter((row)=>{
        if(!selectedIDs.includes(row.id)){
          return row;
        }
      })
      setDeletedBuildings(updateRows);
      setDeleteAlert(true);
      setOpen(false);
    }
    const Clearclick = ()=>{
      if(selectedIDs.length>0){
        setOpen(true);

      }
      
    }
  //end clear all

  // recover all
  const handleMultipleRecover = ()=>{
    const updatedRows = deletedBulidings.filter((row) => {
      if(!selectedIDs.includes(row.id)){
        return row;
      }
    });
    setDeletedBuildings(updatedRows);
    let formData ={
      listID: selectedIDs
    }
    fetch("http://localhost:8080/api/user/trash",{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    .catch((error)=>{
        console.log(error);
    })
    setSnackOpen(true);
    setSelectedIDs([]);
  }
  // end recover all
  return (
    <>
      <Box m="5px 20px">
        <Box display="flex">
        <Header
          title="Team Trash Bin"
          subtitle={deletedBulidings.length>0 ? "View the currently deleted user accounts":"There are not any accounts in the trash bin"}
        />
        <Box ml="20px" display="flex" alignItems="center" p="5px">
            <Button variant="contained" color="error" endIcon={<CloseIcon/>}
              sx={{ marginRight: "10px", border: "1px solid #255" }}
              onClick={Clearclick}
              title="Permanently delete"
            >
                CLEAR
            </Button>
            <Button variant="contained" color="success" endIcon={<ReplayCircleFilledOutlinedIcon/>}
              sx={{ marginRight: "10px", border: "1px solid #255" }}
              onClick={handleMultipleRecover}
              title="Recover the selected buildings"
            > 
                REcover 
            </Button>
            <Link to="/admin/team">
          <Button variant="contained" color="warning" endIcon={<ArrowCircleLeftOutlinedIcon/>}
           sx={{ marginRight: "10px", border: "1px solid #255" }}
           title="Come back to building page"
          >
            Back
          </Button>
          </Link>

        </Box>
        </Box> 
          {deletedBulidings.length > 0 && (
            <Box
              m="10px 0 0 0"
              height="75vh"
              width="100%"
              sx={{
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-cell": { borderBottom: "none" },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[700],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
              }}
            >
              <DataGrid
                rows={deletedBulidings}
                columns={columns}
                autoHeight
                scrollbarSize={20}
                disableExtendRowFullWidth
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={handleSelectionChange}
              />
            </Box>
          )}{" "}
          <React.Fragment>
          <Dialog
        open={Open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title" color="yellow">
          WARNING
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        {deletedBulidings.length===0 ?"There are not any buildings left in the trash bin!!" : (singleSelectedBuilding!= null?"Are you sure permanently deleting this building ?" :"Are you sure permanently deleting these buildings ?") }  
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         {deletedBulidings.length>0 && <Button onClick={(singleSelectedBuilding!=null ?handleDeleteSingleBuilding:handleMultipleDelete)} variant="contained">YES</Button>} 
          <Button onClick={handleClose} autoFocus variant="contained" color="error">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          message="Success Recovery!!"
          action={SnackAction}
        >
          <Alert
            onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Success Recovery!
          </Alert>
        </Snackbar>
        <Snackbar
          open={deleteAlert}
          autoHideDuration={6000}
          onClose={handleDeleteAlertClose}
          message={"Success Deleting"}
          action={SnackAction}
        >
          <Alert
            onClose={handleDeleteAlertClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Success Deletion!
          </Alert>
        </Snackbar>
        </React.Fragment>
      </Box>
    </>
  );
};

export default Team_trash;
