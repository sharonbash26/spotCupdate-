import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Sidebar } from "./components/Sidebar";
import { PlayerBar } from "./components/PlayerBar";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useFavorites } from "./hooks/useFavorites";
import { useAuth } from "./context/AuthContext";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function AppContent() {
  const [songs, setSongs] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const player = useAudioPlayer(songs);
  const { user } = useAuth();
  const favorites = useFavorites();

  useEffect(() => {
    fetch(`${API_URL}/api/songs`)
      .then((res) => res.json())
      .then(setSongs)
      .catch(() => setSongs([]));
  }, []);

  return (
    <div className="app">
      <header className="app__mobile-header">
        <button
          type="button"
          className="app__menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
        >
          ☰
        </button>
        <span>Spotify Clone</span>
      </header>

      <div className="app__body">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="app__main">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  songs={songs}
                  currentSong={player.currentSong}
                  isPlaying={player.isPlaying}
                  onPlay={player.playSongAt}
                  isFavorite={user ? favorites.isFavorite : undefined}
                  onToggleFavorite={user ? favorites.toggleFavorite : undefined}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites
                    songs={songs}
                    currentSong={player.currentSong}
                    isPlaying={player.isPlaying}
                    onPlay={player.playSongAt}
                    isFavorite={favorites.isFavorite}
                    onToggleFavorite={favorites.toggleFavorite}
                    loading={favorites.loading}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>

      <PlayerBar
        song={player.currentSong}
        isPlaying={player.isPlaying}
        progress={player.progress}
        duration={player.duration}
        onTogglePlay={player.togglePlay}
        onNext={player.next}
        onPrev={player.prev}
        onSeek={player.seek}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
