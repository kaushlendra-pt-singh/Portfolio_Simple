import { motion as Motion } from "motion/react";
import { StickyScroll } from "../components/ui/sticky_scroll.jsx";
import LapMan from '../assets/man_on_laptop.jpg';
import MachinArch from '../assets/machine_arch.jpg';
import CodingLap from '../assets/coding_elements_light.jpg';
import GenericStand from '../assets/generic_stand_dark.jpg';


export default function AboutSection() {
    const content = [
        {
            title:'Professional Me',
            description:"I'm a Full Stack & AI/ML Engineer who thrives at the intersection of intelligent systems and immersive web design. I specialize in transforming complex data and machine learning architectures into clean, high-performance, and beautifully interactive web applications.",
            content:(
                <div className="">
                    <img src={LapMan} alt="" className="w-100 rounded-xl shadow-2xl object-cover" />
                </div>
            )
        },
        {
            title:'Present',
            description:"Right now, my focus is on bridging the gap between heavy backend logic and pixel-perfect frontends. I build dynamic user interfaces using React and Next.js, and power them with robust, scalable Python and Node.js backends. Lately, I've been diving deep into integrating cutting-edge LLMs and custom deep learning models directly into practical, real-world products. I am also actively engaging with the open-source community to continually sharpen my skills and contribute to impactful projects.",
            content:(
                <div>
                    <img src={MachinArch} alt="" className="w-80 rounded-xl shadow-2xl object-cover" />
                </div>
            )
        },
        {
            title:'My Way',
            description:"I believe great software shouldn't just function well—it should feel effortless to use. My engineering philosophy revolves around writing clean, maintainable code and architecting resilient infrastructure that never compromises on the user experience. Whether I'm debugging a complex API routing issue, optimizing database queries, or obsessing over the perfect transition timing function in Tailwind CSS, I care deeply about the fine details.",
            content:(
                <div>
                    <img src={CodingLap} alt="" className="w-80 h-auto rounded-xl shadow-2xl object-cover" />
                </div>
            )
        },
        {
            title:'Me Beyond Profession',
            description:"When I'm not training models, fixing CORS errors, or tweaking UI components, you can usually find me exploring expansive high-fantasy worlds, catching up on my favorite cinematic universes, or following the latest cricket season. I'm always looking for the next big challenge—both in my code editor and out in the real world.",
            content:(
                <div>
                    <img src={GenericStand} alt="" className="w-100 h-auto rounded-xl shadow-2xl object-cover" />
                </div>
            )
        },
    ]
    return (
        // A React Fragment to wrap the two distinct sections
        <>
            {/* --- TOP: Full Screen Hero (Exactly 100vh) --- */}
            <section className="relative flex h-screen w-full flex-col items-center justify-center bg-background px-4">
                
                <Motion.h1
                    initial={{ opacity: 0.5, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut" }}
                    // 1. Stacked drop-shadows: One tight & bright (20px), one wide & diffuse (60px)
                    className="bg-linear-to-br from-slate-800 to-slate-500 dark:from-slate-300 dark:to-slate-500 py-4 bg-clip-text text-center text-6xl font-heading tracking-tight text-transparent md:text-8xl drop-shadow-[0_0_60px_rgba(56,189,248,0.7)]"
                >
                    ABOUT ME
                </Motion.h1>

                <Motion.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                    // 2. Button shadow also boosted slightly to match the intense text glow
                    className="mt-8 rounded-full bg-sky-500 px-8 py-3 font-body font-medium text-white shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all hover:bg-sky-400 hover:cursor-pointer hover:scale-105 hover:shadow-[0_0_40px_rgba(56,189,248,0.8)]"
                >
                    Download Resume
                </Motion.a>
            </section>

            {/* --- BOTTOM: The Parallax Container (Starts completely off-screen) --- */}
            <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4">
                {/* Your paragraphs will live here, waiting to be scrolled into view */}
                <StickyScroll content={content} />
            </section>
        </>
    );
}