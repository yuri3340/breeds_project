'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    // Home, Breeds, Favorites, Contact

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Breeds", href: "/breeds" },
        { label: "Favorites", href: "/favorites" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 text-black bg-white shadow-md p-4 flex gap-6 items-center">
            {
                navItems.map((item) => (
                    <Link key={item.label} href={item.href} className="hover:text-yellow-400">
                        <span
                            className={`${pathname === item.href ? "font-bold underline text-blue-600" : ""}`}
                        >
                            {item.label}
                        </span>
                    </Link>
                ))
            }
        </nav>
    )
}