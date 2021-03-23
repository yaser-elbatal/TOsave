import React from 'react'
import { Subscription } from 'react-apollo'
import { GetBranchStat } from '../../Queries/Awarness Queries/Awarness'
import NoResults from '../../views/Components/Custom/NoResults/NoResults';
import Loader from '../../views/Components/Custom/Loader/Loader';
import Error from '../../views/Components/Custom/Error/Error';
import { Bar } from 'react-chartjs-2';
import { Alert, Badge, Col, Progress, Card, CardBody, Row } from 'reactstrap';


function TrainingBranchStat() {
    return (
        <Subscription subscription={GetBranchStat}>
            {
                ({ loading, error, data }) => {
                    if (loading)
                        return (<div style={{ position: "fixed", top: "50%", left: "45%" }}>
                            <Loader />
                        </div>
                        );
                    if (error) return <Error />;
                    if (data.training_report_aggregate.nodes.length) {
                        let TrainingBranchSt = data.training_report_aggregate.nodes.map(n => n.training_branch)
                        let getUniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
                        let TrainFilter = getUniqueArray(TrainingBranchSt)
                        let newBranchInc = TrainFilter.map(f => {
                            let BID = f.id
                            let recurrence = TrainingBranchSt.reduce((acc, elm) => (elm.id == BID) ? acc += 1 : acc, 0)
                            f.amount = recurrence
                            return f

                        })

                        let Branches = newBranchInc.map(nb => nb.name)
                        let BranchAmount = newBranchInc.map(nb => nb.amount)
                        const dataStat = {
                            labels: Branches,
                            datasets: [
                                {
                                    label: 'عدد تقارير التدريب في الفروع ',
                                    barPercentage: .1,
                                    backgroundColor: '#00A4CCFF',
                                    borderColor: '#00A4CCFFFFEE',
                                    borderWidth: 2,
                                    hoverBackgroundColor: 'rgb(180, 142, 0)',
                                    hoverBorderColor: 'rgb(180, 142, 0)',
                                    data: BranchAmount
                                }]
                        };
                        var options = {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        stepSize: 1,


                                    }
                                }]
                            }
                        };


                        return (
                            <Row>
                                <Col xs="12" md="8" lg="12">

                                    <CardBody className="pb-0">
                                        <div className="text-value" style={{ color: "#00A4CCFF" }}>عدد التقارير في كل فرع
                                        </div>
                                    </CardBody>
                                    <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px', backgroundColor: "#ADEFD1FF " }}>

                                        <Bar data={dataStat} width={200} height={50} options={options} />
                                    </div>

                                </Col>
                            </Row>

                        )


                    } else return <NoResults />
                }}

        </Subscription>
    )
}

export default TrainingBranchStat
