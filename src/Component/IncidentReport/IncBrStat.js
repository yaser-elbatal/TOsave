import React from 'react'
import { Subscription } from 'react-apollo'
import { GetIncBrCount } from '../../Queries/IncidentQuery/IncidentReportQuery'
import NoResults from '../../views/Components/Custom/NoResults/NoResults';
import Loader from '../../views/Components/Custom/Loader/Loader';
import Error from '../../views/Components/Custom/Error/Error';
import { Bar } from 'react-chartjs-2';
import { CardBody, Col, Row } from 'reactstrap';

export default function IncBrStat() {
    return (
        <Subscription subscription={GetIncBrCount}>
            {
                ({ loading, error, data }) => {
                    if (loading) return <Loader />;
                    if (error) return <Error />;
                    if (data) {
                        let IncBranch = data.incident_report_aggregate.nodes.map(re => re.incident_branch)
                        let getUniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
                        let FilterBranch = getUniqueArray(IncBranch);

                        let newBranchInc = FilterBranch.map(f => {
                            let BID = f.id
                            let recurrence = IncBranch.reduce((acc, elm) => (elm.id == BID) ? acc += 1 : acc, 0)
                            f.amount = recurrence
                            return f

                        })

                        let Branches = newBranchInc.map(br => br.name)
                        let Count = newBranchInc.map(br => br.amount)



                        const dataStat = {
                            labels: Branches,
                            datasets: [
                                {
                                    label: 'عدد التقاريرالحوادث في الفروع ',
                                    barPercentage: .1,
                                    backgroundColor: 'rgba(51,153,255,0.5)',
                                    borderColor: 'rgba(51,153,255,2)',
                                    borderWidth: 2,
                                    hoverBackgroundColor: 'rgb(180, 142, 0)',
                                    hoverBorderColor: 'rgb(180, 142, 0)',
                                    data: Count
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
                                        <div className="text-value" style={{ color: "rgba(51,153,255,4)" }}> عدد تقارير الحوادث في الفروع:
                                        </div>
                                    </CardBody>
                                    <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>

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
