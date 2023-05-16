import React from 'react';
import logo from "../../assets/logo.jpg";

function SideChat(props) {
    // console.log("selected?",props.isSelected);
    return (
        <div className='w-full max-h-[300px] flex justify-center items-center border-[1px] p-2 gap-1 cursor-pointer hover:bg-slate-100 hover:shadow-lg'
        onClick={()=>props.handleChangeContact(props.index)} style={{background:props.isSelected?"rgb(241 245 249)":'white'}}>
            <div className='w-[80px] flex justify-center items-center '>
                <img src={props.photoURL} alt={"not found"} className=' bg-[#fdfffa]' style={{width:"50px",height:"50px",borderRadius:"50%"}}/>
            </div>
            <div className='w-[80%] flex flex-col justify-center items-center gap-1'>
                <div className='w-full flex justify-center items-center'>
                    <div className='w-[80%]'>
                        <p className='text-sm text-[#e53a48] font-bold'>{props.name}</p>
                    </div>
                    <div className='w-[250px] '>
                        <p className='w-full  text-xs text-[#133044] font-light'>{props.sentAt}</p>
                    </div>
                </div>    
                <div className='w-full flex justify-start items-center overflow-clip'>
                    <p className='text-md text-[#133044] truncate overflow-hidden'>{props.msg}</p>
                </div>

            </div>
        </div>
    );
}

export default SideChat;