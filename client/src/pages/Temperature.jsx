import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, Label, YAxis } from 'recharts';

import { Header } from '../components';

const socket = io.connect('http://localhost:3001');

const Temperature = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on('receiveTemp', (data) => {
      setData(data);
      this.render();
    });
  }, [socket]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Metric" title="Temperature" />
      <h>
        <LineChart
          width={1250}
          height={400}
          data={data}
          margin={{ top: 10, right: 10, left: 30, bottom: 30 }} >
          <XAxis dataKey="x">
            <Label
              style={{
                  fontSize: "130%",
                  fill: "black",
              }}
              position="bottom"
              angle={0} 
              value={"Time (Seconds)"} />
          </XAxis>
          <YAxis>
            <Label
                  style={{
                      textAnchor: "middle",
                      fontSize: "130%",
                      fill: "black",
                  }}
                angle={270} 
                position={'insideLeft'}
                value={"Temperature (Celsius)"} />
          </YAxis>
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="y" stroke="#387908" />
        </LineChart>
      </h>
    </div>
  );
};
export default Temperature;
