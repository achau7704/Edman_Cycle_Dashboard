import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGrid } from '@mui/x-data-grid';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const DataGridProgress = () => {

    useEffect(() => {
        socket.on('receiveEdman', (data) => {
            setData(data);
            this.render();
        });
        }, [socket]);

  const [rows, setRows] = useState(initialRows);

  const initialRows = [
    { id: "#1. M1-11 Switch", status: "Incomplete", progress: Math.round(data["currentStepTime"] * 100 / data["totalStepTime"]), time: (Math.round((data["totalStepTime"] - data["currentStepTime"]) * 100) / 100).toFixed(2) },
    { id: "#2. MeOH Wash", status: "Incomplete", progress: 80, time: 42 },
    { id: "#3. M1-12 Switch", status: "Incomplete", progress: 80, time: 45 },
    { id: "#4. Alkaline Wash", status: "Incomplete", progress: 80, time: 16 },
    { id: "#5. M1-23 Switch", status: "Incomplete", progress: 80, time: null },
    { id: "#6. PITC Solution", status: "Incomplete", progress: 80, time: 150 },
    { id: "#7. M1-32 Switch", status: "Incomplete", progress: 80, time: 44 },
    { id: "#8. Alkaline Wash", status: "Incomplete", progress: 80, time: 36 },
    { id: "#9. M1-21 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#10. MeOH Wash", status: "Incomplete", progress: 80, time: 65 },
    { id: "#11. M2-14 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#12. Waste B Purge", status: "Incomplete", progress: 80, time: 65 },
    { id: "#13. M1-16 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#14. DDH2O Wash (Raman Spec #1)", status: "Incomplete", progress: 80, time: 65 },
    { id: "#15. MM1-68 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#16. M2-18 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#17. PAUSE", status: "Incomplete", progress: 80, time: 65 },
    { id: "#18. M1-61 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#19. MeOH Wash", status: "Incomplete", progress: 80, time: 65 },
    { id: "#20. M1-14 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#21. EA Wash", status: "Incomplete", progress: 80, time: 65 },
    { id: "#22. M2-14 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#23. Waste B Purge", status: "Incomplete", progress: 80, time: 65 },
    { id: "#24. M2-41 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#25. EA Wash", status: "Incomplete", progress: 80, time: 65 },
    { id: "#26. M1-45 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#27. TFA Bath", status: "Incomplete", progress: 80, time: 65 },
    { id: "#28. M1-54 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#29. EA Wash", status: "Incomplete", progress: 80, time: 65 },
    { id: "#30. M2-15 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#31. Waste A Purge", status: "Incomplete", progress: 80, time: 65 },
    { id: "#32. M2-52 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#33. EA (secondary) Wash", status: "Incomplete", progress: 80, time: 65 },
    { id: "#34. M2-25 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#35. Waste A Purge", status: "Incomplete", progress: 80, time: 65 },
    { id: "#36. M1-41 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#37. M2-51 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#38. MeOH Wash", status: "Incomplete", progress: 80, time: 65 },
    { id: "#39. M1-16 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#40. DDH2O Wash (Raman Spec #2)", status: "Incomplete", progress: 80, time: 65 },
    { id: "#41. M1-61 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#42. MM1-18 Switch", status: "Incomplete", progress: 80, time: 65 },
    { id: "#43. M2-18 Switch", status: "Incomplete", progress: 80, time: 65 },
  ];

  const ProgressBarCell = ({ value }) => {
    return (
      <div style={{ width: '100%' }}>
        <LinearProgress variant="determinate" value={value} />
      </div>
    );
  };

  const columns = [
    { field: 'id', headerName: 'Edman Cycle Step', width: 170 },
    {
      field: 'progress',
      headerName: 'Step Progress',
      width: 170,
      editable: true,
      renderCell: (params) => <ProgressBarCell value={params.value} />,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 170,
      editable: true,
    },
    {
      field: 'time',
      headerName: 'Time Remaining (minutes)',
      type: 'number',
      width: 180,
      editable: true,
    },
  ];

  const calculateStatus = (progress) => {
    if (progress >= 100) {
      return 'Complete';
    } else if (progress === 0) {
      return 'Incomplete';
    } else {
      return 'In Progress';
    }
  };

  const handleProgressChange = (rowIndex, progress) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].progress = progress;
    updatedRows[rowIndex].status = calculateStatus(progress);
    setRows(updatedRows);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={initialRows}
        columns={columns}
        onEditCellChangeCommitted={(params) =>
          handleProgressChange(params.id, params.value)
        }
      />
    </div>
  );
};

export default DataGridProgress;