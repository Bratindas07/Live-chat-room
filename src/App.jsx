import { useRef, useState } from 'react';
import Chat from './components/Chat';
import Auth from './components/Auth'
import Cookies from 'universal-cookie'
import { signOut } from "firebase/auth"
import { auth } from './firebase-config';
const cookies = new Cookies();

function App() {

  const [isAuth,setIsAuth] = useState(cookies.get("auth-token"))
  const [room,setRoom] = useState(null);
  const roomInputRef = useRef(null);

  if(!isAuth){
    return (
      <>
       <Auth setIsAuth={setIsAuth}></Auth>
      </>
    )
  }
  const handleSignOut = async () =>{
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }
  // console.log(room);
  return <div className='space-y-5 mt-12'>
    {
      room ? (<Chat room={room}></Chat>) : (
      <div className='flex flex-col justify-center items-center space-y-5 pt-16'>
        <div className='border-4 rounded-lg flex flex-col items-center justify-end space-y-20 w-[1024px] h-[300px]'>
        <label className='py-auto font-black text-3xl'>Enter the room name</label> 
        <input type="text" placeholder='Eg: Room' className='border-4 border-b-0 text-lg rounded-md w-[1024px] h-20 overflow-hidden placeholder: text-center'
        ref={roomInputRef}/>
        </div>
        <div className=''>
        <button onClick={() => setRoom(roomInputRef.current.value)} className='border-2 border-black rounded-md p-1 w-20 h-15 hover:bg-slate-200'>Enter</button>
        </div>
      </div> )      
    }
    <div>
        <button onClick={handleSignOut} className='rounded-lg border-4 p-1 m-10 hover:bg-slate-400'>Sign Out</button>
    </div>
  </div>
}

export default App
