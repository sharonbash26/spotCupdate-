import { SongList } from "../components/SongList";

export function Favorites({ songs, currentSong, isPlaying, onPlay, isFavorite, onToggleFavorite, loading }) {
  const favoriteSongs = songs.filter((song) => isFavorite(song.id));

  return (
    <div>
      <h1 className="page-title">Favorites</h1>
      {loading ? (
        <p className="page-empty">Loading...</p>
      ) : favoriteSongs.length === 0 ? (
        <p className="page-empty">No favorites yet. Click the heart on a song to add it here.</p>
      ) : (
        <SongList
          songs={favoriteSongs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlay={(index) => onPlay(songs.indexOf(favoriteSongs[index]))}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
}
