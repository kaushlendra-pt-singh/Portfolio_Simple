import React from 'react';
import { BulletList, TagRow, Tip, Highlight } from '../Sections/AboutSection.jsx';
import { motion as Motion } from 'framer-motion';
import { GlowingEffect } from '../components/ui/glowing-effect.jsx';
import { Link } from 'react-router';

function GlowProjectCards({ image, text, title, repoLink, liveLink, tags, stats, tagColor, isDesktop = true }) {
    const hasLiveLink = liveLink && liveLink.trim() !== '';

    return (
        <div className={`relative flex w-full m-3 mt-5 ${isDesktop ? 'h-[90%]' : 'h-auto'}`}>

            {/* Glow effect: disabled on mobile */}
            <GlowingEffect disabled={!isDesktop} spread={30} glow={true} borderWidth={2} proximity={30} className={'rounded-2xl'} inactivezone={0.1} />

            <div className={`relative z-10 flex flex-col h-full w-full rounded-2xl border border-slate-200/80 bg-white/50 p-2.5 gap-1.5 backdrop-blur-md transition-all dark:border-slate-700/50 dark:bg-slate-900/50 group
                ${isDesktop
                    ? 'shadow-[0_0_40px_rgba(56,189,248,0.5)] dark:shadow-[0_0_30px_rgba(150,150,150,0.3)]'
                    : 'shadow-[0_0_40px_rgba(56,189,248,0.4)] dark:shadow-[0_0_30px_rgba(150,150,150,0.3)]'
                }`}
            >

                <h1 className="text-base md:text-xl text-center font-heading font-bold text-slate-800 dark:text-slate-100 truncate w-full p-3">
                    {title}
                </h1>

                <div className="flex flex-row items-start gap-2.5 w-full md:mb-4">
                    <div className="w-16 h-16 md:w-30 md:mr-4 md:h-20 shrink-0 overflow-hidden rounded-lg border border-border">
                        <img
                            src={image}
                            alt="Project"
                            className={`w-full h-full object-cover transition-transform duration-500 ${isDesktop ? 'group-hover:scale-110' : ''}`}
                        />
                    </div>
                    <p className="text-sm md:text-lg font-body font-light text-foreground/80 leading-tight line-clamp-3">
                        {text}
                    </p>
                </div>

                <div className="w-full scale-95 origin-left my-1.5">
                    <TagRow tags={tags} color={tagColor} />
                </div>

                <div className="flex-1 text-base w-full mb-3">
                    <BulletList items={stats} />
                </div>

                <div className="mt-auto flex flex-row gap-2 w-full">
                    {hasLiveLink ? (
                        <Motion.a
                            initial={{ opacity: 0, y: 5 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.2 }}
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 text-center rounded-full px-3 py-1.5 font-body text-base font-medium transition-all bg-sky-500 text-white dark:bg-slate-200/90 dark:text-slate-900
                                ${isDesktop
                                    ? 'hover:scale-105 shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:shadow-[0_0_30px_rgba(56,189,248,0.7)] hover:bg-sky-400 dark:shadow-[0_0_10px_rgba(150,180,180,0.6)] dark:hover:bg-slate-100/80 dark:hover:shadow-[0_0_30px_rgba(203,213,225,0.4)]'
                                    : 'active:scale-95 shadow-sm'
                                }`}
                        >
                            Try It Out
                        </Motion.a>
                    ) : (
                        <Link
                            to="/coming-soon"
                            className={`flex-1 text-center rounded-full px-3 py-1.5 font-body text-base font-medium transition-all bg-surface text-foreground border border-border
                                ${isDesktop ? 'hover:scale-105 hover:bg-gray-200 dark:hover:bg-slate-800' : 'active:scale-95'}`}
                        >
                            Coming Soon
                        </Link>
                    )}

                    <Motion.a
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.2 }}
                        href={repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 text-center rounded-full px-3 py-1.5 font-body text-base font-medium transition-all bg-transparent text-sky-500 dark:text-foreground border border-sky-500 dark:border-slate-300
                            ${isDesktop ? 'hover:scale-105 hover:bg-sky-100 dark:hover:bg-slate-200/20' : 'active:scale-95'}`}
                    >
                        Visit Repo
                    </Motion.a>
                </div>

            </div>
        </div>
    )
}

export default GlowProjectCards;