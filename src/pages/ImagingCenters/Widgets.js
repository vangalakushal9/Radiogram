import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import CountUp from "react-countup";
import { centersWidgets } from './CentersList';

const Widgets = () => {
    return (
        <React.Fragment>
            {centersWidgets.map((item, key) => (
                <Col xxl={2} sm={6} key={key}>
                    <Card className="card-animate">
                        <CardBody>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="fw-medium text-muted mb-0">{item.label}</p>
                                    <h2 className="mt-4 ff-secondary fw-semibold">
                                        <span className="counter-value">
                                            <CountUp
                                                start={0}
                                                end={item.counter}
                                                decimal={item.decimals}
                                                suffix={item.suffix}
                                                duration={3}
                                            />
                                        </span>
                                    </h2>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </React.Fragment>
    );
};

export default Widgets;