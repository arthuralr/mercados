"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Clock,
  Award,
} from "lucide-react";
import { HeroBanner } from "@/data/mockData";

interface HeroCarouselProps {
  banners: HeroBanner[];
  onCtaClick?: (banner: HeroBanner) => void;
}

export default function HeroCarousel({
  banners,
  onCtaClick,
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length, isPaused]);

  const currentBanner = banners[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-5 pb-3">
      {/* Main Carousel Container */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${currentBanner.bgGradient} text-white shadow-soft transition-colors duration-500`}
      >
        <div className="grid grid-cols-1 items-center gap-6 p-6 sm:p-10 lg:grid-cols-12 lg:p-12">
          {/* Left Content Column */}
          <div className="z-10 space-y-4 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-white backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-brand-orange-400" />
              <span>{currentBanner.tag}</span>
            </div>

            <h1 className="text-2xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {currentBanner.title}
            </h1>

            <p className="max-w-xl text-sm text-white/90 sm:text-base">
              {currentBanner.subtitle}
            </p>

            {/* Highlighted Discount Pill */}
            <div className="inline-block rounded-xl bg-black/25 px-3.5 py-2 text-xs font-bold text-amber-200 sm:text-sm">
              🔥 {currentBanner.discountText}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onCtaClick && onCtaClick(currentBanner)}
                className={`inline-flex items-center gap-2 rounded-2xl ${currentBanner.accentColor} px-6 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:brightness-110 active:scale-95`}
              >
                <span>{currentBanner.ctaText}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="text-[11px] text-white/75">
                *{currentBanner.validity}
              </span>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-video max-w-md overflow-hidden rounded-2xl border-4 border-white/20 shadow-2xl lg:aspect-[4/3]">
              <img
                src={currentBanner.image}
                alt={currentBanner.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-3 right-3 rounded-xl bg-brand-orange-500 px-3 py-1.5 text-xs font-black uppercase text-white shadow-md">
                Oferta de Hoje
              </div>
            </div>
          </div>
        </div>

        {/* Prev / Next Controls */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Banner anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Próximo banner"
          className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Carousel Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {banners.map((b, idx) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir para campanha ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentIndex
                  ? "w-8 bg-brand-orange-400"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Retail Trust & Convenience Bar */}
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Garantia de Frescor</p>
            <p className="text-[11px] text-slate-500">Seleção rigorosa diária</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange-50 text-brand-orange-600">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Entrega Programada</p>
            <p className="text-[11px] text-slate-500">Ou Expressa em até 45 min</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Clique e Retire Grátis</p>
            <p className="text-[11px] text-slate-500">Direto no porta-malas</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange-50 text-brand-orange-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Pague na Entrega ou Online</p>
            <p className="text-[11px] text-slate-500">Pix, Cartão e Vale-Alimentação</p>
          </div>
        </div>
      </div>
    </section>
  );
}
