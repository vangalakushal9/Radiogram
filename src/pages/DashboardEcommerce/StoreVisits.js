import React from "react";
import {
  Card,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import {PolarChart} from "../Charts/ChartsJs/ChartsJs"

const StoreVisits = () => {
  return (
    <React.Fragment>
      <Col xl={4}>
        <Card className="card-height-100">
          <div className="align-items-center d-flex m-4">
            <h6 className="text-muted text-center mb-0 flex-grow-1">
              Total cases count based on Modality
            </h6>
            <div className="flex-shrink-0">
              {/* <UncontrolledDropdown className="card-header-dropdown" direction='start'>
                                <DropdownToggle tag="a" className="text-reset dropdown-btn" role="button">
                                    <span className="text-muted">Report<i className="mdi mdi-chevron-down ms-1"></i></span>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <DropdownItem>Download Report</DropdownItem>
                                    <DropdownItem>Export</DropdownItem>
                                    <DropdownItem>Import</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
            </div>
          </div>

          <div className="card-body">
            <div dir="ltr">
              <PolarChart dataColors='["--vz-danger", "--vz-success", "--vz-warning", "--vz-primary"]' />
            </div>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default StoreVisits;
