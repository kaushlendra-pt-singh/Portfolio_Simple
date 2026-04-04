import React from 'react'
import portfolioImage from '../assets/PortfolioImage.png';
import { GlowingEffect } from '../components/ui/glowing-effect.jsx';
import { WobbleCard } from '../components/ui/wobble-card.jsx';
import { TypewriterEffect } from '../components/ui/typewriter-effect.jsx';
import { BackgroundGradient } from '../components/ui/background-gradient.jsx';
import { FlipWords } from '../components/ui/flip-words.jsx';
import { BackgroundRippleEffect } from '../components/ui/background-ripple-effect.jsx';

function MainSection() {
    const words = ['Full Stack Web Developer.', 'AI/ML Engineer.', 'Tech Enthusiast.']
    return (
        <main className='flex pt-[4%] w-full flex-col h-full justify-between relative'>
            <BackgroundRippleEffect rows={11} cols={25} cellSize={48} borderColor='rgba(59, 130, 246, 0.3)' fillColor='rgba(14, 165, 233, 0.4)' />
            <div className='flex flex-5 w-full h-[70%] items-center'>
                <div className='inline-block pl-10 pt-8 flex-1 h-full justify-evenly leading-2 relative'>
                    <p className='text-4xl mb-2.5 pl-1 mt-1'>Hi there, It's</p>
                    <p className='text-8xl mr-2 font-heading'>KAUSHLENDRA</p>
                    <p className='text-7xl mt-2.5 font-heading'>PRATAP SINGH</p>
                    <p className='mt-5.5 inline-block text-2xl ml-1'>I am a </p>
                    <FlipWords words={words} className={'text-sky-500! text-3xl'} />
                </div>
                <div className='flex-1 h-full place-items-center flex justify-center'>
                    {/* 1. The Parent MUST be relative so the glow stays inside */}
                    <div className="relative h-[90%] rounded-4xl">

                        {/* 2. The Glowing Effect (Set disabled to false!) */}
                        {/* <GlowingEffect disabled={false} spread={50} glow={true} borderWidth={1.5} proximity={20} /> */}

                        {/* 3. The Image sits next to it, with relative and z-10 to stay on top of the glow */}
                        <div>
                            <BackgroundGradient className={'h-80'} containerClassName={'mb-5 mt-[-25px]'} >
                                <img
                                    className='relative z-10 h-full w-auto object-cover rounded-[20px] border border-border/50'
                                    src={portfolioImage}
                                    alt="Portfolio Image"
                                />
                            </BackgroundGradient>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex-2 items-center flex justify-evenly mb-2'>
                <div className="w-full flex justify-center">
                    {/* Added the custom inset shadow right here in the containerClassName */}
                    <WobbleCard
                        containerClassName="max-w-4xl w-full bg-background border-sky-500 border-[1.5px] rounded-2xl min-h-0 h-[150px] shadow-[inset_0_0_40px_rgba(14,165,233,0.5)]"
                        className="flex items-center justify-center"
                    >
                        <p className="text-center text-foreground/80 text-sm md:text-base font-light tracking-wide drop-shadow-[15px_15px_15px_rgba(0,0,211,0.5)]">
                            A Full Stack & AI/ML Engineer specializing in the intersection of intelligent systems and immersive web design.
                            I architect scalable backend infrastructure, integrate cutting-edge machine learning models, and deliver it all
                            through pixel-perfect, high-performance user interfaces.
                        </p>
                    </WobbleCard>
                </div>
            </div>
        </main>
    )
}

export default MainSection
