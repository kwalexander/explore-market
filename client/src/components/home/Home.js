import React, { useRef } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { CgDisplayFlex } from 'react-icons/cg';
import Particle from "../Particle";
import travel from "./travel.webp";
import product from "./product.webp";



function Home() {
  const style = {
    opacity: ".6",
    display: "flex",
    
  }

  return (
  
<div style={style}>
  <div>
    </div>
      <img alt='travel' src={travel}/>
      <img alt='product' src={product}/>
    </div>


  

  );
}

export default Home;