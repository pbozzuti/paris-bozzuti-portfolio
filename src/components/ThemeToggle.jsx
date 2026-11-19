"use client"

import { Moon, Sun } from 'lucide-react'

// Icons swap via the `dark` class on <html>, so there's no React state to hydrate.
const ThemeToggle = ({ className = '' }) => {
    const toggle = () => {
        const isDark = document.documentElement.classList.toggle('dark');
        try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch {}
    };

    return (
        <button
            type='button'
            onClick={toggle}
            aria-label='Toggle dark mode'
            title='Toggle dark mode'
            className={`flex items-center justify-center rounded-full p-2 cursor-pointer text-foreground hover:bg-gray-100 transition-colors duration-200 ${className}`}
        >
            <Moon className='block dark:hidden' size={22} strokeWidth={1.75} />
            <Sun className='hidden dark:block' size={22} strokeWidth={1.75} />
        </button>
    );
};

export default ThemeToggle
