"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Newspaper,
  LayoutGrid,
  ArrowRight,
  Sparkles,
  FolderHeart,
  MessageCircle,
  CreditCard,
  ExternalLink,
  CheckCircle2,
  Smartphone,
} from "lucide-react";
import Header from "@/components/Header";
import DepartmentNav from "@/components/DepartmentNav";
import HeroCarousel from "@/components/HeroCarousel";
import FlashDeals from "@/components/FlashDeals";
import CategoryShowcase from "@/components/CategoryShowcase";
import Footer from "@/components/Footer";
import { DEPARTMENTS, HeroBanner } from "@/data/mockData";
import { useStore } from "@/context/StoreContext";

export default function HomePage() {
  const {
    branches,
    selectedBranch,
    setSelectedBranch,
    products,
    cart,
    favorites,
    searchQuery,
    setSearchQuery,
    addToCart,
    removeFromCart,
    clearProductFromCart,
    toggleFavorite,
    setIsListsModalOpen,
    savedLists,
    heroBanners,
    miniBanners,
    storeSettings,
    submitDiscountClubMember,
  } = useStore();

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  // Quick Club Pre-registration state on Home
  const [clubName, setClubName] = useState("");
  const [clubCpf, setClubCpf] = useState("");
  const [clubWhatsapp, setClubWhatsapp] = useState("");
  const [clubSuccess, setClubSuccess] = useState(false);

  const handleQuickClubSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubName.trim() || !clubCpf.trim() || !clubWhatsapp.trim()) return;
    await submitDiscountClubMember({
      fullName: clubName.trim(),
      cpf: clubCpf.trim(),
      whatsapp: clubWhatsapp.trim(),
      email: "",
      favoriteDepartment: "Hortifrúti & Ofertas da Semana",
      acceptsWhatsappOffers: true,
    });
    setClubName("");
    setClubCpf("");
    setClubWhatsapp("");
    setClubSuccess(true);
    setTimeout(() => setClubSuccess(false), 4000);
  };

  const handleBannerCta = (banner: HeroBanner) => {
    if (banner.id === "banner-1") {
      setSelectedDepartment("Hortifrúti");
    } else if (banner.id === "banner-2") {
      setSelectedDepartment("Açougue");
    } else {
      setSelectedDepartment("Mercearia");
    }
    const el = document.getElementById("vitrine-categorias");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const activeMiniBanners = miniBanners.filter((m) => m.isActive);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* 1. Sticky Header */}
      <Header
        branches={branches}
        selectedBranch={selectedBranch}
        onSelectBranch={setSelectedBranch}
        products={products}
        cart={cart}
        favorites={favorites}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        onClearProductFromCart={clearProductFromCart}
        onToggleFavorite={toggleFavorite}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Horizontal Department Navigation Bar */}
      <DepartmentNav
        departments={DEPARTMENTS}
        selectedDepartment={selectedDepartment}
        onSelectDepartment={(dep) => {
          setSelectedDepartment(dep);
          if (dep) {
            const el = document.getElementById("vitrine-categorias");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 3. Dynamic Seasonal Hero Carousel (1200x400px CMS Managed) */}
        <HeroCarousel banners={heroBanners} onCtaClick={handleBannerCta} />

        {/* Quick Access Cards to Secondary Pages & Smart Lists */}
        <section className="mx-auto max-w-7xl px-4 py-3">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Digital Tabloid Card */}
            <Link
              href="/tabloide"
              className="group relative flex items-center justify-between overflow-hidden rounded-3xl border-2 border-brand-orange-400 bg-gradient-to-r from-brand-orange-600 via-brand-orange-500 to-amber-500 p-5 text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="space-y-1 pr-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                  <Sparkles className="h-3 w-3" /> Encarte Semanal
                </span>
                <h3 className="text-base font-black sm:text-lg">
                  Tabloide Digital — Clique e Compre
                </h3>
                <p className="text-xs text-orange-100">
                  Toque nas ofertas do jornalzinho para jogar direto no carrinho.
                </p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-orange-600 shadow-md transition-transform group-hover:scale-110">
                <Newspaper className="h-5 w-5" />
              </div>
            </Link>

            {/* Full Catalog with Filters Card */}
            <Link
              href="/catalogo"
              className="group relative flex items-center justify-between overflow-hidden rounded-3xl border-2 border-brand-green-600/80 bg-gradient-to-r from-brand-green-800 via-brand-green-700 to-emerald-600 p-5 text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="space-y-1 pr-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                  <LayoutGrid className="h-3 w-3" /> Corredores & Filtros
                </span>
                <h3 className="text-base font-black sm:text-lg">
                  Catálogo por Setor & Restrições
                </h3>
                <p className="text-xs text-emerald-100">
                  Filtre por preço, marcas, Sem Glúten, Zero Lactose e Orgânico.
                </p>
              </div>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-green-700 shadow-md transition-transform group-hover:scale-110">
                <ArrowRight className="h-5 w-5" />
              </div>
            </Link>

            {/* Smart Shopping Lists & WhatsApp Share Card */}
            <div className="flex flex-col justify-between rounded-3xl border-2 border-emerald-200 bg-white p-5 shadow-soft">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-green-100 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-green-800">
                    <FolderHeart className="h-3 w-3 text-brand-orange-500" />{" "}
                    Listas Inteligentes ({savedLists.length})
                  </span>
                  <Link
                    href="/checkout"
                    className="inline-flex items-center gap-1 text-[11px] font-extrabold text-brand-orange-600 hover:underline"
                  >
                    <MessageCircle className="h-3 w-3" /> Checkout / WhatsApp →
                  </Link>
                </div>
                <h3 className="mt-1.5 text-base font-black text-slate-900">
                  Monte, Copie e Envie no WhatsApp
                </h3>
                <p className="text-xs text-slate-500">
                  Crie listas como &ldquo;Churrasco de Sábado&rdquo;, gere cópia ou compartilhe.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsListsModalOpen(true)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-green-700 py-2 text-xs font-extrabold text-white transition hover:bg-brand-green-800"
              >
                <FolderHeart className="h-4 w-4 text-brand-orange-400" />
                <span>Criar / Compartilhar Listas</span>
              </button>
            </div>
          </div>
        </section>

        {/* 4. Flash Deals Section */}
        <div id="ofertas-relampago">
          <FlashDeals
            products={products}
            cart={cart}
            favorites={favorites}
            onAdd={addToCart}
            onRemove={removeFromCart}
            onToggleFavorite={toggleFavorite}
          />
        </div>

        {/* 5. Mini-Banners Secundários (600x250px gerenciados pelo Painel CMS) */}
        {activeMiniBanners.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {activeMiniBanners.map((mini) => (
                <Link
                  key={mini.id}
                  href={mini.ctaLink}
                  className="group relative flex min-h-[165px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 p-5 text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <img
                    src={mini.imageUrl}
                    alt={mini.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-45 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent" />
                  <div className="relative z-10">
                    <span className="inline-block rounded-full bg-brand-orange-500 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                      {mini.badge}
                    </span>
                    <h3 className="mt-2 text-base font-black leading-snug text-white sm:text-lg">
                      {mini.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-200 line-clamp-2">
                      {mini.subtitle}
                    </p>
                  </div>
                  <div className="relative z-10 mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-orange-400 group-hover:underline">
                    <span>{mini.ctaText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 6. Category Showcase in Tabs */}
        <CategoryShowcase
          products={products}
          cart={cart}
          favorites={favorites}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onToggleFavorite={toggleFavorite}
          selectedDepartment={selectedDepartment}
          onClearDepartment={() => setSelectedDepartment(null)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
        />

        {/* 7. Clube SuperVerde de Descontos + Grupo Oficial de Ofertas no WhatsApp + Cartão da Loja */}
        <section className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left: Clube SuperVerde Pre-Registration */}
            <div className="rounded-3xl border-2 border-brand-green-600 bg-gradient-to-br from-brand-green-900 via-brand-green-800 to-emerald-800 p-6 text-white shadow-soft sm:p-8 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-500 px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
                  <Sparkles className="h-3.5 w-3.5" /> Clube SuperVerde de Descontos
                </span>
                <Link
                  href="/clube-descontos"
                  className="text-xs font-bold text-emerald-200 hover:text-white hover:underline"
                >
                  Ver regulamento e vantagens →
                </Link>
              </div>

              <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                Ative os Descontos Exclusivos no seu CPF!
              </h2>
              <p className="mt-1 text-xs text-emerald-100 sm:text-sm">
                Faça seu pré-cadastro gratuito agora e garanta preços de Clube tanto nas compras pelo site quanto nos caixas das nossas lojas físicas.
              </p>

              {clubSuccess ? (
                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-400 bg-emerald-950/70 p-4 text-sm font-bold text-emerald-200">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-brand-orange-400" />
                  <span>
                    Pré-cadastro realizado com sucesso! Seu CPF já está ativo no Clube SuperVerde e visível no Painel do Gestor.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleQuickClubSubmit}
                  className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3"
                >
                  <input
                    type="text"
                    required
                    value={clubName}
                    onChange={(e) => setClubName(e.target.value)}
                    placeholder="Seu Nome Completo *"
                    className="rounded-xl border border-emerald-600 bg-white/95 px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    value={clubCpf}
                    onChange={(e) => setClubCpf(e.target.value)}
                    placeholder="Seu CPF (000.000.000-00) *"
                    className="rounded-xl border border-emerald-600 bg-white/95 px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    value={clubWhatsapp}
                    onChange={(e) => setClubWhatsapp(e.target.value)}
                    placeholder="Seu WhatsApp com DDD *"
                    className="rounded-xl border border-emerald-600 bg-white/95 px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="sm:col-span-3 flex items-center justify-center gap-2 rounded-xl bg-brand-orange-500 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-brand-orange-600 sm:text-sm"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Ativar Meu CPF no Clube SuperVerde (100% Grátis)</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: Receba Nossas Ofertas no WhatsApp + Cartão da Loja */}
            <div className="flex flex-col justify-between gap-4 lg:col-span-5">
              {/* WhatsApp VIP Group Box */}
              <div className="flex-1 rounded-3xl border-2 border-emerald-500/40 bg-white p-6 shadow-soft">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
                    <MessageCircle className="h-6 w-6 fill-white text-emerald-600" />
                  </div>
                  <div>
                    <span className="inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-emerald-800">
                      Grupo Oficial Silencioso
                    </span>
                    <h3 className="mt-1 text-lg font-black text-slate-900">
                      Receba nossas ofertas no WhatsApp!
                    </h3>
                    <p className="mt-1 text-xs text-slate-600">
                      Entre no grupo VIP oficial do SuperVerde e receba em primeira mão o jornalzinho de ofertas e promoções relâmpago do dia.
                    </p>
                  </div>
                </div>
                <a
                  href={storeSettings.whatsappOffersGroupUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-extrabold text-white shadow-sm transition hover:bg-emerald-700 sm:text-sm"
                >
                  <MessageCircle className="h-4 w-4 fill-white text-emerald-600" />
                  <span>Entrar no Grupo VIP do WhatsApp</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Store Card & Bio Quick Box */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {storeSettings.storeCardEnabled && (
                  <Link
                    href="/cartao-loja"
                    className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50/70 p-4 transition hover:border-brand-orange-400 hover:bg-amber-50"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase text-brand-orange-600">
                        Crédito Fácil
                      </span>
                      <h4 className="text-sm font-black text-slate-900">
                        Peça seu Cartão da Loja
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        Pré-cadastro online rápido
                      </p>
                    </div>
                    <CreditCard className="h-6 w-6 shrink-0 text-brand-orange-500" />
                  </Link>
                )}

                <Link
                  href="/bio"
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-green-500 hover:bg-emerald-50/30"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase text-brand-green-700">
                      Instagram Bio
                    </span>
                    <h4 className="text-sm font-black text-slate-900">
                      Atalhos Rápidos (/bio)
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Todos os canais em 1 tela
                    </p>
                  </div>
                  <Smartphone className="h-6 w-6 shrink-0 text-brand-green-700" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Institutional Footer */}
      <Footer selectedBranch={selectedBranch} />
    </div>
  );
}
