import React from 'react'
import { Table, Alert, Badge } from 'reactstrap';
import ModalImage from "react-modal-image";


export default function EmployeeForm({ data }) {

    return (
        <React.Fragment>
            <Alert color="primary"
                style={{
                    textAlign: "center",
                    fontSize: "larger",
                    fontFamily: "Times New Roman",
                    fontWeight: 600
                }} > موظفين قسم الدعم الفني
            </Alert>

            <Table responsive hover style={{ textAlign: "center", fontFamily: "'El Messiri', sans-serif",
                    border: "1px solid #EDC9Af", cursor: "pointer" }} >
                   <thead>
                      <tr>
                        <th scope="col"> #</th>
                        <th scope="col">صوره الموظف</th>
                        <th scope="col">اسم الموظف</th>
                        <th scope="col">المهنه</th>
                        <th scope="col">التفعيل</th>


                     </tr>
                   </thead>
                 <tbody>
                    {
                        data[0].technical_department_user.map(user => {
                            let emp = user.department_user_user;

                            return (
                                <tr key={user.id}>
                                    <th>{user.id}</th>
                                    <td>
                                        <div style={{
                                            maxWidth: "38px",
                                            borderRadius: "50em",
                                            margin: "auto",
                                            cursor: "pointer"
                                        }}>
                                            {
                                                emp.avatar == null ?
                                                    <ModalImage
                                                        className="img-avatar"
                                                        smallSrcSet="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                                                        large="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                                                    />
                                                    :
                                                    <ModalImage
                                                        className="img-avatar"
                                                        smallSrcSet={emp.avatar}
                                                        large={emp.avatar} />
                                            }
                                        </div>
                                    </td>
                                    <td>{emp.display_name}</td>
                                    <td>{emp.user_type}</td>
                                    <td><Badge style={{ fontSize: "15px", margin: "auto" }} color={emp.isActivated ? "success" : "danger"} >
                                        {emp.isActivates ? "مفعل" : "غير مفعل"}</Badge></td>
                                </tr>
                            )
                        })

                    }

                </tbody>
            </Table>

        </React.Fragment>

    )
}
