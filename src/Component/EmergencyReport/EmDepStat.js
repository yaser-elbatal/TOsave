import React, { Component } from 'react'
import { Subscription } from 'react-apollo'
import { EmerganctDepStat, GetDepBra } from '../../Queries/EmergencyQuery/EmergencyQuery'
import Loader from '../../views/Components/Custom/Loader/Loader';
import Error from '../../views/Components/Custom/Error/Error';
import NoResults from '../../views/Components/Custom/NoResults/NoResults';
import { Bar } from 'react-chartjs-2';
import { Col, Row } from "reactstrap";
import DrpDwn from "../../views/Components/Custom/DropDown/DropDown";
import EmBranchStatistics from './EmBranchStatistics';

export default class EmDepStat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slectedDepId: false,
            slectedBranchId: false,
        };
    }
    onchang = obj => this.setState({ slectedDepId: obj.id })

    onChange = obj => this.setState({ slectedBranchId: obj.id })


    render() {
        return (
            <Subscription subscription={GetDepBra} >
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Loader />;
                        if (error) return <Error />;
                        if (data) {
                            let Department = data.technical_department.map(te => ({ id: te.id, value: te.name }))
                            let Branches = data.branch.map(br => ({ id: br.id, value: br.name }))




                            return (
                                <div>

                                    <Row>
                                        <Col xl={12}>
                                            <div style={{ marginBottom: "15px", flex: "auto", display: "flex" }} >
                                                <span style={{ marginLeft: "10px" }}>
                                                    <DrpDwn data={[{ id: 0, value: "كل الاقسام" }, ...Department]} color="instagram" onChange={this.onchang} />
                                                </span>
                                                <span style={{ marginLeft: "10px" }}>
                                                    <DrpDwn data={[{ id: 0, value: "كل الفروع" }, ...Branches]} color="instagram" onChange={this.onChange} />
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xl={12}>
                                            <EmBranchStatistics branchId={this.state.slectedBranchId} DepId={this.state.slectedDepId} />
                                        </Col>
                                    </Row>
                                </div>)








                        } else return <NoResults />
                    }}

            </Subscription>
        )
    }
}