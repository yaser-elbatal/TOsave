import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Create_Neighborhood } from '../../../services/queries/Neighbours'
import _ from 'lodash'
import CreateNeighbourForm from "./CreateNeighbourForm"
import { validateNameEn, validateNameAr } from '../../../Component/Validation';
import { store } from "react-notifications-component";


export default class CreateNeighbour extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createdData: {}
        }
    }

    componentDidMount() {

    }

    updateData = (editedNewData) => {
        let createdData = this.state.createdData;
        this.setState({
            createdData: { ...createdData, ...editedNewData }
        })
    }


    _validate = () => {
        const {
            name,
            name_en,

        } = this.state.createdData;
        let nameAr = validateNameAr(name);
        let nameEn = validateNameEn(name_en);

        return (
            nameAr ||
            nameEn

        );
    };


    createHandle = (createNeighbour) => {


        let val = this._validate()

        if (!val) {

            createNeighbour(
                {
                    variables: { ...this.state.createdData, area_id: this.props.area_id },
                    refetchQueries: [`ListNeighborhood`]//{ query: List_Areas, variables: {city_id: this.props.city_id} }
                }
            )

        }
        else {
            return store.addNotification({
                title: "تنبيه",
                message: this._validate(),
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 3000,
                    onScreen: true,
                },
            })
        }

    }


    render() {
        return (
            <Mutation mutation={Create_Neighborhood}>
                {(createNeighbour, { data }) => {
                    return <CreateNeighbourForm updateData={this.updateData} onSubmit={() => { this.createHandle(createNeighbour); this.props.toggle(); }} />
                }}
            </Mutation>
        );
    }
};