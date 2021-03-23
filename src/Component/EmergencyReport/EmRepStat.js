import React from 'react'
import { Subscription } from 'react-apollo'
import { EmergancyCount } from '../../Queries/EmergencyQuery/EmergencyQuery'
import Loader from '../../views/Components/Custom/Loader/Loader';
import Error from '../../views/Components/Custom/Error/Error';
import NoResults from '../../views/Components/Custom/NoResults/NoResults';
import { Alert, Badge, Col, Progress, Card, CardBody, Row } from 'reactstrap';

function EmRepStat() {
    return (
        <Subscription subscription={EmergancyCount}>
            {
                ({ loading, error, data }) => {
                    if (loading) return <Loader />;
                    if (error) return <Error />;
                    if (data) {
                        let EmergancyCount = data.emergency_report_aggregate.aggregate.count

                        return (


                            <div className="text-value" style={{ padding: "40px" }}> عدد عمليات الطوارئ:
                                                  <Badge color="warning" style={{ padding: "15px", fontSize: "bold" }}>{EmergancyCount}</Badge>
                            </div>

                        )



                    }
                    else return (<NoResults />)

                }}

        </Subscription >
    )
}

export default EmRepStat
