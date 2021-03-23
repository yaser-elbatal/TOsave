import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { wrongStat } from '../../../Queries/RiskAssmentsQuery/RiskStatisticsQuery'
import Loader from '../../../views/Components/Custom/Loader/Loader';
import Error from '../../../views/Components/Custom/Error/Error';
import NoResults from '../../../views/Components/Custom/NoResults/NoResults';
import { Alert, Badge, Col, Progress, Card, CardBody, Row } from 'reactstrap';
import { Bar } from 'react-chartjs-2';


export default class ImageStatistic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qString: {},
            branchId: false,
            date: false,

        }

    }

    componentDidMount() {
        this.setState({
            branchId: this.props.branchId,
            date: this.props.date,
        })
    }
    componentDidUpdate(prevProps, prevState) {

        const { branchId, date } = this.props;
        if (branchId != prevProps.branchId || date != prevProps.date) {
            this.setState({
                branchId: parseInt(branchId),
                date,
            })
        }

    }

    render() {

        return (
            <Query query={wrongStat} variables={{
                // filterBranch: !this.state.branchId && !this.state.date ? {} :
                filterBranch: !this.state.branchId ? {} :
                    {
                        ...(this.state.branchId && { "branch_id": { "_eq": parseInt(this.state.branchId) } }),
                        // ...(this.props.date && { "created_at":  { "_eq": this.props.date }  }),
                    }
            }}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Loader />;
                        if (error) return <Error />;
                        if (data.risk_assessment.length) {

                            let getUniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
                            let newData = getUniqueArray(data.risk_assessment.map(r => ({
                                branch: r.risk_assessment_branch, images: r.risk_assessment_details, created_at: r.created_at
                            })))


                            newData = (!this.state.date) ?
                                newData : newData.filter(rep => this.state.date == (`${rep.created_at.split("-")[0]}-${rep.created_at.split("-")[1]}`))

                            let branch = getUniqueArray(newData.map(b => b.branch))
                            let MAn = branch.map(ids => {
                                ids.imgs = 0
                                let bid = ids.id
                                let iID = newData.map(i => {
                                    if (bid == i.branch.id)
                                        i.images.map(im => ids.imgs += im.image.split(",").filter(Boolean).length)

                                })
                                return ids
                            })


                            let WrongStat = MAn.map(m => m.imgs)
                            let Branches = MAn.map(c => c.name)

                            const dataStat = {
                                labels: Branches,
                                datasets: [
                                    {
                                        label: 'نسبه الاخطاء التقارير في الفرع ',
                                        barPercentage: .1,
                                        backgroundColor: 'rgb(27, 0, 0,1)',
                                        borderColor: 'rgb(60, 0, 0,2)',
                                        borderWidth: 2,
                                        hoverBackgroundColor: 'rgb(255, 151, 0,1)',
                                        hoverBorderColor: 'rgb(255, 155, 0,2)',
                                        data: WrongStat
                                    }]
                            };
                            var options = {
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            stepSize: Math.ceil(Math.max(...WrongStat) / 5),
                                            max: Math.max(...WrongStat),
                                        }
                                    }]
                                }
                            };


                            return (
                                <Row>
                                    <Col xs="12" md="8" lg="12">

                                        <CardBody className="pb-0">
                                            <div className="text-value" style={{ color: "rgb(27, 0, 0,5)" }}>
                                                <Badge color="danger" style={{ padding: "15px" }}>  نسب الاخطاء ف كل تقرير ف الفروع
                                   </Badge>
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
            </Query>
        )
    }
}