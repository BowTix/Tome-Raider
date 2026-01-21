import {useEffect, useState} from "react";
import {getBookDetails} from "../services/openLibrary.ts";
import {useParams} from "react-router-dom";

export default function BookDetails() {

    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const data = await getBookDetails(id);
                setBook(data);
            } catch (e) {
                console.error(e);
                setError(e);
            }
        };
        fetchBookDetails();
        console.log()
    }, [id]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Détails du livre</h1>
            <p>{book?.title} and {book?.author_name}</p>
        </div>
    );
}