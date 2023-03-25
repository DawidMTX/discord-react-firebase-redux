import { BellIcon, ChatIcon, EmojiHappyIcon, GiftIcon, HashtagIcon, InboxIcon, PlusCircleIcon, QuestionMarkCircleIcon, SearchIcon, UsersIcon } from '@heroicons/react/solid'
import {doc, collection, addDoc, serverTimestamp, query, orderBy, getDoc} from 'firebase/firestore';
import React, { useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { selectChannelName, selectChannelId } from '../features/channelSlice';
import { auth, db } from '../firebase';
import Message from './Message'



function Chat() {

    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [user] = useAuthState(auth);
    const inputRef =useRef("");
    const chatRef = useRef(null);
    const readMessages = channelId && doc(db, "channels", channelId);
    const [messages] = useCollection(channelId && query(collection(readMessages, 'message'), orderBy("timestamp", "asc")));

 const scrollToBottom = () => {
        chatRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    const sendMessage = (e) => {
        e.preventDefault();

        if(inputRef.current.value !== ""){
            const newMessage = doc(db, "channels", channelId);
            const addMessage = addDoc(collection(newMessage, "message"), {
                timestamp: serverTimestamp(),
                message: inputRef.current.value,
                name: user?.displayName,
                photoURL: user?.photoURL,
                email: user?.email
            })
        }

        inputRef.current.value = ""
        scrollToBottom();
    }

  return (
    <div className='flex flex-col h-screen'>

        <header className='flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1'>
            <div className='flex items-center space-x-1'>
                <HashtagIcon className='h-6 text-discord_charHeaderIcon'/>
                <h4 className='text-white font-semibold'>{channelName}</h4>
            </div>
            <div className='flex space-x-3'>
                <BellIcon className='icon'/>
                <ChatIcon className='icon'/>
                <UsersIcon className='icon'/>
                <div className='flex bg-discord_chatHeaderInputBg text-xs p-1 rounded-md'>
                    <input 
                        type="text" 
                        placeholder='Search' 
                        className='bg-transparent focus:outline-none text-white pl-1 placeholder-discord_charHeaderIcon'
                    />
                    <SearchIcon className='h-4 text-discord_charHeaderIcon mr-1'/>
                </div>
                <InboxIcon className='icon'/>
                <QuestionMarkCircleIcon className='icon'/>
            </div>
        </header>

        <main className='flex-grow overflow-y-scroll scrollbar-hide'>
            {messages?.docs.map((doc) => {
                const { message, timestamp, name, photoURL, email} = doc.data();
                return <Message 
                    key={doc.id} 
                    id={doc.id}
                    message={message}
                    timestamp={timestamp}
                    name={name}
                    photoURL={photoURL}
                    email={email}
                />
            })}
            <div ref={chatRef} className="pb-16" />
        </main>

        <div className='flex item-center p-2.5 bg-discord_chcatInputBg mx-5 mb-7 rounded-lg'>
            <PlusCircleIcon className='icon mr-4'/>
            <form className='flex-grow'>
                <input 
                    type="text" 
                    disabled={!channelId} 
                    placeholder={channelId ? `Message #${channelName}` : "Select a channel"}
                    className="bg-transparent focus:outline-none w-full text-discord_chatInputText placeholder-discord_chatInput text-sm"
                    ref={inputRef}
                    />
                    <button hidden type="submit" onClick={sendMessage}>Send</button>
                    
            </form>
            <GiftIcon className='icon mr-2'/>
            <EmojiHappyIcon className='icon'/>
        </div>
    </div>
  )
}

export default Chat