import React, { useState } from "react";
import { Row, Col, Card, Input, Label, Form, FormFeedback } from "reactstrap";

import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

import { registerUser } from "../../store/actions";

import Dropzone from "react-dropzone";

import { Link, useNavigate } from "react-router-dom";

const Radiologist = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      registration_status: "",
      first_name: "",
      last_name: "",
      gender: "",
      phonenumber: "",
      email: "",
      specialization: "",
      license_number: "",
      year_of_passing: "",
      bank_account_number: "",
      ifsc_code: "",
    },
    validationSchema: Yup.object({
      registration_status: Yup.string().required(
        "Please Enter Your Acknowledgement Number"
      ),
      first_name: Yup.string().required("Please Enter Your Firstname"),
      last_name: Yup.string().required("Please Enter Your Lastname"),
      phonenumber: Yup.string()
        .required("Phone number is required")
        .matches(
          /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/g,
          "Invalid phone number"
        ),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          "Invalid Email Address"
        )
        .required("Please Enter Your Email"),
      specialization: Yup.string().required("Please Enter Your Specialization"),
      license_number: Yup.string().required("Please Enter Your License Number"),
      year_of_passing: Yup.string()
        .min(4, "Minimum 4 characters")
        .max(4, "Too Long!")
        .required("Please Enter Your Year Of Passing"),
      bank_account_number: Yup.string().required(
        "Please Enter Your Bank Account Number"
      ),
      ifsc_code: Yup.string().required("Please Enter Your IFSC Code"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  const [selectedFiles, setselectedFiles] = useState([]);
  const [fileList, setFileList] = useState(null);

  // const handleSubmit = (values) => {
  //  let data = { username: validation.values.email, password: validation.values.password };
  // }

  const handleUploadClick = () => {
    history("/thankyou");

    if (!fileList) {
      return;
    }

    const data = new FormData();
  //   files.forEach((file, i) => {
  //     data.append(`file-${i}`, file, file.name);
  //   });

  //   fetch("https://httpbin.org/post", {
  //     method: "POST",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => console.error(err));
   };

  const files = fileList ? [...fileList] : [];

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  return (
    <React.Fragment>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
          return false;
        }}
        action="#"
      >
        <div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="mb-4 w-25">
              <Label htmlFor="first_name" className="form-label fs-5">
                First Name
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="first_name"
                className="form-control rounded-pill"
                placeholder="Enter First Name"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.first_name || ""}
                invalid={
                  validation.touched.first_name && validation.errors.first_name
                    ? true
                    : false
                }
              />
              {validation.touched.first_name && validation.errors.first_name ? (
                <FormFeedback type="invalid">
                  {validation.errors.first_name}
                </FormFeedback>
              ) : null}
            </div>
            <div className="mb-4  w-25 ms-3">
              <Label htmlFor="last_name" className="form-label fs-5">
                Last Name
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="last_name"
                className="form-control rounded-pill"
                placeholder="Enter Last Name"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.last_name || ""}
                invalid={
                  validation.touched.last_name && validation.errors.last_name
                    ? true
                    : false
                }
              />
              {validation.touched.last_name && validation.errors.last_name ? (
                <FormFeedback type="invalid">
                  {validation.errors.last_name}
                </FormFeedback>
              ) : null}
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <div className="mb-4  w-25">
              <Label htmlFor="gender" className="form-label fs-5">
                Gender
              </Label>
              <div>
                <Input
                  name="gender"
                  className=""
                  type="radio"
                  // onChange={validation.handleChange}
                  // onBlur={validation.handleBlur}
                  // value={validation.values.email || ''}
                  // invalid={validation.touched.email && validation.errors.email ? true : false}
                />
                <Label className="fs-5 mx-2">
                  Male
                </Label>
                <Input name="gender" className="" type="radio" />
                <Label className="fs-5 mx-2">
                  Female
                </Label>
              </div>
            </div>

            <div className="mb-4 w-25 ms-3">
              <Label htmlFor="phonenumber" className="form-label fs-5">
                Phone Number
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="phonenumber"
                className="form-control rounded-pill"
                placeholder="Enter Phone Number"
                type="number"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.phonenumber || ""}
                invalid={
                  validation.touched.phonenumber &&
                  validation.errors.phonenumber
                    ? true
                    : false
                }
              />
              {validation.touched.phonenumber &&
              validation.errors.phonenumber ? (
                <FormFeedback type="invalid">
                  {validation.errors.phonenumber}
                </FormFeedback>
              ) : null}
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <div className="mb-4  w-25">
              <Label htmlFor="email" className="form-label fs-5">
                Email
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="email"
                className="form-control rounded-pill w-60"
                placeholder="Enter email"
                type="email"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.email || ""}
                invalid={
                  validation.touched.email && validation.errors.email
                    ? true
                    : false
                }
              />
              {validation.touched.email && validation.errors.email ? (
                <FormFeedback type="invalid">
                  {validation.errors.email}
                </FormFeedback>
              ) : null}
            </div>

            <div className="mb-4 w-25 ms-3">
              <Label htmlFor="specialization" className="form-label fs-5">
                Specialization
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="specialization"
                className="form-control rounded-pill"
                placeholder="Enter Specialization"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.specialization || ""}
                invalid={
                  validation.touched.specialization &&
                  validation.errors.specialization
                    ? true
                    : false
                }
              />
              {validation.touched.specialization &&
              validation.errors.specialization ? (
                <FormFeedback type="invalid">
                  {validation.errors.specialization}
                </FormFeedback>
              ) : null}
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <div className="mb-4  w-25">
              <Label htmlFor="license_number" className="form-label fs-5">
                License Number
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="license_number"
                className="form-control rounded-pill w-60"
                placeholder="Enter License Number"
                type="number"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.license_number || ""}
                invalid={
                  validation.touched.license_number &&
                  validation.errors.license_number
                    ? true
                    : false
                }
              />
              {validation.touched.license_number &&
              validation.errors.license_number ? (
                <FormFeedback type="invalid">
                  {validation.errors.license_number}
                </FormFeedback>
              ) : null}
            </div>

            <div className="mb-4 w-25 ms-3">
              <Label htmlFor="year_of_passing" className="form-label fs-5">
                Year Of Passing
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="year_of_passing"
                className="form-control rounded-pill"
                placeholder="Enter Year Of Passing"
                type="number"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.year_of_passing || ""}
                invalid={
                  validation.touched.year_of_passing &&
                  validation.errors.year_of_passing
                    ? true
                    : false
                }
              />
              {validation.touched.year_of_passing &&
              validation.errors.year_of_passing ? (
                <FormFeedback type="invalid">
                  {validation.errors.year_of_passing}
                </FormFeedback>
              ) : null}
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <div className="mb-4  w-25">
              <Label htmlFor="bank_account_number" className="form-label fs-5">
                Bank Account Number
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="bank_account_number"
                className="form-control rounded-pill w-60"
                placeholder="Enter Bank Account Number"
                type="number"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.bank_account_number || ""}
                invalid={
                  validation.touched.bank_account_number &&
                  validation.errors.bank_account_number
                    ? true
                    : false
                }
              />
              {validation.touched.bank_account_number &&
              validation.errors.bank_account_number ? (
                <FormFeedback type="invalid">
                  {validation.errors.bank_account_number}
                </FormFeedback>
              ) : null}
            </div>

            <div className="mb-4 w-25 ms-3">
              <Label htmlFor="ifsc_code" className="form-label fs-5">
                IFSC Code
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="ifsc_code"
                className="form-control rounded-pill"
                placeholder="Enter IFSC Code"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.ifsc_code || ""}
                invalid={
                  validation.touched.ifsc_code && validation.errors.ifsc_code
                    ? true
                    : false
                }
              />
              {validation.touched.ifsc_code && validation.errors.ifsc_code ? (
                <FormFeedback type="invalid">
                  {validation.errors.ifsc_code}
                </FormFeedback>
              ) : null}
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center overflow-hidden">
            <div className="mb-4 w-25">
              <Label htmlFor="document-checklist" className="form-label fs-5">
                Document Checklist
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="document_checklist"
                className="form-control rounded-pill"
                type="select"
                //   onChange={validation.handleChange}
                //   onBlur={validation.handleBlur}
                //   value={validation.values.ifsc_code || ""}
                //   invalid={
                //     validation.touched.ifsc_code &&
                //     validation.errors.ifsc_code
                //       ? true
                //       : false
                //   }
              >
                <option></option>
                <option className="fs-5">Pan Card</option>
                <option className="fs-5">Trade License</option>
                <option className="fs-5">Aadhar Card</option>
                <option className="fs-5">Passport</option>
              </Input>
            </div>

            <div className="mb-4  w-25 ms-3">
              <Label htmlFor="Upload_Documents" className="form-label fs-5">
                Upload Documents
                <b className="text-danger">*</b>
              </Label>
              <Dropzone
                onDrop={(acceptedFiles) => {
                  handleAcceptedFiles(acceptedFiles);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="dropzone dz-clickable">
                    <div
                      className="dz-message needsclick pt-4"
                      {...getRootProps()}
                    >
                      <div className="mb-3">
                        <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                      </div>
                      <h4>Drop files here or click to upload.</h4>
                    </div>
                  </div>
                )}
              </Dropzone>
              <div className="list-unstyled mb-0" id="file-previews">
                {selectedFiles.map((f, i) => {
                  return (
                    <Card
                      className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                      key={i + "-file"}
                    >
                      <div className="p-2">
                        <Row className="align-items-center">
                          <Col className="col-auto">
                            <img
                              data-dz-thumbnail=""
                              height="80"
                              className="avatar-sm rounded bg-light"
                              alt={f.name}
                              src={f.preview}
                            />
                          </Col>
                          <Col>
                            <Link
                              to="#"
                              className="text-muted font-weight-bold"
                            >
                              {f.name}
                            </Link>
                            <p className="mb-0">
                              <strong>{f.formattedSize}</strong>
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <div className="mb-4  w-25">
              <Input type="checkbox" className="me-2"/>
              <Label htmlFor="contact-us" className="form-label fs-5">
                Contact Us
              </Label>
            </div>
            <div className="w-25"></div>
          </div>
        </div>

        <div className="my-5 d-flex align-items-center justify-content-center">
          <button
            type="submit"
            className="btn btn-load w-50 login-btn-color"
            onClick={handleUploadClick}
            disabled={
              validation.values.first_name === "" ||
              validation.values.last_name === "" ||
              validation.values.phonenumber === "" ||
              validation.values.email === "" ||
              validation.values.specialization === "" ||
              validation.values.license_number === "" ||
              validation.values.year_of_passing === "" ||
              validation.values.bank_account_number === "" ||
              validation.values.ifsc_code === ""
            }
          >
            <span className="text-white fs-5">Submit</span>
          </button>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default Radiologist;
