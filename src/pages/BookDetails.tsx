import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookDetails } from '../services/openLibrary';

export default function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [authorName, setAuthorName] = useState<string>("Unknown Author");

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getBookDetails(id);
                setBook(data);

                if (data && data.authors && data.authors.length > 0) {
                    const authorKey = data.authors[0].author.key;
                    const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);
                    if (authorRes.ok) {
                        const authorData = await authorRes.json();
                        setAuthorName(authorData.name);
                    }
                }
            } catch (error) {
                console.error("Erreur chargement détails:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="min-h-screen pt-32 text-center text-xl font-bold uppercase animate-pulse">Chargement des données...</div>;
    if (!book) return <div className="min-h-screen pt-32 text-center text-xl font-bold uppercase text-red-500">Livre introuvable.</div>;

    const description = book.description
        ? (typeof book.description === 'string' ? book.description : book.description.value)
        : "Aucune description disponible.";

    const coverUrl = book.covers && book.covers.length > 0
        ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
        : "https://placehold.co/400x600/171717/fff200?text=NO+COVER";

    return (
        <div className="bg-background text-foreground pt-16 pb-16 px-4 transition-colors duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-tech-grid pointer-events-none -z-10"></div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <Link to="/" className="inline-block mb-8 px-6 py-2 border-2 border-surface-highlight hover:border-primary hover:bg-primary hover:text-black font-bold uppercase tracking-wider text-sm transition-all transform skew-x-[-10deg] group">
                    <span className="block transform skew-x-[10deg]">← RETURN_TO_BASE</span>
                </Link>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4 lg:col-span-4">
                        <div className="relative group">
                            <div className="absolute -inset-2 border-2 border-dashed border-neutral-700 z-0"></div>
                            <div className="absolute inset-0 bg-primary transform translate-x-4 translate-y-4 rounded-sm"></div>
                            <img
                                src={coverUrl}
                                alt={book.title}
                                className="relative w-full h-auto object-cover rounded-sm border-2 border-foreground shadow-[0_0_30px_rgba(0,0,0,0.5)] z-10 bg-surface-highlight grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-8 lg:col-span-8 space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-xs font-mono text-secondary tracking-widest">
                                <span>/// CLASSIFIED_DATA</span>
                                <span className="w-10 h-[1px] bg-secondary"></span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-4">{book.title}</h1>
                            <p className="text-3xl text-transparent text-stroke font-bold uppercase tracking-wider hover:text-primary transition-colors duration-300 cursor-default">{authorName}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 border-y-2 border-surface-highlight py-6 bg-surface/50 backdrop-blur-sm">
                            <div className="border-r-2 border-surface-highlight pr-6">
                                <span className="block text-[10px] font-mono font-bold text-secondary uppercase mb-1">/// PUBLISH_DATE</span>
                                <span className="block text-2xl font-black uppercase">{book.first_publish_date || book.publish_date || "N/A"}</span>
                            </div>
                            <div className="pl-2">
                                <span className="block text-[10px] font-mono font-bold text-secondary uppercase mb-1">/// LANGUAGE_ID</span>
                                <span className="block text-2xl font-black uppercase truncate">{book.languages ? book.languages[0] : "General"}</span>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none relative">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-transparent"></div>
                            <h3 className="text-xl font-black uppercase italic mb-2 pl-4">Synopsis_File</h3>
                            <p className="text-neutral-400 leading-relaxed whitespace-pre-line pl-4 font-medium">{description}</p>
                        </div>

                        {book.subjects && (
                            <div className="flex flex-wrap gap-2 pt-4">
                                {book.subjects.slice(0, 8).map((subject: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-surface border border-surface-highlight text-xs font-bold uppercase text-neutral-400 hover:border-primary hover:text-primary hover:bg-surface-highlight transition-all cursor-default skew-x-[-10deg]">
                                        <span className="block skew-x-[10deg]">#{subject}</span>
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