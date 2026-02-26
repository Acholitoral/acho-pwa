'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/search', label: 'Buscar', icon: '🔍' },
    { href: '/favorites', label: 'Favoritos', icon: '❤️' },
    { href: '/profile', label: 'Perfil', icon: '👤' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto w-full">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full transition ${
              isActive(item.href)
                ? 'text-cyan-600 border-t-2 border-cyan-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
