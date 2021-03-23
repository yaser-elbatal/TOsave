import React, { Component } from 'react';
import Tabs from "../Custom/Tabs/Tabs"
import ListUsers from "./ListUsers"
import { Query } from 'react-apollo';
import { List_Dropdowns } from '../../../services/queries/Users';
import Loader from "../Custom/Loader/Loader"
import Error from "../Custom/Error/Error"


export default () => {

  return (
    <Query query={List_Dropdowns}>
      {
        ({ loading, error, data }) => {
          if (loading) return (<Loader />);
          if (error) return (<Error />);

          if (Object.keys(data).length == 3) {
            let
              branchDropdown = { data: data.branch, fieldName: "branch_id" },
              technical_departmentDropdown = { data: data.technical_department, fieldName: "department_id" }
            // maintainance_companyDropdown = { data: data.maintainance_company, fieldName: "company_id" },

            return (
              <div className="animated fadeIn">
                <Tabs data={[
                  {
                    label: <b>المسؤلين</b>,
                    body: <ListUsers type="admin" />
                  },
                  {
                    label: <b>مهندسي الصيانة</b>,
                    body: <ListUsers type="engineer" />
                  },
                  {
                    label: <b>موظفي الفروع</b>,
                    body: <ListUsers dropdownData={branchDropdown} type="branches" />
                  },
                  // {
                  //   label: <b>موظفي شركات صيانة</b>,
                  //   body: <ListUsers dropdownData={maintainance_companyDropdown} type="maintainance" />
                  // },
                  {
                    label: <b>أعضاء الأقسام</b>,
                    body: <ListUsers dropdownData={technical_departmentDropdown} type="departments" />
                  },
                ]} />
              </div >
            )
          }
        }
      }
    </Query>
  )
}