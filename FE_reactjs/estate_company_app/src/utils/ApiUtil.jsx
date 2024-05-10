import { fastObjectShallowCompare } from "@mui/x-data-grid/utils/fastObjectShallowCompare";
import axios from "axios";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function createContact(contact) {
  try {
    const response = await api.post("/customers", contact);
    if(response.status === 200){
        return true;
    }
    return false;

  } catch (error) {
    console.error("Error occurred while creating contact", error);
    throw error; 
  }

  
}

export async function searchCustomer(keyword){
    try{
        const response = await api.get("/api/customers/search?keyword="+keyword);
    if(response.status === 200){
        return response.data;
    }
    return false;
    }catch (error) {
        console.error("Error occurred while search customers", error);
        throw error; 
      }
  }

  export async function deleteCustomer(id){
    try{
        const response = await api.delete("/api/customers/"+id);
    if(response.status === 200){
        return true;
    }
    return false;
    }catch (error) {
        console.error("Error occurred while delete customers", error);
        throw error; 
      }
  }