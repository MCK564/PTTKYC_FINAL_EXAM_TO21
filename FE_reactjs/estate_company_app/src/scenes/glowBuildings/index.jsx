import { Typography,Button, Box, useTheme,IconButton ,Menu,MenuItem} from "@mui/material";
import { tokens } from "../../theme";
import { Link,useNavigate } from "react-router-dom";

const UserBuildings = ()=>{
    return (
        <Box p="20px" >
            <Box display="flex" justifyContent="center">
                <Typography variant="h1">
                THIS IS BUILDINGS PAGE
            </Typography>
            </Box>
          
        </Box>
    )
}

export default UserBuildings;
