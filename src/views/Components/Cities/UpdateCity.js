import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { List_Cities, Update_City } from '../../../services/queries/Cities'
import _ from 'lodash'
import PopUp from "../Custom/PopUp/PopUp"
import UpdateCityForm from "./UpdateCityForm"


export default class UpdateCity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: this.props.city.city_areas_aggregate.aggregate.count,
            city: _.omit(this.props.city, ['created_at', '__typename', 'city_areas_aggregate']),
            updatedData: {}
        }
    }

    componentDidMount() {
    }

    clearData = () => this.setState({ updatedData: {} });

    updateData = (cityNewData) => {
        let city = this.state.city;
        this.setState({
            city: { ...city, ...cityNewData }
        })
    }

    updateHandle = (updateCity) => {
        let city = this.state.city
        let cityNewData = this.state.updatedData;
        city = { ...city, ...cityNewData };
        this.setState({ city });
        updateCity(
            {
                variables: { ...this.state.city },
                refetchQueries: [{ query: List_Cities, }]
            }
        )
    }

    deleteHandle = (updateCity) => {
        let city = this.state.city
        city.isNeglected = !city.isNeglected
        this.setState({ city });
        updateCity(
            {
                variables: { ...this.state.city },
                refetchQueries: [`ListCities`]
            }
        )
    }


    render() {
        return (
            <Mutation mutation={Update_City}>
                {(updateCity, { data }) => (
                    <React.Fragment>
                        <td>
                            <PopUp {...{
                                buttonLabel: "تعديل",
                                buttonColor: "success",
                                body: <UpdateCityForm
                                    data={this.state.city}
                                    clearData={this.clearData}
                                    updateData={this.updateData} />,
                                submitLabel: "تعديل",
                                cancelLabel: "تراجع",
                                onSubmit: () => this.updateHandle(updateCity),
                            }} />
                        </td>
                        <td>
                            {!this.state.count &&
                                <button
                                    className={`btn btn-${this.state.city.isNeglected ? 'warning' : 'danger'}`}
                                    onClick={e => this.deleteHandle(updateCity)}>
                                    {this.state.city.isNeglected ? 'استرجاع' : 'حذف'}
                                </button>
                            }
                        </td>
                    </React.Fragment>
                )}
            </Mutation>
        );
    }
};