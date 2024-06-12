import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy} from "firebase/firestore"
import { auth, db } from "../firebase-config";

const Chat = ({room}) => {

    const [newMessages,setNewMessages] = useState("");
    const messagesRef = collection(db,"messages");
    const [messages,setMessages] = useState([]);

    useEffect(()=>{
        const queryMessages = query(messagesRef,where("room","==",room),orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryMessages,(snapshot)=>{
            let messages = [];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages);
        });
        return () => unsubscribe;
    },[])
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(newMessages === "")
        return;
    
    await addDoc(messagesRef, {
        text: newMessages,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room
    });
    console.log(messages)
    setNewMessages("");
  }

  return (
    <div className="border rounded-lg mx-12 h-11/12">
        <div className="border-b h-[60px] pl-8 py-5 text-xl font-semibold">
            Chat Room: {room}
        </div>
        <div className="flex flex-col border-b py-5 max-h-[535px] h-[535px] items-start pl-10 overflow-y-auto scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-100 scrollbar-w-3">
            {messages.map(message => 
                <div key={message.id} className="pb-2">
                    <span className="pr-5 text-lg font-bold">{message.user}</span>
                    {message.text}
                </div>)}
        </div>
        <form onSubmit={handleSubmit} action="" className="py-5">
            <div className="flex flex-row items-center justify-center mx-auto space-x-2">
            <input onChange={(e)=>setNewMessages(e.target.value)} value={newMessages} type="text" 
             placeholder="Type a message" className="w-5/6 border border-black rounded-xl pl-5 h-16"/>
            <button type="submit" className="border border-black rounded-3xl px-auto w-20 h-10 hover:bg-slate-200">Send</button>
            </div>
        </form>
    </div>
  )
}

export default Chat