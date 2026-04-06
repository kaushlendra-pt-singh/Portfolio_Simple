import { motion as Motion } from "motion/react";
import { StickyScroll } from "../components/ui/sticky_scroll.jsx";
import LapMan from '../assets/man_on_laptop.jpg';
import MachinArch from '../assets/Coding_Blue.jpg';
import CodingLap from '../assets/My_Way_Better.jpg';
import GenericStand from '../assets/generic_stand_dark.jpg';


export default function AboutSection() {
    const content = [
        {
            title: 'Professional Me',
            description: "I'm a Full Stack & AI/ML Engineer who thrives at the intersection of intelligent systems and immersive web design. I specialize in transforming complex data and machine learning architectures into clean, high-performance, and beautifully interactive web applications.",
            content: (
                <div className="">
                    <img src={LapMan} alt="" className="w-100 rounded-xl shadow-2xl object-cover" />
                </div>
            )
        },
        {
            title: 'Present',
            description: "Right now, my focus is on bridging the gap between heavy backend logic and pixel-perfect frontends. I build dynamic user interfaces using React and Next.js, and power them with robust, scalable Python and Node.js backends. Lately, I've been diving deep into integrating cutting-edge LLMs and custom deep learning models directly into practical, real-world products. I am also actively engaging with the open-source community to continually sharpen my skills and contribute to impactful projects.",
            content: (
                <div>
                    <img src={MachinArch} alt="" className="w-100 rounded-xl shadow-2xl object-cover" />
                </div>
            )
        },
        {
            title: 'My Way',
            description: "I believe great software shouldn't just function well—it should feel effortless to use. My engineering philosophy revolves around writing clean, maintainable code and architecting resilient infrastructure that never compromises on the user experience. Whether I'm debugging a complex API routing issue, optimizing database queries, or obsessing over the perfect transition timing function in Tailwind CSS, I care deeply about the fine details.",
            content: (
                <div>
                    <img src={CodingLap} alt="" className="w-100 rounded-xl shadow-2xl object-cover" />
                </div>
            )
        },
        {
            title: 'Me Beyond Profession',
            description: "When I'm not training models, fixing CORS errors, or tweaking UI components, you can usually find me exploring expansive high-fantasy worlds, catching up on my favorite cinematic universes, or following the latest cricket season. I'm always looking for the next big challenge—both in my code editor and out in the real world.",
            content: (
                <div>
                    <img src={GenericStand} alt="" className="w-100 h-auto rounded-xl shadow-2xl object-cover" />
                </div>
            )
        },
    ]
    return (
        // A React Fragment to wrap the two distinct sections
        <>
            <section className="flex h-screen w-full flex-col bg-background px-4 py-4 overflow-hidden">

                <Motion.h1
                    initial={{ opacity: 0.5, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut" }}
                    // 1. Stacked drop-shadows: One tight & bright (20px), one wide & diffuse (60px)
                    className="shrink-0 bg-linear-to-br from-slate-800 to-slate-500 dark:from-slate-300 dark:to-slate-500 pb-2 bg-clip-text text-center text-3xl font-bold font-heading tracking-tight text-transparent md:text-4xl lg:text-5xl drop-shadow-[0_0_60px_rgba(56,189,248,0.5)]"
                >
                    ABOUT ME
                </Motion.h1>
                <div className="relative mt-1.5 mb-3 w-full flex-1 overflow-hidden">
                    <StickyScroll content={content} />
                </div>
                <div className="shrink-0 flex justify-center">
                    <Motion.a
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                        href="#" // Add your actual link!
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-sky-500 px-8 py-3 font-body font-medium text-white shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all hover:scale-105 hover:bg-sky-400 hover:shadow-[0_0_40px_rgba(56,189,248,0.8)]"
                    >
                        Download Resume
                    </Motion.a>
                </div>
            </section>
        </>
    );
}