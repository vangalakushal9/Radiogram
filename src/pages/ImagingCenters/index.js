import React from "react";
import { Container, Row } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import AllCenters from './AllCenters';
import Widgets from './Widgets';


const ImagingCenters = () => {
  document.title = "Imaging Centers";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Imaging Centers"
            breadcrumbItem="Imaging Centers"
          />
        </Container>
        <Row>
          <Widgets />
        </Row>
        <AllCenters/>
      </div>
    </React.Fragment>
  );
};

export default ImagingCenters;
