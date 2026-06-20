import React from 'react'
import ThemeToggle from './ThemeToggle.jsx'; // Adjust path if it's in a different folder

function Header({ links }) {
    return (

        <header className='relative flex items-center w-full bg-linear-to-r from-gray-200 via-sky-200 to-gray-200 hover:from-sky-200 hover:via-gray-200 hover:to-sky-200 dark:from-black dark:via-slate-800 dark:to-black dark:hover:from-slate-800 dark:hover:via-black dark:hover:to-slate-800 transition-all duration-500' >

            {/* The perfectly centered navigation */}
            <ul className='flex justify-evenly items-center w-full px-[30%] py-1 text-slate-800 dark:text-slate-200'>

                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-2xl overflow-hidden'>
                    {/* FIXED: Added 'block p-2' to the <a> tag so the entire hover area is clickable */}
                    <a href={links.home} className='block w-full h-full p-2' >Home</a>
                </li>

                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-2xl overflow-hidden'>
                    <a href={links.about} className='block w-full h-full p-2' >About</a>
                </li>

                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-2xl overflow-hidden'>
                    <a href={links.projects} className='block w-full h-full p-2' >Projects</a>
                </li>

                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-2xl overflow-hidden'>
                    <a href={links.contact} className='block w-full h-full p-2' >Contact</a>
                </li>

            </ul>

            {/* The Theme Toggle pinned to the right */}
            <div className='absolute right-4 md:right-8 flex items-center'>
                <ThemeToggle />
            </div>

        </header>
    )
}

export default Header;