import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { advancedSearch } from '../services/openLibrary';
import type { Book, SearchFilters } from '../types';
import BookCards from './BookCards';

export default function AdvancedSearch() {
    const [searchParams] = useSearchParams();
    const [filters, setFilters] = useState<SearchFilters>({ title: '', author: '', subject: '' });
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSearched(true);
        
        const results = await advancedSearch(filters);
        setBooks(results);
        setLoading(false);
    };

    useEffect(() => {
        const titleParam = searchParams.get('title');
        const authorParam = searchParams.get('author');
        const subjectParam = searchParams.get('subject');

        if (titleParam || authorParam || subjectParam) {
            const newFilters = {
                title: titleParam || '',
                author: authorParam || '',
                subject: subjectParam || ''
            };
            setFilters(newFilters);

            (async () => {
                setLoading(true);
                setSearched(true);
                const results = await advancedSearch(newFilters);
                setBooks(results);
                setLoading(false);
            })();
        }
    }, [searchParams]);

    return (
        <div className="bg-background text-foreground pt-12 pb-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-tech-grid pointer-events-none -z-10"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 text-center">
                    <span className="text-stroke text-foreground mr-4">Advanced</span>
                    <span className="text-primary">Search</span>
                </h1>

                <form onSubmit={handleSearch} className="mb-16 bg-surface p-1 border-2 border-surface-highlight shadow-[10px_10px_0px_var(--color-surface-highlight)] transform -skew-x-2 relative group hover:shadow-[10px_10px_0px_var(--color-primary)] transition-shadow duration-300">
                    <div className="bg-surface-highlight p-2 mb-6 flex justify-between items-center transform skew-x-2 mx-[-4px] mt-[-4px]">
                        <span className="text-xs font-mono font-bold text-neutral-500">/// INPUT_PARAMETERS</span>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                    </div>

                    <div className="p-8 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transform skew-x-2">
                        <div className="space-y-2 group/input">
                            <label className="font-bold uppercase text-xs text-primary tracking-widest">Titre // 01</label>
                            <input
                                type="text"
                                value={filters.title}
                                onChange={(e) => setFilters({...filters, title: e.target.value})}
                                className="w-full bg-background border-2 border-surface-highlight p-3 font-bold uppercase focus:border-primary outline-none transition-colors placeholder-neutral-700"
                                placeholder="Ex: Dune"
                            />
                        </div>
                        <div className="space-y-2 group/input">
                            <label className="font-bold uppercase text-xs text-primary tracking-widest">Auteur // 02</label>
                            <input
                                type="text"
                                value={filters.author}
                                onChange={(e) => setFilters({...filters, author: e.target.value})}
                                className="w-full bg-background border-2 border-surface-highlight p-3 font-bold uppercase focus:border-primary outline-none transition-colors placeholder-neutral-700"
                                placeholder="Ex: Frank Herbert"
                            />
                        </div>
                        <div className="space-y-2 group/input">
                            <label className="font-bold uppercase text-xs text-primary tracking-widest">Genre // 03</label>
                            <input
                                type="text"
                                value={filters.subject}
                                onChange={(e) => setFilters({...filters, subject: e.target.value})}
                                className="w-full bg-background border-2 border-surface-highlight p-3 font-bold uppercase focus:border-primary outline-none transition-colors placeholder-neutral-700"
                                placeholder="Ex: Science Fiction"
                            />
                        </div>
                    </div>
                    <div className="mt-12 text-center transform skew-x-2">
                        <button type="submit" className="bg-primary hover:bg-secondary text-black px-16 py-4 font-black uppercase tracking-wider transition-all cursor-pointer shadow-[5px_5px_0px_rgba(0,0,0,0.2)]">
                            INITIALIZE SEARCH
                        </button>
                    </div>
                    </div>
                </form>

                {loading ? (
                    <div className="text-center text-2xl font-bold uppercase animate-pulse">Recherche en cours...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {searched && books.length === 0 && <div className="col-span-full text-center text-xl font-bold uppercase text-neutral-500">Aucun résultat trouvé.</div>}
                        {books.map((book, i) => (
                            <BookCards key={book.key + i} book={book} i={i} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}