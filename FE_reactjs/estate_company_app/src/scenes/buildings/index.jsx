import {
  Box,
  Button,
  Checkbox,
  TextField,
  useTheme,
  IconButton,
  Collapse,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import React from "react";
import {
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Pagination,
  PaginationItem
} from "@mui/material";
import Alert from "@mui/material/Alert";
import style from "./style.css";
import { pink } from "@mui/material/colors";
import Header from "../../Components/Header";
import * as yup from "yup";
import { MenuItem } from "react-pro-sidebar";
import { Link,useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { tokens } from "../../theme";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SafetyDividerOutlinedIcon from "@mui/icons-material/SafetyDividerOutlined";
import { DataGrid } from "@mui/x-data-grid";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddBusinessOutlinedIcon from "@mui/icons-material/AddBusinessOutlined";
import { Collections } from "@mui/icons-material";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const districts = [
  { code: "THANH_PHO_THU_DUC", name: "Thành phố Thủ Đức" },
  { code: "QUAN_1", name: "Quận 1" },
  { code: "QUAN_2", name: "Quận 2" },
  { code: "QUAN_3", name: "Quận 3" },
  { code: "QUAN_4", name: "Quận 4" },
  { code: "QUAN_5", name: "Quận 5" },
  { code: "QUAN_6", name: "Quận 6" },
  { code: "QUAN_7", name: "Quận 7" },
  { code: "QUAN_8", name: "Quận 8" },
  { code: "QUAN_9", name: "Quận 9" },
  { code: "QUAN_10", name: "Quận 10" },
  { code: "QUAN_11", name: "Quận 11" },
  { code: "QUAN_12", name: "Quận 12" },
  { code: "QUAN_BINH_TAN", name: "Quận Bình Tân" },
  { code: "QUAN_BINH_THANH", name: "Quận Bình Thạnh" },
  { code: "QUAN_GO_VAP", name: "Quận Gò Vấp" },
  { code: "QUAN_PHU_NHUAN", name: "Quận Phú Nhuận" },
  { code: "QUAN_TAN_BINH", name: "Quận Tân Bình" },
  { code: "QUAN_TAN_PHU", name: "Quận Tân Phú" },
  { code: "HUYEN_BINH_CHANH", name: "Huyện Bình Chánh" },
  { code: "HUYEN_CAN_GIO", name: "Huyện Cần Giờ" },
  { code: "HUYEN_CU_CHI", name: "Huyện Củ Chi" },
  { code: "HUYEN_HOC_MON", name: "Huyện Hóc Môn" },
  { code: "HUYEN_NHA_BE", name: "Huyện Nhà Bè" },
];

const typeCodes = [
  { code: "NOI_THAT", name: "Nội thất" },
  { code: "NGUYEN_CAN", name: "Nguyên căn" },
  { code: "TANG_TRET", name: "Tầng trệt" },
];

const Buildings = (object) => {
  //Dialog
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [staffAssign, setStaffAssign] = useState([]);
  const [selectedAssignBuilding, setSelectedAssignBuilding] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [
    assignedBuildingIdsByMainAccount,
    SetAssignedBuildingIdsByMainAccount,
  ] = useState([]);
  const mainAccount = object.account;
  const [currentURL2,setCurrentURL2] =useState(window.location.href);
  const [limit,setLimit] = useState(new URLSearchParams(window.location.search).get('limit'));
  const [totalPages, setTotalPages]=useState(-1);
  const searchParams = new URLSearchParams(window.location.search);
  
  let currentPage = parseInt(searchParams.get('page'));
  
  const handleLimitChange = (params)=>{
    
  }
  const handleDeleteAlertClose = () => {
    setDeleteAlert(false);
  };
  
  useEffect(() => {
    const getAssignedBuildingId = () => {
      fetch("http://localhost:8080/api/buildings/id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mainAccount.id),
      })
        .then((response) => {
          if (response != null) {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          SetAssignedBuildingIdsByMainAccount(data);
        });
    };

    if (mainAccount.roleIDs.includes(3)) {
      getAssignedBuildingId();
    }
    
  }, []);
  const [var1, setVar1] = useState(0);

  const handleClickOpen = (buildingid) => {
    setSelectedIds([]);
    setSelectedAssignBuilding(buildingid);
    setOpen(true);
    fetch("http://localhost:8080/api/user/assignment?id=" + buildingid, {
      method: "GET",
    })
      .then((response) => {
        if (response != null) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setStaffAssign(data);
        data.map((item, index) => {
          if (item.checked) {
            setSelectedIds((prev) => {
              return [...prev, item.id];
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //handle Param
  const [param, setParam] = useState({});
  const UrlParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    const queryParams = {};
    for (const [key, value] of UrlParams) {
      queryParams[key] = value;
    }
    if (UrlParams.size > 2) {
      setParam(queryParams);
    }
  }, []);
  const buildUrl = (newPage) =>{
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', newPage); 
    return `?${searchParams.toString()}`;
  } 
 const handleVarChange = (page)=>{
    setVar1(1);
 }
 useEffect(()=>{
   if(var1!==0)window.location.reload();
 },[var1])
  //end handle Param
  const handleClose = () => {
    setStaffAssign([]);
    setOpen(false);
    setSelectedAssignBuilding(null);
  };
  const staffColumns = [
    {
      field: "selection",
      headerName: "Select",
      width: 100,
      renderCell: ({ row }) => {
        const handleChange = () => {
          if (selectedIds.includes(row.id)) {
            setSelectedIds(selectedIds.filter((id) => id !== row.id));
          } else {
            setSelectedIds([...selectedIds, row.id]);
          }
        };
        return (
          <Checkbox
            color="warning"
            defaultChecked={row.checked}
            onChange={handleChange}
          />
        );
      },
    },
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
  ];

  const handleAssignClick = () => {
    let request = {
      buildingId: selectedAssignBuilding,
      listStaffId: selectedIds,
    };
    fetch("http://localhost:8080/api/buildings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }).then((response) => {
      if (response.ok) {
        setSnackOpen(true);
      }
    });
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

  //End Dialog
  const [staffSelected, SetStaffSelected] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [typeCodeCheck, setTypeCodeCheck] = useState([]);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  useEffect(() => {
    // Gọi API để lấy danh sách staff khi component được mount
    const getStaffList = () => {
      fetch("http://localhost:8080/api/user?roleid=3")
        .then((response) => response.json())
        .then((data) => {
         
          setStaffList(data);
        })
        .catch((error) => {
          console.error("Error fetching staff list:", error);
        });
    };
    getStaffList();
  }, []); // Dùng mảng dependency rỗng để gọi chỉ một lần khi component mount
  const [buildingInfo, setBuildingInfo] = useState({
    name: "",
    districtCode: "",
    street: "",
    ward: "",
    floorArea: "",
    numberOfBasement: "",
    level: "",
    rentAreaFrom: "",
    rentAreaTo: "",
    rentPriceFrom: "",
    rentPriceTo: "",
    managerName: "",
    managerPhoneNumber: "",
    staffId: "",
    typeCode: [],
    page:"",
    limit:""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuildingInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  useEffect(()=>{
    if (UrlParams.size > 1) {
      const initialValuesObject = {};
      let typeCodeUrl = [];
      
      for (const [key, value] of UrlParams) {
        if(key==="http://localhost:3000/admin/buildings?name")initialValuesObject["name"] = value;
        else if(key==="http://localhost:3000/admin/buildings?page")initialValuesObject["page"]=value;
        else initialValuesObject[key]=value;
        }
        setBuildingInfo((prevBuildingInfo) => ({
          ...prevBuildingInfo,
          ...initialValuesObject,
        }));
        if (initialValuesObject.typeCode) {
          let typeCodesplit=initialValuesObject.typeCode.split(',');
          setTypeCodeCheck(typeCodesplit);

        }

      
  }
  },[])
  
  const handleTypeCodeChange = (e) => {
    setTypeCodeCheck((prev) => {
      let isChecked = typeCodeCheck.includes(e);
      if (isChecked) {
        return typeCodeCheck.filter((item) => item !== e);
      } else {
        return [...prev, e];
      }
    });
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [buildingData, setBuildingData] = useState([]);
  const currentURL = window.location.href;

  const newURL = () => {
    if (currentURL.includes("localhost")) {
      return currentURL.replace(
        "http://localhost:3000/admin",
        "http://localhost:8080/api"
      );
    }
    return currentURL.replace(
      "https://glow-klqlsa51c-khas-projects-163f0fb7.vercel.app/admin",
      "http://localhost:8080/api"
    );
  };
  useEffect(() => {
    if (!initialLoadComplete) {
      getBuildings();
      setInitialLoadComplete(true);
    }
  },[]);
  const getBuildings = () => {
    fetch(newURL(), {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data != null) {
          setBuildingData(data.buildings);
          setTotalPages(parseInt(data.totalPages));
       
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const buildingInfoCopy = { ...buildingInfo };
    if (typeCodeCheck.length===0) {
      delete buildingInfoCopy.typeCode;
    }
    console.log(buildingInfoCopy);
    const params = new URLSearchParams(buildingInfoCopy).toString();
    console.log(params);
    navigate(`?${params}`);
    window.location.reload();
  }
  const handleHistoryChange = () => {
    // Thực hiện các thao tác bạn muốn khi người dùng nhấn Undo hoặc Redo
    // Ví dụ: Tải lại trang
    window.location.reload();
  };
  
  // Đăng ký hàm xử lý sự kiện với sự kiện popstate
  window.addEventListener('popstate', handleHistoryChange);
  
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
    },
    {
      field: "name",
      headerName: "Building Name",
      flex: 1,
      cellClassname: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "numberOfBasement",
      headerName: "NoB",
      width: 50,
    },
    {
      field: "floorArea",
      headerName: "Floor Area",
      width: 70,
    },
    {
      field: "direction",
      headerName: "Direction",
      width: 70,
    },
    {
      field: "rentArea",
      headerName: "Rent Area",
    },
    {
      field: "level",
      headerName: "Level",
      width: 70,
    },
    {
      field: "rentPrice",
      headerName: "Rent Price",
    },
    {
      field: "managerName",
      headerName: "Manager Name",
    },
    {
      field: "managerPhoneNumber",
      headerName: "Manager Phone",
      width: 70,
    },
    {
      field: "access",
      headerName: "Action",
      headerAlign: "center",
      width: 150,
      flex: 1,
      renderCell: ({ row: { access, id } }) => {
        return (mainAccount.roleIDs.includes(3) &&
          assignedBuildingIdsByMainAccount.includes(id)) ||
          mainAccount.roleIDs.includes(2) ||
          mainAccount.roleIDs.includes(1) ? (
          <Box m="0 auto" p="5px" display="flex" justifyContent="center">
            <IconButton
              title="Delete"
              onClick={() => handleDeleteSingleBuilding(id)}
            >
              <ClearOutlinedIcon color="error" />
            </IconButton>
            <Link to={`/admin/buildings/building-edit?id=${id}`}>
              <IconButton title="Edit">
                <BuildOutlinedIcon color="warning" />
              </IconButton>
            </Link>
            {(mainAccount.roleIDs.includes(2) ||
              mainAccount.roleIDs.includes(1)) && (
              <IconButton title="Assign" onClick={() => handleClickOpen(id)}>
                <SafetyDividerOutlinedIcon color="success" />
              </IconButton>
            )}
          </Box>
        ) : (
          <Box>
            <Typography>No action to this building</Typography>
          </Box>
        );
      },
    },
  ];
  const [isCollapsed, setIsCollapsed] = useState(false);
  //delete building
  const [deleteBuildingIDs, setDeleteBuildingIDs] = useState([]);
  const handleDeleteSingleBuilding = (id) => {
    const updatedRows = buildingData.filter((row) => row.id !== id);
    setBuildingData(updatedRows);
    if (id != null) {
      let deleleData = {
        listID: [id],
      };
      fetch("http://localhost:8080/api/buildings/trash", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleleData),
      }).then((response) => {
        if (response.null) {
          console.log(response);
        }
      });
      setDeleteAlert(true);
    }
  };
  const handleDeleteMultipleBuilding = () => {
    const updateRows = buildingData.filter((row) => {
      if (!deleteBuildingIDs.includes(row.id)) {
        return row;
      }
    });

    setBuildingData([]);
    setBuildingData(updateRows);
    let formData = {
      listID: deleteBuildingIDs,
    };
    fetch("http://localhost:8080/api/buildings/trash", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch((error) => {
      console.log(error);
    });
    setDeleteBuildingIDs([]);
    setSelectedIds([]);
    if (formData.listID.length > 0) {
      setDeleteAlert(true);
    }
  };

  const handleSelectionChange = (selection) => {
    const selectedRows = buildingData.filter((item) => {
      if (selection.includes(item.id)) {
        return item;
      }
    });
    const selectIds = selectedRows.map((row) => row.id);
    setDeleteBuildingIDs(selectIds);
  };
 
  //end delete building

  return (
    <Box m="5px 20px">
      <Box display="flex">
        <Header
          title="Buildings"
          subtitle="View all the buildings by conditions below"
        />
        <Box
          p="5px"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flex="1"
        >
          {!isCollapsed && (
            <Box display="flex">
              <Link to="/admin/buildings/building-edit">
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
              <Link to="/admin/buildings/trash">
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
            </Box>
          )}{" "}
          <IconButton
            variant="contained"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {!isCollapsed === true && <KeyboardDoubleArrowDownOutlinedIcon />}
          </IconButton>
        </Box>
      </Box>
      <Collapse in={isCollapsed}>
        <form onSubmit={handleSubmit}>
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
                 
              <Box display="flex"> 
              <TextField
                label="Name"
                name="name"
                value={buildingInfo ? buildingInfo.name : ""}
                onChange={handleInputChange}
                variant="filled"
                type="text"
                
                sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
              />
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
              <FormControl fullWidth required >
                <select
                  id="demo-simple-select"
                  value={buildingInfo ? buildingInfo.districtCode: ""}
                  onChange={handleInputChange}
                  name="districtCode"
                  style={{
                    backgroundColor: "#333D51",
                    flex:"1",
                    width: "100%",
                    paddingTop: "",
                    border: "none",
                    color: "#C2C5CB",
                    heigh: "100%",
                  }}
                >
                  <option aria-label="None" value="">
                    Select District
                  </option>
                  {districts.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </FormControl>
            </Box>
            <TextField
              label="Street"
              name="street"
              value={buildingInfo ?buildingInfo.street :""}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              
              sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
            />
          
            
            </Box>
            <Box display="flex">  <TextField
              label="Ward"
              name="ward"
              value={buildingInfo ?buildingInfo.ward:""}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              
              sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
            />
             <TextField
              label="Number of Basement"
              name="numberOfBasement"
              value={buildingInfo ? buildingInfo.numberOfBasement:""}
              onChange={handleInputChange}
              variant="filled"
              type="number"
            
              sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
            />
            <TextField
              label="Floor Area"
              name="floorArea"
              value={buildingInfo ? buildingInfo.floorArea:""}
              onChange={handleInputChange}
              variant="filled"
              type="number"
              
              sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
            /></Box>
             <Box display="flex">
             <TextField
              label="Level"
              name="level"
              value={ buildingInfo ? buildingInfo.level:""}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
            />
            <TextField
              label="Rent Area From"
              name="rentAreaFrom"
              value={buildingInfo ? buildingInfo.rentAreaFrom :""}
              onChange={handleInputChange}
              variant="filled"
              type="number"
              sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
            />
 <TextField
              label="Rent Area To"
              name="rentAreaTo"
              value={buildingInfo ? buildingInfo.rentAreaTo:""}
              onChange={handleInputChange}
              variant="filled"
              type="number"
              sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
            />
             </Box>
             <Box display="flex">
            
            <TextField
              label="Rent Price From"
              name="rentPriceFrom"
              value={buildingInfo ?buildingInfo.rentPriceFrom:""}
              onChange={handleInputChange}
              variant="filled"
              type="number"
              sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
            />
            <TextField
              label="Rent Price To"
              name="rentPriceTo"
              value={buildingInfo ?buildingInfo.rentPriceTo:""}
              onChange={handleInputChange}
              variant="filled"
              type="number"
              sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
            />  <TextField
              label="Manager Name"
              name="managerName"
              value={buildingInfo ?buildingInfo.managerName:""}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
            />
           
             </Box>
             <Box display="flex">
          
          <TextField
            label="Manager Phone Number"
            name="managerPhoneNumber"
            value={buildingInfo ?buildingInfo.managerPhoneNumber:""}
            onChange={handleInputChange}
            variant="filled"
            type="text"
            sx={{ flex: 1, flexGrow: 1, marginLeft: "2px" }}
          />
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
              <FormControl fullWidth required >
                <select
                  id="demo-simple-select"
                  value={buildingInfo ? buildingInfo.staffId:""}
                  onChange={handleInputChange}
                  name="staffId"
                  style={{
                    backgroundColor: "#333D51",
                    flex:"1",
                    width: "100%",
                    paddingTop: "",
                    border: "none",
                    color: "#C2C5CB",
                    heigh: "100%",
                  }}
                >
                  <option aria-label="None" value="">
                    Select Staff
                  </option>
                  {staffList.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.fullname}
                    </option>
                  ))}
                </select>
              </FormControl>
            </Box>
          <Box
            sx={{
              flex: 1,
              flexGrow: 1,
              marginLeft: "2px",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
            }}
            backgroundColor="#333D51"
            p="16px 0 16px 0"
            borderBottom="0.1px solid #fff"
            alignItems="center"
          >
            <Box display="flex">
              {typeCodes.map((type, index) => (
                <Box mr="10px" key={index}>
                  <input
                    type="checkbox"
                    id={index}
                    value={type.code}
                    
                    checked={typeCodeCheck.includes(type.code)}
                    onChange={(e) => {
                      let updatedTypes = [...typeCodeCheck];

                      if (updatedTypes.includes(type.code)) {
                        updatedTypes.splice(
                          updatedTypes.indexOf(type.code),
                          1
                        );
                      } else {
                        updatedTypes.push(type.code);
                      }

                      setTypeCodeCheck(updatedTypes);
                      setBuildingInfo({
                        ...buildingInfo,
                        typeCode: updatedTypes.join(","),
                      });
                    }}
                  />
                  <label htmlFor={index}>{type.name}</label>
                </Box>
              ))}
            </Box>
          </Box>
          </Box>
            </Box>
          
       

        <Box display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            endIcon={<SearchOutlinedIcon />}
            sx={{ marginRight: "10px", border: "1px solid #255" }}
          >
            Search
          </Button>

          <Link to="/admin/buildings/building-edit">
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
          >
            Delete
          </Button>
          <Link to="/admin/buildings/trash">
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
            <KeyboardDoubleArrowUpOutlinedIcon />
          </IconButton>
        </Box> </form>
      </Collapse>
      {buildingData.length > 0 && (
        <Box
          m="10px 0 0 0"
          
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
            rows={buildingData}
            columns={columns}
            scrollbarSize={20}
            autoHeight={buildingData.length<10}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[2,5,10]}
            onRowSelectionModelChange={handleSelectionChange}
            initialState={{
              pagination:{
                paginationModel:{
                  pageSize:2,
                  page:0
                }
              }
            }}
         
            
          />
        </Box>
      )}
    {totalPages!==1&&<Box display="flex" justifyContent="center"  alignItems="center" >

      <Pagination  page = {currentPage}  count={totalPages} color="info"  siblingCount={0} boundaryCount={2} 
        renderItem={(item) => (
          <PaginationItem
          component={Link}
           to={buildUrl(item.page)}
          {...item}
          onClick={()=>handleVarChange(item.page)}
          />
        )}
        />
      </Box> } 
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-descriptin"
        >
          <DialogTitle>Building Assignment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To assign building to staffs, check the checkbox below
            </DialogContentText>
            <DataGrid rows={staffAssign} columns={staffColumns} pageSize={5} />
          </DialogContent>
          <Box marginLeft="25px">
            {" "}
            <p>Selected staffids: {selectedIds.join(", ")}</p>
            <p>Selected buildingid: {selectedAssignBuilding}</p>{" "}
          </Box>

          <DialogActions>
            <Button
              variant="contained"
              color="success"
              onClick={handleAssignClick}
            >
              Assign
            </Button>
            <Button variant="contained" color="error" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          message="Success Assigment"
          action={SnackAction}
        >
          <Alert
            onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Success Assignment!
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
  );
};

export default Buildings;
