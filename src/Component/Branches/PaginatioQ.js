import React, { Component } from "react";

import { Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";
import ModalImage from "react-modal-image";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";

export default class PaginatioQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    };

    this.pageSize = 4;
    this.pagesCount = Math.ceil(this.props.FilteredData.length / this.pageSize);
  }

  handleClick(e, index) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
  }

  render() {
    const { currentPage } = this.state;

    return (
      <React.Fragment>
        <div className="pagination-wrapper">
          <Table
            responsive
            hover
            style={{
              textAlign: "center",
              fontFamily: "'El Messiri', sans-serif",
              border: "1px solid #C9FFBF",
              cursor: "pointer"
            }}
          >
            <thead>
              <tr>
                <th scope="col"> #</th>
                <th scope="col">صوره الموظف</th>
                <th scope="col">اسم الموظف</th>
                <th scope="col"> البريد الالكتروني</th>
              </tr>
            </thead>
            <tbody>
              {this.props.FilteredData.slice(
                currentPage * this.pageSize,
                (currentPage + 1) * this.pageSize
              ).map((emp, i) => {
                return (
                  <tr
                    key={i}
                    style={
                      emp.id == emp.emp_branch.branch_manager
                        ? { backgroundColor: "#20a8d8" }
                        : {}
                    }
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

                    <td>{emp.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
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
        </div>
      </React.Fragment>
    );
  }
}
