import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import AISidebar from './components/AISidebar.jsx'
import Footer from './components/Footer.jsx'
import ClaimsTable from './components/ClaimsTable.jsx'
import axios from 'axios';


function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      // This function runs once when the component mounts
      const fetchClaims = async () => {
        try {
          setLoading(true);
          // Hit your Spring Boot endpoint
          const response = await axios.get('http://localhost:8080/api/claims');
          setClaims(response.data); // Put the Oracle data into state
          setLoading(false);
        } catch (err) {
          console.error("Connection to Oracle failed:", err);
          setError("Could not load claims. Is the Spring Boot backend running?");
          setLoading(false);
        }
      };

      fetchClaims();
    }, []);

  return (
    <>
    <div className="flex flex-col min-h-screen bg-gray-50"> {/* Flex Wrapper */}
        <div className="app-shell">
        <Header onOpenAi={() => setIsAiOpen(true)} />

        <main className="main-content">
            <div className="content-grid">

                {loading && (
                    <p className="loading-text">Querying Oracle DB...</p>
                )}

                {error && (
                    <div className="error-alert">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <ClaimsTable claims={claims} />
                )}

            </div>
        </main>

        <Footer />

        <AISidebar isOpen={isAiOpen} setIsOpen={setIsAiOpen} />
        </div>
    </div>
    </>
  )
}

export default App
