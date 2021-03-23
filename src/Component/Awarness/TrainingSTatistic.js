import React from 'react'
import { GetCount } from '../../Queries/Awarness Queries/Awarness'
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import { Alert, Badge, Col, Progress, Card, CardBody, Row } from 'reactstrap';
import NoResults from '../../views/Components/Custom/NoResults/NoResults';
import { Subscription } from 'react-apollo';


function TrainingSTatistic() {
    return (
        <Subscription subscription={GetCount}>
            {
                ({ loading, error, data }) => {
                    if (loading)
                        return (
                            <div style={{ position: "fixed", top: "50%", left: "45%" }}>
                                <Loader />
                            </div>
                        );
                    if (error) return <Error />;
                    if (data.training_report_aggregate) {
                        let TrainCount = data.training_report_aggregate.aggregate.count
                        return <Row>
                            <Col xs="12" md="8" lg="6">

                                <CardBody className="pb-0">
                                    <div className="text-value"> عدد تقارير التدريب:
                                          <Badge color="info" style={{ padding: "10px", fontSize: "bold" }}>{TrainCount}</Badge>
                                    </div>
                                </CardBody>


                            </Col>
                        </Row>
                    } else return <NoResults />

                }}

        </Subscription>
    )
}

export default TrainingSTatistic
