import React from 'react'
import { Query } from 'react-apollo'
import { GetCategories } from '../../../Queries/RiskAssmentsQuery/RiskStatisticsQuery'
import NoResults from '../../../views/Components/Custom/NoResults/NoResults';
import Loader from '../../../views/Components/Custom/Loader/Loader';
import Error from '../../../views/Components/Custom/Error/Error';
import { Alert, Badge, Col, Progress, Card, CardBody, Row } from 'reactstrap';
import { Bar } from 'react-chartjs-2';

export default function CategoriesStatistic({ items, RiskItems }) {
    return (

        <Query query={GetCategories} variables={{ item_id: items }}>
            {
                ({ loading, error, data }) => {
                    if (loading) return <Loader />;
                    if (error) return <Error />;
                    if (data.risk_assessment_category.length) {
                        console.log(data.risk_assessment_category);
                        let Cat = []
                        let CatId = data.risk_assessment_category


                        let CategId = CatId.map(b => b.id)



                        let newData = RiskItems.map(risk => {
                            let reps = risk.reps.map(rep => {

                                let repData = rep

                                let cats = CatId.map(ct => {

                                    let c = {}
                                    c.items = rep.risk_assessment_details
                                        .filter(det => det.risk_assessment_item.category_id == ct.id)
                                        .map(d => ({ id: d.risk_assessment_item.id, percentage: d.risk_assessment_item.percentage, status: d.status }))

                                    let itsPerc = c.items.reduce((acc, elm) => (elm.status) ? acc + elm.percentage : acc, 0) /
                                        (c.items.reduce((acc, elm) => acc + elm.percentage, 0) || 1)
                                    return { ...c, ...ct, itsPerc }
                                })

                                let repPerc = cats.reduce((acc, c) => acc + ((c.precentage) * c.itsPerc), 0)
                                rep.cats = cats.filter(ct => ct.items.length)

                                repData.repPerc = repPerc

                                // delete rep.risk_assessment_details
                                return repData
                            })

                            risk.reps = reps
                            return risk
                        })

                        // return <div></div>

                        let branch = newData.map(n => n.bname)
                        let CorrectItem = newData.map(o => o.reps)
                        let corr = CorrectItem.map(i => i.map(b => b.repPerc))
                        let corrrItems = corr.map(i => i.reduce((acc, n) => Math.round((acc + n) / i.length)), 0)
                        //  let corrI= Math.round(corrrItems)


                        const dataStat = {
                            labels: branch,
                            datasets: [
                                {
                                    label: 'نسبه تقييم الامان في  الفرع ',
                                    barPercentage: .1,
                                    borderColor: 'rgba(255,99,132,1)',
                                    pointBackgroundColor: "white",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 8,
                                    pointHoverBackgroundColor: "yellow",
                                    pointHoverBorderColor: "brown",
                                    pointRadius: 4,
                                    borderWidth: 2,
                                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                    hoverBorderColor: 'rgba(255,99,132,2)',
                                    data: corrrItems
                                }]
                        };
                        var options = {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        stepSize: Math.ceil(Math.max(...corrrItems) / 5),
                                        max: Math.max(...corrrItems)

                                    }
                                }]
                            }
                        };


                        return (
                            <Row>
                                <Col xs="12" md="8" lg="12">

                                    <CardBody className="pb-0">
                                        <div className="text-value" style={{ color: "#00A4CCFF", padding: "30px" }}>
                                            <Badge color="success" style={{ padding: "15px" }}>  نسب تقييم الامان في الفروع</Badge>


                                        </div>
                                    </CardBody>
                                    <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px', }}>

                                        <Bar data={dataStat} height={50} options={options} />
                                    </div>

                                </Col>
                            </Row>
                        )







                    } else return <NoResults />

                }}
        </Query>
    )
}
