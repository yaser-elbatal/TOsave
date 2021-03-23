import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Update_Item } from '../../../../services/queries/Maintainance/MaintainanceReports/Items'
import _ from 'lodash'
import PopUp from "../../Custom/PopUp/PopUp"
import UpdateItemForm from "./UpdateItemForm"


export default class UpdateList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: _.omit(this.props.item, ['created_at', '__typename']),
            updatedData: {}
        }
    }

    componentDidMount() {

    }

    clearData = () => this.setState({ updatedData: {} });

    updateData = (itemNewData) => {
        let item = this.state.item;
        this.setState({
            item: { ...item, ...itemNewData }
        })

    }

    updateHandle = (updateitem) => {
        let item = this.state.item;

        this.setState({ item });
        updateitem(
            {
                variables: { ...this.state.item },
                refetchQueries: ['ListItems']
            }
        )
    }

    deleteHandle = (updateItem) => {
        let item = this.state.item
        item.isNeglected = !item.isNeglected
        this.setState({ item });
        updateItem(
            {
                variables: { ...this.state.item },
                refetchQueries: [`ListItems`]
            }
        )
    }


    render() {
        return (
            <Mutation mutation={Update_Item}>
                {(updateItem, { data }) => (
                    <div style={{ display: "flex", justifyContent: "space-evenly" }} >
                        <PopUp {...{
                            buttonLabel: "تعديل",
                            buttonColor: "success",
                            body: <UpdateItemForm
                                data={this.state.item}
                                clearData={this.clearData}
                                updateData={this.updateData} />,
                            submitLabel: "تعديل",
                            cancelLabel: "تراجع",
                            onSubmit: () => this.updateHandle(updateItem),
                        }} />
                        <button
                            className={`btn btn-${this.state.item.isNeglected ? 'warning' : 'danger'}`}
                            onClick={e => this.deleteHandle(updateItem)}>
                            {this.state.item.isNeglected ? 'استرجاع' : 'حذف'}
                        </button>
                    </div>
                )}
            </Mutation>
        );
    }
};