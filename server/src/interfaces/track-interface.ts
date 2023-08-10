interface TrackData {
  id: number;
  pitch: number;
  velocity: number;
  effects: {
    delay?: number;
    reverb?: number;
    lowPassFilter?: number;
  };
}

export default TrackData;
