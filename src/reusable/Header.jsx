import React from 'react'
import { Link } from 'react-router';

function Header({ links }) {
    return (
        <header className='flex items-center w-dvw gradient bg-linear-to-r from-gray-200 via-sky-200 to-gray-200 hover:from-sky-200 hover:via-gray-200 hover:to-sky-200' >
            <ul className='flex justify-evenly items-center w-full px-[30%] py-1'>
                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 p-2 rounded-2xl'><a href={links.home} className='h-full w-full' >Home</a></li>
                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 p-2 rounded-2xl'><a href={links.about} className='h-full w-full' >About</a></li>
                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 p-2 rounded-2xl'><a href={links.projects} className='h-full w-full' >Projects</a></li>
                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 p-2 rounded-2xl'><a href={links.contact} className='h-full w-full' >Contact</a></li>
            </ul>
        </header>
    )
}

export default Header
