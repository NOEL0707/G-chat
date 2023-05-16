import React, { useState } from 'react';
import SideBar from './SideBar';
import MainChat from './MainChat';

function Chat(props) {
    const [selectedContact,setSelectedContact]=useState(null);
    const handleSelectedContact=(contact)=>{
        setSelectedContact(contact);
    }
    return (
        
        <div className='w-[90%] min-h-[80vh] h-full flex justify-start items-start overflow-y-scrool shadow-lg bg-[#fefffe] rounded-lg mb-4'>
            <SideBar changeSelectedContact={handleSelectedContact} socket={props.socket} contactuid={selectedContact?selectedContact.uid:'randomuid'}></SideBar>
            {selectedContact && <MainChat photoURL={selectedContact.photoURL} name={selectedContact.name} contactuid={selectedContact.uid} socket={props.socket}></MainChat>}
        </div>
    );
}

export default Chat;