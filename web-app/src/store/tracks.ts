import { create } from 'zustand';

interface TrackData {
  id: number;
  pitch: number;
  velocity: number;
}

interface TracksState {
  tracks: Record<string, TrackData>;
  setTrack: (id: string, data: TrackData) => void;
}

export const useTracksStore = create<TracksState>()((set) => ({
  tracks: {},
  setTrack: (id, data) =>
    set((state) => ({ tracks: { ...state.tracks, [id]: data } })),
}));
