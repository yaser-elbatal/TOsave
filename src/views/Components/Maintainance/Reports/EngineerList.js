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
                }} > مهندسي الصيانه
            </Alert>

            <Table responsive hover style={{
                textAlign: "center", fontFamily: "'El Messiri', sans-serif",
                border: "1px solid #EDC9Af", cursor: "pointer"
            }} >
                <thead>
                    <tr>
                        <th scope="col"> #</th>
                        <th scope="col">صوره المهندس</th>
                        <th scope="col">اسم المهندس</th>
                        <th scope="col"> حالته</th>



                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((user, index) => {

                            return (
                                <tr key={user.id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div style={{
                                            maxWidth: "38px",
                                            borderRadius: "50em",
                                            margin: "auto",
                                            cursor: "pointer"
                                        }}>
                                            {
                                                user.avatar == null ?
                                                    <ModalImage
                                                        className="img-avatar"
                                                        smallSrcSet="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                                                        large="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                                                    />
                                                    :
                                                    <ModalImage
                                                        className="img-avatar"
                                                        smallSrcSet={user.avatar}
                                                        large={user.avatar} />
                                            }
                                        </div>
                                    </td>
                                    <td>{user.display_name}</td>
                                    <td><Badge style={{ fontSize: "15px", margin: "auto" }} color={user.isActivated ? "success" : "danger"} >
                                        {user.isActivated ? "مفعل" : "غير مفعل"}</Badge></td>
                                </tr>
                            )
                        })

                    }

                </tbody>
            </Table>

        </React.Fragment>

    )
}
