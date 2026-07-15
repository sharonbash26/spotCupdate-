import { useEffect, useRef, useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export function useAudioPlayer(songs) {
  const audioRef = useRef(new Audio());
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentSong = currentIndex >= 0 ? songs[currentIndex] : null;

  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => next();

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, songs]);

  const playSongAt = useCallback(
    (index) => {
      if (index < 0 || index >= songs.length) return;
      const audio = audioRef.current;
      audio.src = `${API_URL}/audio/${songs[index].file}`;
      audio.play().catch(() => {
        // Ignore AbortError from rapid song switching — a newer play() call already took over.
      });
      setCurrentIndex(index);
      setIsPlaying(true);
    },
    [songs]
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (currentIndex === -1) {
      if (songs.length > 0) playSongAt(0);
      return;
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [currentIndex, isPlaying, songs, playSongAt]);

  const next = useCallback(() => {
    if (songs.length === 0) return;
    playSongAt((currentIndex + 1) % songs.length);
  }, [currentIndex, songs, playSongAt]);

  const prev = useCallback(() => {
    if (songs.length === 0) return;
    playSongAt((currentIndex - 1 + songs.length) % songs.length);
  }, [currentIndex, songs, playSongAt]);

  const seek = useCallback((time) => {
    audioRef.current.currentTime = time;
    setProgress(time);
  }, []);

  return {
    currentSong,
    currentIndex,
    isPlaying,
    progress,
    duration,
    playSongAt,
    togglePlay,
    next,
    prev,
    seek,
  };
}
