import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { List_Areas, Update_Area } from '../../../services/queries/Areas'
import _ from 'lodash'
import PopUp from "../Custom/PopUp/PopUp"
import UpdateAreaForm from "./UpdateAreaForm"


export default class UpdateArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: this.props.area.area_neighborhood_aggregate.aggregate.count,
            area: _.omit(this.props.area, ['created_at', 'area_neighborhood_aggregate', 'updated_at', '__typename']),
            updatedData: {}
        }
    }

    componentDidMount() {

    }

    clearData = () => this.setState({ updatedData: {} });

    updateData = (areaNewData) => {
        let area = this.state.area;
        this.setState({
            area: { ...area, ...areaNewData }
        })
    }

    updateHandle = (updateArea) => {
        let area = this.state.area
        let areaNewData = this.state.updatedData;
        area = { ...area, ...areaNewData };
        this.setState({ area });
        updateArea(
            {
                variables: { ...this.state.area },
                refetchQueries: [{ query: List_Areas, variables: { city_id: this.state.area.city_id } }]
            }
        )
    }

    deleteHandle = (updateArea) => {
        let area = this.state.area
        area.isNeglected = !area.isNeglected
        this.setState({ area });
        updateArea(
            {
                variables: { ...this.state.area },
                refetchQueries: [`ListAreas`]
            }
        )
    }


    render() {
        return (
            <Mutation mutation={Update_Area}>
                {(updateArea, { data }) => (
                    <React.Fragment>
                        <td>
                            <PopUp {...{
                                buttonLabel: "تعديل",
                                buttonColor: "success",
                                body: <UpdateAreaForm
                                    data={this.state.area}
                                    clearData={this.clearData}
                                    updateData={this.updateData} />,
                                submitLabel: "تعديل",
                                cancelLabel: "تراجع",
                                onSubmit: () => this.updateHandle(updateArea),
                            }} />
                        </td>
                        <td>
                            {!this.state.count &&
                                <button
                                    className={`btn btn-${this.state.area.isNeglected ? 'warning' : 'danger'}`}
                                    onClick={e => this.deleteHandle(updateArea)}>
                                    {this.state.area.isNeglected ? 'استرجاع' : 'حذف'}
                                </button>}
                        </td>
                    </React.Fragment>
                )}
            </Mutation>
        );
    }
};