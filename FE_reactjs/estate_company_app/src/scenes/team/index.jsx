import {
  Box,
  Typography,
  useTheme,
  Button,
  IconButton,
  TextField,
  useMediaQuery,
  Collapse,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../Components/Header";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useState, useEffect } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';

const Team = (object) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const mainAccount= object.account;
  const initialValues = {
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: "",
    roleid: "",
  };

  const accountSchema = yup.object().shape({
    username: yup.string(),
    password: yup.string(),
    fullname: yup.string(),
    email: yup.string().email(),
    phone: yup.string().matches(),
    roleid: yup.number(),
  });
  //delete user
  const [deleteBuildingIDs, setDeleteBuildingIDs] = useState([]);
  const handleDeleteSingleBuilding = (id) => {
    const updatedRows = accounts.filter((row) => row.id !== id);
    setAccounts(updatedRows);
    
    const listID = [id];
    console.log(JSON.stringify(listID));
    if(id!=null){
      fetch("http://localhost:8080/api/user",{
        method: "DELETE",
        headers:{ "Content-Type":"application/json"},
        body:JSON.stringify(listID)
      })
        .then((response)=>{
          if(response.null){
            console.log(response);
          }
        })
        //setDeleteAlert(true);
    }
  }
  const handleDeleteMultipleBuilding = () => {
    const updateRows = accounts.filter(
      (row) => {
        if(!deleteBuildingIDs.includes(row.id)){
          return row;
        }
      }

    );
    
    setAccounts(updateRows);
    
    fetch("http://localhost:8080/api/user",{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(deleteBuildingIDs)
    })
      .catch((error)=>{
        console.log(error);
      })
    
    setSelectedIds([]);
    if(deleteBuildingIDs){ 
      //setDeleteAlert(true);
    }
    setDeleteBuildingIDs([]);
  };
  
  const handleSelectionChange = (selection) => {
    const selectedRows = accounts.filter((item) => {
      if(selection.includes(item.id)){
        return item;
      }
      })
    const selectIds = selectedRows.map((row) => row.id);
    setDeleteBuildingIDs(selectIds);
  };
  //delete user
  const columns = [
    {
      field: "id",
      headerName: "ID",
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
      flex: 1,
      align:"center",
      renderCell: ({ row: { id,roleIDs } }) => {
        const isdisabled= mainAccount.roleIDs[0]>roleIDs[0];
        return (<>
          {!isdisabled ? <Box m="0 auto" p="5px" display="flex" justifyContent="center">
            <IconButton title="Delete"
            disabled={isdisabled}
            onClick={()=>handleDeleteSingleBuilding(id)}
            >
              <ClearOutlinedIcon color="error" />
            </IconButton>
            <Link to={`team-edit?id=${id}`} >
              <IconButton title="Edit" >
                <BuildOutlinedIcon color="warning" />
              </IconButton>
            </Link>
          </Box> :<Box>
            <Typography>
              No action to this account
            </Typography>
            </Box>}
         </>
        );
      },
    },
  ];
  const currentURL = window.location.href;
  const newURL = () => {
    if(currentURL.includes("localhost")){
      return currentURL.replace(
        "http://localhost:3000/admin/team",
        "http://localhost:8080/api/user");
    }
    return currentURL.replace(
    "https://glow-klqlsa51c-khas-projects-163f0fb7.vercel.app/admin/team",
    "http://localhost:8080/api/user"
    );
}
  const getAccount = () => {
    fetch(newURL(), { method: "GET" })
      .then((response) => {
        if (response != null) {
          return response.json();
        }
      })
      .then((data) => {
        setAccounts(data);
      });
  };
  useEffect(() => {
    if (!initialLoadComplete) {
      getAccount();
      setInitialLoadComplete(true);
    }
  });
  const handleSubmit = () => {
    fetch(newURL, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
      });
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    const getRoles = () => {
      fetch("http://localhost:8080/api/roles?roleid=1", {
        method: "GET",
      })
        .then((response) => {
          if (response != null) {
            return response.json();
          }
        })
        .then((data) => {
          setRoles(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getRoles();
  }, []);
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Box m="5px 20px">
      <Box display="flex">
        <Header title="TEAM" subtitle="Managing the Team Members" />
        <Box
          p="5px"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flex="1"
        >
          {!isCollapsed && (
            <Box display="flex">
              <Link to="/admin/team/team-edit">
                <Button
                  type="button"
                  variant="contained"
                  color="success"
                  endIcon={<AddBusinessOutlinedIcon />}
                  sx={{ marginRight: "10px", border: "1px solid #255" }}
                >
                  Add
                </Button>
              </Link>

              <Button
                type="button"
                variant="contained"
                color="error"
                endIcon={<CloseIcon />}
                sx={{
                  marginRight: "10px",
                  border: "1px solid #255",
                  color: "black",
                }}
                onClick={handleDeleteMultipleBuilding}
              >
                Delete
              </Button>
              <Link to="/admin/team/trash">
                <Button
                  type="button"
                  variant="contained"
                  color="info"
                  endIcon={<DeleteOutlineOutlinedIcon />}
                  sx={{
                    marginRight: "10px",
                    border: "1px solid #255",
                    color: "black",
                  }}
                >
                  Bin
                </Button>
              </Link>
              <IconButton
                variant="contained"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {!isCollapsed === true && (
                  <KeyboardDoubleArrowDownOutlinedIcon />
                )}
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        height="75vh"
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
        <Collapse in={isCollapsed}>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={accountSchema}
          >
            {({
              values = { initialValues },
              errors,
              touched,
              handleBlur,
              handleChange,
            }) => (
              <form onSubmit={() => handleSubmit(values)}>
                <Box
                  border="1px solid #131926"
                  borderRadius="5px"
                  p="5px"
                  display="grid"
                  gap="20px"
                  gridTemplateColumns="repeat(6,mimax(0,1fr))"
                  sx={{
                    "& .div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <TextField
                      id="username"
                      label="User name"
                      name="username"
                      type="text"
                      variant="filled"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      error={!!touched.username && errors.username}
                      helperText={touched.username && errors.username}
                      sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
                    />
                    <TextField
                      id="fullname"
                      label="Full name"
                      name="fullname"
                      type="text"
                      variant="filled"
                      value={values.fullname}
                      error={!!touched.fullname && errors.fullname}
                      helperText={touched.fullname && errors.fullname}
                      sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <TextField
                      id="email"
                      label="Email"
                      name="email"
                      type="text"
                      variant="filled"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      error={!!touched.email && errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
                    />
                    <TextField
                      id="phone"
                      label="Phone number"
                      name="fullname"
                      type="text"
                      variant="filled"
                      value={values.phone}
                      error={!!touched.phone && errors.phone}
                      helperText={touched.phone && errors.phone}
                      sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
                    />
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      sx={{
                        flex: 1,
                        flexGrow: 1,
                        marginLeft: "2px",
                        borderTopLeftRadius: "5px",
                        borderTopRightRadius: "5px",
                      }}
                      backgroundColor={colors.blackCustom[900]}
                      p="16px 2px"
                      borderBottom="0.1px solid #fff"
                      alignItems="center"
                    >
                      <Field
                        as="select"
                        id="roleid"
                        name="roleid"
                        label="Role"
                        onChange={handleChange}
                        value={values.roleid}
                        style={{
                          backgroundColor: "#333D51",
                          width: "100%",
                          paddingTop: "",
                          border: "none",
                          color: "#C2C5CB",
                          heigh: "100%",
                        }}
                      >
                        <option value={""}>Select Role</option>
                        {roles.map((option) => (
                          <option value={option.id} key={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </Field>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      ml="20px"
                    >
                      <Box display="flex">
                        <Link to="/admin/team/team-edit">
                          <Button
                            type="button"
                            variant="contained"
                            color="success"
                            endIcon={<AddBusinessOutlinedIcon />}
                            sx={{
                              marginRight: "10px",
                              border: "1px solid #255",
                            }}
                          >
                            Add
                          </Button>
                        </Link>

                        <Button
                          type="button"
                          variant="contained"
                          color="error"
                          endIcon={<CloseIcon />}
                          sx={{
                            marginRight: "10px",
                            border: "1px solid #255",
                            color: "black",
                          }}
                          onClick={()=>handleDeleteMultipleBuilding}
                        >
                          Delete
                        </Button>
                        <Link to="">
                          <Button
                            type="button"
                            variant="contained"
                            color="info"
                            endIcon={<DeleteOutlineOutlinedIcon />}
                            sx={{
                              marginRight: "10px",
                              border: "1px solid #255",
                              color: "black",
                            }}
                          >
                            Bin
                          </Button>
                        </Link>
                        <IconButton
                          variant="contained"
                          onClick={() => setIsCollapsed(!isCollapsed)}
                        >
                          {!isCollapsed === true && (
                            <KeyboardDoubleArrowDownOutlinedIcon />
                          )}
                        </IconButton>
                      </Box>
                      <Button
                        variant="contained"
                        type="submit"
                        color="success"
                        sx={{ marginRight: "10px", border: "1px solid #255" }}
                      >
                        Search
                      </Button>
                      <IconButton
                        variant="contained"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                      >
                        <KeyboardDoubleArrowUpOutlinedIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Collapse>
        <DataGrid
        rows={accounts}
        columns={columns}
        checkboxSelection
        autoHeight={accounts.length<10}
        disableRowSelectionOnClick
        pageSize={6} // Đặt số hàng cho mỗi trang là 6
        onRowSelectionModelChange={handleSelectionChange}
        pagination
         
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default Team;
