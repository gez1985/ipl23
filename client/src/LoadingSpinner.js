import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function LoadingSpinner(props) {
  return (
    <div className="loading-screen">
      <Loader
        type="TailSpin"
        color="#010576"
        height={50}
        width={50}
      />
      {props.loading ? <p>Loading data</p> : <p>Logging in</p>}
    </div>
  );
}