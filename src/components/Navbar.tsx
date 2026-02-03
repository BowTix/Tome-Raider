import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Navbar = () => {
    const [isDark, setIsDark] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const [quickSearch, setQuickSearch] = useState("");

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const handleQuickSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (quickSearch.trim()) {
            navigate(`/results?q=${encodeURIComponent(quickSearch)}`);
            setQuickSearch("");
        }
    };

    return (
        <nav className="bg-background border-b border-surface-highlight py-4 sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4 flex items-center justify-between">

                <div className="hidden lg:flex items-center gap-2 absolute left-8 top-1/2 -translate-y-1/2 opacity-50">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-green-500">SYSTEM_ONLINE</span>
                </div>

                <Link to="/" className="text-2xl font-black tracking-tighter text-foreground uppercase italic">
                    Tome_<span className="text-primary">Raider</span>
                </Link>

                {location.pathname !== '/' && (
                    <form onSubmit={handleQuickSearch} className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs lg:max-w-md">
                        <div className="flex w-full transform skew-x-[-10deg] border-2 border-surface-highlight bg-background">
                            <input
                                type="text"
                                value={quickSearch}
                                onChange={(e) => setQuickSearch(e.target.value)}
                                placeholder="Quick search..."
                                className="flex-1 bg-transparent px-4 py-2 font-bold uppercase outline-none placeholder-neutral-500 text-sm text-foreground"
                            />
                            <button type="submit" className="bg-primary px-6 py-2 font-black uppercase text-black hover:bg-secondary hover:text-white transition-colors text-sm cursor-pointer">
                                GO
                            </button>
                        </div>
                    </form>
                )}

                <div className="flex items-center gap-6 md:gap-8 font-bold uppercase text-sm tracking-wider">
                    <Link to="/" className={`hover:text-primary transition-colors hidden md:block ${location.pathname === '/' ? 'text-foreground' : 'text-neutral-500'}`}>
                        Home
                    </Link>
                    <Link to="/search" className={`hover:text-primary transition-colors ${location.pathname === '/search' ? 'text-foreground' : 'text-neutral-500'}`}>
                        Advanced_Search
                    </Link>

                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="p-2 rounded-full bg-surface-highlight hover:bg-primary hover:text-background transition-colors cursor-pointer"
                        aria-label="Toggle theme"
                    >
                        {isDark ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};