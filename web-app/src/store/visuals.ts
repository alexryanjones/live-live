import { create } from 'zustand';

export interface Inputs {
  [key: string]: {
    id: string;
    activeTrackId: string;
  };
}

interface VisualConfig {
  inputs: Inputs;
}

interface VisualsState {
  activeVisualId: string;
  visuals: Record<string, VisualConfig>;
  setActiveVisualId: (id: string) => void;
  setVisualInputs: (id: string, config: VisualConfig) => void;
}

export const useVisualsStore = create<VisualsState>((set) => ({
  activeVisualId: 'default',
  visuals: {
    default: {
      inputs: {
        '1': {
          id: '1',
          activeTrackId: '',
        },
        '2': {
          id: '2',
          activeTrackId: '',
        },
        '3': {
          id: '3',
          activeTrackId: '',
        },
      },
    },
  },

  setActiveVisualId: (id) => set({ activeVisualId: id }),
  setVisualInputs: (id, config) =>
    set((state) => ({
      visuals: {
        ...state.visuals,
        [id]: config,
      },
    })),
}));
