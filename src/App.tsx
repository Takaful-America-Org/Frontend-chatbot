import {  Routes, Route } from "react-router-dom";
import LandingPage from "./pages//LandingPage";
import QuoteApplication from "./pages/Quote/QuoteApplication";
import QuoteDocuments from "./pages/dashboard/QuoteDocuments";


function App() {
  return (
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quote" element={<QuoteApplication />} />
        <Route path="/dashboard" element={<QuoteDocuments />} />
      </Routes>
    
  );
}

export default App;
