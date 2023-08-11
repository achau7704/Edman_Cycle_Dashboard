import React from 'react';
import { AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock, AiOutlineLineChart } from 'react-icons/ai';
import { MdDeviceThermostat, MdWater, MdOutlineCached } from 'react-icons/md';

export const links = [
  {
    title: 'General',
    links: [
      {
        name: 'EDMAN',
        icon: <MdOutlineCached />,
      },
    ],
  },

  {
    title: 'Metrics',
    links: [
      {
        name: 'temperature',
        icon: <MdDeviceThermostat />,
      },
      {
        name: 'fluidics',
        icon: <MdWater />,
      },
      {
        name: 'spectra',
        icon: <AiOutlineLineChart />,
      },
    ],
  },
];


