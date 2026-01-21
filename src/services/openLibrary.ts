// src/services/openLibrary.ts
import type { Book, BookDetail, SearchFilters, RecentChange } from '../types';

const API_BASE = "https://openlibrary.org";

export const searchBooks = async (query: string): Promise<Book[]> => {
    if (query.length < 3) return []; // Optimisation: pas de recherche sous 3 caractères

    try {
        const response = await fetch(`${API_BASE}/search.json?q=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,cover_i,first_publish_year`);
        const data = await response.json();
        return data.docs || [];
    } catch (error) {
        console.error("Erreur searchBooks:", error);
        return [];
    }
};

// 2. Recherche Avancée (Page dédiée)
export const advancedSearch = async (filters: SearchFilters): Promise<Book[]> => {
    const params = new URLSearchParams();
    if (filters.title) params.append('title', filters.title);
    if (filters.author) params.append('author', filters.author);
    if (filters.subject) params.append('subject', filters.subject);

    try {
        const response = await fetch(`${API_BASE}/search.json?${params.toString()}&limit=20`);
        const data = await response.json();
        return data.docs || [];
    } catch (error) {
        console.error("Erreur advancedSearch:", error);
        return [];
    }
};

// 3. Détails d'un livre (Page détails)
export const getBookDetails = async (id: string): Promise<BookDetail | null> => {
    // Normalisation minimale et génération de variantes à tester
    const raw = (id || '').trim();
    const variants: string[] = [];

    if (!raw) return null;

    if (raw.startsWith('/works/')) {
        variants.push(raw);
    } else if (raw.startsWith('works/')) {
        variants.push(`/${raw}`);
    } else if (/^OL\d+W$/i.test(raw)) {
        variants.push(`/works/${raw}`);
    } else if (/^\d+$/.test(raw)) {
        // id purement numérique : tenter tal que, puis tenter forme OL{num}W
        variants.push(`/works/${raw}`);
        variants.push(`/works/OL${raw}W`);
    } else {
        // fallback : essayer comme work, puis books (édition), puis préfixer OL
        variants.push(`/works/${raw}`);
        variants.push(`/books/${raw}`);
        variants.push(`/works/OL${raw}W`);
    }

    for (const v of variants) {
        try {
            console.debug('getBookDetails: tentative fetch', v);
            const response = await fetch(`${API_BASE}${v}.json`);
            if (!response.ok) {
                console.debug('getBookDetails: réponse non ok', v, response.status);
                continue;
            }
            const json = await response.json();
            return json as BookDetail;
        } catch (err) {
            console.debug('getBookDetails: erreur fetch', v, err);
            // continuer les variantes
        }
    }

    console.warn('getBookDetails: aucune variante trouvée pour id', id);
    return null;
};

// 4. Changements récents (Page d'accueil)
export const getRecentChanges = async (): Promise<RecentChange[]> => {
    try {
        // On filtre pour n'avoir que les ajouts/modifs de livres pour que ce soit joli
        const response = await fetch(`${API_BASE}/recentchanges.json?limit=10&bot=false`);
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Erreur getRecentChanges:", error);
        return [];
    }
};