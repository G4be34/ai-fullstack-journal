import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/history", label: "History" },
];

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden relative">
      <aside className="w-48 h-full border-r border-black/10 bg-gray-200">
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
          <nav className="px-4 h-full flex items-center justify-end">
            <div className="flex items-center">
              <UserButton />
            </div>
          </nav>
        </header>
        <div className="flex-1 overflow-y-hidden">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
