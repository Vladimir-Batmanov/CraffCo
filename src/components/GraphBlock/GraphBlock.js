import React, { useRef } from 'react';
import GraphControls from '../GraphControls/GraphControls';
import Graph from '../Graph/Graph';
import './GraphBlock.css';

const GraphBlock = () => {
  const graphRef = useRef();

  const handleDeleteSelected = () => {
    if (graphRef.current) {
      graphRef.current.handleDeleteSelected();
    }
  };

  const handleDeleteAll = () => {
    if (graphRef.current) {
      graphRef.current.handleDeleteAll();
    }
  };

  const handleLinkCircles = () => {
    if (graphRef.current) {
      graphRef.current.setIsLinking(true);
    }
  };

  return (
    <div className="graph-block">
      <GraphControls
        onDeleteSelected={handleDeleteSelected}
        onDeleteAll={handleDeleteAll}
        onLinkCircles={handleLinkCircles}
      />
      <Graph ref={graphRef} />
    </div>
  );
};

export default GraphBlock;
