import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth';


function Header() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    const signIn = (e) => {
        e.preventDefault();

        signInWithPopup(auth, provider).then(() => navigate('/channels')).catch((error)=> alert(error.message));
    }

  return (
    <header className='flex items-center justify-between py-4 px-6 bg-discord_blue'>
        <a href='/'>
            <img 
            src='https://www.seekpng.com/png/full/15-151079_logo-wordmark-white-join-the-discord.png'
            alt=''
            className='w-32 h-12 object-contain'
            />
            
        </a>
        <div className='hidden lg:flex space-x-6 ' >
        <a className='link'>Download</a>
        <a className='link'>Why Discord</a>
        <a className='link'>Nitro</a>
        <a className='link'>Safety</a>
        <a className='link'>Support</a>
        </div>
    <div className='flex space-x-4'>
        <button className='bg-white p-2 rounded-full text-sx md:text-sm px-4 focus:outline-none hover:shadow-2x1 hover:text-discord_blurple
        transition duration-200 ease-in-out whitespace-nowrap font-medium' onClick={!user ? signIn : () => navigate("/channels")}>
            {!user ? "login"  : "Open discord"}
            </button>
        <FontAwesomeIcon className='h-9 text-white cursor-pointer lg:hidden' icon={faBars} />
    </div>

    </header>
  )
}

export default Header