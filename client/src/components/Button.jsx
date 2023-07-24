import { React, useState } from 'react';

import { useStateContext } from '../contexts/ContextProvider';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const Button = ({ icon, bgColor, color, bgHoverColor, size, text, borderRadius, width }) => {
  const { setIsClicked, initialState } = useStateContext();

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const startButtonClicked = () => {
    setIsButtonClicked(true);

    // Simulate a delay to reset the button's state after a certain period
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 300);

    socket = io('http://localhost:3001')
    const cycleData = text;
    socket.emit('startButtonClicked', cycleData); // Emit the data to the server with the 'buttonClick' event
  };

  const buttonStyle = {
    padding: '10px',
    background: isButtonClicked ? "black" : bgColor,
    color: color,
    border: 'none',
    borderRadius: borderRadius,
    outline: 'none',
    boxShadow: isButtonClicked ? 'none' : '2px 2px 5px rgba(0, 0, 0, 0.3)',
    transition: 'background 0.3s, box-shadow 0.3s',
  };

  return (
    <button
      type="button"
      style={buttonStyle}
      className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
      onClick={startButtonClicked}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
