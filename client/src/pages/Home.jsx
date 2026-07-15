import { SongList } from "../components/SongList";

export function Home({ songs, currentSong, isPlaying, onPlay, isFavorite, onToggleFavorite }) {
  return (
    <div>
      <h1 className="page-title">Good afternoon</h1>
      <SongList
        songs={songs}
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlay={onPlay}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}
