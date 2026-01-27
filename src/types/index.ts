// src/types/index.ts

export interface Book {
    key: string;               // ex: "/works/OL12345W"
    title: string;
    author_name?: string[];    // Peut être undefined
    cover_i?: number;          // ID de la couverture
    first_publish_year?: number;
    number_of_pages_median?: number;
    subject?: string[];
}

export interface BookDetail extends Book {
    description?: string | { value: string }; // L'API est capricieuse ici
    covers?: number[];
    subject_places?: string[];
    subject_people?: string[];
    links?: { title: string; url: string }[];
}

export interface SearchFilters {
    title?: string;
    author?: string;
    subject?: string;
}

export interface RecentChange {
    id: string;
    kind: string;
    title: string;
    
    timestamp: string;
    comment: string;
    covers?: number;
}