import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { redirect, useNavigate } from 'react-router-dom'
import { auth,db } from '../firebase'
import ServerIcon from './ServerIcon'
import { PlusIcon, ChevronDownIcon, MicrophoneIcon, PhoneIcon, CogIcon } from '@heroicons/react/outline'
import Channel from './Channel'
import { collection, addDoc } from 'firebase/firestore';
import Chat from './Chat'


function Home() {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)
  const [channels] = useCollection(collection(db, "channels"))
  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");

    if(channelName) {
      const docRef = addDoc(collection(db, "channels"), {
        channelName: channelName
      })
      
    }

  }

  return (
    <>
      {!user && navigate("/") }
      <div className='flex h-screen'>
        <div className='flex flex-col space-y-3 bg-discord_serversBg p-3 min-w-max'>
          <div className='server-default hover:bg-discord_purple'>
            <img src='https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6cc3c481a15a141738_icon_clyde_white_RGB.png' alt=''
            className='h-5'/>
          </div>
          <hr className='border-gray-700 border w-8 mx-auto'/>
          <ServerIcon image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrxvJOPkKyBV7ybewXzDMC_XO2XmxlnZ_8814faYjyPVNoubpEuaH5-e1743v6vDSu_OY&usqp=CAU"/>
          <ServerIcon image="https://cdn.iconscout.com/icon/free/png-256/logo-3446031-2882300.png"/>
          <ServerIcon image="https://cdn5.vectorstock.com/i/1000x1000/35/29/spear-logo-icon-vector-31293529.jpg"/>
          <ServerIcon image="https://cdn5.vectorstock.com/i/1000x1000/37/59/big-think-logo-lightbulb-logo-icon-vector-21513759.jpg"/>

          <div className='server-default hover:bg-discord_green group'>
            <PlusIcon className="text-discord_green h-7 group-hover:text-white" />
          </div>
        </div>

        <div className='bg-discord_channelsBg flex flex-col min-w-max'>
          <h2 className='flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-discord_serverNameHoverBg cursor-pointer'>Official PAPA Server... <ChevronDownIcon className="h-5 ml-2"/>
          </h2>
          <div className='text-discord_channel flex-grow overflow-scroll scrollbar-hide'>
            <div className='flex item-center p-2 mb-2'>
              <ChevronDownIcon  className='h-3 mr-2'/>
              <h4 className='font-semibold'>Channels</h4>
              <PlusIcon className='h-6 ml-auto cursor-pointer hover:text-white ' onClick={handleAddChannel}/>
            </div>
            <div className='flex flex-col space-y-2 px-2 mb-4'>
             {channels?.docs.map((doc)=> (
              <Channel 
              key={doc.id}
              id={doc.id}
              channelName={doc.data().channelName}
              />
             ))}
              
            </div>
          </div>
          <div className='bg-disctod_userSectionBg p-2 flex justify-between items-center space-x-8'>
            <div className='flex items-center space-x-1'>
              <img src={user?.photoURL} alt="" className='h-10 rounded-full ' onClick={() => auth.signOut()}/>
              <h4 className='text-white text-xs font-medium'>
                {user?.displayName}
                <span className='text-discord_userSectionText block '>#{user?.uid.substring(0, 4)}</span>
              </h4>
            </div>
            <div className='text-gray-400 flex items-center'>
              <div className='hover:bg-discord_channelHoverBg p-2 rounded-md'>
                <MicrophoneIcon className='h-5 icon' />
              </div>
              <div className='hover:bg-discord_channelHoverBg p-2 rounded-md'>
                <PhoneIcon className='h-5 icon' />
              </div>
              <div className='hover:bg-discord_channelHoverBg p-2 rounded-md'>
                <CogIcon className='h-5 icon' />
              </div>
            </div>
          </div>
        </div>

        <div className='bg-discord_chatBg flex-grow'>
          <Chat />
        </div>
      </div>
    </>
  )
}

export default Home