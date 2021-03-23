import React from 'react'
import { Subscription } from 'react-apollo'
import { GetInjuredBranch } from '../../Queries/IncidentQuery/IncidentReportQuery'
import Loader from '../../views/Components/Custom/Loader/Loader';
import Error from '../../views/Components/Custom/Error/Error';
import { Bar } from 'react-chartjs-2';
import { Row, Col, CardBody } from 'reactstrap';

export default function IncBrInjured() {
    return (
        <Subscription subscription={GetInjuredBranch}>
            {
                ({ loading, error, data }) => {
                    if (loading) return <Loader />;
                    if (error) return <Error />;
                    if (data.incident_report_aggregate.nodes.length) {

                        let inJured = data.incident_report_aggregate.nodes.filter(no => no.anyone_injured && no.incident_branch)
                        let Branches = inJured.map(br => br.incident_branch)
                        let getUniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
                        let FilterBranch = getUniqueArray(Branches)
                        let newBranch = FilterBranch.map(f => {
                            let BId = f.id
                            let recurrence = Branches.reduce(((acc, elm) => (BId == elm.id) ? acc += 1 : acc), 0)
                            f.amount = recurrence
                            return f;
                        })

                        let BranchData = newBranch.map(c => c.name)
                        let BranchCount = newBranch.map(c => c.amount)


                        const dataStat = {
                            labels: BranchData,
                            datasets: [
                                {
                                    label: 'عدد الوفيات في الفروع ',
                                    barPercentage: .1,
                                    backgroundColor: 'rgb(27, 0, 0,1)',
                                    borderColor: 'rgb(60, 0, 0,2)',
                                    borderWidth: 2,
                                    hoverBackgroundColor: 'rgb(255, 151, 0,1)',
                                    hoverBorderColor: 'rgb(255, 155, 0,2)',
                                    data: BranchCount
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
                                        <div className="text-value" style={{ color: "rgb(27, 0, 0,5)" }}> عدد الوفيات في كل فرع:
                                    </div>
                                    </CardBody>
                                    <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>

                                        <Bar data={dataStat} width={200} height={50} options={options} />
                                    </div>
                                </Col>
                            </Row>
                        )












                    }

                }}


        </Subscription>
    )
}
