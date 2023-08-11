import React from 'react';

import { Header } from '../components';


const Spectra = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Metric" title="Spectra" />
      <div className="flex flex-col">
        <h className="text-3xl mb-6">This page can visualize of the chip currently being used. Information that can displayed includes:</h>
        <h className="text-2xl mb-6">- which sites on the chip are occupied</h>
        <h className="text-2xl mb-6">- what samples are at the respective chip sites</h>
        <h className="text-2xl mb-6">- number of samples at each respective chip site</h>
      </div>
    </div>
  );
};

export default Spectra;
