import * as openLibrary from '../../services/openLibrary';
import {describe, expect, it, afterEach, jest} from '@jest/globals';
import { searchWikiForBook } from '../../services/wikipedia';

describe('OpenLibrary - services', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('searchBooks', () => {
        it('appelle /search.json et retourne les docs', async () => {
            const res = await openLibrary.searchBooks('Star wars');
            expect(Array.isArray(res)).toBe(true);
            expect(res[0].title).toContain("Star Wars");
        });
    });

    describe('advancedSearch', () => {
        it('construit les params et retourne les docs', async () => {
            const res= await openLibrary.advancedSearch({title: 'Star Wars', author: "Zahn"}, 2, 5);
            expect(Array.isArray(res)).toBe(true);
            expect(res[0].title).toContain("Star Wars");
        });
    });

    describe('searchAuthor', () => {
        it('appelle /search/authors.json et retourne authors', async () => {
            const res = await openLibrary.searchAuthor('Zahn');
            expect(Array.isArray(res)).toBe(true);
        });
    });

    describe('getBookDetails', () => {
        it('récupère les détails via /books/{id}.json (ou /works) et renvoie l\'objet', async () => {
            const res = await openLibrary.getBookDetails('/books/OL19324556W');
            expect(res).not.toBeNull();
            expect((res[0]).title).toBe('Star Wars - Thrawn');
        });
    });

    describe('getRecentChanges', () => {
        it('appelle /recentchanges/add-book.json puis getBookDetails pour chaque clé', async () => {
            const res = await openLibrary.getRecentChanges(5);
            expect(Array.isArray(res)).toBe(true);
        });
    });
});


describe('Wikipedia - services', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('retourne null si le titre est vide', async () => {
    const res = await searchWikiForBook('', '');
    expect(res).toBeNull();
  });
});
