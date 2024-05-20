import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import './Graph.css';

const Graph = forwardRef((props, ref) => {
  const [circles, setCircles] = useState([]);
  const [selectedCircles, setSelectedCircles] = useState([]);
  const [lines, setLines] = useState([]);
  const [isLinking, setIsLinking] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [probability, setProbability] = useState(0.5);
  const containerRef = useRef();
  const nextId = useRef(1);

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('click', handleContainerClick);
    return () => container.removeEventListener('click', handleContainerClick);
  }, [circles, selectedCircles, isLinking]);

  useImperativeHandle(ref, () => ({
    handleDeleteSelected,
    handleDeleteAll,
    setIsLinking,
  }));

  const getRandomColor = () => {
    const colors = ['#5cdb95', '#379683', '#8ee4af'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleContainerClick = (event) => {
    if (event.target === containerRef.current) {
      if (selectedCircles.length > 0) {
        setSelectedCircles([]);
      } else {
        createCircle(event.clientX, event.clientY);
      }
    }
  };

  const createCircle = (x, y) => {
    const rect = containerRef.current.getBoundingClientRect();
    const newCircle = {
      id: nextId.current,
      x: x - rect.left - 20,
      y: y - rect.top - 20,
      color: getRandomColor(),
    };
    nextId.current += 1;
    setCircles([...circles, newCircle]);
  };

  const handleCircleClick = (circleId) => {
    const newSelectedCircles = selectedCircles.includes(circleId)
      ? selectedCircles.filter(id => id !== circleId)
      : [...selectedCircles, circleId];

    if (isLinking && newSelectedCircles.length <= 2) {
      setModalVisible(true);
    }

    setSelectedCircles(newSelectedCircles);
  };

  const handleLinkCircles = () => {
    if (selectedCircles.length === 1) {
      setModalVisible(true);
    } else if (selectedCircles.length === 2) {
      setModalVisible(true);
    }
  };

  const handleLinkConfirmation = () => {
    if (selectedCircles.length === 2) {
      const [circle1, circle2] = selectedCircles;
      setLines([...lines, { circle1, circle2, probability }]);
    } else if (selectedCircles.length === 1) {
      const circle = selectedCircles[0];
      setLines([...lines, { circle1: circle, circle2: circle, probability }]);
    }
    setSelectedCircles([]);
    setIsLinking(false);
    setModalVisible(false);
  };

  const handleDeleteSelected = () => {
    const remainingCircles = circles.filter(circle => !selectedCircles.includes(circle.id));
    const remainingLines = lines.filter(line => !selectedCircles.includes(line.circle1) && !selectedCircles.includes(line.circle2));
    setCircles(remainingCircles);
    setLines(remainingLines);
    setSelectedCircles([]);
  };

  const handleDeleteAll = () => {
    setCircles([]);
    setLines([]);
    setSelectedCircles([]);
  };

  const getLineCoordinates = (circle1, circle2) => {
    const r = 20;
    const dx = circle2.x - circle1.x;
    const dy = circle2.y - circle1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const offsetX = (dx * r) / distance;
    const offsetY = (dy * r) / distance;
    const x1 = circle1.x + 20 + offsetX;
    const y1 = circle1.y + 20 + offsetY;
    const x2 = circle2.x + 20 - offsetX;
    const y2 = circle2.y + 20 - offsetY;
    return { x1, y1, x2, y2 };
  };

  const getTextCoordinates = (x1, y1, x2, y2) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2 - 10;
    return { midX, midY };
  };

  const getLoopbackCoordinates = (circle) => {
    const x = circle.x + 20;
    const y = circle.y;
    const path = `
      M ${x},${y}
      C ${x + 30},${y - 30} ${x + 30},${y + 30} ${x},${y + 30}
      S ${x - 30},${y - 30} ${x},${y}
    `;
    const textX = x + 35;
    const textY = y;
    return { path, textX, textY };
  };

  return (
    <div className="graph-container" ref={containerRef}>
      {circles.map(circle => (
        <div
          key={circle.id}
          className={`circle ${selectedCircles.includes(circle.id) ? 'selected' : ''}`}
          style={{ left: circle.x, top: circle.y, backgroundColor: circle.color }}
          onClick={() => handleCircleClick(circle.id)}
        >
          {circle.id}
        </div>
      ))}
      <svg className="graph-svg">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" />
          </marker>
        </defs>
        {lines.map((line, index) => {
          const circle1 = circles.find(circle => circle.id === line.circle1);
          const circle2 = circles.find(circle => circle.id === line.circle2);
          if (!circle1 || !circle2) return null;

          if (circle1.id === circle2.id) {
            const { path, textX, textY } = getLoopbackCoordinates(circle1);
            return (
              <g key={index}>
                <path d={path} fill="none" stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x={textX} y={textY} fill="black" textAnchor="middle">
                  {line.probability}
                </text>
              </g>
            );
          } else {
            const { x1, y1, x2, y2 } = getLineCoordinates(circle1, circle2);
            const { midX, midY } = getTextCoordinates(x1, y1, x2, y2);
            return (
              <g key={index}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="black"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                <text x={midX} y={midY} fill="black" textAnchor="middle">
                  {line.probability}
                </text>
              </g>
            );
          }
        })}
      </svg>
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
            <h2>Укажите вероятность:</h2>
            <input
              type="number"
              step="0.01"
              max="1"
              min="0"
              value={probability}
              onChange={(e) => setProbability(parseFloat(e.target.value))}
            />
            <button onClick={handleLinkConfirmation}>Построить</button>
          </div>
        </div>
      )}
    </div>
  );
});

export default Graph;
