"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="group flex items-center gap-2 px-4 py-2
                 bg-gradient-to-r from-red-600 to-rose-600
                 hover:from-red-700 hover:to-rose-700
                 text-white text-sm font-semibold rounded-lg
                 shadow-md hover:shadow-lg transition-all"
    >
      <svg className="w-5 h-5 group-hover:scale-110 transition" fill="none" stroke="currentColor" strokeWidth={2}
           viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h6a2 2 0 002-2v-1" />
      </svg>
      Çıkış Yap
    </button>
  );
}