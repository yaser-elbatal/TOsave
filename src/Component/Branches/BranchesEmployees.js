import React, { Component } from "react";
import { Query, Subscription } from "react-apollo";
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import Get_employees from "../../Queries/BranshesQuery/BranchesEmployee";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import { Card, CardHeader, Badge } from "reactstrap";

import EditManager from "./EditManager";
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import ManagerBranch from "./ManagerBranch";
import PaginatioQ from "./PaginatioQ";

export class BranchesEmployees extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "", currentPage: 0 };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 50) });
  }

  render() {
    return (
      <React.Fragment>
        <MDBCol md="8" style={{ margin: "10px auto" }}>
          <MDBFormInline className="md-form">
            <MDBIcon icon="search" />

            <input
              className="form-control form-control-lg ml-3 w-75"
              type="text"
              aria-label="Search"
              name="searchQuery"
              defaultValue={this.state.search}
              onChange={this.updateSearch.bind(this)}
              placeholder=" البحث عن الموظفين "
            />
          </MDBFormInline>
        </MDBCol>

        <Subscription
          subscription={Get_employees}
          variables={{ branch_id: this.props.branchId }} >

          {({ loading, error, data }) => {

            if (loading) return <Loader />;
            if (error) {
              console.log(error);
              return <Error />;
            }

            if (data.employee.length) {

              let manager = data.employee.find(em => {
                return em.emp_branch
                  ? em.emp_branch.branch_manager
                    ? em.id == em.emp_branch.branch_manager
                    : "لم يحدد مدير الفرع"
                  : "لم يحدد مدير الفرع";
              });


              let FilteredData = data.employee.filter(em =>
                !em.employee_user || em.employee_user.display_name == null ? (
                  <NoResults />
                ) : (
                    em.employee_user.display_name
                      .toLowerCase()
                      .indexOf(this.state.search.toLowerCase()) !== -1
                  )
              );

              return (
                <Card>
                  <Card>
                    <CardHeader
                      style={{ fontSize: "20px", backgroundColor: "#F2F8FD" }}
                    >
                      <ManagerBranch data={data.employee} />
                      <EditManager
                        data={data.employee}
                        branch_id={this.props.branchId}
                        manager={manager && manager}
                      />
                    </CardHeader>
                    <PaginatioQ FilteredData={FilteredData} />
                  </Card>
                </Card>
              );
            } else return <NoResults />;
          }}
        </Subscription>
      </React.Fragment>
    );
  }
}

export default BranchesEmployees;
