import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import AdvancedSearch from './pages/AdvancedSearch';
import SearchResults from './pages/SearchResults';

function App() {
    useEffect(() => {
        document.title = "TOME_RAIDER";
    }, []);

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-background">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<AdvancedSearch />} />
                    <Route path="/results" element={<SearchResults />} />
                    <Route path="/books/:id" element={<BookDetails />} />
                    <Route path="/works/:id" element={<BookDetails />}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;