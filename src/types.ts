export interface Book {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
    number_of_pages_median?: number;
    subject?: string[];
}

export interface BookDetail extends Book {
    description?: string | { value: string };
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