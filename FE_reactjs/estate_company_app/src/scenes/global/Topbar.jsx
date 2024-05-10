import {Box, IconButton, useTheme,ListItem, ListItemIcon, ListItemText, Collapse,List, ListItemButton}  from "@mui/material";
import {useContext,useState} from "react";
import {ColorModeContext, tokens} from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import { AccountContext } from '../../contexts/AccountContext';

const isLoggedInn = localStorage.getItem('isLoggedIn') === 'true';
const Topbar = ({onLogout})=>{
    const theme =  useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [open, setOpen] = useState(false);
    const { setIsLoggedIn } = useContext(AccountContext);
    const handleClick = ()=>{
        setOpen(!open);
    }
    const handleLogout= ()=>{
       onLogout();
       setIsLoggedIn(false);
       localStorage.removeItem('isLoggedIn');
    }

    return(
        <Box display="flex" justifyContent="space-between" p={2}>
        {/* Search bar */}
        <Box
          display="flex"
          backgroundColor={colors.primary[700]}
          borderRadius="3px"
          position="relative"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchOutlinedIcon />
          </IconButton>
        </Box>
        {/* Icons */}
        <Box display="flex">
          <Box>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === 'dark' ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <IconButton>
              <NotificationsActiveOutlinedIcon />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
          </Box>
          <Box position="relative">
            <IconButton onClick={handleClick}>
              <PersonOutlineOutlinedIcon />
            </IconButton>
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              sx={{
                width: 'auto',
                position: 'absolute',
                backgroundColor: colors.primary[700],
                top: '40px', 
                right: 0, 
                zIndex: 999,
                borderRadius: '3px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              <List component="div" disablePadding>
              <ListItemButton>
                  <ListItemIcon>
                    <BadgeOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Personal Info" primaryTypographyProps={{ noWrap: true }}/>
                </ListItemButton> 
                <hr width="90%" style={{borderColor:"#858585"}}></hr>
                <ListItemButton>
                  <ListItemIcon>
                    <PostAddOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Contribute opinions" primaryTypographyProps={{ noWrap: true }} />
                </ListItemButton>
                <hr width="90%" style={{borderColor:"#858585"}}></hr>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log out" />
                </ListItemButton>
              </List>
            </Collapse>
          </Box>
        </Box>
      </Box>
  
    )
    
}

export default Topbar;