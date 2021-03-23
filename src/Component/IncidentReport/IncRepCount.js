import React from 'react'
import { Subscription } from 'react-apollo'
import { GetIncCount } from '../../Queries/IncidentQuery/IncidentReportQuery'
import NoResults from '../../views/Components/Custom/NoResults/NoResults'
import Loader from '../../views/Components/Custom/Loader/Loader'
import Error from '../../views/Components/Custom/Error/Error'
import { Alert, Badge, Col, Progress, Card, CardBody, Row } from 'reactstrap';


function IncRepCount() {
    return (
        <Subscription subscription={GetIncCount}>
            {
                ({ loading, error, data }) => {
                    if (loading)
                        return <Loader />
                    if (error)
                        return <Error />
                    if (data) {

                        let IncRebCount = data.incident_report_aggregate.aggregate.count
                        return (
                            <Row>
                                <Col xs="12" md="8" lg="6">

                                    <CardBody className="pb-0">
                                        <div className="text-value"> عدد تقارير الحوادث:
                                                  <Badge color="danger" style={{ padding: "10px", fontSize: "bold" }}>{IncRebCount}</Badge>
                                        </div>
                                    </CardBody>


                                </Col>
                            </Row>
                        )

                    } else return <NoResults />
                }}

        </Subscription>
    )
}

export default IncRepCount
