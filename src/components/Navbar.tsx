import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Navbar = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <nav className="bg-background border-b border-surface-highlight py-4 sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4 flex items-center justify-between">

                <Link to="/" className="text-2xl font-black tracking-tighter text-foreground uppercase italic">
                    Tome <span className="text-primary">Raider</span>
                </Link>

                <div className="flex items-center gap-6 md:gap-8 font-bold uppercase text-sm tracking-wider">
                    <Link to="/" className="text-foreground hover:text-primary transition-colors hidden md:block">Home</Link>
                    <Link to="/search" className="text-neutral-500 hover:text-primary transition-colors">Search</Link>

                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="p-2 rounded-full hover:bg-surface-highlight transition-colors"
                        aria-label="Toggle theme"
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>

                    <button className="bg-primary hover:bg-primary-hover text-black px-6 py-2 rounded-sm font-black transform skew-x-[-10deg] transition-transform hover:scale-105">
                        <span className="block transform skew-x-[10deg]">Connect</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};