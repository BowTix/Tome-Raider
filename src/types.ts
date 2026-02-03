export interface Book {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
    number_of_pages_median?: number;
    subject?: string[];
    covers?: number[];
}

export interface BookDetail extends Book {
    description?: string | { value: string };
    subject_places?: string[];
    subject_people?: string[];
    links?: { title: string; url: string }[];
    authors?: { author: { key: string; name?: string } }[];
    first_publish_date?: string;
    publish_date?: string;
    languages?: string[];
}
export type WikiResult = {
    extract?: string;
    thumbnail?: string;
    url?: string;
} | null;

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