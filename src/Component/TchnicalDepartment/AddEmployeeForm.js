import React from 'react'
import { Table, Alert, Badge } from 'reactstrap';
import ModalImage from "react-modal-image";


function AddEmployeeForm({ data, updateData }) {

    const changeHandle = (id) => {
        updateData(id);

    }
    return (
        <React.Fragment>
            <Alert color="primary"
                style={{
                    textAlign: "center",
                    fontSize: "larger",
                    fontFamily: "Times New Roman",
                    fontWeight: 600
                }} >اضافه موظفين للقسم..
            </Alert>

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
                        <th scope="col">صوره الموظف</th>
                        <th scope="col">اسم الدخول</th>
                        <th scope="col">اسم الموظف</th>
                        <th scope="col">المهنه</th>


                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(user => {
                            if (user.active) {
                                return (
                                    <tr key={user.id} onClick={() => changeHandle(user.id)}>
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
                                        <td>{user.username}</td>
                                        <td>{user.display_name}</td>
                                        <td>{user.user_type}</td>

                                    </tr>
                                )
                            }
                            else return (<Alert color="danger" style={{
                                textAlign: "center", fontSize: "larger", fontFamily: "Times New Roman",
                                fontWeight: 600
                            }} >لايوجد موظفين .....</Alert>)
                        })
                    }

                </tbody>
            </Table>

        </React.Fragment>

    )
}

export default AddEmployeeForm
