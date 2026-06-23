import React, { useCallback } from 'react'
import ThemeToggle from './ThemeToggle.jsx'; // Adjust path if it's in a different folder

const DESKTOP_MQ = '(min-width: 1024px)';

function Header({ links }) {
    // On desktop, intercept anchor clicks and dispatch a scroll-to-section event
    // so App.jsx's Lenis instance handles the scroll (single controller pattern)
    const handleNavClick = useCallback((e) => {
        if (!window.matchMedia(DESKTOP_MQ).matches) return; // mobile: native anchor behavior

        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        const id = href?.replace('#', '');
        const mainEl = document.querySelector('main');
        if (!id || !mainEl) return;

        mainEl.dispatchEvent(new CustomEvent('scroll-to-section', {
            detail: { sectionId: id },
        }));
    }, []);

    return (

        <header className='relative flex items-center w-full bg-linear-to-r from-gray-200 via-sky-200 to-gray-200 hover:from-sky-200 hover:via-gray-200 hover:to-sky-200 dark:from-black dark:via-slate-800 dark:to-black dark:hover:from-slate-800 dark:hover:via-black dark:hover:to-slate-800 transition-all duration-500' >

            {/* The perfectly centered navigation */}
            <ul className='flex justify-evenly items-center w-full px-[30%] py-1 text-slate-800 dark:text-slate-200 md:text-lg'>

                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-2xl overflow-hidden'>
                    {/* FIXED: Added 'block p-2' to the <a> tag so the entire hover area is clickable */}
                    <a href={links.home} onClick={handleNavClick} className='block w-full h-full p-2' >Home</a>
                </li>

                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-2xl overflow-hidden'>
                    <a href={links.about} onClick={handleNavClick} className='block w-full h-full p-2' >About</a>
                </li>

                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-2xl overflow-hidden'>
                    <a href={links.projects} onClick={handleNavClick} className='block w-full h-full p-2' >Projects</a>
                </li>

                <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-2xl overflow-hidden'>
                    <a href={links.contact} onClick={handleNavClick} className='block w-full h-full p-2' >Contact</a>
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