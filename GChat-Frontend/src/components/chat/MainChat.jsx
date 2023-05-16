import { Button, TextField } from '@mui/material';
import React, { useState,useEffect,useRef  } from 'react';
import SendIcon from '@mui/icons-material/Send';
import FromMessage from './FromMessage';
import ToMessage from './ToMessage';
import axios from 'axios';
import { serverLink } from '../../serverLink';

function MainChat(props) {

    const [messages, setMessages] = useState(null);
    const [state,setState]=useState('Getting New Messages.....');
    const [text,setText]=useState('');
    const chatContainerRef = useRef(null);
    useEffect(() => {
        setState('Getting New Messages.....');
        setMessages([]);
        axios.get(`${serverLink}/api/contact/getMessages/${localStorage.getItem('uid')}/${props.contactuid}`,{
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
            setMessages(sortedMessages);

            setState('Everything Up-To-Date');
            const scrollElement = chatContainerRef.current.lastElementChild;
            if (scrollElement) {
              scrollElement.scrollIntoView({ behavior: 'smooth' });
            }

        })
        .catch(error => {
            console.error('Error:', error);
            setState('Error While Getting New Messages.');
        });
        // chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        
    }, [props.contactuid]);
    useEffect(() => {
        // setState('Listening.....');
        props.socket.on('check-messages',()=>{
            axios.get(`${serverLink}/api/contact/getMessages/${localStorage.getItem('uid')}/${props.contactuid}`,{
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
                setMessages(sortedMessages);
                setState('Everything Up-To-Date');
                const scrollElement = chatContainerRef.current.lastElementChild;
                if (scrollElement) {
                  scrollElement.scrollIntoView({ behavior: 'smooth' });
                }

            })
            .catch(error => {
                console.error('Error:', error);
                setState('Error While Getting New Messages.');

            });
        })
        return () => {
            props.socket.off('check-messages'); // Clean up the event listener when the component unmounts
        };
    }, [props.socket,messages]);
    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const handleSendMessage = async () => {
        setState('Sending.....');
        let message=text.trim();
        if (message && message.length>0 && localStorage.getItem('uid')) {
            let res=await props.socket.emit('send-message', {
            text: message.trim(),
            from: localStorage.getItem('uid'),
            to:props.contactuid,
            socketid: props.socket.id,
            });
            setText('');
            const scrollElement = chatContainerRef.current.lastElementChild;
            if (scrollElement) {
              scrollElement.scrollIntoView({ behavior: 'smooth' });
            }
            // setState('Everything Up-To-Date');
        }
        else{
            setText('');
            setState('Message has no content');

        }
    };

    return (
        <div className='w-full min-h-[70vh] h-full flex flex-col justify-start items-center rounded-lg bg-[#fefffe] gap-2'>
            <div className='w-full h-[60px] box-border flex justify-start items-center border-[1px] p-2 pl-0 gap-1 cursor-pointer'>
                <div className='w-[80px] flex justify-center items-center '>
                    <img src={props.photoURL} alt={"not found"} className=' bg-[#fdfffa]' style={{width:"50px",height:"50px",borderRadius:"50%"}}/>
                </div>
                <div className='w-[80%] flex flex-col justify-center items-center gap-1'>
                    <div className='w-full flex justify-center items-center'>
                        <div className='w-full'>
                            <p className='text-xl text-[#e53a48] font-bold'>{props.name}</p>
                        </div>
                    </div>    
                </div>
            </div>
            <div className='w-full  h-[60vh] flex flex-col justify-start items-start gap-2 pl-2 pr-2 scrollable-container' >
                {messages && messages.map(({from,to,msg,sentAt},index)=>{
                    const timestamp = new Date(
                        sentAt._seconds * 1000 + sentAt._nanoseconds / 1000000
                      ); // Convert Firebase Timestamp to JavaScript Date object
                    const formattedTime = timestamp.toLocaleString();
                    return(
                        from===localStorage.getItem('uid')?
                        <FromMessage name={localStorage.getItem('displayName')} msg={msg} time={formattedTime} key={index}></FromMessage>
                        :
                        <ToMessage msg={msg} name={props.name} time={formattedTime} key={index}></ToMessage>
                    )
                })
                }
                <div ref={chatContainerRef}></div>
            </div>
            <div className='w-full flex justify-start items-center p-2 bg-white h-4' >
                <p className='text-sm text-[#e53a48] font-bold'>{state}</p>
            </div>
            <div className='w-full h-[60px] box-border flex justify-between items-center border-[1px] cursor-pointer mt-auto'>
                <TextField variant='outlined' value={text} fullWidth onChange={(e)=>setText(e.target.value)} placeholder='Enter Text..' sx={{ borderRadius: 0 }}></TextField>
                <Button sx={{ borderRadius: 0 }} variant='contained' style={{height:'55px',background:'#e53a48'}} onClick={handleSendMessage} styles={{borderRadius:'0px'}}><SendIcon></SendIcon></Button>
            </div>
        </div>
    );
}

export default MainChat;