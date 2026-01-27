import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Home from './pages/Home';

// On crée des pages vides temporaires pour éviter les erreurs de route
const Search = () => <div className="p-20 text-center text-4xl font-black italic uppercase">PAGE RECHERCHE</div>;
const Details = () => <div className="p-20 text-center text-4xl font-black italic uppercase">PAGE DETAILS</div>;

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-background">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/book/:id" element={<Details />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;