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

  // Check if data is not null and has at least one dictionary
  if (!data || data.length === 0) {
    return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Metric" title="Temperature" />
      <div className="flex flex-col">
        <h className="text-3xl mb-6">This page displays the temperature of the Edman system over time.</h>
      </div>
    </div> 
    )
  }

  // Assuming 'data' is a list of dictionaries passed as a prop
  const lastDict = data[data.length - 1];
  const secondElementKey = Object.keys(lastDict)[1];
  const currentTemp = lastDict[secondElementKey];

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Metric" title="Temperature" />
      <div className="flex flex-col">
        <h className="text-3xl mb-6">This page displays the temperature of the Edman system over time.</h>
        <h className="heading text-2xl font-semibold items-center justify-center mt-10 mb-6">Temperature (Celsius): {currentTemp}</h>
      </div>
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
