import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { Formik, useFormik } from "formik";

// actions
import { loginUser, socialLogin, resetLoginFlag } from "../../store/actions";
import testImage from "../../assets/images/cover-img.png";
import logoImage from "../../assets/images/radiogram-logo.svg";
import logoLight from "../../assets/images/second-cover.svg";
import withRouter from "../../Components/Common/withRouter";

const Login = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    user: state.Account.user,
  }));

  const [userLogin, setUserLogin] = useState([]);
  const [loading, setLoading] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: userLogin.email || "admin@themesbrand.com" || "",
      password: userLogin.password || "123456" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
      localStorage.setItem(
        "authObj",
        JSON.stringify({ email: values.email, password: values.password })
      );
    },
  });

  const { error } = useSelector((state) => ({
    error: state.Login.error,
  }));

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetLoginFlag());
    }, 3000);
  }, [dispatch, error]);

  document.title = "SignIn";

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
                    <div className="d-flex justify-content-center align-items-center image-margin">
                      <img
                        src={testImage}
                        alt=""
                        height="500"
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
                              <img
                                src={logoImage}
                                alt="sjdj"
                                height="50"
                                className="my-2"
                              />
                              <h1 className="text-dark">Radiogram</h1>
                            </div>
                          </div>
                        </Col>
                      </Row>

                      <div>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                          action="#"
                        >
                          <div className="mb-4 w-50 m-auto">
                            <Label htmlFor="email" className="form-label fs-5">
                              User Name
                            </Label>
                            <Input
                              name="email"
                              className="form-control rounded-pill form-control-lg"
                              placeholder="Enter email"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              invalid={
                                validation.touched.email &&
                                validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                            validation.errors.email ? (
                              <FormFeedback type="invalid">
                                {validation.errors.email}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-4 w-50 m-auto">
                            <Label
                              className="form-label fs-5"
                              htmlFor="password-input"
                            >
                              Password
                            </Label>
                            <div className="float-end">
                              <Link
                                to="/forgot-password"
                                className="text-muted"
                              >
                                Forgot password?
                              </Link>
                            </div>
                            <div className="position-relative auth-pass-inputgroup mb-3">
                              <Input
                                name="password"
                                id="password-input"
                                value={validation.values.password || ""}
                                type="password"
                                className="form-control pe-5 rounded-pill form-control-lg"
                                placeholder="Enter Password"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                invalid={
                                  validation.touched.password &&
                                  validation.errors.password
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.password &&
                              validation.errors.password ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.password}
                                </FormFeedback>
                              ) : null}
                              {validation.values.password &&
                                validation.values.password !== "" && (
                                  <button
                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                    type="button"
                                    id="password-addon"
                                  ></button>
                                )}
                            </div>
                          </div>

                          <div className="mt-6 d-flex align-items-center justify-content-center">
                            <button
                              type="submit"
                              className="btn btn-load w-50 login-btn-color"
                              disabled={
                                validation.values.email === "" ||
                                validation.values.password === "" ||
                                loading
                              }
                            >
                              <span className="fs-5">Login</span>
                            </button>
                          </div>
                          <Link to="/register">
                            <div className="mt-3 d-flex align-items-center justify-content-center">
                              <button
                                type="submit"
                                className="btn btn-load w-50 register-btn-color"
                              >
                                <span className="fs-5">Register</span>
                              </button>
                            </div>
                          </Link>
                        </Form>
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

export default withRouter(Login);
