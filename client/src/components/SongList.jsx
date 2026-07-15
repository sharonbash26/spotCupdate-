import "./SongList.css";

export function SongList({ songs, currentSong, isPlaying, onPlay, isFavorite, onToggleFavorite }) {
  const showFavorites = Boolean(onToggleFavorite);

  return (
    <table className="song-list">
      <thead>
        <tr>
          <th scope="col" className="song-list__num">#</th>
          <th scope="col">Title</th>
          <th scope="col">Album</th>
          {showFavorites && <th scope="col" className="song-list__fav-col">Favorite</th>}
        </tr>
      </thead>
      <tbody>
        {songs.map((song, index) => {
          const isCurrent = currentSong?.id === song.id;
          const favorite = isFavorite?.(song.id);
          return (
            <tr
              key={song.id}
              className={`song-list__row ${isCurrent ? "song-list__row--active" : ""}`}
              onClick={() => onPlay(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onPlay(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Play ${song.title} by ${song.artist}`}
              aria-current={isCurrent ? "true" : undefined}
            >
              <td className="song-list__num">
                {isCurrent && isPlaying ? "▶" : index + 1}
              </td>
              <td>
                <div className="song-list__title-cell">
                  <span
                    className="song-list__cover"
                    style={{ background: song.cover }}
                    aria-hidden="true"
                  />
                  <div>
                    <div className="song-list__title">{song.title}</div>
                    <div className="song-list__artist">{song.artist}</div>
                  </div>
                </div>
              </td>
              <td className="song-list__album">{song.album}</td>
              {showFavorites && (
                <td className="song-list__fav-col">
                  <button
                    type="button"
                    className={`song-list__fav-btn ${favorite ? "song-list__fav-btn--active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(song.id);
                    }}
                    aria-label={favorite ? `Remove ${song.title} from favorites` : `Add ${song.title} to favorites`}
                    aria-pressed={favorite}
                  >
                    {favorite ? "♥" : "♡"}
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
