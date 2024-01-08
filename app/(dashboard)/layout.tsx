"use client";

import InfoModal from "@/components/InfoModal";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/history", label: "History" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const firstTimeVisited = localStorage.getItem("firstTimeVisited");

  if (!firstTimeVisited) {
    setShowModal(true);
    localStorage.setItem("firstTimeVisited", "true");
  }

  return (
    <div className="flex h-screen overflow-hidden relative">
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-500/50 bg-opacity-50 z-20"
          onClick={() => setShowModal(false)}
        >
          <InfoModal closeModal={() => setShowModal(false)} />
        </div>
      )}
      <aside className="w-24 lg:w-48 h-full border-r border-black/10 bg-gray-200">
        <div className="px-4 py-2">Mood Journal</div>
        <ul className="px-4">
          {links.map((link) => (
            <li key={link.href} className="text-xl my-4">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-black/10 bg-white">
          <nav className="px-4 h-full flex items-center justify-between">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-400 px-4 py-2 rounded-lg my-2"
            >
              View Instructions
            </button>
            <UserButton afterSignOutUrl="/" />
          </nav>
        </header>
        <div className="flex-1 overflow-y-hidden">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
