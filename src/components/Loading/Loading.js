import React from "react";
import { Circles } from "react-loader-spinner";

const Loading = () => {
  return (
    <div style={loadingContainerStyle}>
      <Circles
        height={80}
        width={80}
        color="black"
        ariaLabel="circles-loading"
        visible={true}
      />
      <span style={textStyle}>Yash Kabra</span>
    </div>
  );
};

const loadingContainerStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 5,
};

const textStyle = {
  color: "black",
  fontWeight: "bolder",
  letterSpacing: "2px",
};

export default Loading;