import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookDetails } from '../services/openLibrary';
import { searchWikiForBook } from '../services/wikipedia';
import type {WikiResult} from "../types.ts";

export default function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [authorName, setAuthorName] = useState<string>("Unknown Author");
    const [wiki, setWiki] = useState<WikiResult>(null);

    useEffect(() => {
        if (!id) return;
        let mounted = true;

        const fetchData = async () => {
            setLoading(true);
            setWiki(null);
            try {
                const data = await getBookDetails(id);
                if (!mounted) return;
                setBook(data);
                console.log(data);

                let resolvedAuthor = "Unknown Author";
                if (data && Array.isArray(data.authors) && data.authors.length > 0) {
                    try {
                        const authorKey = data.authors[0].author?.key;
                        if (authorKey) {
                            const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);
                            if (authorRes.ok) {
                                const authorData = await authorRes.json();
                                resolvedAuthor = authorData?.name || resolvedAuthor;
                            }
                        } else if (typeof data.authors[0] === 'string') {
                            resolvedAuthor = data.authors[0];
                        }
                    } catch (e) {
                        console.error("Erreur chargement auteur:", e);
                    }
                }
                if (!mounted) return;
                setAuthorName(resolvedAuthor);

                try {
                    const titleForSearch = data?.title || id;
                    const wikiRes = await searchWikiForBook(titleForSearch, resolvedAuthor);
                    if (mounted) setWiki(wikiRes);
                } catch (e) {
                    console.error("Erreur Wikipedia:", e);
                }
            } catch (error) {
                console.error("Erreur chargement détails:", error);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchData();
        return () => { mounted = false; };
    }, [id]);

    if (loading) return <div className="min-h-screen pt-32 text-center text-xl font-bold uppercase animate-pulse">Chargement des données...</div>;
    if (!book) return <div className="min-h-screen pt-32 text-center text-xl font-bold uppercase text-red-500">Livre introuvable.</div>;

    const description = book.description
        ? (typeof book.description === 'string' ? book.description : book.description.value)
        : "Aucune description disponible.";

    const coverUrl = book.covers && book.covers.length > 0
        ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
        : (wiki?.thumbnail || "https://placehold.co/400x600/171717/ffab21?text=NO+COVER");

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-20 px-4 transition-colors duration-300">
            <div className="container mx-auto max-w-6xl">
                <Link to="/" className="inline-block mb-8 text-neutral-500 hover:text-primary font-bold uppercase tracking-wider text-sm">
                    ← Retour
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4 lg:col-span-4">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-primary transform translate-x-2 translate-y-2 rounded-sm"></div>
                            <img
                                src={coverUrl}
                                alt={book.title}
                                className="relative w-full h-auto object-cover rounded-sm border-2 border-foreground shadow-2xl z-10 bg-surface-highlight"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-8 lg:col-span-8 space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9] mb-2">{book.title}</h1>
                            <p className="text-2xl text-primary font-bold uppercase tracking-wider">{authorName}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 border-y-2 border-surface-highlight py-6">
                            <div>
                                <span className="block text-xs font-bold text-neutral-500 uppercase mb-1">Date de publication</span>
                                <span className="block text-lg font-bold uppercase">{book.first_publish_date || book.publish_date || "N/A"}</span>
                            </div>
                            <div>
                                <span className="block text-xs font-bold text-neutral-500 uppercase mb-1">Langue</span>
                                <span className="block text-lg font-bold uppercase truncate">{book.languages ? String(book.languages[0].key).replaceAll("/languages/", "") : "General"}</span>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <h3 className="text-xl font-black uppercase italic mb-2">Synopsis</h3>
                            <p className="text-neutral-400 leading-relaxed whitespace-pre-line">{description}</p>
                        </div>

                        {wiki && (wiki.extract || wiki.url) && (
                            <div className="prose prose-invert max-w-none mt-6">
                                <h3 className="text-xl font-black uppercase italic mb-2">Infos Wikipedia</h3>
                                {wiki.thumbnail && (
                                    <img src={wiki.thumbnail} alt={`${book.title} - wikipedia`} className="w-48 mb-4 rounded-sm border" />
                                )}
                                {wiki.extract && (
                                    <p className="text-neutral-400 leading-relaxed">{wiki.extract}</p>
                                )}
                                {wiki.url && (
                                    <p className="mt-2">
                                        <a href={wiki.url} target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline">Voir la page Wikipedia</a>
                                    </p>
                                )}
                            </div>
                        )}

                        {book.subjects && (
                            <div className="flex flex-wrap gap-2 pt-4">
                                {book.subjects.slice(0, 8).map((subject: string, i: number) => (
                                    <span key={i} className="px-2 py-1 border border-surface-highlight text-xs font-bold uppercase text-neutral-400 hover:border-primary hover:text-primary transition-colors cursor-default">
                                        #{subject}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}