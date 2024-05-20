import React from 'react';
import './Results.css';

const Results = () => {
  return (
    <div className="results-container">
      <button className="calculate-button">Рассчитать</button>
      <div className="results">
        <p>Веса путей: <span className="blue-text">[0.027, 0.012]</span></p>
        <p>Веса контуров: <span className="blue-text">[0.105, 0.7, 0.7, 0.09, 0.3, 0.7, 1.0]</span></p>
        <p>Вес разложения графа, ΔG_CP: <span className="blue-text">0.05323499999999999</span></p>
        <p>Вес разложения для путей: <span className="blue-text">0.30000000000000004</span></p>
        <p>Вероятность перехода из состояния S0 в состояние S4: <span className="blue-text">0.422654268808115</span></p>
        <p>Вероятность перехода из состояния S0 в состояние S5: <span className="blue-text">0.169061707523246</span></p>
      </div>
    </div>
  );
};

export default Results;
