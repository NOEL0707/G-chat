import React from 'react';

function ToMessage(props) {
    return (
        <div className='w-[50%] h-fit flex flex-col justify-center items-start  border-2 shadow-sm rounded-md ml-auto bg-slate-50'>
            <div className='w-full box-border flex justify-start items-center border-b-2 p-2'>
                <p className='text-sm text-[#133044] font-bold'>{props.name}</p>
            </div>
            <div className='w-full box-border flex justify-start items-center p-1'>
                <p className='text-md text-[#133044] font-light'>{props.msg}</p>
            </div>
            <div className='w-full box-border flex justify-end items-center p-1'>
                <p className='text-sm text-[#133044] font-light'>{props.time}</p>
            </div>
        </div>
    );
}

export default ToMessage;