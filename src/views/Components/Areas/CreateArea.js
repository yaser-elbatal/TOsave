import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Create_Area } from '../../../services/queries/Areas'
import _ from 'lodash'
import CreateAreaForm from "./CreateAreaForm"
import { validateNameEn, validateNameAr } from '../../../Component/Validation';
import { store } from "react-notifications-component";


export default class CreateArea extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createdData: {}
        }
    }

    componentDidMount() {

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


    updateData = (editedNewData) => {
        let createdData = this.state.createdData;
        this.setState({
            createdData: { ...createdData, ...editedNewData }
        })
    }

    createHandle = (createArea) => {

        let val = this._validate()

        if (!val) {

            createArea(
                {
                    variables: { ...this.state.createdData, city_id: this.props.city_id },
                    refetchQueries: [`ListAreas`]//{ query: List_Areas, variables: {city_id: this.props.city_id} }
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
            <Mutation mutation={Create_Area}>
                {(createArea, { data }) => {
                    return <CreateAreaForm updateData={this.updateData} onSubmit={() => { this.createHandle(createArea); this.props.toggle(); }} />
                }}
            </Mutation>
        );
    }
};