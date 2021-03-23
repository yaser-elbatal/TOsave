import React, { Component } from "react";
import { Mutation } from "react-apollo";
import {
  AddBranch,
  EditCompBranch,
} from "../../Queries/BranshesQuery/BranchesList";
import CreateBranchForm from "./CreateBranchForm";
import { store } from "react-notifications-component";
import {
  validateNameAr,
  validateNameEn,
  validateContact,
  validateNeighbor,
  validateBranchNumber,
  validateselectedBranchId,
  validateAvatar,
} from "../Validation";

export class CreateBranch extends Component {
  constructor() {
    super();
    this.state = {
      updateData: {},
      error: "",
    };
  }

  updateNewData = (newData) => {
    let updateData = this.state.updateData;
    this.setState({ updateData: { ...updateData, ...newData } });
  };

  _validate = () => {
    const {
      name,
      name_en,
      about,
      avatar,
      branchnumber,
      contact_numbers,
      neighborhood,
    } = this.state.updateData;
    let nameAr = validateNameAr(name_en);
    let nameEn = validateNameEn(name);
    let contact = validateContact(contact_numbers);
    let neighbor = validateNeighbor(neighborhood);
    let branchNum = validateBranchNumber(branchnumber);
    let image = validateAvatar(avatar);
    return (
      nameAr ||
      nameEn ||
      contact ||
      neighbor ||
      branchNum ||
      image
    );
  };

  createHandle = (CreatBranch, updateID) => {
    if (this._validate()) {

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
      });

    }

    else {

      CreatBranch({
        variables: { ...this.state.updateData },
        refetchQueries: [`Get_list`],
      });
    }

    //   try {
    //     let CretBranch = await CreatBranch();

    //     let {
    //       data: {
    //         insert_branch: { returning },
    //       },
    //     } = CretBranch;
    //     let id = returning[0].id;
    //     let { slectedBranchId } = this.state.updateData;
    //     console.log(slectedBranchId, id);
    //     await updateID({ variables: slectedBranchId, id });



    //   }


    //   catch (error) {
    //     store.addNotification({
    //       title: "تنبيه",
    //       message: error,
    //       type: "danger",
    //       insert: "top",
    //       container: "top-right",
    //       animationIn: ["animated", "fadeIn"],
    //       animationOut: ["animated", "fadeOut"],
    //       dismiss: {
    //         duration: 3000,
    //         onScreen: true,
    //       },
    //     });
    //   }

    // }

  };

  render() {
    // const {
    //   about,
    //   avatar,
    //   branchnumber,
    //   name,
    //   name_en,
    //   contact_numbers,
    //   neighborhood,
    //   branch_manager
    // } = this.state.updateData;
    console.log(this.state.updateData);

    return (
      <Mutation mutation={AddBranch}  >
        {(CreatBranch, { data }) => {

          return (

            <CreateBranchForm updateData={this.updateNewData} onSubmit={() => { this.createHandle(CreatBranch); this.props.toggle(); }} />

          );
        }}


      </Mutation>
    );
  }
}

export default CreateBranch;
