import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './Footer'
import Chat from './components/chat/CHat'
import socketIO from 'socket.io-client';
import { socketLink } from './serverLink'
function App() {
  const socket = socketIO.connect(socketLink);
  const [count, setCount] = useState(0)
  return(
    <div className='w-full min-h-[100vh] h-full flex flex-col justify-center items-center'>
      <NavBar ></NavBar>

        {localStorage.getItem('uid') && <Chat socket={socket}></Chat>}
        {!localStorage.getItem('uid') && 
        <div className='w-[90%] min-h-[80vh] h-full flex justify-center items-center overflow-y-scrool shadow-lg bg-[#fefffe] rounded-lg mb-4'>
          <p className='text-2xl text-[#e53a48] font-bold'>Login to see messages...</p>
        </div>}

      <Footer></Footer>
    </div>
  )
}

export default App
