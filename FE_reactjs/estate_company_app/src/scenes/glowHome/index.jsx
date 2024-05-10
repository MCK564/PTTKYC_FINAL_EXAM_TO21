import {
  Typography,
  Button,
  Box,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Stack,
  Autocomplete,
  Card,
  Grid,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { tokens } from "../../theme";
import { Link, useNavigate } from "react-router-dom";
import HomePage from "../../assets/image/home_page.jpg";
import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotFound2 from "../../assets/image/not_found2.jpg";
import Heart from "@mui/icons-material/FavoriteBorderOutlined";

const GlowHome = () => {
  const [recentSearch, setRecentSearch] = useState([]);
  const firstSearch = ["Quan 7", "Quan 2", "Cao Oc Yang Era", "Thu Duc"];
  const [heartColor, setHeartColor] = useState(false);
  const demoBuildings = [
    {
      name: "Building 1",
      priceFrom: 100,
      priceTo: 500,
      district: "Quan 1, TPHCM",
    },
    {
      name: "Building 2",
      priceFrom: 200,
      priceTo: 700,
      district: "Quan 2, TPHCM",
    },
    {
      name: "Building 3",
      priceFrom: 300,
      priceTo: 1500,
      district: "Quan 3, TPHCM",
    },
    {
      name: "Building 4",
      priceFrom: 1100,
      priceTo: 3500,
      district: "Quan 4, TPHCM",
    },
    {
      name: "Building 5",
      priceFrom: 1100,
      priceTo: 3700,
      district: "Quan 7, TPHCM",
    },
  ];

  const sectionOneButton = [
    "Buy",
    "Rent",
    "Sell",
    "Pre-approval",
    "Contact",
    "Home value",
  ];

  const sectionOneLink = [
    "/buildings?buy=true",
    "/buildings?rent=true",
    "/buildings?sell=true",
    "/pre-approval",
    "/contact",
    "/home-value",
  ];

  return (
    <Box position="relative">
      {/* section 1 */}
      <Box
        width="100%"
        sx={{
          backgroundImage: `url(${HomePage})`,
          height: "70vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
        boxShadow="0px 0px 15px rgba(173, 216, 230, 0.2)"
      >
        <Box
          zIndex="1"
          sx={{
            content: '""',
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(19, 18, 18,0.6)", // Adjust the overlay color and alpha as needed
          }}
        />
        <Box
          position="absolute"
          display="flex"
          textAlign="center"
          zIndex="2"
          color="rgb(255,255,255)"
          padding="50px 300px"
          justifyContent="center"
          alignItems="center"
          top="0"
          bottom="0"
          left="0"
          right="0"
        >
          <Box>
            <Typography variant="h1" fontWeight="600" mb="20px">
              The best real estate professional trust
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              padding="0 30px"
              fontSize
            >
              {sectionOneButton.map((button, index) => {
                return (
                  <Link
                    to={`${sectionOneLink[index]}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      fontSize="1.2em"
                      variant="h7"
                      color="#fff"
                      onMouseEnter={(e) => (e.target.style.color = "#ffcc00")} // Change color on hover
                      onMouseLeave={(e) => (e.target.style.color = "#fff")} // Reset color on hover out
                    >
                      {button}
                    </Typography>
                  </Link>
                );
              })}
            </Box>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={
                recentSearch
                  ? recentSearch.map((option) => option.title)
                  : firstSearch.map((item) => item)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    endAdornment: (
                      <IconButton color="warning" size="large">
                        <SearchOutlinedIcon />
                      </IconButton>
                    ),
                  }}
                  variant="outlined"
                />
              )}
              sx={{ marginTop: "10px" }}
            />
          </Box>
        </Box>
      </Box>{" "}
      {/* end section 1 */}
      {/* section 2 */}
      <Box
        width="100%"
        padding="0 30px"
        margin="20px 0"
        position="absolute"
        zIndex="3"
      >
        <Box
          width="100%"
          backgroundColor="#fff"
          boxShadow="0px 0px 15px rgba(173, 216, 230, 0.2)"
          borderRadius="10px"
          padding="20px 40px"
        >
          <Link to="buildings" style={{ textDecoration: "none" }}>
            <Typography
              variant="h3"
              color="ThreeDDarkShadow"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: "#26437E",
                  textDecoration: "underline",
                },
              }}
            >
              Common Buildings
            </Typography>
          </Link>
          <Box marginTop="15px"></Box>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {demoBuildings.map((building, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={building.id}>
                  <Card
                    sx={{
                      maxWidth: "300",
                      borderRadius: "10px",
                      transition: "all 0.2s ease 0s",
                      border: "1px solid #26437E",
                      "&:hover": {
                        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                        cursor: "pointer",
                        marginTop: { xs: "0", md: "-5px" },
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="building"
                      height="140"
                      src={NotFound2}
                    />
                    <CardContent
                      sx={{
                        backgroundColor: "#fff",
                        color: "ThreeDDarkShadow",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {building.name}{" "}
                        <Typography variant="body2" color="GrayText">
                          {building.district}
                        </Typography>
                      </Typography>
                      <Box display="flex" justifyContent="space-between">
                        <Typography
                          variant="h5"
                          color="#2D99C8"
                          fontWeight="600"
                        >
                          {building.priceFrom} - {building.priceTo}
                        </Typography>

                        <IconButton color="secondary">
                          <Heart />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Link to="buildings" style={{ textDecoration: "none" }}>
            <Typography
              variant="h3"
              color="ThreeDDarkShadow"
              fontWeight="500"
              marginTop="10px"
              sx={{
                "&:hover": {
                  color: "#26437E",
                  textDecoration: "underline",
                },
              }}
            >
              Selling Buildings
            </Typography>{" "}
          </Link>
          <Box marginTop="15px"></Box>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {demoBuildings.map((building, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={building.id}>
                  <Card
                    sx={{
                      maxWidth: "300",
                      borderRadius: "10px",
                      transition: "all 0.2s ease 0s",
                      border: "1px solid #26437E",
                      "&:hover": {
                        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                        cursor: "pointer",
                        marginTop: { xs: "0", md: "-5px" },
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="building"
                      height="140"
                      src={NotFound2}
                    />
                    <CardContent
                      sx={{
                        backgroundColor: "#fff",
                        color: "ThreeDDarkShadow",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {building.name}{" "}
                        <Typography variant="body2" color="GrayText">
                          {building.district}
                        </Typography>
                      </Typography>
                      <Box display="flex" justifyContent="space-between">
                        <Typography
                          variant="h5"
                          color="#2D99C8"
                          fontWeight="600"
                        >
                          {building.priceFrom} - {building.priceTo}
                        </Typography>

                        <IconButton color="secondary">
                          <Heart />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
            
          </Grid>
          <Link to="buildings?rent=true" style={{ textDecoration: "none" }}>
            <Typography
              variant="h3"
              color="ThreeDDarkShadow"
              fontWeight="500"
              marginTop="10px"
              sx={{
                "&:hover": {
                  color: "#26437E",
                  textDecoration: "underline",
                },
              }}
            >
             Renting Buildings
            </Typography>{" "}
          </Link>
          <Box marginTop="15px"></Box>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {demoBuildings.map((building, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={building.id}>
                  <Card
                    sx={{
                      maxWidth: "300",
                      borderRadius: "10px",
                      transition: "all 0.2s ease 0s",
                      border: "1px solid #26437E",
                      "&:hover": {
                        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                        cursor: "pointer",
                        marginTop: { xs: "0", md: "-5px" },
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="building"
                      height="140"
                      src={NotFound2}
                    />
                    <CardContent
                      sx={{
                        backgroundColor: "#fff",
                        color: "ThreeDDarkShadow",
                      }}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {building.name}{" "}
                        <Typography variant="body2" color="GrayText">
                          {building.district}
                        </Typography>
                      </Typography>
                      <Box display="flex" justifyContent="space-between">
                        <Typography
                          variant="h5"
                          color="#2D99C8"
                          fontWeight="600"
                        >
                          {building.priceFrom} - {building.priceTo}
                        </Typography>

                        <IconButton color="secondary">
                          <Heart />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
            
          </Grid>
        </Box>
      </Box>
      {/* end section 2 */}
      {/* section 3 */}
      {/* end section 3 */}
    </Box>
    // https://www.realtor.com/
  );
};

export default GlowHome;
