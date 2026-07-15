import { SongList } from "../components/SongList";

export function Home({ songs, currentSong, isPlaying, onPlay }) {
  return (
    <div>
      <h1 className="page-title">Good afternoon</h1>
      <SongList songs={songs} currentSong={currentSong} isPlaying={isPlaying} onPlay={onPlay} />
    </div>
  );
}
