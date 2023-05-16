import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import QuestionMark from "@mui/icons-material/QuestionMark";
import Visibility from "@mui/icons-material/Visibility";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import { serverLink } from '../../serverLink';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
function SearchChat(props) {
  const [data,setData]=useState([])
  const [selecteduid,setSelecteduid]=useState('');
  const handleChange = (event) => {
    setSelecteduid(event.target.value);
  };
  useEffect(()=>{
    axios.get(`${serverLink}/api/user/getUsers`,{
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
  .then(response => {
    console.log('Response:', response.data.result);
    setData(response.data.result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  },[]);
  const handleAddContact=async ()=>{
    if(selecteduid=='' && selecteduid==null){
      return;
    }
    try {
      const res=await axios.post(`${serverLink}/api/contact/addContact`,{
        uid:localStorage.getItem('uid'),
        contactuid:selecteduid
      },{
        withCredentials: false,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='w-full h-fit flex  justify-center items-center'>

      <Box style={{width:'100%'}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Search Contacts</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selecteduid}
            label="Search"
            onChange={handleChange}
            sx={{ borderRadius: 0 }}
          >
            {data && data.length>0 && data.map(({name,uid},index)=>{
              return(
                <MenuItem key={index} value={uid}>{name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Box>
      <Button variant='contained' style={{height:'55px',background:'#e53a48'}} onClick={handleAddContact} sx={{ borderRadius: 0 }}><AddIcon></AddIcon></Button>           
    </div>
  );
}




const IconTextField = ({ iconEnd, InputProps, ...props }) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null
      }}
    />
  );
};
export default SearchChat;
// <Button variant="contained"  startIcon={<SearchIcon/>} style={{background:'rgb(250 250 250)',color:'#d32b35',height:'50px',boxShadow:'0px 0px 0px 0px'}}></Button>
