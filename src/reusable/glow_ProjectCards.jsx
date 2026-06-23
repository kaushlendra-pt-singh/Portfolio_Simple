import React from 'react';
import { BulletList, TagRow, Tip, Highlight } from '../Sections/AboutSection.jsx';
import { motion as Motion } from 'framer-motion';
import { GlowingEffect } from '../components/ui/glowing-effect.jsx';
import { Link } from 'react-router';

function GlowProjectCards({ image, text, title, repoLink, liveLink, tags, stats, tagColor }) {
    const hasLiveLink = liveLink && liveLink.trim() !== '';

    return (
        /* 1. OUTER WRAPPER: Must be relative so the GlowingEffect tracks it. 
           Crucially, NO overflow-hidden here, so the glow can breathe outwards! */
        <div className="relative flex w-full h-full">

            {/* 2. THE GLOW: Exact same props (spread, proximity, rounded-2xl) as ContactSection */}
            <GlowingEffect disabled={false} spread={30} glow={true} borderWidth={2} proximity={30} className={'rounded-2xl'} inactivezone={0.1} />

            {/* 3. THE CARD: Exact same glassmorphism, shadows, and borders as your Contact Form */}
            <div className="relative z-10 flex flex-col h-full w-full rounded-2xl border border-slate-200/80 bg-white/50 p-3 gap-2 shadow-[0_0_40px_rgba(56,189,248,0.5)] backdrop-blur-md transition-all dark:border-slate-700/50 dark:bg-slate-900/50 dark:shadow-[0_0_40px_rgba(150,150,150,0.3)] group">

                {/* Row 1: Title (Small, Bold, 1-Line Truncated) */}
                <h1 className="text-lg text-center font-heading font-bold text-slate-800 dark:text-slate-100 truncate w-full">
                    {title}
                </h1>

                {/* Row 2: Image (Left) + Desc (Right) */}
                <div className="flex flex-row items-start gap-3 w-full">
                    <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 overflow-hidden rounded-lg border border-border">
                        <img
                            src={image}
                            alt="Project"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                    <p className="text-base font-body font-light text-foreground/80 leading-tight line-clamp-4">
                        {text}
                    </p>
                </div>

                {/* Row 3: Tags (Scaled down to fit tightly) */}
                <div className="w-full scale-95 origin-left -my-1">
                    <TagRow tags={tags} color={tagColor} />
                </div>

                {/* Row 4: Stats (Bullet Points scaled down) */}
                <div className="flex-1 text-xs w-full">
                    <BulletList items={stats} />
                </div>

                {/* Row 5: Action Buttons (Smaller padding and fonts) */}
                <div className="mt-auto pt-1 flex flex-row gap-2 w-full">
                    {hasLiveLink ? (
                        <Motion.a
                            initial={{ opacity: 0, y: 5 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.2 }}
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center rounded-full px-3 py-1.5 font-body text-xs font-medium transition-all hover:scale-105 bg-sky-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:shadow-[0_0_30px_rgba(56,189,248,0.7)] hover:bg-sky-400 dark:bg-slate-200/90 dark:text-slate-900 dark:shadow-[0_0_10px_rgba(150,180,180,0.6)] dark:hover:bg-slate-100/80 dark:hover:shadow-[0_0_40px_rgba(203,213,225,0.4)]"
                        >
                            Try It Out
                        </Motion.a>
                    ) : (
                        <Link
                            to="/coming-soon"
                            className="flex-1 text-center rounded-full px-3 py-1.5 font-body text-xs font-medium transition-all hover:scale-105 bg-surface text-foreground border border-border hover:bg-gray-200 dark:hover:bg-slate-800"
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
                        className="flex-1 text-center rounded-full px-3 py-1.5 font-body text-xs font-medium transition-all hover:scale-105 bg-transparent text-sky-500 dark:text-foreground border border-sky-500 dark:border-slate-300 hover:bg-sky-100 dark:hover:bg-slate-200/20"
                    >
                        Visit Repo
                    </Motion.a>
                </div>

            </div>
        </div>
    )
}

export default GlowProjectCards;