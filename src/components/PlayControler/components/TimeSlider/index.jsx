import React, { useRef, useState, useEffect } from "react";
import Slider from "react-input-slider";

function TimeSlider({ srcSong, playStatus, hanleSetPlayState, nextSong }) {
  // console.log("src", srcSong);
  const audioRef = useRef();
  //   const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  //   const [isPlay, setPlay] = useState(playStatus);

  //handle Pause/Play button
  useEffect(() => {
    // setPlay(playStatus);
    if (!playStatus) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [playStatus]);

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (playStatus) audioRef.current.play();
  };

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!playStatus) {
      hanleSetPlayState(true);
      audioRef.current.play();
    }
  };

  //   console.log("src", srcSong[128]);

  return (
    <>
      <Slider
        className="timeslider"
        xmax={duration}
        x={currentTime}
        onChange={handleTimeSliderChange}
        axis="x"
        //   x={state.x}
        //   onChange={({ x }) => setState((state) => ({ ...state, x }))}
      />
      <audio
        ref={audioRef}
        src={srcSong ? srcSong["128"] : null}
        onLoadedData={handleLoadedData}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onEnded={() => nextSong()}
      />
    </>
  );
}

export default TimeSlider;
