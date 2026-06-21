import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { GlowingEffect } from '../components/ui/glowing-effect';
import { FloatingDock } from '../components/ui/floating-dock';
import { IconBrandX, IconBrandLinkedin, IconBrandGithub, IconBrandInstagram, IconBrandGmail } from "@tabler/icons-react";

export default function ContactSection() {
    const formRef = useRef();
    const [status, setStatus] = useState('Send Message');
    const items = [
        {
            title: 'X',
            icon: (
                <IconBrandX className="h-full w-full text-neutral-600 transition-colors duration-300 hover:text-black dark:text-neutral-300 dark:hover:text-white" />
            ),
            href: 'https://x.com/KAUSHLENDRA9569'
        },
        {
            title: 'Instagram',
            icon: (
                /* Using a pinkish-purple hover to match the Instagram brand */
                <IconBrandInstagram className="h-full w-full text-neutral-600 transition-all duration-300 hover:text-[#833AB4] dark:text-neutral-300 dark:hover:text-[#C13584]" />
            ),
            href: 'https://www.instagram.com/kaushlendrapratapsingh__/' // Add your handle here
        },
        {
            title: 'LinkedIn',
            icon: (
                <IconBrandLinkedin className="h-full w-full text-neutral-600 transition-colors duration-300 hover:text-[#0A66C2] dark:text-neutral-300 dark:hover:text-[#0A66C2]" />
            ),
            href: 'https://www.linkedin.com/in/kaushlendra-pt-singh/'
        },
        {
            title: 'GitHub',
            icon: (
                <IconBrandGithub className="h-full w-full text-neutral-600 transition-colors duration-300 hover:text-black dark:text-neutral-300 dark:hover:text-white" />
            ),
            href: 'https://github.com/kaushlendra-pt-singh'
        },
        {
            title: 'Gmail',
            icon: (
                <IconBrandGmail className="h-full w-full text-neutral-600 transition-all duration-300 hover:text-red-500 dark:text-neutral-300 dark:hover:text-red-400" />
            ),
            href: 'mailto:kaushlendrapratapsingh631@gmail.com?subject=Regarding%20Your%20Portfolio'
        },
    ];

    // Grabbing environment variables using Vite syntax
    const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const public_key = import.meta.env.VITE_EMAILJS_PUBLIC_ID;

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('Sending...');

        emailjs.sendForm(
            service,
            template,
            formRef.current,
            public_key
        ).then(
            (result) => {
                console.log(result.text);
                setStatus('Message Sent!');
                formRef.current.reset(); // Clear the form after success

                // Reset the button text after 3 seconds
                setTimeout(() => setStatus('Send Message'), 3000);
            },
            (error) => {
                console.log(error.text);
                setStatus('Error. Try Again.');
            }
        );
    };

    return (
        // 1. STRICT h-screen wrapper
        <section className='flex h-screen w-full flex-col bg-background pt-6 overflow-hidden'>

            {/* 2. TOP HEADER: Removed the massive bottom margins so it doesn't push the form down */}
            <Motion.h1
                initial={{ opacity: 0.5, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut" }}
                className="shrink-0 bg-linear-to-t from-slate-800 to-slate-500 dark:from-slate-50 dark:to-slate-500 py-2 bg-clip-text text-center text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.5)] dark:drop-shadow-[0_0_30px_rgba(150,150,150,0.5)]"
            >
                CONTACT
            </Motion.h1>

            {/* 3. MIDDLE AREA: Removed mt-8. Let flex-1 and items-center naturally float the content in the exact middle. */}
            <div className='flex w-full flex-1 items-center justify-center min-h-0'>
                {/* max-w-5xl and px-8 lg:px-16 forces it away from the edges, giving it that relaxed breathing room */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 w-full max-w-5xl px-8 lg:px-16 h-auto'>

                    {/* LEFT COLUMN: Scaled down text sizes */}
                    <Motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        // Reduced space-y-4 to space-y-3 so it stays tight and compact
                        className="flex flex-col justify-center space-y-3"
                    >
                        {/* 1. TEXT SCALED DOWN: Now text-2xl to 3xl */}
                        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground leading-tight">
                            Let's build <br />
                            <span className="text-sky-500 dark:text-slate-50! dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">something together.</span>
                        </h2>

                        {/* 2. TEXT SCALED DOWN: Now text-sm to match the smaller form */}
                        <p className="text-base font-body text-foreground/70 max-w-sm leading-relaxed">
                            Want to collaborate or have a question? Drop a message below and I'll try to connect as soon as possible.
                        </p>

                        {/* 3. DOCK WRAPPER: This forces the FloatingDock to behave inside the flex column */}
                        <div className="pt-4 mt-6 relative z-10 flex w-full justify-start">
                            <FloatingDock
                                items={items}
                                // ml-0 and mr-auto overrides Aceternity's default mx-auto, forcing it to align left with your text!
                                desktopClassName="bg-background! ml-0 mr-auto bg-white/50 dark:bg-slate-900/50 border border-sky-300/80 dark:border-slate-600/50"
                                mobileClassName="translate-y-0"
                            />
                        </div>
                    </Motion.div>

                    {/* RIGHT COLUMN: The Form - Scaled down paddings and gaps */}
                    <Motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex w-full items-center lg:justify-end relative"
                    >
                        <GlowingEffect disabled={false} spread={30} glow={true} borderWidth={1.5} proximity={20} className={'rounded-2xl'} inactivezone={0.1} />
                        <form
                            ref={formRef}
                            onSubmit={sendEmail}
                            // Form max-width tightened to max-w-md, gap reduced to gap-4, padding to p-6
                            className='flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/50 p-5 shadow-[0_0_40px_rgba(56,189,248,0.4)] backdrop-blur-md transition-all dark:border-slate-700/50 dark:bg-slate-900/50 dark:shadow-[0_0_40px_rgba(150,150,150,0.4)]'
                        >
                            {/* Time stamp */}
                            <input type="hidden" name="time" value={new Date().toLocaleString()} />
                            {/* Name Input */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-foreground/80 font-body">Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    required
                                    placeholder="John Doe"
                                    // Padding reduced to py-2.5
                                    className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all dark:border-slate-700 dark:focus:border-slate-300 dark:focus:ring-slate-300"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-foreground/80 font-body">Email</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    placeholder="john@example.com"
                                    className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all dark:border-slate-700 dark:focus:border-slate-300 dark:focus:ring-slate-300"
                                />
                            </div>

                            {/* Message Textarea */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-foreground/80 font-body">Message</label>
                                <textarea
                                    name="user_message"
                                    required
                                    placeholder="What's on your mind?"
                                    // Height reduced to min-h-[100px]
                                    className="w-full min-h-25 resize-none rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all dark:border-slate-700 dark:focus:border-slate-300 dark:focus:ring-slate-300"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={status === 'Sending...'}
                                // Padding reduced to py-2.5
                                className="cursor-pointer mt-1 w-full rounded-full px-8 py-2.5 font-body text-sm font-medium transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 
                                
                                /* LIGHT MODE: Explicit blue background and blue glow */
                                bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)] hover:bg-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.8)] 
                                
                                /* DARK MODE: Explicit bright white background and pure white peak-brightness glow */
                                dark:bg-slate-200/90 dark:text-slate-900 dark:shadow-[0_0_15px_rgba(255,255,255,0.4)] dark:hover:bg-slate-100/80 dark:hover:shadow-[0_0_35px_rgba(255,255,255,0.6)]"
                            >
                                {status}
                            </button>
                        </form>
                    </Motion.div>

                </div>
            </div>

            {/* 4. FOOTER: Adjusted padding slightly */}
            <footer className='shrink-0 w-full border-t border-slate-200/60 dark:border-slate-800/60 py-4 text-center px-4'>
                <p className="text-xs font-body text-foreground/50">
                    &copy; {new Date().getFullYear()} Kaushlendra Pratap Singh. All rights reserved.
                </p>
            </footer>

        </section>
    );
}