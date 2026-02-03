import type { } from 'typescript';
import type {WikiResult} from "../types.ts";

const WIKI_API = 'https://en.wikipedia.org/w/api.php?origin=*';

export async function searchWikiForBook(title: string, author?: string): Promise<WikiResult> {
    const q = [title, author].filter(Boolean).join(' ').trim();
    if (!q) return null;

    try {
        const paramsSearch = new URLSearchParams({
            action: 'query',
            list: 'search',
            srsearch: q,
            srlimit: '1',
            format: 'json'
        });
        const searchRes = await fetch(`${WIKI_API}&${paramsSearch.toString()}`);
        if (!searchRes.ok) return null;
        const searchJson = await searchRes.json();
        const hit = searchJson?.query?.search?.[0];
        if (!hit) return null;
        const pageId = hit.pageid;

        const paramsPage = new URLSearchParams({
            action: 'query',
            pageids: String(pageId),
            prop: 'extracts|pageimages',
            exintro: '1',
            explaintext: '1',
            pithumbsize: '500',
            format: 'json'
        });
        const pageRes = await fetch(`${WIKI_API}&${paramsPage.toString()}`);
        if (!pageRes.ok) return null;
        const pageJson = await pageRes.json();
        const page = pageJson?.query?.pages?.[String(pageId)];
        if (!page) return null;

        const extract: string | undefined = page.extract;
        const thumbnail: string | undefined = page.thumbnail?.source;
        const url = page.fullurl || `https://en.wikipedia.org/?curid=${pageId}`;

        return { extract, thumbnail, url };
    } catch (e) {
        console.warn('searchWikiForBook error', e);
        return null;
    }
}