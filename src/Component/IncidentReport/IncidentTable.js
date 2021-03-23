import React from "react";
import { Table, Badge, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import ModalImage from "react-modal-image";

function IncidentTable({ incidentReport }) {
  // let johan = {
  //     name: 'ahmed',
  //     birh: 2010,
  //     car: "bmw"
  // }

  // person.prototype.calculateage = () => {
  //     console.log(2010 - this.birh);

  // }

  // var john = new person('yaser', 2011, 'audi')
  // john.calculateage()

  const getDate = (isoDate) => {
    let date = new Date(isoDate).toLocaleString();
    date = date
      .split(",")[0]
      .split("/")
      .map((dat) => (dat < 10 && "0" + dat) || dat);
    date = date[1] + "/" + date[0] + "/" + date[2];

    return date;
  };

  return (
    <Table bordered responsive hover style={{ backgroundColor: "white" }}>
      <tbody>
        <tr>
          <td>#</td>
          <td>{incidentReport.id}</td>
        </tr>
        <tr>
          <td>اسم المنشأ</td>
          {/* <td> <Link to={`/user/${incidentReport.created_by.id}`}>
                        {incidentReport.created_by && incidentReport.created_by.employee_user.display_name}
                    </Link>
                    </td> */}
          <td>
            <Link to={`/user/${incidentReport.incident_report_user.id}`}>
              {incidentReport.incident_report_user &&
                incidentReport.incident_report_user.display_name}
            </Link>
          </td>
        </tr>
        <tr>
          <td>الفرع</td>
          <td style={{ fontSize: "20px" }}>
            {" "}
            <Badge style={{ padding: "10px" }} color="info">
              {incidentReport.incident_branch.name}
            </Badge>
          </td>
        </tr>
        <tr>
          <td>حاله التقرير</td>
          <td style={{ fontSize: "20px" }}>
            {" "}
            <Badge
              style={{ padding: "10px" }}
              color={(incidentReport.status = 0 ? "dark" : "warning")}
            >
              {(incidentReport.status = 0 ? "قديم" : "جديد")}
            </Badge>
          </td>
        </tr>
        <tr>
          <td>الابلاغ عن </td>
          <td style={{ fontSize: "20px" }}>
            <Badge color="dark" style={{ padding: "10px" }}>
              {incidentReport.report_for == 1
                ? "اصابه"
                : incidentReport.report_for == 2
                ? "حريق"
                : "احتمال حدوث اصابه"}
            </Badge>
          </td>
        </tr>

        <tr>
          <td>هل يوجد اصابه؟ </td>
          <td>
            <Badge
              style={{ padding: "10px" }}
              color={incidentReport.anyone_injured ? "danger" : "warning"}
            >
              {incidentReport.anyone_injured
                ? "نعم يوجد اصابات"
                : "لا يوجد اصابات"}
            </Badge>
          </td>
        </tr>
        <tr>
          <td> ماذا فعلت ؟</td>
          <td>
            {" "}
            <Badge style={{ padding: "15px" }} color="warning">
              {incidentReport.your_action}
            </Badge>
          </td>
        </tr>
        <tr>
          <td>هل تم ابلاغ المدير؟</td>
          <td>
            {incidentReport.reported_for_manager ? (
              <i
                style={{ fontSize: "25px", color: "green" }}
                className="fa fa-check-circle"
              ></i>
            ) : (
              <i
                style={{ fontSize: "25px", color: "red" }}
                className="fa fa-times-circle"
              ></i>
            )}
          </td>
        </tr>
        <tr>
          <td>فرصه تكرار هذا الحادث</td>
          <td>
            <Badge
              style={{ padding: "15px" }}
              color={
                incidentReport.chance_of_occurence == 1 ||
                incidentReport.chance_of_occurence == 2
                  ? "danger"
                  : "warning"
              }
            >
              {incidentReport.chance_of_occurence == 1 ||
              incidentReport.chance_of_occurence == 2
                ? "حادث عرضي"
                : incidentReport.chance_of_occurence == 3
                ? "اسبوعي"
                : incidentReport.chance_of_occurence == 4
                ? "شهريا"
                : "كل سته اشهر"}
            </Badge>
          </td>
        </tr>
        <tr>
          <td>وصف الحادث</td>
          <td>{incidentReport.incident_description}</td>
        </tr>
        <tr>
          <td>الشهود</td>
          <td>{incidentReport.witnesses_names}</td>
        </tr>
        <tr>
          <td>ماذا كنت تفعل وقت الحادث؟</td>
          <td>{incidentReport.what_were_you_doing}</td>
        </tr>
        <tr>
          <td>ماذا كنت تفعل لتمنع هذا الحادث؟</td>
          <td>{incidentReport.what_could_be_done_to_prevent_this}</td>
        </tr>
        <tr>
          <td>اين وقع هذا الحادث بالتحديد؟</td>
          <td>{incidentReport.occurence_location}</td>
        </tr>

        <tr>
          <td>تاريخ انشاء التقرير</td>
          <td>{getDate(incidentReport.created_at)}</td>
        </tr>
        <tr>
          <td>تاريخ وقوع الحادثه</td>
          <td>{incidentReport.incident_date}</td>
        </tr>
        <tr>
          <td>اخر تحديث</td>
          <td>{getDate(incidentReport.updated_at)}</td>
        </tr>

        <tr>
          <td>توقيع الموظف</td>
          <td>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                border: "1px solid #D6D6D6",
                marginTop: "5px",
              }}
            >
              {incidentReport.employee_signature
                .split(",")
                .filter(Boolean)
                .map((img, ind) => {
                  let editedImg = !img.includes("http")
                    ? `https://${img}`
                    : img;
                  return (
                    <div
                      key={ind}
                      style={{ width: "40px", margin: "7px 7px 7px 0px" }}
                    >
                      <ModalImage
                        small={editedImg}
                        large={editedImg}
                        alt={`صورة توضيحية - ${ind + 1}`}
                      />
                    </div>
                  );
                })}
            </div>
          </td>
        </tr>
        <tr>
          <td>هل تم اتخاذ قرار من المهندس؟</td>
          <td>
            {incidentReport.engineer_action_taken ? (
              <i
                style={{ fontSize: "25px", color: "green" }}
                className="fa fa-check-circle"
              ></i>
            ) : (
              <i
                style={{ fontSize: "25px", color: "red" }}
                className="fa fa-times-circle"
              ></i>
            )}
          </td>
        </tr>
        <tr>
          <td>هل قام المهندس بتبليغ القسم؟</td>
          <td>
            {incidentReport.engineer_reported_to_dept ? (
              <i
                style={{ fontSize: "25px", color: "green" }}
                className="fa fa-check-circle"
              ></i>
            ) : (
              <i
                style={{ fontSize: "25px", color: "red" }}
                className="fa fa-times-circle"
              ></i>
            )}
          </td>
        </tr>

        <tr>
          <td>توقيع المهندس</td>
          <td>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                border: "1px solid #D6D6D6",
                marginTop: "5px",
              }}
            >
              {incidentReport.engineer_signature &&
                incidentReport.engineer_signature
                  .split(",")
                  .filter(Boolean)
                  .map((img, ind) => {
                    let editedImg = !img.includes("http")
                      ? `https://${img}`
                      : img;
                    return (
                      <div
                        key={ind}
                        style={{ width: "40px", margin: "7px 7px 7px 0px" }}
                      >
                        <ModalImage
                          small={editedImg}
                          large={editedImg}
                          alt={`صورة توضيحية - ${ind + 1}`}
                        />
                      </div>
                    );
                  })}
            </div>
          </td>
        </tr>
        <tr>
          <td> قرار المدير بمنع فعل هذا مره ثانيه</td>
          <td>{incidentReport.manager_action_to_prevent}</td>
        </tr>
        <tr>
          <td>سبب الاصابه من المدير</td>
          <td>{incidentReport.manager_incident_cause}</td>
        </tr>
        <tr>
          <td>هل قام المدير بالمراجعه ؟</td>
          <td>
            {incidentReport.manager_require_revision ? (
              <i
                style={{ fontSize: "25px", color: "green" }}
                className="fa fa-check-circle"
              ></i>
            ) : (
              <i
                style={{ fontSize: "25px", color: "red" }}
                className="fa fa-times-circle"
              ></i>
            )}
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default IncidentTable;
