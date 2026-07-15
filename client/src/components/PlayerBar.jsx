import "./PlayerBar.css";

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function PlayerBar({ song, isPlaying, progress, duration, onTogglePlay, onNext, onPrev, onSeek }) {
  if (!song) {
    return (
      <div className="player-bar player-bar--empty">
        <span>Select a song to start playing</span>
      </div>
    );
  }

  return (
    <div className="player-bar" role="region" aria-label="Player controls">
      <div className="player-bar__song">
        <span className="player-bar__cover" style={{ background: song.cover }} aria-hidden="true" />
        <div>
          <div className="player-bar__title">{song.title}</div>
          <div className="player-bar__artist">{song.artist}</div>
        </div>
      </div>

      <div className="player-bar__center">
        <div className="player-bar__controls">
          <button type="button" onClick={onPrev} aria-label="Previous song" className="player-bar__btn">
            ⏮
          </button>
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="player-bar__btn player-bar__btn--play"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button type="button" onClick={onNext} aria-label="Next song" className="player-bar__btn">
            ⏭
          </button>
        </div>
        <div className="player-bar__progress">
          <span className="player-bar__time">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={(e) => onSeek(Number(e.target.value))}
            aria-label="Seek"
            className="player-bar__seek"
          />
          <span className="player-bar__time">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
