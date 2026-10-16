"use client";

import React, { useState, useEffect } from "react";
import {
  Smartphone,
  Download,
  X,
  ExternalLink,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaInstallBanner() {
  const { storeSettings, triggerToast } = useStore();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (
    dismissed ||
    (!storeSettings.pwaBannerEnabled &&
      !storeSettings.playStoreEnabled &&
      !storeSettings.appStoreEnabled)
  ) {
    return null;
  }

  const handleInstallPwa = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        triggerToast("Aplicativo SuperVerde instalado no seu dispositivo!");
        setDeferredPrompt(null);
      }
    } else {
      setShowHelpModal(true);
    }
  };

  return (
    <>
      <div className="border-b border-emerald-200 bg-gradient-to-r from-emerald-950 via-brand-green-900 to-brand-green-800 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-orange-500 text-white shadow-xs">
              <Smartphone className="h-4 w-4" />
            </div>
            <div>
              <span className="font-black text-white">
                App SuperVerde no seu Celular:
              </span>{" "}
              <span className="text-emerald-100">
                Compre mais rápido, receba alertas de Ofertas Relâmpago e acesse suas listas!
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 ml-auto">
            {storeSettings.pwaBannerEnabled && (
              <button
                type="button"
                onClick={handleInstallPwa}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange-500 px-3 py-1 text-[11px] font-black text-white shadow-xs transition hover:bg-brand-orange-600"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Instalar App (PWA)</span>
              </button>
            )}

            {storeSettings.playStoreEnabled && storeSettings.playStoreUrl && (
              <a
                href={storeSettings.playStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-emerald-600 bg-emerald-900/80 px-2.5 py-1 text-[11px] font-bold text-emerald-100 transition hover:bg-emerald-800 hover:text-white"
              >
                <span>▶ Google Play</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            {storeSettings.appStoreEnabled && storeSettings.appStoreUrl && (
              <a
                href={storeSettings.appStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-lg border border-emerald-600 bg-emerald-900/80 px-2.5 py-1 text-[11px] font-bold text-emerald-100 transition hover:bg-emerald-800 hover:text-white"
              >
                <span> App Store</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}

            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Fechar banner do aplicativo"
              className="rounded-lg p-1 text-emerald-300 hover:bg-white/10 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Instruções de Instalação PWA (Android / iPhone / Desktop) */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-brand-green-800 px-5 py-4 text-white">
              <div className="flex items-center gap-2.5">
                <Smartphone className="h-5 w-5 text-brand-orange-400" />
                <h3 className="text-base font-black">
                  Instalar Aplicativo SuperVerde (PWA)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="rounded-lg bg-white/10 p-1 text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-5 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">
                Instale o SuperVerde direto na tela inicial do seu celular sem ocupar memória:
              </p>

              <div className="space-y-2.5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                  <h4 className="font-black text-slate-900">
                    📱 No Android (Chrome / Samsung Internet):
                  </h4>
                  <p className="mt-1">
                    Toque nos <strong>3 pontinhos (⋮)</strong> no canto superior do navegador e selecione{" "}
                    <strong className="text-brand-green-700">
                      &ldquo;Instalar aplicativo&rdquo;
                    </strong>{" "}
                    ou <strong>&ldquo;Adicionar à tela inicial&rdquo;</strong>.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                  <h4 className="flex items-center gap-1.5 font-black text-slate-900">
                    <span> No iPhone / iPad (Safari):</span>
                  </h4>
                  <p className="mt-1">
                    Toque no ícone de{" "}
                    <span className="inline-flex items-center gap-0.5 font-bold text-brand-green-700">
                      Compartilhar <Share2 className="h-3 w-3" />
                    </span>{" "}
                    na barra inferior e escolha{" "}
                    <strong className="text-brand-green-700">
                      &ldquo;Adicionar à Tela de Início&rdquo;
                    </strong>
                    .
                  </p>
                </div>
              </div>

              {(storeSettings.playStoreEnabled ||
                storeSettings.appStoreEnabled) && (
                <div className="border-t border-slate-100 pt-3">
                  <p className="mb-2 font-bold text-slate-700">
                    Ou baixe nosso aplicativo oficial nas lojas:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {storeSettings.playStoreEnabled && (
                      <a
                        href={storeSettings.playStoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2.5 text-xs font-extrabold text-white hover:bg-slate-800"
                      >
                        <span>▶ Google Play</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {storeSettings.appStoreEnabled && (
                      <a
                        href={storeSettings.appStoreUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2.5 text-xs font-extrabold text-white hover:bg-slate-800"
                      >
                        <span> App Store</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setShowHelpModal(false);
                  triggerToast("Pronto! O atalho PWA está habilitado neste navegador.");
                }}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-green-700 py-2.5 text-xs font-extrabold text-white hover:bg-brand-green-800"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Entendi, obrigado!</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
