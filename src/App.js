import logo from "./logo.svg";
import "./App.css";
import testImage from "./testImage.gif";
import React from "react";
const gifFrames = require("gif-frames");

function App() {
  const [duration, setDuration] = React.useState("N/A");
  const [fps, setFps] = React.useState("N/A");
  const [frameCount, setFrameCount] = React.useState("N/A");

  const handleGifLoad = async e => {
    gifFrames({ url: testImage, frames: "all" }).then(frameData => {
      // # of frames is simply the length of the frameData array
      const frameCount = frameData.length;
      // duration is calculated by summing the delay of the frames
      // NOTE: gifFrames gives delay in 1/100 of a second (rather than 1/1000). This is non-standard (to say the least).
      const duration = frameData.reduce(
        (prev, curr) => prev + curr.frameInfo.delay,
        0
      );
      const avgDuration = duration / frameCount;
      const avgDurationInSeconds = avgDuration / 100;
      // Simplify calculation:: numFrames / (numFrames * avgDurationInSeconds) = 1/avgDurationInSeconds
      const fps = 1 / avgDurationInSeconds;
      setDuration(avgDurationInSeconds);
      setFps(fps);
      setFrameCount(frameCount);
    });
  };
  const styles = {
    root: {
      padding: "28px"
    },
    containerStyle: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start"
    },
    bold: {
      fontWeight: "bold"
    }
  };
  return (
    <div style={styles.root}>
      <img
        onLoad={handleGifLoad}
        src={testImage}
        className="testImage"
        alt="logo"
      />
      <div style={styles.containerStyle}>
        <div>
          <span style={styles.bold}>Frame Count: </span>
          {frameCount}
        </div>
        <div>
          <span style={styles.bold}>Average Frame Duration: </span>
          {duration}
          {duration !== "N/A" && "s"}
        </div>
        <div>
          <span style={styles.bold}>FPS: </span>
          {fps}
        </div>
      </div>
    </div>
  );
}

export default App;
