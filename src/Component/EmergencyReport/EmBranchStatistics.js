import React, { Component } from 'react'
import { EmerganctDepStat } from '../../Queries/EmergencyQuery/EmergencyQuery'
import Loader from '../../views/Components/Custom/Loader/Loader';
import Error from '../../views/Components/Custom/Error/Error';
import { Subscription } from 'react-apollo';
import NoResults from '../../views/Components/Custom/NoResults/NoResults';
import { Bar } from 'react-chartjs-2';
import { Link } from "react-router-dom"



class EmBranchStatistics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            qString: {},
            DepId: false,
            branchId: false,
        }
    }
    componentDidMount() {
        this.setState({
            DepId: this.props.DepId,
            branchId: this.props.branchId,
        })
    }
    componentDidUpdate(prevProps, prevState) {

        const { DepId, branchId } = this.props;
        if (DepId != prevProps.DepId || branchId != prevProps.branchId) {
            this.setState({
                ...(DepId && { DepId: parseInt(DepId) }),
                ...(branchId && { branchId: parseInt(branchId) }),
            })
        }
    }

    render() {
        return (
            <Subscription subscription={EmerganctDepStat} variables={{
                filter: !this.state.DepId && !this.state.branchId ? {} :
                    {
                        ...(this.state.DepId && { "emergency_department_technical_department": { "id": { "_eq": parseInt(this.state.DepId) } } }),
                        ...(this.state.branchId && { "emergency_department_reports": { "branch_id": { "_eq": parseInt(this.state.branchId) } } }),
                    }
            }} >
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Loader />;
                        if (error) return <Error />;
                        if (data) {

                            let BranchDep = []
                            let emergancyRep = data.emergency_department.map(reb => {
                                let Department = reb.emergency_department_technical_department
                                reb.emergency_department_reports.map(dep => BranchDep.push({
                                    bname: dep.emergency_report_branch.name,
                                    bid: dep.emergency_report_branch.id,
                                    dname: Department.name, did: Department.id,
                                }))
                            });



                            let getUniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
                            let all = getUniqueArray(BranchDep)

                            let newBranch = all.map(u => {
                                let bid = u.bid, did = u.did
                                let recurrence = BranchDep.reduce(((acc, elm) => (bid == elm.bid && did == elm.did) ? acc += 1 : acc), 0)
                                u.amount = recurrence
                                return u;
                            })

                            let EmergencyRepCount = newBranch.map(ne => `${ne.bname},${ne.dname}`)
                            let EmerganctRepStat = newBranch.map(n => n.amount)

                            const dataStat = {
                                labels: EmergencyRepCount,
                                datasets: [
                                    {
                                        label: 'عدد التقارير في الفروع والاقسام',
                                        barPercentage: .1,
                                        backgroundColor: 'rgba(255,99,132,0.5)',
                                        borderColor: 'rgba(255,99,132,1)',
                                        borderWidth: 2,
                                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                        hoverBorderColor: 'rgba(255,99,132,2)',
                                        data: EmerganctRepStat
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
                                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>

                                    <Bar data={dataStat} height={50} options={options} />
                                </div>)
                        } else return <NoResults />

                    }}

            </Subscription>
        )
    }
}

export default EmBranchStatistics
