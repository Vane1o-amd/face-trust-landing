"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

const QA = [
  { q: "Это не инвазивная косметология?", a: "Нет. Программа работает с тонусом, мимикой, привычками и образом жизни — без уколов и аппаратов." },
  { q: "Сколько времени в день?", a: "15–25 минут в день и одна сессия в неделю. Реально совмещать с работой." },
  { q: "Подходит ли мне, если мне 40+?", a: "Да. Метод работает в любом возрасте — меняется акцент в зависимости от типа лица и целей." },
  { q: "Когда будут первые результаты?", a: "Большинство замечают изменения к 3–4 неделе. Полный результат — к концу 11 недель." },
  { q: "Что нужно для диагностики?", a: "Несколько фото и короткое видео лица. Список пришлю после записи." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 sm:py-32 border-t border-[var(--line)] bg-stone">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight-display chrome-text">Частые вопросы</h2>
        </Reveal>
        <div className="mt-10 flex flex-col">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div className="border-b border-[var(--line)]">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[16px] sm:text-[17px] font-medium tracking-tight">{item.q}</span>
                    <span className={`text-2xl leading-none text-[var(--ink-soft)] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>+</span>
                  </button>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                    <p className="overflow-hidden text-[15px] leading-relaxed text-[var(--ink-soft)]">{item.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
