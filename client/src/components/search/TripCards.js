import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// function creates a card for each trip searh result, which is then used in the Travel.js file

function TripCards(props) {
    return (
        <Card data-test-id={props.title} className="trip-card-view">
            <Card.Img variant="top" src={props.imgPath} alt="card-img" />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text style={{ textAlign: "justify" }}>
                    {props.description}
                </Card.Text>
                <Card.Text style={{ textAlign: "justify" }}>
                    {props.price}
                </Card.Text>
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
    );
}
export default TripCards;