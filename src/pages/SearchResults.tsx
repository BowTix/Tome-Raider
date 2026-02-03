import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchBooks } from '../services/openLibrary';
import type { Book } from '../types';
import BookCards from './BookCards';

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) return;

        const fetchBooks = async () => {
            setLoading(true);
            const results = await searchBooks(query);
            setBooks(results);
            setLoading(false);
        };

        fetchBooks();
    }, [query]);

    return (
        <div className="bg-background text-foreground pt-16 pb-16 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-tech-grid pointer-events-none -z-10"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 text-center">
                    <span className="text-stroke text-foreground mr-4">Results_For</span>
                    <span className="text-primary">"{query}"</span>
                </h1>

                {loading ? (
                    <div className="text-center text-2xl font-bold uppercase animate-pulse">Recherche en cours...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {books.length === 0 && <div className="col-span-full text-center text-xl font-bold uppercase text-neutral-500">Aucun résultat trouvé.</div>}
                        {books.map((book, i) => (
                            <BookCards key={book.key + i} book={book} i={i} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}