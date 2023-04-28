import React, { useState } from "react";
import { Row, Col, Card, Input, Label, Form, FormFeedback } from "reactstrap";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, apiError, resetRegisterFlag } from "../../store/actions";
import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";

const ImagingCenter = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [fileList, setFileList] = useState(null);
  const [selectedFiles, setselectedFiles] = useState([]);

  const handleUploadClick = () => {
    history("/thankyou");

    if (!fileList) {
      return;
    }

    const data = new FormData();
    // files.forEach((file, i) => {
    //   data.append(`file-${i}`, file, file.name);
    // });

    // fetch("https://httpbin.org/post", {
    //   method: "POST",
    //   body: data,
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
  };

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      client_type: "",
      imaging_center_name: "",
      phonenumber: "",
      email: "",
      modality: "",
      equipment: "",
      modelnumber: "",
      document_checklist: "",
      upload_documents: "",
    },
    validationSchema: Yup.object({
      client_type: Yup.string().required("Please Select Client Type"),
      imaging_center_name: Yup.string().required(
        "Please Enter Imaging Center Name"
      ),
      phonenumber: Yup.string().required("Phone number is required")
      .matches(
        /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/g,
        "Invalid phone number"
      ),
      email: Yup.string().matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Invalid Email Address"
      )
      .required("Please Enter Your Email"),
      modality: Yup.string().required("Please Enter Your Modality"),
      equipment: Yup.string().required("Please Select Equipment Type"),
      modelnumber: Yup.string().required("Please Enter Model Number"),
      document_checklist: Yup.string().required("Please Select Document Type"),
      upload_documents: Yup.string().required("Please Upload Any Document"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  // const handleFileChange = (e) => {
  //   setFileList(e.target.files);
  // };

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

  const files = fileList ? [...fileList] : [];

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
              <Label htmlFor="client-type" className="form-label fs-5">
                Client Type
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="client_type"
                className="form-control rounded-pill"
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.client_type || ""}
                invalid={
                  validation.touched.client_type &&
                  validation.errors.client_type
                    ? true
                    : false
                }
              >
                <option></option>
                <option className="fs-5">Image Center</option>
                <option className="fs-5">Hospital</option>
                <option className="fs-5">Hospital Chain</option>
              </Input>
              {validation.touched.client_type &&
              validation.errors.client_type ? (
                <FormFeedback type="invalid">
                  {validation.errors.client_type}
                </FormFeedback>
              ) : null}
            </div>

            <div className="mb-4 w-25 ms-3">
              <Label htmlFor="Imaging Center Name" className="form-label fs-6">
                Imaging Center/Hospital Name
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="imaging_center_name"
                className="form-control rounded-pill"
                placeholder="Enter Imaging Center Name"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.imaging_center_name || ""}
                invalid={
                  validation.touched.imaging_center_name &&
                  validation.errors.imaging_center_name
                    ? true
                    : false
                }
              />
              {validation.touched.imaging_center_name &&
              validation.errors.imaging_center_name ? (
                <FormFeedback type="invalid">
                  {validation.errors.imaging_center_name}
                </FormFeedback>
              ) : null}
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <div className="mb-4  w-25">
              <Label htmlFor="Phone Number" className="form-label fs-5">
                Phone Number
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="phonenumber"
                className="form-control rounded-pill"
                placeholder="Enter phone number"
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

            <div className="mb-4  w-25 ms-3">
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
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <div className="mb-4 w-25 ms-3">
              <Label htmlFor="modality" className="form-label fs-5">
                Modality
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="modality"
                className="form-control rounded-pill"
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.modality || ""}
                invalid={
                  validation.touched.modality && validation.errors.modality
                    ? true
                    : false
                }
              >
                <option></option>
                <option className="fs-5">MR</option>
                <option className="fs-5">CT</option>
                <option className="fs-5">X - Ray</option>
                <option className="fs-5">Mammogram</option>
                <option className="fs-5">PET CT</option>
                <option className="fs-5">Others</option>
              </Input>
              {validation.touched.modality && validation.errors.modality ? (
                <FormFeedback type="invalid">
                  {validation.errors.modality}
                </FormFeedback>
              ) : null}
            </div>

            <div className="mb-4 w-25 ms-3">
              <Label htmlFor="equipment" className="form-label fs-5">
                Equipment
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="equipment"
                className="form-control rounded-pill"
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.equipment || ""}
                invalid={
                  validation.touched.equipment && validation.errors.equipment
                    ? true
                    : false
                }
              >
                <option></option>
                <option className="fs-5">X - Ray Machine</option>
                <option className="fs-5">CT Scanner</option>
                <option className="fs-5">Ultrasonography Machine</option>
                <option className="fs-5">Fluoroscopy</option>
              </Input>
              {validation.touched.equipment && validation.errors.equipment ? (
                <FormFeedback type="invalid">
                  {validation.errors.equipment}
                </FormFeedback>
              ) : null}
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <div className="mb-4  w-25">
              <Label htmlFor="Model Number" className="form-label fs-5">
                Model Number
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="modelnumber"
                className="form-control rounded-pill"
                placeholder="Enter model number"
                type="number"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.modelnumber || ""}
                invalid={
                  validation.touched.modelnumber &&
                  validation.errors.modelnumber
                    ? true
                    : false
                }
              />
              {validation.touched.modelnumber &&
              validation.errors.modelnumber ? (
                <FormFeedback type="invalid">
                  {validation.errors.modelnumber}
                </FormFeedback>
              ) : null}
            </div>

            <div className="mb-4  w-25 ms-3">
              <Label htmlFor="documentchecklist" className="form-label fs-5">
                Document Checklist
                <b className="text-danger">*</b>
              </Label>
              <Input
                name="document_checklist"
                className="form-control rounded-pill"
                type="select"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.document_checklist || ""}
                invalid={
                  validation.touched.document_checklist &&
                  validation.errors.document_checklist
                    ? true
                    : false
                }
              >
                <option></option>
                <option className="fs-5">PCPNDT License</option>
                <option className="fs-5">Trade License</option>
                <option className="fs-5">DMHO</option>
                <option className="fs-5">AERB</option>
                <option className="fs-5">PAN</option>
                <option className="fs-5">Address Proof</option>
              </Input>
              {validation.touched.document_checklist &&
              validation.errors.document_checklist ? (
                <FormFeedback type="invalid">
                  {validation.errors.document_checklist}
                </FormFeedback>
              ) : null}
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-center">
            <div className="mb-4  w-25 ms-3">
              <Label htmlFor="Upload_Documents" className="form-label fs-5">
                Upload Documents
                <b className="text-danger">*</b>
              </Label>
              <Dropzone
                name="upload_documents"
                onDrop={(acceptedFiles) => {
                  handleAcceptedFiles(acceptedFiles);
                }}
                // onChange={validation.handleChange}
                // onBlur={validation.handleBlur}
                // value={validation.values.upload_documents || ""}
                // invalid={
                //   validation.touched.upload_documents && validation.errors.upload_documents
                //     ? true
                //     : false
                // }
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
              {/* {validation.touched.upload_documents && validation.errors.upload_documents ? (
              <FormFeedback type="invalid">
                {validation.errors.upload_documents}
              </FormFeedback>
            ) : null} */}
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
            <div className="mb-4  w-25">
              <Input type="checkbox" className="ms-3"/>
              <Label
                htmlFor="contact-us"
                className="form-label fs-5 ms-2"
              >
                Contact Us
              </Label>
            </div>
          </div>
          <div className="my-5 d-flex align-items-center justify-content-center">
            <button
              type="submit"
              className="btn btn-load w-50 login-btn-color"
              onClick={handleUploadClick}
              disabled={
                validation.values.client_type === "" ||
                validation.values.imaging_center_name === "" ||
                validation.values.phonenumber === "" ||
                validation.values.email === "" ||
                validation.values.modality === "" ||
                validation.values.equipment === "" ||
                validation.values.modelnumber === "" ||
                validation.values.document_checklist === ""
              }
            >
              <span className="text-white fs-5">Submit</span>
            </button>
          </div>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default ImagingCenter;
