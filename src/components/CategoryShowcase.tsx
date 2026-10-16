"use client";

import React, { useState } from "react";
import {
  Flame,
  Apple,
  Beef,
  Croissant,
  Filter,
  X,
  CheckCircle2,
  Store,
} from "lucide-react";
import { Product } from "@/data/mockData";
import ProductCard from "./ProductCard";

interface CategoryShowcaseProps {
  products: Product[];
  cart: Record<string, number>;
  favorites: string[];
  onAdd: (product: Product) => void;
  onRemove: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
  selectedDepartment: string | null;
  onClearDepartment: () => void;
  searchQuery: string;
  onClearSearch: () => void;
}

type CategoryTabKey =
  | "mais-vendidos"
  | "hortifruti"
  | "carnes"
  | "padaria-bebidas";

const CATEGORY_TABS: {
  key: CategoryTabKey;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    key: "mais-vendidos",
    label: "Mais Vendidos",
    subtitle: "Os campeões de vendas escolhidos pelas famílias",
    icon: Flame,
  },
  {
    key: "hortifruti",
    label: "Feirinha de Hortifrúti",
    subtitle: "Colheita fresca do dia direto do produtor rural",
    icon: Apple,
  },
  {
    key: "carnes",
    label: "Carnes e Churrasco",
    subtitle: "Cortes bovinos selecionados, acompanhamentos e cervejas",
    icon: Beef,
  },
  {
    key: "padaria-bebidas",
    label: "Padaria & Bebidas",
    subtitle: "Fornadas quentinhas, sucos integrais e bebidas geladas",
    icon: Croissant,
  },
];

export default function CategoryShowcase({
  products,
  cart,
  favorites,
  onAdd,
  onRemove,
  onToggleFavorite,
  selectedDepartment,
  onClearDepartment,
  searchQuery,
  onClearSearch,
}: CategoryShowcaseProps) {
  const [activeTab, setActiveTab] = useState<CategoryTabKey>("mais-vendidos");
  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "discount">(
    "relevance"
  );

  // Filter logic: if department or search is active, filter globally; otherwise filter by activeTab
  const hasGlobalFilter = Boolean(selectedDepartment || searchQuery.trim());

  const filteredProducts = products
    .filter((product) => {
      if (selectedDepartment && product.department !== selectedDepartment) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDep = product.department.toLowerCase().includes(q);
        const matchesBadge = product.badge?.toLowerCase().includes(q);
        if (!matchesName && !matchesDep && !matchesBadge) return false;
      }
      if (!hasGlobalFilter) {
        return product.categoryTab.includes(activeTab);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "discount")
        return (b.discountPercent || 0) - (a.discountPercent || 0);
      return 0;
    });

  const currentTabInfo = CATEGORY_TABS.find((t) => t.key === activeTab)!;

  return (
    <section id="vitrine-categorias" className="mx-auto max-w-7xl px-4 py-6">
      {/* Header & Tabs */}
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <span className="inline-block rounded-lg bg-brand-green-100 px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-green-800">
            Vitrine Inteligente
          </span>
          <h2 className="mt-1.5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            {hasGlobalFilter
              ? `Resultados Filtrados (${filteredProducts.length})`
              : "Compre por Categoria"}
          </h2>
          <p className="text-xs text-slate-500 sm:text-sm">
            {hasGlobalFilter
              ? "Exibindo produtos de acordo com sua seleção de setor ou busca."
              : currentTabInfo.subtitle}
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-start lg:self-auto">
          <Filter className="h-4 w-4 text-slate-400" />
          <label htmlFor="sort-select" className="text-xs font-semibold text-slate-500">
            Ordenar por:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "relevance" | "price-asc" | "discount")
            }
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 focus:border-brand-green-600 focus:outline-none"
          >
            <option value="relevance">Mais Relevantes</option>
            <option value="price-asc">Menor Preço</option>
            <option value="discount">Maior Desconto (%)</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips (when Department or Search is selected) */}
      {hasGlobalFilter && (
        <div className="mb-5 flex flex-wrap items-center gap-2 rounded-2xl border border-brand-green-200 bg-brand-green-50/70 p-3">
          <span className="text-xs font-bold text-brand-green-800">
            Filtros ativos:
          </span>
          {selectedDepartment && (
            <button
              type="button"
              onClick={onClearDepartment}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-green-700 px-3 py-1 text-xs font-bold text-white hover:bg-brand-green-800"
            >
              <span>Setor: {selectedDepartment}</span>
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          {searchQuery.trim() && (
            <button
              type="button"
              onClick={onClearSearch}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-500 px-3 py-1 text-xs font-bold text-white hover:bg-brand-orange-600"
            >
              <span>Busca: &ldquo;{searchQuery}&rdquo;</span>
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              onClearDepartment();
              onClearSearch();
            }}
            className="ml-auto text-xs font-bold text-brand-green-700 underline hover:text-brand-green-900"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}

      {/* Category Tabs Bar */}
      {!hasGlobalFilter && (
        <div className="mb-6 flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex shrink-0 items-center gap-2.5 rounded-2xl border px-5 py-3 text-sm font-extrabold transition-all ${
                  isActive
                    ? "border-brand-green-700 bg-brand-green-700 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-700 hover:border-brand-green-400 hover:bg-brand-green-50/50"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? "text-brand-orange-400" : "text-brand-green-600"
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantityInCart={cart[product.id] || 0}
              isFavorite={favorites.includes(product.id)}
              onAdd={onAdd}
              onRemove={onRemove}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-base font-bold text-slate-700">
            Nenhum produto encontrado com esses critérios.
          </p>
          <button
            type="button"
            onClick={() => {
              onClearDepartment();
              onClearSearch();
            }}
            className="mt-4 rounded-xl bg-brand-green-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-brand-green-700"
          >
            Voltar para todas as ofertas
          </button>
        </div>
      )}

      {/* Multi-Scale Supermarket Banner (Pequeno, Médio e Grande Porte) */}
      <div className="mt-10 overflow-hidden rounded-3xl border border-emerald-200 bg-gradient-to-r from-brand-green-900 via-brand-green-800 to-emerald-800 p-6 text-white shadow-soft sm:p-8">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          <div className="space-y-2 lg:col-span-8">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-500 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white">
              <Store className="h-3.5 w-3.5" />
              <span>Plataforma Escalável Multi-Porte</span>
            </div>
            <h3 className="text-xl font-black sm:text-2xl">
              Pronto para Mercados de Bairro, Supermercados Regionais e Redes de Hipermercados
            </h3>
            <p className="text-xs text-emerald-100 sm:text-sm">
              Este template adapta catálogo, raio de entrega, pedido mínimo e estoque em tempo real por filial. Teste alternando a filial no topo da página!
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:col-span-4">
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-xs">
              <CheckCircle2 className="mb-1 h-4 w-4 text-brand-orange-400" />
              <p className="text-xs font-extrabold">Pequeno Porte</p>
              <p className="text-[11px] text-emerald-200">Entrega Expressa 25min</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-xs">
              <CheckCircle2 className="mb-1 h-4 w-4 text-brand-orange-400" />
              <p className="text-xs font-extrabold">Médio Porte</p>
              <p className="text-[11px] text-emerald-200">Clique & Retire + App</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-3 backdrop-blur-xs">
              <CheckCircle2 className="mb-1 h-4 w-4 text-brand-orange-400" />
              <p className="text-xs font-extrabold">Grande Porte</p>
              <p className="text-[11px] text-emerald-200">Multi-Filiais & Atacado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
