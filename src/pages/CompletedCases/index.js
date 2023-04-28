import React from 'react'
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

const CompletedCases = () => {
  return (
    <React.Fragment>
      <Container>
        <BreadCrumb title="Completed Cases" breadcrumbItem="Completed Cases" />
        
      </Container>
    </React.Fragment>
  )
}

export default CompletedCases