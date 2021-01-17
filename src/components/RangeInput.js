import React from 'react';

import '../styles/range_input.css';

export const RangeInput = () => {
  const trackRef = React.useRef(null);
  const thumbLeftRef = React.useRef(null);
  const thumbRightRef = React.useRef(null);

  const [leftThumb, setLeftThumb] = React.useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [rightThumb, setRightThumb] = React.useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const [track, setTrack] = React.useState({ width: 0, height: 0, x: 0, y: 0 });

  const [mousePos, setMousePos] = React.useState(0);

  const [isClickedRight, setIsClickedRight] = React.useState(false);
  const [isEnteredRight, setIsEnteredRight] = React.useState(false);

  React.useEffect(() => {
    setTrack(trackRef.current.getBoundingClientRect());
    setLeftThumb(thumbLeftRef.current.getBoundingClientRect());
    setRightThumb(thumbRightRef.current.getBoundingClientRect());
  }, []);

  const moveThumb = (e) => {
    if (mousePos >= track.x + track.width) {
      setMousePos(track.x + track.width - 1);
    } else {
      if (isEnteredRight && isClickedRight) {
        setMousePos(e.clientX);
      }
    }
  };

  const thumbPosition = (thumb) => {
    return (
      track.width +
      (mousePos || track.width + track.x) -
      track.width -
      track.x -
      thumb.width / 2
    );
  };

  //return track.width - (track.width + track.x - mousePos + thumb.width / 2);
  //(mousePos - track.width - track.x - 22 / 2)

  return (
    <div
      style={{ cursor: `${isClickedRight ? 'pointer' : 'regular'}` }}
      onMouseEnter={() => setIsEnteredRight(true)}
      onMouseLeave={() => {
        setIsEnteredRight(false);
        setIsClickedRight(false);
      }}
      onMouseMove={moveThumb}
      className='range_input_container'
    >
      <div ref={trackRef} className='range_input_track' />
      <div
        ref={thumbLeftRef}
        className='range_input_thumb'
        style={{ left: 0 }}
      />
      <div
        ref={thumbRightRef}
        onMouseDown={() => setIsClickedRight(true)}
        onMouseUp={() => setIsClickedRight(false)}
        className='range_input_thumb'
        style={{ left: thumbPosition(rightThumb) }}
      />
    </div>
  );
};

/*

  console.log(
      `${thumbPosition(rightThumb) + rightThumb.width} == ${track.width}`
    );
    if (thumbPosition(rightThumb) + rightThumb.width >= track.width + 1) {
      setMousePos(track.width + track.x);
    } else {
      if (isEnteredRight && isClickedRight) {
        setMousePos(e.clientX);
      }
    }
    */
