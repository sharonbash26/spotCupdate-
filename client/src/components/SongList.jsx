import "./SongList.css";

export function SongList({ songs, currentSong, isPlaying, onPlay }) {
  return (
    <table className="song-list">
      <thead>
        <tr>
          <th scope="col" className="song-list__num">#</th>
          <th scope="col">Title</th>
          <th scope="col">Album</th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song, index) => {
          const isCurrent = currentSong?.id === song.id;
          return (
            <tr
              key={song.id}
              className={`song-list__row ${isCurrent ? "song-list__row--active" : ""}`}
              onClick={() => onPlay(index)}
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
