import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";


function ProjectCards(props) {
    return (
      <Card data-test-id={props.title} className="project-card-view">
        <Card.Img variant="top" src={props.imgPath} alt="card-img" />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>
            {props.description}
          </Card.Text>
          <Card.Text style={{ textAlign: "justify" }}>
            {props.price}
          </Card.Text>
        
          {"\n"}
          {"\n"}
          
        </Card.Body>
      </Card>
    );
  }
  export default ProjectCards;
