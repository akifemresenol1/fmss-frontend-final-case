
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import Starships from './pages/Starships';
import StarshipDetails from "./pages/StarshipDetail";
import Intro from './pages/Intro';
import Error from './pages/Error404';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/starships" element={<Starships />} />
          <Route path="/starships/:id" element={<StarshipDetails />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/error" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
