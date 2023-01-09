import React, { useRef } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { CgDisplayFlex } from 'react-icons/cg';
import Particle from "../Particle";
import travel from "./travel.webp";
import product from "./product.webp";
import styles from './home.module.scss';


function Home() {

  return (

    <div className={`d-flex vh-100 ${styles.root}`}>
      <div className='d-flex'>
        <div className='m-auto'>
          <h1>Travel</h1>
          <button className='btn btn-primary'>Search</button>
        </div>
      </div>
      <div className='d-flex'>
      <div className='m-auto'>
          <h1>Product</h1>
          <button className='btn btn-primary'>Search</button>
        </div>
      </div>
    </div>
  );
}

export default Home;