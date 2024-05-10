
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../Components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassname: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      flex: 1,
      align: "left",
    },
    
    {
        field: "email",
        headerName: "Email",
        headerAlign: "left",
        flex: 1,
        align: "left",
    },
    {
        field:"phone",
        headerName: "Phone Number", 
        flex:1,
    },
    {
        field:"access",
        headerName:"Access Level",
        flex:1,
        headerAlign:"center",
        align:"left",
        renderCell: ({row: {access}})=>{
            return (
                <Box
                    width="60%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={access=== "admin"
                    ?colors.greenAccent[600]:colors.greenAccent[700]
                    }
                    borderRadius="4px"
                >
                    {access ==="admin" && <AdminPanelIcon/>}
                    {access === "manager" && <SecurityIcon/>}
                    {access === "user" && <LockOpenIcon/>}
                    <Typography color={colors.gray[100]} sx={{ml:"5px"}}>
                        {access}
                    </Typography>
                </Box>
            )
        }
    }
  ];
  return (
    <Box m="20px"
        >
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box 
        m="40px 0 0 0"
        height="75vh"
        sx={{
            "& .MuiDataGrid-root":
            {border:"none",},
            "& .MuiDataGrid-cell":
            {borderBottom:"none",},
            "& .name-column--cell":{
                color: colors.greenAccent[300]
            },
            "& .MuiDataGrid-columnHeaders":{
                backgroundColor: colors.blueAccent[700],
                borderBottom:"none",
            },
            "& .MuiDataGrid-virtualScroller":{
                backgroundColor : colors.primary[700],
            },
            "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
            "& .MuiDataGrid-footerContainer":{
                borderTop: "none",
                backgroundColor:colors.blueAccent[700]
            }
        }}
      >
        <DataGrid rows={mockDataTeam} columns={columns}></DataGrid>
      </Box>
    </Box>
  );
};

export default Team;
