import React, { FC } from 'react';
import { useVisualsStore } from '../store/visuals';
import { Bars } from '../visuals/Bars';

export const VRender: FC = () => {
  const activeVisualId = useVisualsStore((state) => state.activeVisualId);
  const { inputs } = useVisualsStore((state) => state.visuals[activeVisualId]);

  switch (activeVisualId) {
    case 'default':
      return <Bars inputs={inputs} />;
    default:
      return null;
  }
};
