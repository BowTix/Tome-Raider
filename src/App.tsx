import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';

const Search = () => <div className="p-20 text-center text-4xl font-black italic uppercase">PAGE RECHERCHE</div>;

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-background">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;