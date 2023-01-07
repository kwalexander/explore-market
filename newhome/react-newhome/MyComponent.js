import React, { useRef } from 'react';
import "../../newhome/assets/style.css";

const useHover = () => {
  const ref = useRef();

  const handleMouseEnter = () => {
    ref.current.classList.add('hover-left');
  };

  const handleMouseLeave = () => {
    ref.current.classList.remove('hover-left');
  };

  return {
    ref,
    handleMouseEnter,
    handleMouseLeave
  };
};

const MyComponent = () => {
  console.log('Rendering MyComponent');

  const left = useHover();
  const right = useHover();
  const container = useHover();

  return (
    <div className="container" ref={container.ref}>
      <div className="split left" ref={left.ref} onMouseEnter={left.handleMouseEnter} onMouseLeave={left.handleMouseLeave}>
        <h1>Products</h1>
        <a href="#" className="btn">Search Now</a>
      </div>
      <div className="split right" ref={right.ref} onMouseEnter={right.handleMouseEnter} onMouseLeave={right.handleMouseLeave}>
        <h1>Travel</h1>
        <a href="#" className="btn">Search Now</a>
      </div>
    </div>
  );
};

export default MyComponent;
