import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import QuoteApplication from "./pages/Quote/QuoteApplication"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/quote" element={<QuoteApplication />} />
    </Routes>
  )
}

export default App
