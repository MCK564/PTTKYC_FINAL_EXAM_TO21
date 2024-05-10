import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  styled,
  Image,
} from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../Components/Header";
import { useState, useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import emptyImage from "../../../assets/image/notfound.jpg";
import { updateCacheWithNewRows } from "@mui/x-data-grid/hooks/features/rows/gridRowsUtils";
import LinearProgress from '@mui/material/LinearProgress';

const Building_Image = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [progress, setProgress] = useState(0);
  const [progressDisplay, setProgressDisplay]  = useState(true);
  useEffect(() => {
    let countdown = 3; // Đếm ngược 5 giây
    let i=0;
    const countdownTimer = setInterval(() => {
      setProgress((oldProgress) => {
        if (countdown === 0) {

          setProgressDisplay(false);
          clearInterval(countdownTimer);
          return oldProgress;
        }
        i+=1
        countdown -= 1;
        if(i===3)return oldProgress+(95-oldProgress)
        return oldProgress+5;
      });
    }, 1000); // Hãy thực hiện mỗi giây (1000 miligiây)
  
  }, []);

  const [progress2, setProgress2] = useState(0);
  const [progressDisplay2, setProgressDisplay2]  = useState(true);
  useEffect(() => {
    let countdown = 2; // Đếm ngược 5 giây
    let i=0;
    const countdownTimer = setInterval(() => {
      setProgress2((oldProgress) => {
        if (countdown === 0) {

          setProgressDisplay2(false);
          clearInterval(countdownTimer);
          return oldProgress;
        }
        i+=1
        countdown -= 1;
        if(i===3)return oldProgress+(95-oldProgress)
        return oldProgress+5;
      });
    }, 500); // Hãy thực hiện mỗi giây (1000 miligiây)
  
  }, []);
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
  const VisuallyHiddenInput2 = styled("input")({
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
  const thisURL = window.location.href.split("=");
  const buildingID = thisURL[1];
  const [avatar, setAvatar] = useState("");
  const [images, setImages] = useState(["", "", "", "", ""]);
  const handleAvatarUpdate = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file',file);
    console.log(formData);
    if (file.type.startsWith("image/")) {
      setAvatar(URL.createObjectURL(file));
    } else {
      alert(`File ${file.name} is not an image`);
    }
    fetch(`http://localhost:8080/api/buildings/avatar/${buildingID}`,{
      method:"POST",
      body:formData
    }).then((response)=>{
      alert("update avatar success");
    }).catch((error)=>{
      console.log(error);
    })

  };
  useEffect(() => {
    const getImage = () => {
      fetch("http://localhost:8080/api/buildings/images?id=" + buildingID, {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) return response.json();
        })
        .then((data) => {
          if(data!=null){const listbase64List = data.imageBase64List;
          const updatedImages = [...images];
          for (let i = 0; i < Math.min(listbase64List.length, 5); i++) {
              const base64String = listbase64List[i];
              const src = "data:image/jpeg;base64," + base64String;
              updatedImages[i]=src;
          }
          setImages(updatedImages);}
          
         
        });
    };
    const getAvatar = () =>{
      fetch("http://localhost:8080/api/buildings/avatar?id="+buildingID,{
        method:"GET"
      })
        .then((response)=>{
          if(response.ok) return response.json();
        })
        .then((data)=>{
          const base64String =data.base64String;
          const src = "data:image/jpeg;base64," + base64String;
          setAvatar(src);
        })
        .catch((error)=>{
          console.log(error);
        })
    }
    getImage();
    getAvatar();
  }, []);
  
  const handleMultipleImagesUpdate = (e) => {
    const files = e.target.files;
    const updatedImages = [...images];
    for (let i = 0; i < 5; i++) {
      if(files[i]!=null){ 
        const file = files[i];

      // Check if the file is an image
      if (file.type.startsWith("image/")) {
        updatedImages[i] = URL.createObjectURL(file);
      } else {
        alert(`File ${file.name} is not an image.`);
      }}
      else{
        updatedImages[i]="";
      }
     
    }
    
    setImages(updatedImages);
    const formData = new FormData();
      for (const file of files) {
        formData.append('files', file);
      }
    fetch("http://localhost:8080/api/buildings/upload/"+buildingID,{
      method:"POST",
      body:formData
    }).then((response)=>{
     alert("Update success")
    }).catch((error)=>{
      console.log(error);
    })

  };

  return (
    <Box m="5px 20px">
      <Header title="IMAGE" subtitle="Custom this building's images" />
      <Box>
        <Box style={{ display: "flex", width: "100%" }}>
          <Box
            mt="2px"
            style={{
              display: "flex",
              padding: "10px",
              border: `1px solid ${colors.blackCustom[100]}`,
              borderRadius: "10px",
            }}
            alignItems="center"
            width="100%"
          >
            <Box>
              {" "}
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                color="warning"
                sx={{ height: "auto" }}
              >
                upload Avatar
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleAvatarUpdate}
                />
              </Button>
            </Box>
             {progressDisplay2 ? <Box width="100%" margin="0 20px"><LinearProgress variant="determinate" value={progress2} color="success"/></Box>: <Box flex="1" display="flex" justifyContent="center">
              {avatar ? (
                <img
                  src={avatar}
                  style={{ height: "180px", width: "180px" }}
                />
              ) : (
                <img
                  src={emptyImage}
                  alt="building_avatar"
                  title="building avatar"
                />
              )}
            </Box>}
           
          </Box>
        </Box>
        <Box style={{ display: "flex", width: "100%" }}>
          <Box
            mt="2px"
            style={{
              display: "flex",
              padding: "10px",
              border: `1px solid ${colors.blackCustom[100]}`,
              borderRadius: "10px",
            }}
            alignItems="center"
            width="100%"
          >
            <Box>
              {" "}
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                color="warning"
                sx={{ height: "auto" }}
                
              >
                upload description images
                <VisuallyHiddenInput2
                  type="file"
                  onChange={handleMultipleImagesUpdate}
                  multiple
                />
              </Button>
              <Typography></Typography>
            </Box>
            {progressDisplay ? <Box width="100%" margin="0 20px"><LinearProgress variant="determinate" value={progress} color="success"/></Box>:  <Box flex="1" display="flex" justifyContent="center">
              {images.map((image, index) => {
                return (
                  <Box key={index}id="imageContainer" >
                    {image ? (
                      
                      <img
                        src={image}
                        alt={`building image ${index}`}
                        style={{ margin: "0 5px" }}
                        title="building description image"
                        style={{
                          height: "180px",
                          width: "180px",
                          margin: "0 5px",
                        }}
                      />
                    ) : (
                      <img
                        src={emptyImage}
                        alt={`building image ${index}`}
                        style={{ margin: "0 5px" }}
                        title="building description image"
                      />
                    )}
                  </Box>
                );
              })}
            </Box>}
      
    
          
          </Box>
          <Box ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Building_Image;
