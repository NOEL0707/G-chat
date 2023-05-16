import React from 'react';
import SideChat from './SideChat';
import SearchChat from './SearchChat';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { serverLink } from '../../serverLink';
import Loader from '../../Loader';
function SideBar(props) {
  const [data,setData]=useState([])
  const [selecteduid,setSelecteduid]=useState('');
  const [isLoading,setIsLoading]=useState(false);
  const [ind,setSelectedInd]=useState(0);
  const handleChangeContact= (index) => {
    // setSelecteduid(event.target.value);
    console.log("CLicked!");
    setSelectedInd(index);
    console.log(ind)
    props.changeSelectedContact(data[index]);
  };
  useEffect(()=>{
    setIsLoading(true);
    axios.get(`${serverLink}/api/contact/getContacts/${localStorage.getItem('uid')}`,{
      withCredentials: false,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
  .then(response => {
    console.log('Response:', response.data.result);
    var sortedMessages=response.data.result.sort((a, b) => new Date(a.sentAt._seconds * 1000 + a.sentAt._nanoseconds / 1000000)-
    new Date(b.sentAt._seconds * 1000 + b.sentAt._nanoseconds / 1000000))
    setData(sortedMessages.reverse());
    setIsLoading(false);
  })
  .catch(error => {
    console.error('Error:', error);
    setIsLoading(false);
  });
  },[])
  useEffect(() => {
    // setState('Listening.....');
    setIsLoading(true);
    props.socket.on('update-sidebar',()=>{
      axios.get(`${serverLink}/api/contact/getContacts/${localStorage.getItem('uid')}`,{
        withCredentials: false,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
    .then(response => {
      console.log('Response:', response.data.result);
      var sortedMessages=response.data.result.sort((a, b) => new Date(a.sentAt._seconds * 1000 + a.sentAt._nanoseconds / 1000000)-
      new Date(b.sentAt._seconds * 1000 + b.sentAt._nanoseconds / 1000000))
      setData(sortedMessages.reverse());
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setIsLoading(false);
    });
    })
    return () => {
        props.socket.off('update-sidebar'); // Clean up the event listener when the component unmounts
    };
  }, [props.socket]);
  return (
    <div className='w-[400px] min-h-[80vh] flex flex-col justify-start items-start border-[1px] border-t-0 rounded-lg scroll-container'>

      <SearchChat></SearchChat>
      <div className='w-full h-full flex justify-start items-center p-2'>
        <p className='text-lg text-black font-bold'>Recent Contacts</p>
      </div> 
      {isLoading &&
        <div className='w-full h-full flex justify-center items-center'>
          <Loader></Loader>
        </div> 
        }
      {!isLoading && data && data.length>0 && data.map(({name,uid,photoURL,msg,sentAt},index)=>{
        const timestamp = new Date(
          sentAt._seconds * 1000 + sentAt._nanoseconds / 1000000
        ); // Convert Firebase Timestamp to JavaScript Date object
        const formattedTime = timestamp.toLocaleString();
        return(
          <SideChat key={index} name={name} uid={uid} photoURL={photoURL} index={index} isSelected={uid==props.contactuid} handleChangeContact={handleChangeContact} msg={msg} sentAt={formattedTime}/>
        )
      })}
    </div>
  );
}

export default SideBar;