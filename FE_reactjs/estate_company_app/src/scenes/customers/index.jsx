import { Box, Button, Divider, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import Header from "../../Components/Header";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { searchCustomer,deleteCustomer} from "../../utils/ApiUtil";

const AdminCustomer = () =>{
    const {handleSubmit, register} = useForm();
    const [customers, setCustomers] = useState([]);

    
    const search = (data=null) => {
        if(data == null){
    searchCustomer("").then((response)=>{
       if(response){
        setCustomers(response);
       }
    })
        }

        else{
            searchCustomer(data["keyword"]).then((response)=>{
                if(response){
                    setCustomers(response);
                   }
            })
        }
    }
    useEffect(()=>{
        search();
    },[]);
    const handleDelete = (id) =>{
        deleteCustomer(id).then((response)=>{
            if(response){
                setCustomers(
                    customers.filter(c => c.id !== id )
                );
            }
        })
       
        
    }

    return (
        <Box m="5px 20px">
            <Header title="Customers" subtitle="View list customers"/>
            <Stack spacing={2}>
                <form onSubmit={handleSubmit(search)} method="GET">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={9} lg={9}>
                            <TextField
                            {...register("keyword")}
                            variant="filled"
                            type="text"
                            label="keyword"
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <Button type="submit" variant="contained" color="info" fullWidth sx={{
                                p:"15px 0px"
                            }}>
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Divider/>
                <TableContainer component={Paper} sx={{ marginTop: "10px", maxHeight: "50vh", overflow: "auto" }}>
                            <Table>
                                <TableHead>
                                <TableRow sx={{padding:"10px", backgroundColor:"#ff6666"}}>
                                    <TableCell style={{ position: "sticky", top: 0, zIndex: 1,backgroundColor:"#ff6666" }}>
                                        ID
                                    </TableCell>
                                    <TableCell style={{ position: "sticky", top: 0, zIndex: 1,backgroundColor:"#ff6666" }}>
                                        Phone
                                    </TableCell>
                                    <TableCell style={{ position: "sticky", top: 0, zIndex: 1,backgroundColor:"#ff6666" }}>
                                        Fullname
                                    </TableCell>
                                    <TableCell style={{ position: "sticky", top: 0, zIndex: 1,backgroundColor:"#ff6666" }}>
                                        Email
                                    </TableCell>
                                    <TableCell style={{ position: "sticky", top: 0, zIndex: 1,backgroundColor:"#ff6666" }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                            {customers && customers.length >0 &&
                            customers.map((customer,index)=>{
                                return (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {customer.id}
                                        </TableCell>
                                        <TableCell>
                                            {customer.phone}
                                        </TableCell>
                                        <TableCell>
                                            {customer.fullname}
                                        </TableCell>
                                        <TableCell>
                                            {customer.email}
                                        </TableCell>
                                        <TableCell>
                                          <Button type="button" variant="contained" color="warning" onClick={()=>handleDelete(customer.id)}>
                                            Xóa
                                          </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }
                                </TableBody>
                            </Table>
                </TableContainer>
            </Stack>
        </Box>
    )
}

export default AdminCustomer;