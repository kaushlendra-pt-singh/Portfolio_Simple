import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { GlowingEffect } from '../components/ui/glowing-effect';
import { FloatingDock } from '../components/ui/floating-dock';
import { IconBrandX, IconBrandLinkedin, IconBrandGithub, IconBrandInstagram, IconBrandGmail } from "@tabler/icons-react";

export default function ContactSection({ isDesktop }) {
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
                <IconBrandInstagram className="h-full w-full text-neutral-600 transition-all duration-300 hover:text-[#833AB4] dark:text-neutral-300 dark:hover:text-[#C13584]" />
            ),
            href: 'https://www.instagram.com/kaushlendrapratapsingh__/'
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
                formRef.current.reset();
                setTimeout(() => setStatus('Send Message'), 3000);
            },
            (error) => {
                console.log(error.text);
                setStatus('Error. Try Again.');
            }
        );
    };

    return (
        <section className={`flex w-full flex-col bg-background pt-6 ${isDesktop ? 'h-full' : 'min-h-fit'}`}>

            {/* HEADER */}
            <Motion.h1
                initial={{ opacity: 0.5, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: "easeInOut" }}
                className="shrink-0 bg-linear-to-t from-slate-800 to-slate-500 dark:from-slate-50 dark:to-slate-500 py-2 bg-clip-text text-center text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.5)] dark:drop-shadow-[0_0_30px_rgba(150,150,150,0.5)]"
            >
                CONTACT
            </Motion.h1>

            {/* MIDDLE */}
            <div className='flex w-full flex-1 items-center justify-center min-h-0'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-5xl px-6 lg:px-16 h-auto text-center lg:text-left'>

                    {/* LEFT: Text + Social — on mobile this comes first, then form below */}
                    <Motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex flex-col justify-center items-center lg:items-start space-y-3"
                    >
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
                            Let's build <br />
                            <span className="text-sky-500 dark:text-slate-50! dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">something together.</span>
                        </h2>

                        <p className="text-base md:text-lg font-body text-foreground/80 max-w-sm leading-relaxed">
                            Want to collaborate or have a question? Drop a message below and I'll try to connect as soon as possible.
                        </p>

                        {/* Social icons */}
                        <div className="pt-4 mt-4 lg:mt-8 relative z-10 flex w-full justify-center lg:justify-start">
                            {isDesktop ? (
                                /* Desktop: FloatingDock with spring effect */
                                <FloatingDock
                                    items={items}
                                    desktopClassName="bg-background! ml-0 mr-auto bg-white/50 dark:bg-slate-900/50 border border-sky-300/80 dark:border-slate-600/50"
                                    mobileClassName="translate-y-0"
                                />
                            ) : (
                                /* Mobile: simple horizontal row of icon links — no dock effect */
                                /* FIXED: Added w-full and justify-center to the inner wrapper */
                                <div className="flex w-full items-center justify-center gap-3">
                                    {items.map((item) => (
                                        <a
                                            key={item.title}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-300/50 bg-white/60 dark:border-slate-600/40 dark:bg-slate-800/50 transition-all duration-200 active:scale-90"
                                            aria-label={item.title}
                                        >
                                            <div className="h-5 w-5">{item.icon}</div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Motion.div>

                    {/* RIGHT: Form */}
                    <Motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex mb-10 w-full justify-center lg:justify-end relative"
                    >
                        {/* Glow effect: disabled on mobile */}
                        <GlowingEffect disabled={!isDesktop} spread={30} glow={true} borderWidth={1.5} proximity={20} className={'rounded-2xl'} inactivezone={0.1} />
                        <form
                            ref={formRef}
                            onSubmit={sendEmail}
                            className={`flex w-full h-full max-w-md flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/50 p-5 backdrop-blur-md transition-all dark:border-slate-700/50 dark:bg-slate-900/50
                                ${isDesktop
                                    ? 'shadow-[0_0_40px_rgba(56,189,248,0.4)] dark:shadow-[0_0_30px_rgba(150,150,150,0.4)]'
                                    : 'shadow-[0_0_40px_rgba(56,189,248,0.3)] dark:shadow-[0_0_30px_rgba(150,150,150,0.2)]'
                                }`}
                        >
                            <input type="hidden" name="time" value={new Date().toLocaleString()} />
                            {/* Name */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-foreground/80 font-body">Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    required
                                    placeholder="John Doe"
                                    className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all dark:border-slate-700 dark:focus:border-slate-300 dark:focus:ring-slate-300"
                                />
                            </div>

                            {/* Email */}
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

                            {/* Message */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-foreground/80 font-body">Message</label>
                                <textarea
                                    name="user_message"
                                    required
                                    placeholder="What's on your mind?"
                                    className="w-full min-h-25 resize-none rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all dark:border-slate-700 dark:focus:border-slate-300 dark:focus:ring-slate-300"
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={status === 'Sending...'}
                                className={`cursor-pointer mt-1 w-full rounded-full px-8 py-2.5 font-body text-sm md:text-base font-medium transition-all disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 
                                bg-sky-500 text-white dark:bg-slate-200/90 dark:text-slate-900
                                ${isDesktop
                                        ? 'hover:scale-105 shadow-[0_0_15px_rgba(56,189,248,0.5)] hover:bg-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.8)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)] dark:hover:bg-slate-100/80 dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]'
                                        : 'active:scale-95 shadow-md'
                                    }`}
                            >
                                {status}
                            </button>
                        </form>
                    </Motion.div>

                </div>
            </div>

            {/* FOOTER */}
            <footer className='shrink-0 w-full border-t border-slate-200/60 dark:border-slate-800/60 py-4 text-center px-4'>
                <p className="text-xs font-body text-foreground/50">
                    &copy; {new Date().getFullYear()} Kaushlendra Pratap Singh. All rights reserved.
                </p>
            </footer>

        </section>
    );
}