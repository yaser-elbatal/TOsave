import React from 'react'
import { Subscription } from 'react-apollo'
import NoResults from '../../views/Components/Custom/NoResults/NoResults';
import Loader from '../../views/Components/Custom/Loader/Loader';
import Error from '../../views/Components/Custom/Error/Error';
import { Bar } from 'react-chartjs-2';
import { GetEmployeeCount } from '../../Queries/Awarness Queries/Awarness';
import _ from 'lodash'
import { Col, Row, CardBody } from 'reactstrap';

function EmployeeTrainingStat() {
    return (
        <Subscription subscription={GetEmployeeCount}>
            {
                ({ loading, error, data }) => {
                    if (loading)
                        return (<div style={{ position: "fixed", top: "50%", left: "45%" }}>
                            <Loader />
                        </div>
                        );
                    if (error) return <Error />;
                    if (data) {
                        let EmployeeCount = data.training_report_employees.map(em => em.training_report_employees_training_report)
                        let getUniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
                        let employeeFilter = getUniqueArray(EmployeeCount.map(e => (_.omit(e, ['id']))))

                        let NewEmp = employeeFilter.map(f => {
                            let CatNAme = f.training_category
                            let recurrence = EmployeeCount.reduce((acc, elm) => (elm.training_category == CatNAme) ? acc += 1 : acc, 0)
                            f.amount = recurrence
                            return f

                        })
                        let trainingType = NewEmp.map(n => n.training_category)
                        let EmployeCount = NewEmp.map(n => n.amount)


                        let EmSum = EmployeCount.reduce((acc, elm) => elm + acc, 0)
                        let EmpLength = EmployeCount.length
                        let EmRange = Math.ceil(EmSum / EmpLength)
                        console.log(EmRange);


                        const dataStat = {
                            labels: trainingType,
                            datasets: [
                                {
                                    label: 'عدد المتدربين في التوعيه ',
                                    barPercentage: .1,
                                    backgroundColor: '#F95700FF',
                                    borderColor: '#606060FF00',
                                    borderWidth: 2,
                                    hoverBackgroundColor: 'rgb(180, 142, 0)',
                                    hoverBorderColor: 'rgb(180, 142, 0)',
                                    data: EmployeCount
                                }]
                        };
                        var options = {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        stepSize: 2,


                                    }
                                }]
                            }
                        };


                        return (
                            <Row>
                                <Col xs="12" md="8" lg="12">

                                    <CardBody className="pb-0">
                                        <div className="text-value" style={{ color: "#F95700FF" }}>عدد المتدربين في كل نوع من انواع التدريب:
                                    </div>
                                    </CardBody>
                                    <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px', backgroundColor: " #FFFFFFFF" }}>

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

export default EmployeeTrainingStat
