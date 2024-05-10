import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box, Stack } from '@mui/material';
import { createContact } from '../../utils/ApiUtil';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const GlowContact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
const navigate = useNavigate();
  const onSubmit = (data) => {
    createContact(data).then((response)=>{
       if(response){
        navigate('/home');
        
       }
    })
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h2" textAlign="center" mb="15px">Contact</Typography>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} id="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Full Name"
            id="fullname"
            name="fullname"
            variant="filled"
            fullWidth
            {...register("fullname", { required: true })}
            error={errors.fullname ? true : false}
            helperText={errors.fullname && "This field is required"}
          />
          <TextField
            label="Phone"
            id="phone"
            name="phone"
            variant="filled"
            fullWidth
            {...register("phone", { required: true, pattern: /^\d{10}$/ })}
            error={errors.phone ? true : false}
            helperText={errors.phone && (errors.phone.type === 'required' ? "This field is required" : "Phone number must be 10 digits")}
          />
          <TextField
            label="Email"
            id="email"
            name="email"
            variant="filled"
            fullWidth
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            error={errors.email ? true : false}
            helperText={errors.email && (errors.email.type === 'required' ? "This field is required" : "Invalid email address")}
          />
          <Stack direction="row" spacing={1} justifyContent="center">
            <Link to="/home" style={{
                textDecoration:"none",
                width:"100%",
                textAlign:"center",
                backgroundColor:"gray",
                borderRadius:"5px",
                color:"#fff"
            }}>
            Home
            </Link>
          <Button type="submit" variant="contained" color="info" fullWidth>Send</Button>
          </Stack>
       
        </form>
      </div>
    </div>
  );
};

export default GlowContact;
