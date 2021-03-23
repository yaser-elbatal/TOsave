import React, { Component } from 'react'
import { MaintainComp } from '../../Queries/BranshesQuery/BranchesList'
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import { Query } from 'react-apollo';
import DrpDwn from "../../views/Components/Custom/DropDown/DropDown";


export class BranchCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slectedBranchId: 0
        };
    }
    onChange = obj => {
        console.log(obj);

        this.setState({ slectedBranchId: obj.id }, () => {
            this.props.updateData({ slectedBranchId: this.state.slectedBranchId })
        })

    }

    render() {
        return (
            <Query query={MaintainComp}>
                {
                    ({ loading, error, data }) => {
                        if (loading)
                            return (
                                <div style={{ position: "fixed", top: "50%", left: "45%" }}>
                                    <Loader />
                                </div>)
                        if (error) return <Error />;
                        if (data.maintainance_company.length) {

                            let branchMaintain = data.maintainance_company.map(inc => ({
                                id: inc.id,
                                value: `${inc.company_name}`
                            }))
                            return (
                                <DrpDwn data={[...branchMaintain]} color="instagram" onChange={this.onChange} />
                            )

                        }
                        else return <NoResults />
                    }
                }

            </Query>
        )
    }
}

export default BranchCompany
