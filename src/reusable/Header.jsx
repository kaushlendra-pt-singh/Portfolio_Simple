import React from 'react'
import { Link } from 'react-router';

function Header() {
    return (
        <header className='flex items-center w-dvw gradient bg-linear-to-r from-gray-200 via-sky-200 to-gray-200 hover:from-sky-200 hover:via-gray-200 hover:to-sky-200' >
            <ul className='flex justify-evenly items-center w-full px-[30%] py-1'>
                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 p-2 rounded-2xl'><Link to={'#'}>Home</Link></li>
                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 p-2 rounded-2xl'><Link to={'#'}>About</Link></li>
                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 p-2 rounded-2xl'><Link to={'#'}>Projects</Link></li>
                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 p-2 rounded-2xl'><Link to={'#'}>Contact</Link></li>
            </ul>
        </header>
    )
}

export default Header
