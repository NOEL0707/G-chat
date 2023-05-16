import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './Footer'
import Chat from './components/chat/CHat'
import socketIO from 'socket.io-client';

function App() {
  const socket = socketIO.connect('http://localhost:4545');
  const [count, setCount] = useState(0)
  return(
    <div className='w-full min-h-[100vh] h-full flex flex-col justify-center items-center'>
      <NavBar ></NavBar>
        <Chat socket={socket}></Chat>
      <Footer></Footer>
    </div>
  )
}

export default App
