import React, { Component } from "react";
import {
  Table,
  Alert,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import ModalImage from "react-modal-image";
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";

export class EditManagerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      search: "",
      currentPage: 0,
      hover: false
    };

    this.pageSize = 2;
    this.pagesCount = Math.ceil(this.state.data.length / this.pageSize);
  }

  changeHandle = id => {
    this.props.updateData(id);
  };
  updateSearch(event) {
    this.setState({ search: event.target.value.substr(0, 50) });
  }
  handleClick(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
  }

  render() {
    const { currentPage } = this.state;
    
    let FilteredData = this.state.data.filter(em =>
      em.employee_user === null || false || " " ? (
        <NoResults />
      ) : (
          em.employee_user.display_name
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1
        )
    );

    return (
      <React.Fragment>
        <div>
          <Alert
            color="danger"
            style={{
              textAlign: "center",
              fontSize: "larger",
              fontFamily: "Times New Roman"
            }}
          >
            يرجي اختيار مدير الفرع
          </Alert>
          <MDBCol md="8" style={{ margin: "10px auto" }}>
            <MDBFormInline className="md-form">
              <MDBIcon icon="search" />

              <input
                className="form-control form-control-lg ml-3 w-75"
                type="text"
                aria-label="Search"
                name="searchQuery"
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}
                placeholder=" البحث عن الموظفين "
              />
            </MDBFormInline>
          </MDBCol>

          <Table
            responsive
            hover
            style={{
              textAlign: "center",
              fontFamily: "'El Messiri', sans-serif",
              border: "1px solid #EDC9Af",
              cursor: "pointer"
            }}
          >
            <thead>
              <tr>
                <th scope="col"> #</th>
                <th scope="col">صوره الموظف</th>
                <th scope="col">اسم الموظف</th>
              </tr>
            </thead>
            <tbody>
              {FilteredData.slice(
                currentPage * this.pageSize,
                (currentPage + 1) * this.pageSize
              ).map((emp, i) => {
                return (
                  <tr
                    key={i}
                    className="hvr"
                    style={
                      emp.id == emp.emp_branch.branch_manager
                        ? { backgroundColor: "#20a8d8" }
                        : {}
                    }
                    onClick={() => this.changeHandle(emp.id)}
                  >
                    <th scope="row">{emp.id}</th>
                    <td>
                      <div
                        style={{
                          maxWidth: "38px",
                          borderRadius: "50em",
                          margin: "auto",
                          cursor: "pointer"
                        }}
                      >
                        {!emp.employee_user ||
                          emp.employee_user.avatar == null ? (
                            <ModalImage
                              className="img-avatar"
                              smallSrcSet="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                              large="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                            />
                          ) : (
                            <ModalImage
                              className="img-avatar"
                              smallSrcSet={emp.employee_user.avatar}
                              large={emp.employee_user.avatar}
                            />
                          )}
                      </div>
                    </td>

                    <td>
                      {!emp.employee_user ||
                        emp.employee_user.display_name == null
                        ? "اسم الموظف"
                        : emp.employee_user.display_name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <Pagination aria-label="Page navigation example">
          <PaginationItem disabled={currentPage <= 0}>
            <PaginationLink
              onClick={e => this.handleClick(e, currentPage - 1)}
              previous
              href="#"
            />
          </PaginationItem>

          {[...Array(this.pagesCount)].map((page, i) => (
            <PaginationItem active={i === currentPage} key={i}>
              <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
            <PaginationLink
              onClick={e => this.handleClick(e, currentPage + 1)}
              next
              href="#"
            />
          </PaginationItem>
        </Pagination>
        {
          <style
            dangerouslySetInnerHTML={{
              __html: `
          .hvr:hover {background-color: #b3d4e0 !important;}
          .hvr:focus, .hvr:active {background-color: #20a8d8 !important;}
        `
            }}
          />
        }
      </React.Fragment>
    );
  }
}

export default EditManagerForm;
