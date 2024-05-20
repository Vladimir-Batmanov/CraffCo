import React from 'react';
import './GraphControls.css';

const GraphControls = ({ onDeleteSelected, onDeleteAll, onLinkCircles }) => {
  return (
    <div className="graph-controls">
      <button className="control-button" onClick={onDeleteSelected}>Удалить вершину</button>
      <button className="control-button" onClick={onDeleteAll}>Удалить все вершины</button>
      <button className="control-button" onClick={onLinkCircles}>Соедить вершины</button>
    </div>
  );
};

export default GraphControls;
