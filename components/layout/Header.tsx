"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "/servicios-educativos" },
  { label: "Vida escolar", href: "#vida-escolar" },
  { label: "Admisión", href: "#admision" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative bg-hueso px-6 py-4 sm:px-10 lg:px-16">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Colegio Euroamericano San Diego"
            width={246}
            height={246}
            priority
            className="h-12 w-12 sm:h-14 sm:w-14"
          />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 font-medium text-texto">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors duration-200 hover:text-institucional"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#"
          className="hidden rounded-full bg-institucional px-5 py-2.5 font-medium text-hueso transition-all duration-300 hover:-translate-y-0.5 hover:bg-institucional/90 hover:shadow-md md:inline-block"
        >
          Aula virtual
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-institucional md:hidden"
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4 pt-6 pb-2 md:hidden">
          <ul className="flex flex-col gap-4 font-medium text-texto">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block transition-colors duration-200 hover:text-institucional"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="rounded-full bg-institucional px-5 py-2.5 text-center font-medium text-hueso transition-colors hover:bg-institucional/90"
          >
            Aula virtual
          </a>
        </div>
      )}
    </header>
  );
}
