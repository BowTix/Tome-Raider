import type {Book} from "../types.ts";
import { Link } from "react-router-dom";

export default function BookCards(
    {book, i} : {book: Book, i: number}
) {

    const bookId = book.key ? book.key.replace("/works/", "") : "";

    return (
        <Link to={`/book/${bookId}`} className="group cursor-pointer block">
            <div className="relative overflow-hidden bg-surface-highlight mb-4 border-2 border-transparent group-hover:border-primary transition-all">
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} className="w-full transform group-hover:scale-110 transition duration-500" alt="Book"/>
                <div className="absolute top-2 right-2 bg-secondary text-white text-xs font-bold px-2 py-1 uppercase skew-x-[-10deg]">New</div>
            </div>
            <h3 className="font-bold uppercase text-lg leading-none group-hover:text-primary">{book.title}</h3>
            <p className="text-neutral-500 text-sm font-bold uppercase">{book.author_name}</p>
        </Link>
    )
}
