import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { MdFavorite } from "react-icons/md";



function SearchCards(props) {
  return (
    <>
      <Card data-test-id={props.title && props.id} className="project-card-view">
        <Card.Img variant="top" src={props.imgPath} alt="card-img" />
        <Card.Body>

          <Card.Title>{props.title}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>
            {props.description}
          </Card.Text>
                <Card.Subtitle style={{ textAlign: "justify" }}>
                  {props.symbol} {props.price}
                </Card.Subtitle>
        </Card.Body>
      </Card>
    </>
  );
}
export default SearchCards;