import React, { ChangeEvent, useEffect, useState } from "react";
import { Row, Col, Card, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { Formik, useFormik } from "formik";

import RemixIcons from "../Icons/RemixIcons/RemixIcons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// action
import { registerUser, apiError, resetRegisterFlag } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

//import images
import testImage from "../../assets/images/cover-img.png";
import logoLight from "../../assets/images/second-cover.svg";
import Radiologist from "./Radiologist";
import ImagingCenter from "./ImagingCenter";

const Register = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      registration_status: "",
    },
    validationSchema: Yup.object({
      registration_status: Yup.string()
        .min(9, "Number must be minimum nine characters")
        .max(9, "Maximum 9 characters only")
        .required("Please Enter Your Acknowledgement Number"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  const { error, success } = useSelector((state) => ({
    registrationError: state.Account.registrationError,
    success: state.Account.success,
    error: state.Account.error,
  }));

  // const [registration, disableRegistration] = useState(true)
  // const [registrationinfo, setRegistrationInfo] = useState()
  // const [registerNo, setRegisterNo] = useState();

  const disableRegistration = (event) => {
    if (
      event.target.value?.length > 8 &&
      event.target.value.length < 10 &&
      event.key === "Enter"
    ) {
      history("/registration-information");
    }
  };

  const [initialRad, setInitialRad] = useState(true);
  const [initialImc, setInitialImc] = useState(false);
  const openIntialRad = () => {
    setInitialImc(false);
    setInitialRad(true);
  };
  const openIntialImc = () => {
    setInitialImc(true);
    setInitialRad(false);
  };
  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => history("login"), 3000);
    }

    setTimeout(() => {
      dispatch(resetRegisterFlag());
    }, 3000);
  }, [dispatch, success, error, history]);

  document.title = "Registration";

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
                              <div className="mb-5">
                                <h3>Registration</h3>
                              </div>
                            </div>
                            <div className="mb-4 w-50 m-auto">
                              <Label
                                htmlFor="registration_status"
                                className="form-label fs-5"
                              >
                                To Check Registration Status
                              </Label>
                              <Input
                                name="registration_status"
                                className="form-control rounded-pill form-control-lg"
                                placeholder="Enter Acknowledgement Number"
                                type="number"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={
                                  validation.values.registration_status || ""
                                }
                                invalid={
                                  validation.touched.registration_status &&
                                  validation.errors.registration_status
                                    ? true
                                    : false
                                }
                                onKeyPress={(event) => {
                                  disableRegistration(event);
                                }}
                              />
                              {validation.touched.registration_status &&
                              validation.errors.registration_status ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.registration_status}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div
                              className="mb-4 w-50 p-1 m-auto rounded-pill d-flex align-items-center justify-content-center bg-white"
                            >
                              <button
                                type="button"
                                className="btn btn-load rounded-pill w-50 fs-5 text-dark"
                                style={{
                                  backgroundColor: initialRad ? "#E8F0FC" : "",
                                }}
                                onClick={openIntialRad}
                              >
                                Radiologist
                              </button>
                              <button
                                type="button"
                                className="btn btn-load rounded-pill w-50 fs-5 text-dark"
                                style={{
                                  backgroundColor: !initialRad ? "#E8F0FC" : "",
                                }}
                                onClick={openIntialImc}
                              >
                                Imaging Center/Hospital
                              </button>
                            </div>
                          </Col>
                        </Row>
                        <div>
                            {initialRad && <Radiologist />}

                            {initialImc && <ImagingCenter />}
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

export default Register;
