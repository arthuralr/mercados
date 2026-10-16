"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Apple,
  Beef,
  Croissant,
  Wine,
  ShoppingBasket,
  Sparkles,
  Milk,
  Snowflake,
  LayoutGrid,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import { Department } from "@/data/mockData";

interface DepartmentNavProps {
  departments: Department[];
  selectedDepartment: string | null;
  onSelectDepartment?: (departmentName: string | null) => void;
}

const ICON_MAP = {
  Apple,
  Beef,
  Croissant,
  Wine,
  ShoppingBasket,
  Sparkles,
  Milk,
  Snowflake,
};

export default function DepartmentNav({
  departments,
  selectedDepartment,
  onSelectDepartment,
}: DepartmentNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleDepClick = (depName: string | null) => {
    if (pathname === "/" || pathname?.startsWith("/catalogo")) {
      if (onSelectDepartment) {
        onSelectDepartment(depName);
        return;
      }
    }
    if (depName) {
      router.push(`/catalogo?departamento=${encodeURIComponent(depName)}`);
    } else {
      router.push("/catalogo");
    }
  };

  return (
    <nav
      aria-label="Departamentos do Supermercado"
      className="border-b border-slate-200/80 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-2.5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {/* "Catálogo Completo" Pill */}
          <button
            type="button"
            onClick={() => handleDepClick(null)}
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all sm:text-sm ${
              selectedDepartment === null && pathname?.startsWith("/catalogo")
                ? "border-brand-green-700 bg-brand-green-700 text-white shadow-sm"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-green-500 hover:bg-brand-green-50"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Todos os Setores</span>
          </button>

          {/* Shortcut Pill to Digital Tabloid */}
          <Link
            href="/tabloide"
            className={`flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-extrabold transition-all sm:text-sm ${
              pathname?.startsWith("/tabloide")
                ? "border-brand-orange-600 bg-brand-orange-500 text-white shadow-sm"
                : "border-brand-orange-200 bg-brand-orange-50 text-brand-orange-700 hover:border-brand-orange-500"
            }`}
          >
            <Newspaper className="h-4 w-4" />
            <span>Encarte Semanal</span>
          </Link>

          {/* Department Items */}
          {departments.map((dep) => {
            const IconComponent = ICON_MAP[dep.iconName];
            const isSelected = selectedDepartment === dep.name;

            return (
              <button
                key={dep.id}
                type="button"
                onClick={() =>
                  handleDepClick(isSelected ? null : dep.name)
                }
                className={`group flex shrink-0 items-center gap-2.5 rounded-xl border px-3.5 py-2 text-left transition-all ${
                  isSelected
                    ? "border-brand-orange-500 bg-brand-orange-500 text-white shadow-sm"
                    : `${dep.bgColor} text-slate-800`
                }`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : `bg-white shadow-xs ${dep.highlightColor}`
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold leading-none sm:text-sm">
                    {dep.name}
                  </span>
                  <span
                    className={`hidden text-[10px] sm:inline-block ${
                      isSelected ? "text-orange-100" : "text-slate-400"
                    }`}
                  >
                    {dep.itemCount}+ itens
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
