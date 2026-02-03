import { Link, useNavigate } from 'react-router-dom';
import BookCards from './BookCards.tsx'
import {useEffect, useState} from "react";
import {getRecentChanges, searchBooks} from "../services/openLibrary.ts";

const HERO_BOOKS = [
    { id: 1, title: "MIND", subtitle: "ARCHIVE_01" },
    { id: 2, title: "FUTURE", subtitle: "VISION_02" },
    { id: 3, title: "POWER", subtitle: "SYSTEM_03" },
];

export default function Home() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const results = await getRecentChanges(10);
                setBooks(results);
                console.log(results);
            } catch (error) {
                console.error("Erreur OpenLibrary:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/results?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans transition-colors duration-300">

            <div className="bg-foreground text-background py-1 overflow-hidden border-b border-surface-highlight select-none">
                <div className="whitespace-nowrap animate-marquee font-mono text-xs font-black uppercase tracking-[0.3em]">
                    SYSTEM ONLINE // CONNECTED TO OPENLIBRARY API // SEARCHING MILLIONS OF RECORDS // TOME RAIDER V1.0 // READY TO DEPLOY // SYSTEM ONLINE // CONNECTED TO OPENLIBRARY API // SEARCHING MILLIONS OF RECORDS // TOME RAIDER V1.0 // READY TO DEPLOY //
                </div>
            </div>

            <section className="relative pt-18 pb-20 px-4">
                <div className="absolute inset-0 bg-tech-grid pointer-events-none -z-10"></div>

                <div className="absolute top-0 right-[-10%] w-[50%] h-[600px] bg-secondary transform rotate-12 opacity-20 blur-[100px] -z-10"></div>
                <div className="absolute bottom-0 left-[-10%] w-[40%] h-[400px] bg-primary transform -rotate-12 opacity-10 blur-[100px] -z-10"></div>

                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div className="space-y-6 z-10">
                        <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter italic">
                            <span className="block text-stroke text-foreground opacity-80">Unleash</span>
                            <span className="block text-primary">Your Mind.</span>
                        </h1>
                        <p className="text-xl text-neutral-500 max-w-md font-medium">
                            High-performance library. Access millions of records instantly.
                        </p>

                        <div className="pt-4 flex gap-4">
                            <Link to="/search" className="bg-foreground text-background px-8 py-4 font-black uppercase tracking-wider transform skew-x-[-10deg] transition-all duration-300 shadow-[5px_5px_0px_var(--color-surface-highlight)] hover:bg-foreground  hover:shadow-[10px_10px_0px_var(--color-surface-highlight)] hover:-translate-y-1 hover:-translate-x-1">
                                <span className="block transform skew-x-[10deg]">Start exploration</span>
                            </Link>
                        </div>
                    </div>

                    <div className="relative hidden lg:flex gap-6 transform skew-x-[-10deg] scale-100 origin-bottom pr-10">
                        {HERO_BOOKS.map((book, index) => (
                            <div
                                key={book.id}
                                className={`
                                    w-40 h-64 relative transition-all duration-500 ease-out group cursor-default
                                    ${index === 1 ? '-translate-y-12 z-10 scale-110' : 'hover:-translate-y-6 hover:z-20 opacity-80 hover:opacity-100'}
                                `}
                            >
                                <div className={`
                                    absolute inset-0 border-2 flex flex-col justify-between p-4 transition-all duration-300
                                    ${index === 1
                                        ? 'bg-secondary border-secondary text-black shadow-[0_0_50px_rgba(255,183,0,0.4)]'
                                        : 'bg-surface border-surface-highlight text-neutral-500 hover:border-primary hover:text-primary hover:bg-surface-highlight hover:shadow-[0_0_30px_rgba(0,156,255,0.3)]'
                                    }
                                `}>
                                    <div className="flex justify-between items-center border-b border-current/20 pb-2">
                                        <span className="text-xs font-mono font-bold">VOL.0{book.id}</span>
                                        <div className={`w-1.5 h-1.5 rounded-full ${index === 1 ? 'bg-black animate-pulse' : 'bg-current'}`}></div>
                                    </div>

                                    <div className="flex-1 flex items-center justify-center">
                                        <h3 className="text-4xl font-black tracking-tighter uppercase -rotate-90 whitespace-nowrap">{book.title}</h3>
                                    </div>

                                    <div className="border-t border-current/20 pt-2">
                                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-right">{book.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 bg-surface -skew-y-2 border-y border-surface-highlight transition-colors duration-300">
                <div className="container mx-auto px-4 skew-y-2">
                    <div className="max-w-4xl mx-auto flex transform skew-x-[-10deg] border-4 border-foreground shadow-[10px_10px_0px_var(--color-primary)] bg-background">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            placeholder="SEARCH THE ARCHIVES..."
                            className="w-full bg-transparent text-foreground font-bold uppercase px-6 py-4 outline-none placeholder-neutral-500 transform skew-x-[10deg] transition-colors duration-300"
                        />
                        <button onClick={handleSearch} className="bg-primary text-black px-10 font-black uppercase hover:bg-primary-hover transition-colors cursor-pointer">
                            <span className="block transform skew-x-[10deg]">GO</span>
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-20 container mx-auto px-4">
                <div className="flex justify-between items-end mb-10 border-b-4 border-primary pb-2">
                    <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
                        <span className="text-stroke text-foreground mr-2">Live</span>
                        <span className="text-primary">Feed</span>
                        <span className="text-sm font-mono text-neutral-500 not-italic ml-4 tracking-widest align-middle hidden md:inline-block">/// INCOMING_DATA</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {books.map((book, index) => (
                        <BookCards key={book.key ?? index} book={book} i={index} />
                    ))}
                </div>
            </section>
        </div>
    );
}