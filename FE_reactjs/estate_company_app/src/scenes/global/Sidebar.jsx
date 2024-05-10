import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import ContactsIcon from "@mui/icons-material/ContactsOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarTodayOutlined";
import InvoicesIcon from '@mui/icons-material/ReceiptOutlined';
import HelpIcon from "@mui/icons-material/HelpOutlined";
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import BarChartIcon from "@mui/icons-material/BarChartOutlined";
import PieChartIcon from "@mui/icons-material/PieChartOutlined";
import TimelineIcon from "@mui/icons-material/TimelineOutlined";
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import MenuIcon from "@mui/icons-material/MenuOutlined";
import MapIcon from "@mui/icons-material/MapOutlined";
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import avatar from "../../assets/image/avatar1.png";
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import HomeWorkOutlined from "@mui/icons-material/HomeWorkOutlined";


const Item = ({title, to , icon, selected, setSelected})=>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.gray[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>
                {title}
            </Typography>
            <Link to={to}/> {/* Wrap the MenuItem with Link */}
        </MenuItem>
    );
};

const Sidebar = (object) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const account = object.account;
    
    return (
        <>
            <Box 
                sx={{
                    "& .pro-sidebar-inner": {
                        background: `${colors.primary[700]} !important`,
                    },
                    "& .pro-icon-wrapper": {
                        backgroundColor: "transparent !important",
                    },
                    "& .pro-inner-item": {
                        padding: "5px 35px 5px 15px !important",
                    },
                    "& .pro-inner-item:hover": {
                        color: "#868dfb !important",
                    },
                    "& .pro-menu-item.active": {
                        color: "#6870fa !important",
                    },
                }}
            >
                <ProSidebar collapsed= {isCollapsed} >
                    <Menu 
                        iconShape ="square"
                    >
                        <MenuItem 
                            onClick ={()=> setIsCollapsed(!isCollapsed)}
                            icon={isCollapsed? <MenuIcon/> : undefined}
                            style ={{
                                margin: "10px 0 0 0",
                                color: colors.gray[100]
                            }}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                {!isCollapsed &&(<Typography variant="h3" color={colors.gray[100]}>
                                    ADMIN
                                </Typography>)}
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        </MenuItem>

                        {!isCollapsed && (
                            <Box mb="25px">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <img
                                        alt="profile-user"
                                        width="100px"
                                        height="100px"
                                        src={avatar}
                                        style={{ cursor: "pointer", borderRadius: "50%" }}
                                    />
                                </Box>
                                <Box textAlign="center">
                                    <Typography
                                        variant="h2"
                                        color={colors.gray[100]}
                                        fontWeight="bold"
                                        sx={{ m: "10px 0 0 0" }}
                                    >
                                        {account.fullname}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        <Box paddingLeft={isCollapsed ?undefined : "10%"}>
                            <Item 
                                title = "Dashboard"
                                to="/admin/dashboard"
                                icon={<HomeOutlinedIcon/>} 
                                selected={selected} 
                                setSelected={setSelected}
                            />
                            <Typography variant="h6" color={colors.gray[300]} 
                                sx={{m: "15px 0 5px 20px"}}
                            >
                                Data
                            </Typography>
                            <Item 
                                title = "Manage Team"
                                to="/admin/team"
                                icon={<PeopleIcon/>} 
                                selected={selected} 
                                setSelected={setSelected}
                            />
                            <Item 
                                title = "Manage Buildings"
                                to="/admin/buildings?page=1&limit=100"
                                icon={<HomeWorkOutlined/>} 
                                selected={selected} 
                                setSelected={setSelected}
                            />
                            <Item 
                                title = "Manage Customers"
                                to="/admin/customers"
                                icon={<ContactsIcon/>} 
                                selected={selected} 
                                setSelected={setSelected}
                            />
                            <Item 
                                title = "Invoices Balances"
                                to="/admin/invoices"
                                icon={<InvoicesIcon/>} 
                                selected={selected} 
                                setSelected={setSelected}
                            />
                            <Typography variant="h6" color={colors.gray[300]} 
                                sx={{m: "15px 0 5px 20px"}}
                            >
                                Pages
                            </Typography>
                            <Item 
                                title = "Profile Form"
                                to="/form"
                                icon={<PersonIcon/>} 
                                selected={selected} 
                                setSelected={setSelected}
                            />
                            <Item 
                                title = "Calendar"
                                to="/calendar"
                                icon={<CalendarTodayIcon/>} 
                                selected={selected} 
                                setSelected={setSelected}
                            />
                            <Item 
                                title = "FAQ Page"
                                to="/faq"
                                icon={<QuestionAnswerOutlinedIcon/>} 
                                selected={selected} 
                                setSelected={setSelected}
                            />
                            <Typography variant="h6" color={colors.gray[300]} 
                                sx={{m: "15px 0 5px 20px"}}
                            >
                                Data
                            </Typography>
                            <Item 
                                title = "Bar Chart"
                                to="/bar"
                                icon={<BarChartIcon/>} 
                                selected={selected} 
                                setSelected={setSelected}
                            />
                            <Item 
                                title = "Pie Chart"
                                to="/pie"
                                icon={<PieChartIcon/>} 
                                selected={selected} 
                                setSelected={setSelected}
                            />
                            <Item 
                                title = "Line Chart"
                                to="/line"
                                icon={<StackedLineChartOutlinedIcon/>} 
                                selected={selected} 
                                setSelected={setSelected}
                            />
                            <Item 
                                title = "Geography Chart"
                                to="/geography"
                                icon={<MapOutlinedIcon/>} 
                                selected={selected} 
                                setSelected={setSelected}
                            />
                        </Box>
                    </Menu>
                </ProSidebar>
            </Box>
        </>
    );
};

export default Sidebar;
