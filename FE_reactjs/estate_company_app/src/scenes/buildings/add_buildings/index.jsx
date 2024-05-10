import {
  Box,
  Button,
  TextField,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  Typography,
  styled,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useMediaQuery } from "@mui/material";
import Header from "../../../Components/Header";
import * as yup from "yup";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { tokens } from "../../../theme";
import { useParams,useNavigate } from "react-router-dom";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import SystemUpdateAltOutlinedIcon from "@mui/icons-material/SystemUpdateAltOutlined";
import PermMediaIcon from "@mui/icons-material/PermMedia";

const Buildingedit = () => {
  const [thisBuildingID, setThisBuildingID] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedTypes, SetSelectedTypes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const thisURL = window.location.href;
    if (thisURL.includes("?")) {
      let url_split = thisURL.split("=");
      setThisBuildingID(url_split[1]);
    }
  }, [thisBuildingID]);
  //Building information
  const [buildingInfo, setBuildingInfo] = useState({
    id: "",
    name: "",
    street: "",
    ward: "",
    district: "",
    structure: "",
    numberOfBasement: 0,
    floorArea: 0,
    direction: "",
    level: "",
    rentPrice: 0,
    rentPriceDescription: "",
    serviceFee: "",
    carFee: "",
    motorbikeFee: "",
    overtimeFee: "",
    waterFee: "",
    electricityFee: "",
    deposit: "",
    payment: "",
    rentTime: "",
    decorationTime: "",
    brokerageFee: "",
    note: "",
    linkOfBuilding: "",
    map: "",
    avatar: "",
    managerName: "",
    managerPhoneNumber: "",
    status: 1,
    image: "",
    types: "",
    rentAreas: [],
  });

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
    if (thisBuildingID != null) {
      fetch(newURL())
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Failed to fetch");
        })
        .then((data) => {
          setBuildingInfo(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [thisBuildingID]);

  useEffect(() => {
    if (buildingInfo && buildingInfo.types && buildingInfo.types !== "") {
      const typesArray = buildingInfo.types.split(",");
      SetSelectedTypes(typesArray);
    }
  }, [buildingInfo.types]);

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
  //End building information

  //handleForm
  //tạo thêm một cái dầy nè
  // .className::placeholder{

  // }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuildingInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    let jsondata = JSON.stringify(buildingInfo);
    let modifileJsonData = jsondata.replace(/null/g, '""');
    fetch("http://localhost:8080/api/buildings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: modifileJsonData,
    }).then((response) => {
      if(response!=null){
        return response.json();
      }
    }).then((data)=>{
      if(parseInt(data,10)!=null){
        navigate("?id="+parseInt(data,10));
        window.location.reload();
      }
    })
    ;
  };
  //endhandleForm
  return (
    <Box m="5px 20px">
      <Header
        title={thisBuildingID != null ? "Building Edit" : "Building Create"}
        subtitle={
          thisBuildingID != null
            ? "Edit the building information below"
            : "Create a new building by filling the form below"
        }
      />
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: "20px", border: "1px solid #131926" }}>
          <Box
            display="flex"
            flexDirection="Column"
            gap="20px"
            maxWidth="400px"
            flex="1"
          >
            <TextField
              label="Name"
              name="name"
              value={buildingInfo.name}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              required
            />
            <TextField
              label="Street"
              name="street"
              value={buildingInfo.street}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              required
            />
            <TextField
              label="Ward"
              name="ward"
              value={buildingInfo.ward}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              required
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
              <FormControl fullWidth required>
                <select
                  id="demo-simple-select"
                  value={buildingInfo.district}
                  onChange={handleInputChange}
                  name="district"
                  style={{
                    backgroundColor: "#333D51",
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
              label="Structure"
              name="structure"
              value={buildingInfo.structure}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Note"
              name="note"
              value={buildingInfo.note}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="Column"
            gap="20px"
            maxWidth="400px"
          >
            <TextField
              label="Number of Basement"
              name="numberOfBasement"
              value={buildingInfo.numberOfBasement}
              onChange={handleInputChange}
              variant="filled"
              type="number"
              required
            />
            <TextField
              label="Floor Area"
              name="floorArea"
              value={buildingInfo.floorArea}
              onChange={handleInputChange}
              variant="filled"
              type="number"
              required
            />
            <TextField
              label="Direction"
              name="direction"
              value={buildingInfo.direction}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Level"
              name="level"
              value={buildingInfo.level}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Rent Price"
              name="rentPrice"
              value={buildingInfo.rentPrice}
              onChange={handleInputChange}
              variant="filled"
              type="number"
              required
            />
            <TextField
              label="Rent Price Description"
              name="rentPriceDescription"
              value={buildingInfo.rentPriceDescription}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              required
            />
          </Box>

          <Box
            display="flex"
            flexDirection="Column"
            gap="20px"
            maxWidth="400px"
          >
            <TextField
              label="Service Fee"
              name="serviceFee"
              value={buildingInfo.serviceFee}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Car Fee"
              name="carFee"
              value={buildingInfo.carFee}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Motorbike Fee"
              name="motorbikeFee"
              value={buildingInfo.motorbikeFee}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Overtime Fee"
              name="overtimeFee"
              value={buildingInfo.overtimeFee}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />{" "}
            <TextField
              label="Water Fee"
              name="waterFee"
              value={buildingInfo.waterFee}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Electricity Fee"
              name="electricityFee"
              value={buildingInfo.electricityFee}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="Column"
            gap="20px"
            maxWidth="400px"
          >
            <TextField
              label="Deposit"
              name="deposit"
              value={buildingInfo.deposit}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Payment"
              name="payment"
              value={buildingInfo.payment}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Rent Time"
              name="rentTime"
              value={buildingInfo.rentTime}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Decoration Time"
              name="decorationTime"
              value={buildingInfo.decorationTime}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Brokerage Fee"
              name="brokerageFee"
              value={buildingInfo.brokerageFee}
              onChange={handleInputChange}
              variant="filled"
              type="number"
            />
            <TextField
              label="Rent Areas"
              name="rentAreas"
              value={buildingInfo.rentAreas}
              onChange={(e) => {
                setBuildingInfo({
                  ...buildingInfo,
                  rentAreas: e.target.value.split(","),
                });
              }}
              variant="filled"
              type="text"
              placeholder="100,200,300"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="Column"
            gap="20px"
            maxWidth="400px"
            flex="1"
          >
            <TextField
              label="Link of Building"
              name="linkOfBuilding"
              value={buildingInfo.linkOfBuilding}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Map"
              name="map"
              value={buildingInfo.map}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Avatar"
              name="avatar"
              value={buildingInfo.avatar}
              onChange={handleInputChange}
              variant="filled"
              type="text"
            />
            <TextField
              label="Manager Name"
              name="managerName"
              value={buildingInfo.managerName}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              required
            />
            <TextField
              label="Manager Phone Number"
              name="managerPhoneNumber"
              value={buildingInfo.managerPhoneNumber}
              onChange={handleInputChange}
              variant="filled"
              type="text"
              required
            />

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
                      checked={selectedTypes.includes(type.code)}
                      onChange={(e) => {
                        let updatedTypes = [...selectedTypes];

                        if (updatedTypes.includes(type.code)) {
                          updatedTypes.splice(
                            updatedTypes.indexOf(type.code),
                            1
                          );
                        } else {
                          updatedTypes.push(type.code);
                        }

                        SetSelectedTypes(updatedTypes);
                        setBuildingInfo({
                          ...buildingInfo,
                          types: updatedTypes.join(","),
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
       
        <Box display="flex" justifyContent="flex-end" mt="10px">
          <Button
            variant="contained"
            color="success"
            endIcon={<SystemUpdateAltOutlinedIcon />}
            sx={{ marginRight: "10px", border: "1px solid #255" }}
            onClick={handleSubmit}
          >
            {thisBuildingID != null ? "Update" : "Create"}
          </Button>
         {thisBuildingID!=null && <Link to={{
              pathname:`/admin/buildings/building-edit/image`,
              search: `?id=${encodeURIComponent(buildingInfo.id)}`,
              state:{building:buildingInfo}
           } }>
            
              <Button
            component="label"
            variant="contained"
            startIcon={<PermMediaIcon />}
            color="info"
            sx={{ marginRight: "10px", border: "1px solid #255" }}
          >
            Images
          </Button>
          </Link>}
          <Link to="/admin/buildings?page=1&limit=100">
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
      </form>
    </Box>
  );
};
export default Buildingedit;
