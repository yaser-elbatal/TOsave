import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { List_Neighborhood, Update_Neighborhood } from '../../../services/queries/Neighbours'
import _ from 'lodash'
import PopUp from "../Custom/PopUp/PopUp"
import UpdateNeighbourForm from "./UpdateNeighbourForm"


export default class UpdateNeighborhood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            neighborhood: _.omit(this.props.neighborhood, ['created_at', '__typename']),
            updatedData: {}
        }
    }

    componentDidMount(){

    }

    clearData = ()=>this.setState({updatedData: {}});

    updateData = (neighborhoodNewData) =>{
        let neighborhood = this.state.neighborhood;
        this.setState({
            neighborhood: {...neighborhood, ...neighborhoodNewData}
        })
    }

    updateHandle = (updateNeighborhood) => {
        let neighborhood = this.state.neighborhood
        let neighborhoodNewData = this.state.updatedData;
        neighborhood = {...neighborhood, ...neighborhoodNewData};
        this.setState({ neighborhood });
        updateNeighborhood(
            {
                variables: {...this.state.neighborhood},
                refetchQueries: [{ query: List_Neighborhood, variables: {area_id: this.state.neighborhood.area_id} }]
            }
        )
    }

    deleteHandle = (updateNeighborhood) => {
        let neighborhood = this.state.neighborhood
        neighborhood.isNeglected = !neighborhood.isNeglected
        this.setState({ neighborhood });
        updateNeighborhood(
            {
                variables: {...this.state.neighborhood},
                refetchQueries: [`ListNeighborhood`]
            }
        )
    }


    render() {
        return (
            <Mutation mutation={Update_Neighborhood}>
                {(updateNeighborhood, { data }) => (
                    <div style={{ display: "flex", justifyContent: "space-evenly" }} >
                        <PopUp {...{
                            buttonLabel: "تعديل",
                            buttonColor: "success",
                            body: <UpdateNeighbourForm
                                data={this.state.neighborhood}
                                clearData={this.clearData}
                                updateData={this.updateData} />,
                            submitLabel: "تعديل",
                            cancelLabel: "تراجع",
                            onSubmit: () => this.updateHandle(updateNeighborhood),
                        }} />
                        <button
                            className={`btn btn-${this.state.neighborhood.isNeglected ? 'warning' : 'danger'}`}
                            onClick={e =>this.deleteHandle(updateNeighborhood)}>
                            {this.state.neighborhood.isNeglected ? 'استرجاع' : 'حذف'}
                        </button>
                    </div>
                )}
            </Mutation>
        );
    }
};