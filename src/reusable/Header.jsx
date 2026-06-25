import React, { useCallback } from 'react'
import ThemeToggle from './ThemeToggle.jsx';

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
        <>
            {/* Added px-2 for mobile breathing room */}
            <header className='relative flex items-center w-full px-2 sm:px-0 py-1 sm:py-2 bg-linear-to-r from-gray-200 via-sky-200 to-gray-200 hover:from-sky-200 hover:via-gray-200 hover:to-sky-200 dark:from-black dark:via-slate-800 dark:to-black dark:hover:from-slate-800 dark:hover:via-black dark:hover:to-slate-800 transition-all duration-500'>

                {/* 
              MOBILE: flex-[8] takes 80% of space, justify-between spreads the links evenly.
              DESKTOP: sm:flex-none sm:w-full sm:justify-center to make it perfectly centered.
            */}
                <ul className='flex flex-8 sm:flex-none sm:w-full items-center justify-between sm:justify-center sm:gap-8 text-slate-800 dark:text-slate-200 sm:text-base md:text-lg text-[15px] font-medium'>

                    <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl overflow-hidden'>
                        <a href={links.home} onClick={handleNavClick} className='block w-full h-full px-1 py-1.5 sm:p-2'>Home</a>
                    </li>

                    <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl overflow-hidden'>
                        <a href={links.about} onClick={handleNavClick} className='block w-full h-full px-1 py-1.5 sm:p-2'>About</a>
                    </li>

                    <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl overflow-hidden'>
                        <a href={links.skills} onClick={handleNavClick} className='block w-full h-full px-1 py-1.5 sm:p-2'>Skills</a>
                    </li>

                    <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl overflow-hidden'>
                        <a href={links.projects} onClick={handleNavClick} className='block w-full h-full px-1 py-1.5 sm:p-2'>Projects</a>
                    </li>

                    <li className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl overflow-hidden'>
                        <a href={links.contact} onClick={handleNavClick} className='block w-full h-full px-1 py-1.5 sm:p-2'>Contact</a>
                    </li>

                </ul>

                {/* 
              MOBILE: flex-[1] makes it take the remaining 20% of space as a sibling, justify-end pushes the button right.
              DESKTOP: sm:absolute pulls it out of the flex flow so the ul can be exactly 100% centered.
            */}
                <div className='flex flex-1 justify-end items-center sm:absolute sm:right-8'>
                    <ThemeToggle />
                </div>

            </header>
        </>
    )
}

export default Header;