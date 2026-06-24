import React from 'react'
import portfolioImage from '../assets/My_Pic.jpeg';
import { WobbleCard } from '../components/ui/wobble-card.jsx';
import { BackgroundGradient } from '../components/ui/background-gradient.jsx';
import { FlipWords } from '../components/ui/flip-words.jsx';
import { BackgroundRippleEffect } from '../components/ui/background-ripple-effect.jsx';

function HeroSection({ isDesktop }) {
    const words = ['Full Stack Web Developer.', 'AI/ML Engineer.', 'Tech Enthusiast.']

    const statsGrid = (
        <div className="grid w-full grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-2 text-center drop-shadow-[10px_10px_15px_rgba(0,0,211,0.3)] dark:drop-shadow-[2px_2px_10px_rgba(255,255,255,0.2)]">
            {/* Point 1 */}
            <div className="flex flex-col items-center justify-center">
                <span className="font-heading text-lg md:text-xl font-bold text-sky-600 dark:text-slate-100">3+ Years</span>
                <span className="font-body text-xs md:text-sm font-light text-foreground/80">Building</span>
            </div>
            {/* Point 2 */}
            <div className="flex flex-col items-center justify-center">
                <span className="font-heading text-lg md:text-xl font-bold text-sky-600 dark:text-slate-100">5+ Projects</span>
                <span className="font-body text-xs md:text-sm font-light text-foreground/80">Shipped</span>
            </div>
            {/* Point 3 */}
            <div className="flex flex-col items-center justify-center">
                <span className="font-heading text-lg md:text-xl font-bold text-sky-600 dark:text-slate-100">Web + AI/ML</span>
                <span className="font-body text-xs md:text-sm font-light text-foreground/80">Engineer</span>
            </div>
            {/* Point 4 */}
            <div className="flex flex-col items-center justify-center">
                <span className="font-heading text-lg md:text-xl font-bold text-sky-600 dark:text-slate-100">Open Source</span>
                <span className="font-body text-xs md:text-sm font-light text-foreground/80">Contributor</span>
            </div>
            {/* Point 5 */}
            <div className="flex flex-col items-center justify-center">
                <span className="font-heading text-lg md:text-xl font-bold text-sky-600 dark:text-slate-100">Agentic AI</span>
                <span className="font-body text-xs md:text-sm font-light text-foreground/80">& NLP Focused</span>
            </div>
            {/* Point 6 */}
            <div className="flex flex-col items-center justify-center">
                <span className="font-heading text-lg md:text-xl font-bold text-sky-600 dark:text-slate-100">3+ Official</span>
                <span className="font-body text-xs md:text-sm font-light text-foreground/80">Certifications</span>
            </div>
        </div>
    );

    return (
        <hero className='flex pt-[4%] w-full flex-col h-full justify-between relative'>
            <BackgroundRippleEffect
                rows={isDesktop ? 10 : 6}
                cols={isDesktop ? 23 : 8}
                cellSize={isDesktop ? 66 : 50}
                borderColor='var(--ripple-border)'
                fillColor='var(--ripple-fill)'
            />

            {/* ── TOP: Text + Image ────────────────────────────────────── */}
            <div className='flex flex-col lg:flex-row flex-5 w-full lg:h-[70%] items-center'>

                {/* Text block — centered on mobile, left-aligned on desktop */}
                <div className='flex flex-col items-center lg:items-start lg:inline-block px-6 lg:pl-30 flex-1 lg:h-full lg:justify-evenly leading-2 relative text-center lg:text-left'>
                    <p className='text-xl lg:text-3xl mb-2 lg:mb-2.5 lg:pl-1 mt-4 lg:mt-1 font-medium'>Hello, I'm</p>

                    <p className='text-4xl md:text-5xl lg:text-7xl mr-0 lg:mr-2 font-semibold bg-linear-to-t from-slate-800 to-slate-500 dark:from-slate-50 dark:to-slate-300 bg-clip-text text-transparent drop-shadow-sm'>
                        KAUSHLENDRA
                    </p>
                    <p className='text-3xl md:text-4xl lg:text-6xl mt-1.5 lg:mt-2.5 font-semibold bg-linear-to-t from-slate-800 to-slate-500 dark:from-slate-50 dark:to-slate-100 bg-clip-text text-transparent drop-shadow-sm'>
                        PRATAP SINGH
                    </p>

                    <div className='mt-4 lg:mt-5.5 min-h-20 sm:min-h-0'>
                        <p className='inline-block text-lg lg:text-2xl ml-0 lg:ml-1 font-medium'>I am a </p>
                        <FlipWords words={words} className={'text-sky-500! dark:text-slate-50! dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] text-xl lg:text-3xl'} />
                    </div>
                </div>

                {/* Image — below text on mobile, right side on desktop */}
                <div className='shrink-0 lg:flex-1 lg:h-full place-items-center flex justify-center my-10 lg:mt-0'>
                    <div className="relative lg:h-[90%] rounded-4xl">
                        <div className='lg:-mr-8'>
                            <BackgroundGradient className={'h-50 lg:h-70'} containerClassName={'lg:mt-[-25px]'} >
                                <img
                                    className='relative z-10 h-full w-auto object-cover rounded-[20px] border border-sky-200/50 dark:border-slate-300/50 shadow-lg dark:shadow-[0_0_30px_rgba(203,213,225,0.3)]'
                                    src={portfolioImage}
                                    alt="Portfolio Image"
                                />
                            </BackgroundGradient>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── BOTTOM: Stats grid ───────────────────────────────────── */}
            <div className='w-full flex-2 items-center flex justify-evenly mb-2'>
                <div className='w-full flex-2 items-center flex justify-evenly mb-2'>
                    <div className="w-full flex justify-center -mt-2 lg:-mt-12 relative z-10 px-4">

                        {/* DESKTOP ONLY: WobbleCard */}
                        <WobbleCard
                            // FIXED: Moved 'hidden lg:block' to the containerClassName so the entire component hides on mobile
                            containerClassName="hidden lg:block max-w-4xl w-full bg-background dark:bg-[#0c0c0c] border-sky-500 dark:border-slate-300 border-[1.5px] rounded-2xl min-h-[150px] h-auto shadow-[inset_0_0_40px_rgba(14,165,233,0.5)] dark:shadow-[inset_0_0_50px_rgba(255,255,255,0.4),0_0_15px_rgba(255,255,255,0.15)]"
                            className="h-full w-full flex-col items-center justify-center p-6"
                        >
                            {statsGrid}
                        </WobbleCard>

                        {/* MOBILE ONLY: Static Div */}
                        <div className="lg:hidden max-w-md w-full bg-background dark:bg-[#0c0c0c] border-sky-500 dark:border-slate-300 border-[1.5px] rounded-2xl py-6 px-4 shadow-[inset_0_0_30px_rgba(14,165,233,0.3)] dark:shadow-[inset_0_0_30px_rgba(255,255,255,0.2)]">
                            {statsGrid}
                        </div>

                    </div>
                </div>
            </div>
        </hero>
    )
}

export default HeroSection;