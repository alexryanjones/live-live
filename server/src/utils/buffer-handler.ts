export const getBufferType = (bufferData: Buffer) => {
  if (
    bufferData[8] === 44 &&
    bufferData[9] === 105 &&
    bufferData[10] === 105 &&
    bufferData[11] === 105
  ) {
    return 'note';
  } else if (
    bufferData[8] === 44 &&
    bufferData[9] === 105 &&
    bufferData[10] === 105 &&
    bufferData[11] === 115
  ) {
    return 'parameter';
  }
};

export const getNoteData = (bufferData: Buffer) => {
  const noteData = {
    pitch: bufferData[19],
    velocity: bufferData[23],
    track: bufferData[27],
  };
  return noteData;
};

export const getParameterData = (bufferData: Buffer) => {
  const value = bufferData[19];
  const track = bufferData[23];

  const parameterStartIndex = 24;
  const parameterEndIndex = bufferData.indexOf(0, parameterStartIndex);
  const parameterString = bufferData
    .slice(parameterStartIndex, parameterEndIndex)
    .toString('utf8');

  const parameterData = {
    value: value,
    track: track,
    parameter: parameterString,
  };
  return parameterData;
};
