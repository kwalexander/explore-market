import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { MdFavorite } from "react-icons/md";
import Auth from '../../utils/auth'


function SearchCards(props) {
  return (
    <>
      <Card data-test-id={props.title} className="project-card-view">
        <Card.Img variant="top" src={props.imgPath} alt="card-img" />
        <Card.Body>

          <Card.Title>{props.title}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>
            {props.description}
          </Card.Text>
                <Card.Subtitle style={{ textAlign: "justify" }}>
                  {props.price}
                </Card.Subtitle>
                <Button
                  variant="primary"
                  href={props.siteLink}
                  target="_blank"
                  style={{ marginLeft: "10px" }}
                >
                <MdFavorite /> &nbsp;
                </Button>
                {"\n"}
                {"\n"}
                {!props.isBlog && props.siteLink && (
                  <Button
                    variant="primary"
                    href={props.siteLink}
                    target="_blank"
                    style={{ marginLeft: "10px" }}
                  >
                  <CgWebsite /> &nbsp;
                    {"Site Link"}
                  </Button>
                )}   
            
        </Card.Body>
      </Card>
    </>
  );
}
export default SearchCards;