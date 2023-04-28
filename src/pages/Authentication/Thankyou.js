import React from "react";
import { Row, Col, Card, Input, Label, Form, FormFeedback } from "reactstrap";
import testImage from "../../assets/images/cover-img.png"
import { Link } from "react-router-dom";

const Thankyou = () => {

    document.title = "Thankyou for Registering";

    return (
        <React.Fragment>
            <div className="d-flex justify-content-center align-items-center min-vh-100 vw-100">
                <div className="min-vh-100 overflow-hidden vw-100">
                    <div className="min-vh-100 vw-100">
                        <Row className="min-vh-100 vw-100">
                            <Col lg={12} className="min-vh-100 vw-100 p-0">
                                <Card className="min-vh-100 overflow-hidden m-0">
                                    <Row className="g-0 min-vh-100 vw-100">
                                        <Col lg={6} className="left-linear-background">
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <img src={testImage} alt="" height="500" className="image-margin" />
                                            </div>
                                        </Col>

                                        <Col lg={6} className="d-flex justify-content-center align-items-center right-background">
                                            <div className="p-lg-12 p-6 w-100">
                                                <Row>
                                                    <Col lg={12} className="d-flex justify-content-center align-items-center">
                                                        <div className="text-center mb-10 w-50 h-100 p-5 rounded-5 bg-white">
                                                            <div className="mb-4">
                                                                <div className="">
                                                                    <p>Your acknowledgement number is
                                                                        <bold className="ms-1 p-1 thankyou-number">4545454545</bold>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <h1>Thankyou for Submission</h1>
                                                            </div>
                                                            <Link to="/login">
                                                            <div className="mt-3 d-flex align-items-center justify-content-center">
                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-load btn-lg w-50 mt-5 rounded-pill login-btn-color"
                                                                >
                                                                    <span>
                                                                        Back to Login
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </Link>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Thankyou;