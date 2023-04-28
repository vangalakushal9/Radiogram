import React from "react";
import { Row, Col, Card, Input } from "reactstrap";
import testImage from "../../assets/images/cover-img.png";
import logoLight from "../../assets/images/second-cover.svg";
import { Link } from "react-router-dom";

const RegistrationInformation = () => {
  document.title = "Registration Information";

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center align-items-center min-vh-100 vw-100">
        <div className="min-vh-100 overflow-hidden vw-100">
          <div className="min-vh-100 vw-100">
            <Row className="min-vh-100 vw-100">
              <Col lg={12} className="min-vh-100 vw-100 p-0">
                <Card className="min-vh-100 overflow-hidden m-0">
                  <Row className="g-0 min-vh-100 vw-100">
                    <Col
                      lg={6}
                      className="left-linear-background"
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          src={testImage}
                          alt=""
                          height="500"
                          className="image-margin"
                        />
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <img src={logoLight} alt="" height="100" />
                      </div>
                    </Col>

                    <Col
                      lg={6}
                      className="d-flex justify-content-center align-items-center right-background"
                    >
                      <div className="p-lg-12 p-6 w-100">
                        <Row>
                          <Col lg={12}>
                            <div className="text-center mb-10 text-white-50">
                              <div className="mb-4">
                                <div className="d-inline-block auth-logo"></div>
                              </div>
                              <div className="mb-3">
                                <h4 className="text-dark">
                                  Registration
                                </h4>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <div>
                          <div className="mb-5 w-50 m-auto">
                            <Input
                              name="registration_status"
                              className="form-control rounded-pill form-control-lg"
                              placeholder="Enter acknowledgement number"
                              type="number"
                            />
                          </div>

                          <div className="d-flex justify-content-center align-items-center mb-4 m-auto">
                            <div
                              className="text-center mb-10 w-50 h-100 p-3 rounded-5 bg-white"
                            >
                              <span className="fs-5 text-muted">
                                Registration Information
                              </span>
                              <div className="my-4">
                                <span className="fs-5 fw-bold me-5">
                                  Full Name:
                                </span>
                                <span className="fs-5 text-muted">
                                  Kushal V
                                </span>
                              </div>
                              <div className="my-4">
                                <span className="fs-5 fw-bold me-5">
                                  Mobile:
                                </span>
                                <span className="fs-5 text-muted">
                                  +91 967****567
                                </span>
                              </div>
                              <div className="my-4">
                                <span className="fs-5 fw-bold me-5">
                                  Email:
                                </span>
                                <span className="fs-5 text-muted">
                                  *********ghj@gmail.com
                                </span>
                              </div>
                              <div className="my-4">
                                <span className="fs-5 fw-bold me-5">
                                  Submitted Date:
                                </span>
                                <span className="fs-5 text-muted">
                                  14 Feb 2023
                                </span>
                              </div>
                              <div className="my-4">
                                <span className="fs-5 fw-bold me-5">
                                  Registration Status:
                                </span>
                                <button className="btn btn-outline-warning rounded-pill">
                                  <span className="fs-5 text-danger">
                                    Waiting For Approval
                                  </span>
                                </button>
                              </div>
                              <Link to="/login">
                                <div className="m-3 d-flex align-items-center justify-content-center">
                                  <span className="fs-5 fw-bold login-btn-color">
                                    Back to Login
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
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
  );
};

export default RegistrationInformation;
