import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, Label, YAxis } from 'recharts';

import { Header } from '../components';

const socket = io.connect('http://localhost:3001');

const FlowControl = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on('receiveFlow', (data) => {
      setData(data);
      this.render();
    });
  }, [socket]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Metric" title="Flow Control" />
      <div>
        <h4 className="heading text-2xl font-semibold items-center justify-center mt-10">Flow Volume (Flow 2): {data["flowVolume"]} microliters</h4>
      </div>
      <div>
        <h4 className="heading text-2xl font-semibold items-center justify-center mt-10">Volume Remaining in Syringe:</h4>
      </div>
    </div>
  );
};
export default FlowControl;
