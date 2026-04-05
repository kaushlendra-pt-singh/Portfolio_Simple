import React from 'react'
import { CardContainer, CardBody, CardItem } from '../components/ui/3d-card';
import { motion as Motion } from 'framer-motion';

function ProjectCards({ image, text, title }) {
    return (
        // 1. Force the 3D containers to be exactly 100% height of the grid slot
        <CardContainer className="inter-var w-full h-full" containerClassName="h-full w-full">

            <CardBody className="group/card relative flex h-full w-full flex-col items-center justify-between gap-3 rounded-2xl border border-sky-300/80 bg-background p-5 shadow-[0_0_40px_rgba(56,189,248,0.4)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,0,0,0.18)] dark:border-slate-800 dark:shadow-[0_0_40px_rgba(0,0,0,0.5)]">

                {/* --- TOP: Title & Text (shrink-0 so they don't get squashed) --- */}
                <div className="flex w-full flex-col items-center gap-1 shrink-0">
                    <CardItem translateZ={50} className="w-full">
                        <h2 className='text-center font-heading text-lg md:text-xl font-bold text-foreground leading-tight line-clamp-1'>
                            {title}
                        </h2>
                    </CardItem>

                    <CardItem translateZ={60} className="w-full">
                        <p className='text-center font-body text-xs md:text-sm text-foreground/70 line-clamp-2'>
                            {text}
                        </p>
                    </CardItem>
                </div>

                {/* --- MIDDLE: Image (flex-1 min-h-0 dynamically absorbs all remaining space) --- */}
                <CardItem translateZ={100} className="w-full flex-1 min-h-0 flex flex-col justify-center my-2">
                    <img
                        src={image}
                        // NO FIXED PIXELS. h-full w-full object-cover ensures it perfectly fills the dynamic gap
                        className='h-full w-full rounded-xl object-cover shadow-lg'
                        alt={title}
                    />
                </CardItem>

                {/* --- BOTTOM: Button (shrink-0) --- */}
                <CardItem translateZ={40} className="mt-auto w-full flex justify-center shrink-0">
                    <Motion.a
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        href='https://github.com/kaushlendra-pt-singh'
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-sky-500 px-6 py-2 font-body text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:bg-sky-400 hover:shadow-sky-500/50"
                    >
                        Try It Out
                    </Motion.a>
                </CardItem>

            </CardBody>
        </CardContainer>
    )
}

export default ProjectCards