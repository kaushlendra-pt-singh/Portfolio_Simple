import React from 'react'
import portfolioImage from '../assets/My_Pic.jpeg';
import { WobbleCard } from '../components/ui/wobble-card.jsx';
import { BackgroundGradient } from '../components/ui/background-gradient.jsx';
import { FlipWords } from '../components/ui/flip-words.jsx';
import { BackgroundRippleEffect } from '../components/ui/background-ripple-effect.jsx';

function HeroSection() {
    const words = ['Full Stack Web Developer.', 'AI/ML Engineer.', 'Tech Enthusiast.']

    return (
        <hero className='flex pt-[4%] w-full flex-col h-full justify-between relative'>
            <BackgroundRippleEffect
                rows={10}
                cols={23}
                cellSize={66}
                borderColor='var(--ripple-border)'
                fillColor='var(--ripple-fill)'
            />

            <div className='flex flex-5 w-full h-[70%] items-center'>
                <div className='ml-6 inline-block pl-10 flex-1 h-full justify-evenly leading-2 relative'>
                    <p className='text-3xl mb-2.5 pl-1 mt-1 font-medium'>Hello, I'm</p>

                    <p className='text-7xl mr-2 font-heading bg-linear-to-t from-slate-800 to-slate-500 dark:from-slate-50 dark:to-slate-300 bg-clip-text text-transparent drop-shadow-sm'>
                        KAUSHLENDRA
                    </p>
                    <p className='text-6xl mt-2.5 font-heading bg-linear-to-t from-slate-800 to-slate-500 dark:from-slate-50 dark:to-slate-300 bg-clip-text text-transparent drop-shadow-sm'>
                        PRATAP SINGH
                    </p>

                    <p className='mt-5.5 inline-block text-2xl ml-1 font-medium'>I am a </p>
                    <FlipWords words={words} className={'text-sky-500! dark:text-slate-50! dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] text-3xl'} />
                </div>

                <div className='flex-1 h-full place-items-center flex justify-center'>
                    <div className="relative h-[90%] rounded-4xl">
                        <div className='-mr-8'>
                            <BackgroundGradient className={'h-65'} containerClassName={'mt-[-25px]'} >
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

            <div className='w-full flex-2 items-center flex justify-evenly mb-2'>
                <div className="w-full flex justify-center -mt-12 relative z-10 px-4">
                    <WobbleCard
                        // 1. Changed bg-background to dark:bg-[#0c0c0c] for that deep, smooth black.
                        // 2. Added a two-part shadow: A brighter inset shadow + a subtle outer glow [0_0_15px_rgba(...)]
                        containerClassName="max-w-4xl w-full bg-background dark:bg-[#0c0c0c] border-sky-500 dark:border-slate-300 border-[1.5px] rounded-2xl min-h-0 h-[150px] shadow-[inset_0_0_40px_rgba(14,165,233,0.5)] dark:shadow-[inset_0_0_50px_rgba(255,255,255,0.4),0_0_15px_rgba(255,255,255,0.15)]"
                        className="flex h-full w-full flex-col items-center justify-center p-6"
                    >
                        {/* Slightly boosted the text drop-shadow to match the new border intensity */}
                        {/* Replaced Paragraph with a 6-Point Statistics Grid */}
                        <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2 text-center drop-shadow-[10px_10px_15px_rgba(0,0,211,0.3)] dark:drop-shadow-[2px_2px_10px_rgba(255,255,255,0.2)]">

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

                            {/* Point 5: Highlighting your specialized tech stack */}
                            <div className="flex flex-col items-center justify-center">
                                <span className="font-heading text-lg md:text-xl font-bold text-sky-600 dark:text-slate-100">Agentic AI</span>
                                <span className="font-body text-xs md:text-sm font-light text-foreground/80">& NLP Focused</span>
                            </div>

                            {/* Point 6: Highlighting your competitive building experience */}
                            <div className="flex flex-col items-center justify-center">
                                <span className="font-heading text-lg md:text-xl font-bold text-sky-600 dark:text-slate-100">3+ Official</span>
                                <span className="font-body text-xs md:text-sm font-light text-foreground/80">Certifications</span>
                            </div>

                        </div>
                    </WobbleCard>
                </div>
            </div>
        </hero>
    )
}

export default HeroSection;