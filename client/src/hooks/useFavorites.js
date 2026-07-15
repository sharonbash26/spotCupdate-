import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export function useFavorites() {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFavoriteIds(new Set());
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from("favorites")
      .select("song_id")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (!error && data) {
          setFavoriteIds(new Set(data.map((row) => row.song_id)));
        }
        setLoading(false);
      });
  }, [user]);

  const isFavorite = useCallback((songId) => favoriteIds.has(songId), [favoriteIds]);

  const toggleFavorite = useCallback(
    async (songId) => {
      if (!user) return;
      const currentlyFavorite = favoriteIds.has(songId);

      if (currentlyFavorite) {
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.delete(songId);
          return next;
        });
        await supabase.from("favorites").delete().eq("user_id", user.id).eq("song_id", songId);
      } else {
        setFavoriteIds((prev) => new Set(prev).add(songId));
        await supabase.from("favorites").insert({ user_id: user.id, song_id: songId });
      }
    },
    [user, favoriteIds]
  );

  return { favoriteIds, isFavorite, toggleFavorite, loading };
}
