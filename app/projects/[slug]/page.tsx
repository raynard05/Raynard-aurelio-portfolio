"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { projects } from "../projectData";
import SafariMockup from "@/components/ui/safari-mockup";
import AndroidMockup from "@/components/ui/android-mockup";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Footer from "@/components/Footer";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const projectIndex = projects.findIndex((p) => p.slug === slug);
    const project = projects[projectIndex];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) {
        notFound();
    }

    const router = useRouter();

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    return (
        <div className="min-h-screen w-full bg-black text-white selection:bg-[#FFD000] selection:text-black font-sans overflow-x-hidden flex flex-col">

            <main className="container mx-auto px-4 pt-32 pb-24 flex-grow flex flex-col items-center justify-center relative">

                {/* Back to Home Button */}
                <div className="absolute top-24 left-4 md:left-8 z-50">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center gap-2 text-white/70 hover:text-[#FFD000] transition-colors duration-300"
                    >
                        <div className="p-2 rounded-full border border-white/10 bg-white/5 group-hover:border-[#FFD000]/50 transition-all">
                            <ArrowLeft className="w-5 h-5 group-transform group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className="text-sm font-medium tracking-wide hidden sm:block">Back</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full max-w-7xl mb-24 relative">

                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col gap-6 order-2 lg:order-1"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full border border-[#FFD000]/30 bg-[#FFD000]/10 text-[#FFD000] text-xs font-semibold tracking-wider uppercase">
                                    {project.category}
                                </span>
                                <span className="text-white/40 text-sm font-light tracking-wide">
                                    {project.year}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-tight">
                                {project.title}
                            </h1>
                        </div>

                        <p className="text-lg text-white/70 leading-relaxed max-w-xl">
                            {project.details}
                        </p>

                        <div className="flex gap-4 pt-4">
                            <button className="px-8 py-3 bg-[#FFD000] text-black font-bold rounded-full hover:bg-[#FFD000]/90 transition-colors shadow-[0_0_20px_rgba(255,208,0,0.3)] hover:shadow-[0_0_30px_rgba(255,208,0,0.5)]">
                                Visit Live Site
                            </button>
                        </div>
                    </motion.div>


                    {/* Right Column: Mockup & Screenshot Navigation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
                        className="order-1 lg:order-2 flex justify-center items-center w-full relative"
                    >
                        {/* Screenshot Carousel Controls (Flanking the Mockup) */}
                        <button
                            onClick={prevImage}
                            className="absolute left-0 lg:-left-12 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-sm hover:border-[#FFD000]/50 text-white/70 hover:text-[#FFD000] transition-all"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute right-0 lg:-right-12 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-sm hover:border-[#FFD000]/50 text-white/70 hover:text-[#FFD000] transition-all"
                        >
                            <ArrowRight className="w-6 h-6" />
                        </button>

                        <div className="relative w-full flex justify-center perspective-1000">
                            {project.type === "mobile" ? (
                                <div className="transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out-expo">
                                    <AndroidMockup>
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={currentImageIndex}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                src={project.images[currentImageIndex]}
                                                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                                                className="w-full h-auto object-cover"
                                            />
                                        </AnimatePresence>
                                    </AndroidMockup>
                                </div>
                            ) : (
                                <div className="w-full transform hover:scale-[1.02] transition-transform duration-500">
                                    <SafariMockup url={`https://${project.slug}.com`}>
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={currentImageIndex}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                src={project.images[currentImageIndex]}
                                                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                                                className="w-full h-auto object-cover"
                                            />
                                        </AnimatePresence>
                                    </SafariMockup>
                                </div>
                            )}

                            {/* Background Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#FFD000]/10 blur-[100px] rounded-full -z-10 pointer-events-none mix-blend-screen" />
                        </div>

                        {/* Image Dots Indicator */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
                            {project.images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-[#FFD000] w-4' : 'bg-white/20'}`}
                                />
                            ))}
                        </div>
                    </motion.div>

                </div>

            </main>
            <Footer />
        </div>
    );
}
