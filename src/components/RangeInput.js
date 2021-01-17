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

  const [mousePosLeft, setMousePosLeft] = React.useState(0);
  const [mousePostRight, setMousePosRight] = React.useState(0);

  const [isClickedRight, setIsClickedRight] = React.useState(false);
  const [isClickedLeft, setIsClickedLeft] = React.useState(false);

  const [isEntered, setisEntered] = React.useState(false);

  React.useEffect(() => {
    setTrack(trackRef.current.getBoundingClientRect());
    setLeftThumb(thumbLeftRef.current.getBoundingClientRect());
    setRightThumb(thumbRightRef.current.getBoundingClientRect());
  }, []);

  const updateOnResize = () => {
    setTrack(trackRef.current.getBoundingClientRect());
    setLeftThumb(thumbLeftRef.current.getBoundingClientRect());
    setRightThumb(thumbRightRef.current.getBoundingClientRect());
    console.log('resizing');
  };

  React.useLayoutEffect(() => {
    window.addEventListener('resize', updateOnResize);
    return () => window.removeEventListener('resize', updateOnResize);
  }, []);

  const moveThumb = (e) => {
    if (isEntered && isClickedRight) {
      setMousePosRight(e.clientX);
    } else if (isEntered && isClickedLeft) {
      setMousePosLeft(e.clientX);
    }
  };

  const thumbRightPosition = (thumb) => {
    return (
      track.width +
      (mousePostRight || track.width + track.x) -
      track.width -
      track.x -
      thumb.width / 2
    );
  };

  const thumbLeftPosition = (thumb) => {
    return (mousePosLeft || track.x) - track.x - thumb.width / 2;
  };

  return (
    <div
      style={{
        cursor: `${isClickedRight || isClickedLeft ? 'pointer' : 'initial'}`,
      }}
      onMouseEnter={() => setisEntered(true)}
      onMouseLeave={() => {
        setisEntered(false);
        setIsClickedRight(false);
        setIsClickedLeft(false);
      }}
      onMouseMove={moveThumb}
      className='range_input_container'
    >
      <div ref={trackRef} className='range_input_track' />
      <div
        ref={thumbLeftRef}
        onMouseDown={() => setIsClickedLeft(true)}
        onMouseUp={() => setIsClickedLeft(false)}
        className='range_input_thumb'
        style={{ left: thumbLeftPosition(leftThumb) }}
      />
      <div
        ref={thumbRightRef}
        onMouseDown={() => {
          setIsClickedRight(true);
          console.log('Clicked right');
        }}
        onMouseUp={() => setIsClickedRight(false)}
        className='range_input_thumb'
        style={{ left: thumbRightPosition(rightThumb) }}
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
      if (isEntered && isClickedRight) {
        setMousePos(e.clientX);
      }
    }
    */
