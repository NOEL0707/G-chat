import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';

function User(props) {
    const [clicked,setClicked]=useState(false);
    const handleClick=()=>{
        setClicked(!clicked)
    }
    return (
        <div className='w-full flex flex-col justify-end items-center cursor-pointer gap-8'>
            <div className='w-full flex justify-center items-center'>
                <AccountCircleIcon fontSize='large' style={{color:'#d32b35'}} onClick={handleClick}></AccountCircleIcon>
            </div>
            {
                clicked && 
                <div class="w-[250px] absolute top-16 right-10 bg-zinc-50 p-4 flex flex-col justify-center items-center rounded-lg shadow-md  box-border z-10">
                    <div className='w-[80px] flex justify-center items-center '>
                        <img src={localStorage.getItem('photoURL')} alt={"not found"} className=' bg-[#fdfffa]' style={{width:"50px",height:"50px",borderRadius:"50%"}}/>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center p-2'>
                        <p className='text-md text-black font-semibold'>Name</p>
                        <p><b className='text-[#d32b35]'> {localStorage.getItem('displayName')}</b></p>
                    </div>
                    <div className='w-full flex flex-col justify-center items-center p-2 truncate'>
                        <p className='text-md text-black font-semibold truncate'>Email</p>
                        <p className='truncate'><b className='text-[#d32b35]'> {localStorage.getItem('email')}</b></p>
                    </div>
                </div>
            }
        </div>
    );
}

export default User;
// absolute top-16 left-[85vw] right-8