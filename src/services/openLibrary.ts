import type { Book, BookDetail, SearchFilters } from '../types.ts';

const API_BASE = "https://openlibrary.org";

export const searchBooks = async (
    query: string,
    page: number = 1,
    limit: number = 10

) : Promise<Book[]> => {
    if (query.length < 3) return [];

    try {
        let url = `${API_BASE}/search.json?q=${encodeURIComponent(query)}&page=${encodeURIComponent(page)}&limit=${encodeURIComponent(limit)}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.docs || [];
    } catch (error) {
        console.error("Erreur searchBooks:", error);
        return [];
    }
};

export const advancedSearch = async (filters: SearchFilters, page: number = 1, limit: number = 20): Promise<Book[]> => {
    const params = new URLSearchParams();
    if (filters.title) params.append('title', filters.title);
    if (filters.author) params.append('author', filters.author);
    if (filters.subject) params.append('subject', filters.subject);

    if (!filters.title && !filters.author && !filters.subject) return [];

    try {
        const response = await fetch(`${API_BASE}/search.json?${params.toString()}&page=${page}&limit=${limit}`);
        const data = await response.json();
        return data.docs || [];
    } catch (error) {
        console.error("Erreur advancedSearch:", error);
        return [];
    }
};

export const searchAuthor = async (query : string) : Promise<string[]> => {
    try {
        const response = await fetch(`${API_BASE}/search/authors.json?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        return data.authors || [];
    } catch (error) {
        console.error("Erreur searchAuthor:", error);
        return [];
    }
}

export const getRecentChanges = async (number? : number) : Promise<Book[]> => {
    try {
        const response = await fetch(`${API_BASE}/recentchanges/add-book.json?limit=${encodeURIComponent(number || 10)}&bot=false`);
        const data = await response.json();
        const ans: any[] = []
        for (const doc of data) {
            for (const key in doc.changes) {
                const changeKey = doc.changes[key]?.key;
                if (changeKey.startsWith('/books/')) {
                    ans.push(await getBookDetails(changeKey));
                    break
                }
            }
        }
        return ans;
    } catch (error) {
        console.error("Erreur getRecentChanges:", error);
        return [];
    }
}

export const getBookDetails = async (id: string): Promise<BookDetail | null> => {
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
        variants.push(`/works/${raw}`);
        variants.push(`/works/OL${raw}W`);
    }else if (raw.startsWith('/books/')) {
        variants.push(raw);
    } else {
        variants.push(`/works/${raw}`);
        variants.push(`/books/${raw}`);
        variants.push(`/works/OL${raw}W`);
    }

    for (const v of variants) {
        try {
            console.debug('getBookDetails: tentative fetch', v);
            const response = await fetch(`${API_BASE}${v}.json?fields=title,description,subjects,subject_places,subject_people,links,authors,first_publish_date,publish_date,languages,covers`);
            console.log(response);
            if (!response.ok) {
                console.debug('getBookDetails: réponse non ok', v, response.status);
                continue;
            }
            const json = await response.json();
            if (json.works) {
                console.log("test");
                const res = await fetch(`${API_BASE}${json.works[0].key}.json?fields=title,description,subjects,subject_places,subject_people,links,authors,first_publish_date,publish_date,languages,covers`);
                const author = await res.json();
                json.authors = author.authors;
                return json as BookDetail;
            } else {
                return json as BookDetail;
            }
        } catch (err) {
            console.debug('getBookDetails: erreur fetch', v, err);
        }
    }

    console.warn('getBookDetails: aucune variante trouvée pour id', id);
    return null;
};
