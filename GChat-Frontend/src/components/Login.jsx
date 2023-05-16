import React, { useEffect, useState } from "react";
import {auth,provider} from "../FireBaseConfig.jsx";
import {signInWithPopup,signOut} from "firebase/auth";
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { serverLink } from "../serverLink.js";
function Login(){
    const [uid,setUID] = useState('')
    const handleSignin =()=>{
      signInWithPopup(auth,provider).then((data)=>{
        console.log(data);
        setUID(data.user.uid);
        localStorage.setItem("uid",data.user.uid);
        localStorage.setItem("displayName",data.user.displayName);
        localStorage.setItem("email",data.user.email);
        localStorage.setItem("photoURL",data.user.photoURL);

        axios.post(`${serverLink}/api/user/addUser`,{
            'name': data.user.displayName,
            'email': data.user.email,
            'photoURL': data.user.photoURL,
            'uid':data.user.uid
          },{
            withCredentials: false,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          })
        .then(response => {
          console.log('Response:', response.data);
          window.location.reload();
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }).catch((error)=>{
          console.log(error)
      })
    }
    const handleSignOut =()=>{
        signOut(auth,provider).then((data)=>{
            // console.log(data);
            localStorage.removeItem("uid");
            localStorage.removeItem("displayName");
            localStorage.removeItem("email");
            localStorage.removeItem("photoURL");
            window.location.reload();
        })
    }

    useEffect(()=>{
        setUID(localStorage.getItem('uid'))
    })

    return (
        <div>
            {!uid && <Button variant="contained" onClick={handleSignin} startIcon={<GoogleIcon/>} style={{background:'rgb(250 250 250)',color:'#d32b35'}}>Sign in</Button>}
            {uid && <Button variant="contained" onClick={handleSignOut} startIcon={<LogoutIcon/>} style={{background:'rgb(250 250 250)',color:'#d32b35'}}>Sign Out</Button>}

            
        </div>
    );
}
export default Login;