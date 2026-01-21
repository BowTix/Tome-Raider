import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AdvancedSearch from './pages/AdvancedSearch';
import BookDetails from './pages/BookDetails';

// Une Navbar temporaire pour tester la navigation
const Navbar = () => (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Tome Raider</Link>
        <div className="space-x-4">
            {/* La "Quick Search" ira ici plus tard */}
            <input type="text" placeholder="Recherche rapide..." className="px-2 py-1 rounded text-black" />
            <Link to="/search" className="hover:text-gray-300">Recherche Avancée</Link>
        </div>
    </nav>
);

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50 text-gray-900">
                <Navbar />

                <main className="container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<AdvancedSearch />} />
                        {/* L'URL dynamique pour un livre spécifique */}
                        <Route path="/book/:id" element={<BookDetails />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;