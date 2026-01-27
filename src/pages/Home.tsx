import { Link } from 'react-router-dom';
import BookCards from './BookCards.tsx'
import {useEffect, useState} from "react";
import {getRecentChanges, searchBooks} from "../services/openLibrary.ts";

// Données factices pour l'affichage
// Les couleurs correspondent au thème : 171717 (Surface), ffab21 (Primary), 2563eb (Secondary)
const HERO_BOOKS = [
    { id: 1, cover: "https://placehold.co/300x450/ffab21/171717?text=MIND&font=roboto" },
    { id: 2, cover: "https://placehold.co/300x450/fff/2563eb?text=FUTURE&font=roboto" },
    { id: 3, cover: "https://placehold.co/300x450/ffab21/000000?text=POWER&font=roboto" },
];

export default function Home() {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const results = await searchBooks("Star Wars");
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

    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans transition-colors duration-300">

            {/* === HERO SECTION === */}
            <section className="relative pt-12 pb-20 px-4">

                {/* Formes géométriques en fond (Néon) */}
                <div className="absolute top-0 right-[-10%] w-[50%] h-[600px] bg-secondary transform rotate-12 opacity-20 blur-[100px] -z-10"></div>
                <div className="absolute bottom-0 left-[-10%] w-[40%] h-[400px] bg-primary transform -rotate-12 opacity-10 blur-[100px] -z-10"></div>

                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* TEXTE GAUCHE */}
                    <div className="space-y-6 z-10">
                        <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter italic">
                            <span className="block text-foreground">Unleash</span>
                            <span className="block text-primary">Your Mind.</span>
                        </h1>
                        <p className="text-xl text-neutral-500 max-w-md font-medium">
                            Bibliothèque haute performance. Accédez à des millions de données instantanément.
                        </p>

                        <div className="pt-4 flex gap-4">
                            <Link to="/search" className="bg-foreground text-background px-8 py-4 font-black uppercase tracking-wider transform skew-x-[-10deg] hover:bg-neutral-500 transition">
                                <span className="block transform skew-x-[10deg]">Start Searching</span>
                            </Link>
                        </div>
                    </div>

                    {/* CAROUSEL DROITE (Effet 3D) */}
                    <div className="relative hidden lg:flex gap-4 transform skew-x-[-10deg] scale-100 origin-bottom">
                        {HERO_BOOKS.map((book, index) => (
                            <div key={book.id} className={`w-40 h-64 rounded bg-surface-highlight shadow-2xl transform transition-all hover:scale-110 hover:z-20 ${index === 1 ? '-translate-y-8 z-10 shadow-[0_0_30px_color-mix(in_srgb,var(--color-secondary),transparent_60%)] border-2 border-secondary' : 'opacity-70 grayscale hover:grayscale-0'}`}>
                                <img src={book.cover} alt="Cover" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === SEARCH BAR AGRESSIVE === */}
            <section className="py-12 bg-surface -skew-y-2 border-y border-surface-highlight transition-colors duration-300">
                <div className="container mx-auto px-4 skew-y-2">
                    <div className="max-w-4xl mx-auto flex transform skew-x-[-10deg] border-4 border-foreground shadow-[10px_10px_0px_var(--color-primary)]">
                        <input
                            type="text"
                            placeholder="RECHERCHER DANS LA COLLECTION..."
                            className="w-full bg-background text-foreground font-bold uppercase px-6 py-4 outline-none placeholder-neutral-500 transform skew-x-[10deg] transition-colors duration-300"
                        />
                        <button className="bg-primary text-black px-10 font-black uppercase hover:bg-surface-highlight transition-colors">
                            <span className="block transform skew-x-[10deg]">GO</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* === NEW RELEASES GRID === */}
            <section className="py-20 container mx-auto px-4">
                <div className="flex justify-between items-end mb-10 border-b-4 border-primary pb-2">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter">
                        New <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Drops</span>
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