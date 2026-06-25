import React, { useCallback, useState } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import { AnimatePresence, motion } from "motion/react";

const DESKTOP_MQ = '(min-width: 1024px)';

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.5"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle, isOpen }) => (
  <button
    onClick={toggle}
    className="p-2 rounded-xl border border-slate-400/50 dark:border-slate-600/50 flex items-center justify-center hover:bg-sky-200/50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-800 dark:text-slate-200"
    aria-label="Toggle Menu"
  >
    <svg width="18" height="18" viewBox="0 0 23 23">
      <Path
        initial="closed"
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.2 }}
      />
      <Path
        initial="closed"
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
    </svg>
  </button>
);

function Header({ links }) {
    const [isOpen, setIsOpen] = useState(false);

    // On desktop, intercept anchor clicks and dispatch a scroll-to-section event
    // so App.jsx's Lenis instance handles the scroll (single controller pattern)
    const handleNavClick = useCallback((e) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        const id = href?.replace('#', '');

        if (!window.matchMedia(DESKTOP_MQ).matches) {
            setIsOpen(false);
            const targetEl = document.getElementById(id);
            if (targetEl) {
                // Wait for the menu closing animation to finish (approx 300ms)
                // so the layout shift doesn't mess up our scroll destination or trigger upward scroll events.
                setTimeout(() => {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }, 350); 
            }
            return;
        }

        const mainEl = document.querySelector('main');
        if (!id || !mainEl) return;

        mainEl.dispatchEvent(new CustomEvent('scroll-to-section', {
            detail: { sectionId: id },
        }));
    }, []);

    const navItems = [
        { name: "Home", href: links.home },
        { name: "About", href: links.about },
        { name: "Skills", href: links.skills },
        { name: "Projects", href: links.projects },
        { name: "Contact", href: links.contact },
    ];

    const menuVariants = {
        open: {
            opacity: 1,
            height: "auto",
            display: "flex",
            transition: {
                height: { duration: 0.4, ease: "easeOut" },
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },
        closed: {
            opacity: 0,
            height: 0,
            transitionEnd: {
                display: "none"
            },
            transition: {
                height: { duration: 0.3, ease: "easeIn" },
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const linkVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            y: -20,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    };

    return (
        <header className='relative flex flex-col w-full bg-linear-to-r from-gray-200 via-sky-200 to-gray-200 hover:from-sky-200 hover:via-gray-200 hover:to-sky-200 dark:from-black dark:via-slate-800 dark:to-black dark:hover:from-slate-800 dark:hover:via-black dark:hover:to-slate-800 transition-all duration-500 z-50'>
            
            <div className='flex items-center justify-between sm:justify-center w-full px-4 sm:px-0 py-2 sm:py-2'>
                {/* Mobile Left: ThemeToggle */}
                <div className='flex sm:hidden'>
                    <ThemeToggle />
                </div>

                {/* Desktop Nav */}
                <ul className='hidden sm:flex sm:w-full items-center justify-center gap-8 text-slate-800 dark:text-slate-200 sm:text-base md:text-lg text-[15px] font-medium'>
                    {navItems.map((item) => (
                        <li key={item.name} className='ease-in-out transition-all duration-400 list-none hover:bg-sky-200 dark:hover:bg-slate-800 rounded-xl sm:rounded-2xl overflow-hidden'>
                            <a href={item.href} onClick={handleNavClick} className='block w-full h-full px-1 py-1.5 sm:p-2'>{item.name}</a>
                        </li>
                    ))}
                </ul>

                {/* Desktop Right: ThemeToggle */}
                <div className='hidden sm:flex absolute right-8 items-center'>
                    <ThemeToggle />
                </div>

                {/* Mobile Right: Hamburger Menu Toggle */}
                <div className='flex sm:hidden'>
                    <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
                </div>
            </div>

            {/* Mobile Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="overflow-hidden w-full flex flex-col gap-2 pb-4 pt-2 border-t border-slate-300/50 dark:border-slate-700/50 sm:hidden px-4"
                    >
                        {navItems.map((item) => (
                            <motion.div key={item.name} variants={linkVariants}>
                                <a
                                    href={item.href}
                                    onClick={handleNavClick}
                                    className="text-base font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 px-4 py-2.5 rounded-xl hover:bg-sky-200/60 dark:hover:bg-slate-800/80 transition-all duration-200 block text-center"
                                >
                                    {item.name}
                                </a>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header;