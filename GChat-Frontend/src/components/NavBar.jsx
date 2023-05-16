import React from 'react';
import logo from "../assets/logo.jpg";
import { Link } from 'react-router-dom';
import Login from './Login';
import User from './User';
function NavBar(props) {
    return (
        <nav className='flex justify-start items-center h-20  px-8 gap-8 bg-[#fdfffa] w-full'>
            <div className=' h-full flex justify-center items-center gap-2 '>
                <img src={logo} alt={"not found"} className=' bg-[#fdfffa]' style={{width:"70px",height:"70px",borderRadius:"50%"}}>
                </img>
                <div className='flex justify-center items-center'>
                    <p className='text-xl text-[#e53a48]'>G-Chat</p>
                </div>
            </div>
            <div className='w-[fit-content] h-full flex justify-center items-center gap-4 ml-auto'>
                <Login></Login>
                <div className='w-[fit-content] h-full flex justify-center items-center gap-4'>
                    <User></User>
                </div>
            </div>

        </nav>
    );
}

export default NavBar;