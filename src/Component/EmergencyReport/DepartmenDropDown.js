import React, { Component } from 'react'
import { Col, Row, Table } from "reactstrap";
import DrpDwn from "../../views/Components/Custom/DropDown/DropDown";


export class DepartmenDropDown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            qString: {},
            slectedDepId: false,
            slectedBranchId: false,
        };
    }


    onchange = obj => this.setState({ slectedDepId: obj.id });
    onChange = obj => this.setState({ slectedBranchId: obj.id });


    render() {
        let BranchDep = []
        let emergancyRep = data.emergency_report.map(reb => {
            let branch = reb.emergency_report_branch
            reb.emergency_report_department.map(dep => BranchDep.push({
                dname: dep.emergency_department_technical_department.name,
                did: dep.emergency_department_technical_department.id,
                bname: branch.name, bid: branch.id,
            }))
        });
        console.log(BranchDep);

        let getUniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
        let Department = getUniqueArray(BranchDep.map(de => de.department));
        let Branches = getUniqueArray(BranchDep.map(br => br.branch))

        let allDep = Department.map(m => ({ id: m.id, value: m.name }))
        let allBranch = Branches.map(b => ({ id: b.id, value: b.name }))


        console.log(Department, Branches);




        return (
            <React.Fragment>
                {
                    <div>
                        <Row>
                            <Col xl={12}>
                                <div style={{ marginBottom: "15px", flex: "auto", display: "flex" }} >
                                    <span style={{ marginLeft: "10px" }}>
                                        <DrpDwn data={[{ id: 0, value: "كل الاقسام" }, ...allDep]} color="instagram" onChange={this.onchange} />
                                    </span>
                                    <span style={{ marginLeft: "10px" }}>
                                        <DrpDwn data={[{ id: 0, value: "كل الفروع" }, ...allBranch]} color="instagram" onChange={this.onChange} />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                }

            </React.Fragment>
        )
    }
}

export default DepartmenDropDown
