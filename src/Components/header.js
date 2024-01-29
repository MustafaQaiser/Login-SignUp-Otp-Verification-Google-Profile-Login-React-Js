import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FoodBankOutlinedIcon from '@mui/icons-material/FoodBankOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState('/login');
  const router = useNavigate();
  console.log(value);  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    router(newValue);
  };
  const handlelogout =()=>{
    localStorage.clear();
    router('/login');
  }
  const handleabout=()=>{router('/about')}

  return (
    <BottomNavigation style={{ background: '#ef1919', color: 'white' }} value={value} onChange={handleChange}>
      <Box display="flex" alignItems="center">
        <FoodBankOutlinedIcon sx={{ fontSize: 50 }} />
        <Typography variant="h6" component="h4">
          FoodPanda Clone
        </Typography>
      </Box>
      {localStorage.getItem('token') ? (
        [
          <BottomNavigationAction key="about" style={{ color: 'white' }} label="About" onClick={handleabout} value="/about" icon={<InfoTwoToneIcon />} />,
          <BottomNavigationAction key="logout" style={{ color: 'white' }} label="Logout" value="/login" onClick={handlelogout} icon={<LogoutIcon />} />,
          <BottomNavigationAction key="home" style={{ color: 'white' }} label="Home" value="/" onClick={() => { router('/'); }} icon={<HomeOutlinedIcon />} />
        ]
      ) : (
        [
          <BottomNavigationAction key="login" style={{ color: 'white' }} label="Login" value="/login" icon={<SensorOccupiedIcon />} />,
          <BottomNavigationAction key="register" style={{ color: 'white' }} label="Register" value="/register" icon={<AssignmentIndIcon />} />,
          <BottomNavigationAction key="about" style={{ color: 'white' }} label="About" value="/about" icon={<InfoTwoToneIcon />} />
        ]
      )}
    </BottomNavigation>
  );
  
}
