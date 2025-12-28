import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

const Hero = () => {
    const [api, setApi] = useState(null);
    const [current, setCurrent] = useState(0);

    // Slide data
    const slides = [
        {
            id: 1,
            title: "Solusi Kredit Terpercaya",
            subtitle: "untuk Masa Depan Anda",
            description: "Proses cepat, bunga ringan, dan pelayanan yang mengutamakan kenyamanan Anda.",
            ctaText: "Ajukan Sekarang",
            ctaLink: "/ajukan",
            bgGradient: "from-blue-600 via-blue-700 to-indigo-800",
            image: "🏠",
        },
        {
            id: 2,
            title: "Kredit Multiguna",
            subtitle: "Fleksibel & Mudah",
            description: "Pinjaman untuk berbagai kebutuhan dengan tenor hingga 36 bulan.",
            ctaText: "Pelajari Lebih Lanjut",
            ctaLink: "/layanan/kredit-umum",
            bgGradient: "from-emerald-600 via-teal-600 to-cyan-700",
            image: "💰",
        },
        {
            id: 3,
            title: "Proses Cepat 24 Jam",
            subtitle: "Tanpa Ribet",
            description: "Pengajuan online, approval cepat, dana langsung cair ke rekening Anda.",
            ctaText: "Mulai Pengajuan",
            ctaLink: "/ajukan",
            bgGradient: "from-violet-600 via-purple-600 to-fuchsia-700",
            image: "⚡",
        },
    ];

    // Auto-play carousel
    useEffect(() => {
        if (!api) return;

        const interval = setInterval(() => {
            api.scrollNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [api]);

    // Track current slide
    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    const scrollPrev = useCallback(() => {
        api?.scrollPrev();
    }, [api]);

    const scrollNext = useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const scrollTo = useCallback((index) => {
        api?.scrollTo(index);
    }, [api]);

    return (
        <section className="relative pt-16">
            <Carousel
                setApi={setApi}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {slides.map((slide, index) => (
                        <CarouselItem key={slide.id}>
                            <div
                                className={`relative min-h-[500px] md:min-h-[600px] bg-gradient-to-br ${slide.bgGradient} flex items-center overflow-hidden`}
                            >
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
                                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
                                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                                        {/* Text Content */}
                                        <div className="text-white space-y-6">
                                            <div 
                                                className="space-y-2 animate-fade-in"
                                                style={{ animationDelay: "0.1s" }}
                                            >
                                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                                    {slide.title}
                                                </h1>
                                                <p className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90">
                                                    {slide.subtitle}
                                                </p>
                                            </div>
                                            
                                            <p 
                                                className="text-lg md:text-xl text-white/80 max-w-lg animate-fade-in"
                                                style={{ animationDelay: "0.2s" }}
                                            >
                                                {slide.description}
                                            </p>

                                            <div 
                                                className="flex flex-wrap gap-4 pt-4 animate-fade-in"
                                                style={{ animationDelay: "0.3s" }}
                                            >
                                                <Button
                                                    size="lg"
                                                    className="bg-white text-gray-900 hover:bg-white/90 font-semibold px-8 py-6 text-base"
                                                >
                                                    {slide.ctaText}
                                                    <ArrowRight className="ml-2 h-5 w-5" />
                                                </Button>
                                                <Button
                                                    size="lg"
                                                    variant="outline"
                                                    className="border-2 border-white bg-transparent !text-white hover:bg-white/20 px-8 py-6 text-base"
                                                >
                                                    Lihat Layanan
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Illustration/Image */}
                                        <div className="hidden lg:flex justify-center items-center">
                                            <div className="relative">
                                                <div className="w-72 h-72 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                                                    <span className="text-[120px]">{slide.image}</span>
                                                </div>
                                                {/* Floating elements */}
                                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm animate-bounce-slow">
                                                    <span className="text-3xl">✨</span>
                                                </div>
                                                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm animate-bounce-slow" style={{ animationDelay: "0.5s" }}>
                                                    <span className="text-2xl">🎯</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Arrows */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </Carousel>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === current
                                ? "bg-white w-8"
                                : "bg-white/50 hover:bg-white/70"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
