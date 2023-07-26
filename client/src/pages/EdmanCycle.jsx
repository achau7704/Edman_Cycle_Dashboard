import React, { useState, useEffect } from 'react';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import io from 'socket.io-client';

import { DataGrid } from '@mui/x-data-grid';
import DataGridProgress from '../components/DataGridProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { ProgressBar, Button } from '../components';
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { dropdownData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const socket = io.connect('http://localhost:3001');

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const EdmanCycle = () => {
  const { currentColor, currentMode } = useStateContext();

  const [data, setData] = useState([]);

  const [text, setText] = useState('');

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    socket.on('receiveEdman', (data) => {
      setData(data);
      this.render();
    });
  }, [socket]);

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const startButtonClicked = () => {
    setIsButtonClicked(true);
    // Simulate a delay to reset the button's state after a certain period
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 300);

    const cycleData = text ;
    socket.emit('startButtonClicked', cycleData); // Emit the data to the server with the 'buttonClick' event
  };

  const buttonStyle = {
    padding: '10px',
    background: isButtonClicked ? "black" : currentColor,
    color: "white",
    border: 'none',
    borderRadius: "10px",
    outline: 'none',
    boxShadow: isButtonClicked ? 'none' : '2px 2px 5px rgba(0, 0, 0, 0.3)',
    transition: 'background 0.3s, box-shadow 0.3s',
  };

  const initialRows = [
    { id: 1, step: "M1-11 Switch", status: "Incomplete", progress: Math.round(data["currentStepTime"] * 100 / data["totalStepTime"]), time: (Math.round((data["totalStepTime"] - data["currentStepTime"]) * 100) / 100).toFixed(2) },
    { id: 2, step: "MeOH Wash", status: "Incomplete", progress: 0, time: null },
    { id: 3, step: "M1-12 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 4, step: "Alkaline Wash", status: "Incomplete", progress: 0, time: null },
    { id: 5, step: "M1-23 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 6, step: "PITC Solution", status: "Incomplete", progress: 0, time: null },
    { id: 7, step: "M1-32 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 8, step: "Alkaline Wash", status: "Incomplete", progress: 0, time: null },
    { id: 9, step: "M1-21 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 10, step: "MeOH Wash", status: "Incomplete", progress: 0, time: null },
    { id: 11, step: "M2-14 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 12, step: "Waste B Purge", status: "Incomplete", progress: 0, time: null },
    { id: 13, step: "M1-16 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 14, step: "DDH2O Wash (Raman Spec #1)", status: "Incomplete", progress: 0, time: null },
    { id: 15, step: "MM1-68 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 16, step: "M2-18 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 17, step: "PAUSE", status: "Incomplete", progress: 0, time: null },
    { id: 18, step: "M1-61 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 19, step: "MeOH Wash", status: "Incomplete", progress: 0, time: null },
    { id: 20, step: "M1-14 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 21, step: "EA Wash", status: "Incomplete", progress: 0, time: null },
    { id: 22, step: "M2-14 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 23, step: "Waste B Purge", status: "Incomplete", progress: 0, time: null },
    { id: 24, step: "M2-41 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 25, step: "EA Wash", status: "Incomplete", progress: 0, time: null },
    { id: 26, step: "M1-45 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 27, step: "TFA Bath", status: "Incomplete", progress: 0, time: null },
    { id: 28, step: "M1-54 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 29, step: "EA Wash", status: "Incomplete", progress: 0, time: null },
    { id: 30, step: "M2-15 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 31, step: "Waste A Purge", status: "Incomplete", progress: 0, time: null },
    { id: 32, step: "M2-52 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 33, step: "EA (secondary) Wash", status: "Incomplete", progress: 80, time: null },
    { id: 34, step: "M2-25 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 35, step: "Waste A Purge", status: "Incomplete", progress: 0, time: null },
    { id: 36, step: "M1-41 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 37, step: "M2-51 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 38, step: "MeOH Wash", status: "Incomplete", progress: 0, time: null },
    { id: 39, step: "M1-16 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 40, step: "DDH2O Wash (Raman Spec #2)", status: "Incomplete", progress: 0, time: null },
    { id: 41, step: "M1-61 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 42, step: "MM1-18 Switch", status: "Incomplete", progress: 0, time: null },
    { id: 43, step: "M2-18 Switch", status: "Incomplete", progress: 0, time: null },
  ];

  const ProgressBarCell = ({ value }) => {
    const [isNextRowStarted, setIsNextRowStarted] = useState(false);

    const handleProgressChange = (event) => {
      if (event.value >= 100) {
        setIsNextRowStarted(true);
      }
    };

    useEffect(() => {
      if (isNextRowStarted) {
        const nextRowKey = id + 1;
        const nextRowProgress = rows[nextRowKey]?.progress ?? 0;
        const nextRowProgressBar = (
          <LinearProgress
            value={nextRowProgress}
            onProgressChange={handleProgressChange}
            variant="determinate"
          />
        );
        document.getElementById("next-row-progress-bar").innerHTML = nextRowProgressBar;
      }
    }, [isNextRowStarted]);
    return (
      <div style={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={value} onProgressChange={handleProgressChange} />
      </div>
    );
  };

  const [rows, setRows] = useState(initialRows);

  const handleStepCompletion = (id) => {
    if (id < rows.length - 1) {
      setRows((prevRow) => {
        const updatedProgress = [...prevRow];
        updatedProgress[id].progress = 100;

        // Check if the next step should start (only if the current step is complete)
        if (prevRow[id + 1].progress === 0) {
          updatedProgress[id + 1].progress = 1; // Start the next step
        }

        return updatedProgress;
      });
    }
  };

  const columns = [
    { field: 'id', headerName: 'Step Number', width: 140 },
    { field: 'step', headerName: 'Edman Cycle Step', width: 170 },
    {
      field: 'progress',
      headerName: 'Step Progress',
      width: 170,
      editable: true,
      renderCell: (params) => <ProgressBarCell value={params.value} onStepCompletion={() => handleStepCompletion(params.id)}/>,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 170,
      editable: true,
      renderCell: (params) => {
        const progress = params.row.progress;
        if (progress === 0) {
          return 'Incomplete';
        } else if (progress >= 100) {
          return 'Complete';
        } else {
          return 'In Progress';
        }
      },
    },
    {
      field: 'time',
      headerName: 'Time Remaining (minutes)',
      type: 'number',
      width: 180,
      editable: true,
    },
    {
      field: 'flow',
      headerName: 'Flow Volume',
      type: 'number',
      width: 180,
      editable: true,
    },
    {
      field: 'fluid',
      headerName: 'Fluid Type',
      type: 'number',
      width: 180,
      editable: true,
    },
  ];

  return (
    <div className="mt-24">
      <div className="flex gap-10 flex-row justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-850" > 
          <h3 className="heading text-3xl font-semibold items-center flex items-center">Total Number of Cycles: {data["totalCycles"]} 
          <div className='ml-13 p-6'>
            <div className='border border-gray-400 rounded px-2 py-1'>
              <input
                type="text"
                placeholder='# of cycles'
                value={text}
                onChange={handleInputChange}
              />
            </div> 
          </div> 
          <button style={buttonStyle} className={isButtonClicked ? "black" : {currentColor}} onClick={startButtonClicked} type="button">
            START
          </button>
          </h3> 
          <div className="flex items-center justify-center">
            <h3 className="heading text-3xl font-semibold items-center justify-center">Progress:</h3>
              <ProgressBar bgcolor="#99ff66" progress={Math.round(data["currentTime"] * 100 / data["totalTime"])}  height={30} />
          </div>
          <h4 className="heading text-2xl font-semibold items-center justify-center">Current Cycle Number: {data["currentCycle"]}</h4>
          <h4 className="heading text-2xl font-semibold items-center justify-center mt-5">Time Remaining in Current Cycle: {(data["totalTime"] - data["currentTime"]).toFixed(2)} minutes</h4>
        </div>
        <div>
          <div
            className="rounded-2xl md:w-700 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-center items-center ">
              <p className="font-semibold text-white text-3xl">Cycle Step: {data["currentStep"]}</p>
            </div>
            <div className="mt-4 items-center justify-center mr-20">
              <ProgressBar bgcolor="#99ccff" progress={Math.round(data["currentStepTime"] * 100 / data["totalStepTime"])}  height={30} />
              <h6 className="heading text-xl font-semibold items-center justify-center mt-5 text-white">Time Remaining in Current Step: {(Math.round((data["totalStepTime"] - data["currentStepTime"]) * 100) / 100).toFixed(2)} minutes</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-10 flex-row justify-center mt-5 items-center ml-9">
        <div className="w-800 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3 justify-center items-center text-white" style={{ backgroundColor: currentColor }}>
          <div className="flex justify-center">
            <p className="text-3xl font-semibold">Cycle Tracker</p>
          </div>
          <div className='mt-10' style={{ width: 500, height: 500 }}>
            <CircularProgressbarWithChildren
              value={Math.round(data["currentTime"] * 100 / data["totalTime"])} 
              text={`Edman Cycle: ${Math.round(data["currentTime"] * 100 / data["totalTime"])}%`}
              background
              styles={{
                // Customize the root svg element
                root: {},
                // Customize the path, i.e. the "completed progress"
                path: {
                  stroke: '#99ff66',
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'butt',
                  // Customize transition animation
                  transition: 'stroke-dashoffset 0.5s ease 0s',
                  transformOrigin: 'center center',
                },
                // Customize the circle behind the path, i.e. the "total progress"
                trail: {
                  // Trail color
                  stroke: 'white',
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'butt',
                  // Rotate the trail
                  transform: 'rotate(0.25turn)',
                  transformOrigin: 'center center',
                },
                // Customize the text
                text: {
                  // Text color
                  fill: 'white',
                  // Text size
                  fontSize: '7px',
                },
                // Customize background - only used when the `background` prop is true
                background: {
                  fill: 'black',
                },
              }} >
              <div className="container" style={{ width: "84%" }}>
                <CircularProgressbar
                  value={Math.round(data["currentStepTime"] * 100 / data["totalStepTime"])}
                  text={`Current Step: ${data["currentStep"]}`}
                  styles={{
                    path: {
                      stroke: "#99ccff",
                      strokeLinecap: 'butt',
                    },
                    trail: {
                      stroke: `#a9a9a9`,
                      strokeLinecap: 'butt',
                    },
                    text: {
                      // Text color
                      fill: 'white',
                      // Text size
                      fontSize: '5px',
                      transform: 'translateY(10px)'
                    },
                  }}
                />
              </div>
              </CircularProgressbarWithChildren>
          </div>
        </div>
          <div className='mr-9' style={{ height: 600, width: '70%' }}>
            {/* <DataGridProgress /> */}
            <DataGrid
              rows={initialRows}
              columns={columns}
              // onEditCellChangeCommitted={(params) =>
              //   handleProgressChange(params.id, params.value)
              // }
            />
          </div>
      </div>
    </div>
  );
};

export default EdmanCycle;
