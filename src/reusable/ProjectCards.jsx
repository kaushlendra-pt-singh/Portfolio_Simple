import React from 'react'
import { CardContainer, CardBody, CardItem } from '../components/ui/3d-card';
import { motion as Motion } from 'framer-motion';

function ProjectCards({ image, text, title }) {
    return (
        <div>
            <CardContainer className="inter-var w-[90%]">
                {/* 1. THE FIX: Removed backdrop-blur, set to bg-background, and added a massive, even shadow around all sides: shadow-[0_0_40px_rgba(0,0,0,0.12)] */}
                <CardBody className="group/card relative flex h-full w-full flex-col items-center justify-between gap-6 rounded-2xl border border-sky-300/80 bg-background p-6 shadow-[0_0_40px_rgba(56,189,248,0.4)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,0,0,0.18)] dark:border-slate-800 dark:shadow-[0_0_40px_rgba(0,0,0,0.5)]">

                    <CardItem translateZ={50} className="w-full">
                        <h2 className='text-center font-heading text-2xl font-bold text-foreground'>
                            {title}
                        </h2>
                    </CardItem>

                    <CardItem translateZ={60} className="w-full">
                        <p className='text-center font-body text-sm text-foreground/70'>
                            {text}
                        </p>
                    </CardItem>

                    {/* 2. THE 3D POP: With the blur removed from the parent, translateZ=100 will now physically push this image outward again! */}
                    <CardItem translateZ={100} className="w-full mt-auto">
                        <img
                            src={image}
                            className='h-48 w-full rounded-xl object-cover shadow-lg'
                            alt="Sentiment Analysis Dashboard"
                        />
                    </CardItem>

                    <CardItem translateZ={40} className="mt-4 w-full flex justify-center">
                        <Motion.a
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            href='https://github.com/kaushlendra0607'
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-sky-500 px-8 py-3 font-body font-medium text-white shadow-lg transition-all hover:scale-105 hover:bg-sky-400 hover:shadow-sky-500/50"
                        >
                            Try It Out
                        </Motion.a>
                    </CardItem>
                </CardBody>
            </CardContainer>
        </div>
    )
}

export default ProjectCards
