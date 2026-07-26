"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="container-page relative flex h-20 items-center justify-between"
    >
      <Link
        href="/"
        className="flex items-center gap-2 font-semibold tracking-tight"
      >
        <span className="grid size-8 place-items-center rounded-lg bg-violet-500/15 text-violet-300">
          <Sparkles size={16} />
        </span>
        OfferPilot <span className="text-zinc-500">AI</span>
      </Link>
      <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
        <Link href="/#features" className="hover:text-white">
          Features
        </Link>
        <Link href="/#how-it-works" className="hover:text-white">
          How it works
        </Link>
      </nav>
      <Link href="/analyse" className="button-secondary hidden sm:inline-flex">
        Analyse resume <ArrowRight size={15} />
      </Link>
      <button
        type="button"
        className="rounded-lg p-2 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-violet-400 md:hidden"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav className="glass absolute left-5 right-5 top-16 z-50 flex flex-col gap-1 rounded-xl p-2 md:hidden">
          <Link
            onClick={() => setOpen(false)}
            href="/#features"
            className="rounded-lg px-4 py-3 text-sm text-zinc-300 hover:bg-white/10"
          >
            Features
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/#how-it-works"
            className="rounded-lg px-4 py-3 text-sm text-zinc-300 hover:bg-white/10"
          >
            How it works
          </Link>
          <Link
            onClick={() => setOpen(false)}
            href="/analyse"
            className="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black"
          >
            Analyse resume
          </Link>
        </nav>
      )}
    </motion.header>
  );
}
