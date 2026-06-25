import { cn } from "@/lib/utils";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";

export const HoverEffect = ({
    items,
    className
}) => {
    let [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div
            className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4 gap-2", className)}
            onMouseLeave={() => setHoveredIndex(null)}>
            {items.map((item, idx) => {
                const isLink = !!item.link;
                const Component = isLink ? "a" : "div";
                return (
                    <Component
                        href={item?.link}
                        key={item?.link || idx}
                        className="relative group block p-1.5 h-full w-full"
                        onMouseEnter={() => setHoveredIndex(idx)}>
                        <AnimatePresence>
                            {hoveredIndex === idx && (
                                <motion.span
                                    className="absolute inset-0 h-full w-full bg-sky-200 dark:bg-white/10 hidden lg:block rounded-3xl z-0 shadow-[0_0_25px_rgba(56,189,248,0.4)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        transition: { duration: 0.15 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.15, delay: 0.2 },
                                    }} />
                            )}
                        </AnimatePresence>
                        <Card>
                            {item.content ? item.content : (
                                <>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>{item.description}</CardDescription>
                                </>
                            )}
                        </Card>
                    </Component>
                );
            })}
        </div>
    );
};

export const Card = ({
    className,
    children
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full p-3 overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none relative z-20 transition-colors duration-300",
                className
            )}>
            <div className="relative z-50">
                <div className="p-2">{children}</div>
            </div>
        </div>
    );
};
export const CardTitle = ({
    className,
    children
}) => {
    return (
        <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
            {children}
        </h4>
    );
};
export const CardDescription = ({
    className,
    children
}) => {
    return (
        <p
            className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
            {children}
        </p>
    );
};
