import React from "react";
import { Subscription } from "react-apollo";
import { EmployeeNum } from "../../Queries/Awarness Queries/Awarness";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import Loader from "../../views/Components/Custom/Loader/Loader";
import Error from "../../views/Components/Custom/Error/Error";
import { Table } from "reactstrap";
import DeleteEmployee from "./DeleteEmployee";

function AwarnessEmployee(props) {
  const printHandler = () => {
    window.print();
  };

  return (
    <Subscription
      subscription={EmployeeNum}
      variables={{ report_id: props.match.params.id }}
    >
      {({ loading, error, data }) => {
        if (loading)
          return (
            <div style={{ position: "fixed", top: "50%", left: "45%" }}>
              <Loader />
            </div>
          );
        if (error) return <Error />;

        const getDate = (isoDate) => {
          let date = new Date(isoDate).toLocaleString();
          date = date
            .split(",")[0]
            .split("/")
            .map((dat) => (dat < 10 && "0" + dat) || dat);
          date = date[1] + "/" + date[0] + "/" + date[2];

          return date;
        };

        if (data.training_report_employees.length) {
          return (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "10px",
                }}
              >
                <button className="btn btn-primary" onClick={printHandler}>
                  طباعة التقرير
                </button>
              </div>
              <Table
                bordered
                responsive
                highlight
                hover
                style={{ textAlign: "center", backgroundColor: "white" }}
              >
                <thead>
                  <tr>
                    <th> # </th>
                    <th>اسم المتدرب</th>
                    <th>التوقيع</th>

                    <th style={{ marginRight: "20px" }}>البريد الالكتروني</th>
                    <th>تاريخ البدء</th>
                    <th>اخر تحديث</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {data.training_report_employees.map((emp, indx) => {
                    return (
                      <tr key={indx}>
                        <th>{emp.employee}</th>
                        <td>
                          {emp.training_employee.employee_user && emp.training_employee.employee_user.display_name}
                        </td>
                        <td>
                          {emp.signature == null
                            ? "لم يوقع بعض"
                            : emp.training_employee.signature}
                        </td>
                        <td>{emp.training_employee.email}</td>
                        <td>{getDate(emp.training_employee.created_at)}</td>
                        <td>{getDate(emp.training_employee.updated_at)}</td>
                        <td>
                          <DeleteEmployee employeeId={emp.employee} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          );
        } else return <NoResults />;
      }}
    </Subscription>
  );
}

export default AwarnessEmployee;
