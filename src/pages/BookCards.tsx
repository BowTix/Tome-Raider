import type {Book} from "../types.ts";
import { Link } from "react-router-dom";

export default function BookCards(
    {book, i} : {book: Book, i: number}
) {

    const bookId = book.key;

    return (
        <Link to={`${bookId}`} className="group cursor-pointer block relative">
            <div className="relative overflow-hidden bg-surface-highlight mb-4 border-2 border-transparent group-hover:border-primary transition-all">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>

                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} className="w-full transform group-hover:scale-110 transition duration-500" alt="Book"/>
                
                <div className="absolute top-2 right-2 bg-secondary text-black text-xs font-bold px-2 py-1 uppercase skew-x-[-10deg] shadow-lg z-20">
                    NEW
                </div>
            </div>
            
            <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                    <h3 className="font-bold uppercase text-lg leading-none group-hover:text-primary transition-colors line-clamp-2">{book.title}</h3>
                    <p className="text-neutral-500 text-xs font-bold uppercase mt-1 tracking-wider">/// {book.author_name?.[0] || 'UNKNOWN'}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-primary text-xl">
                    ↗
                </div>
            </div>
        </Link>
    )
}
