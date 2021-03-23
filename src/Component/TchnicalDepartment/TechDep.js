import React from 'react'
import { Subscription } from 'react-apollo'
import { TechnicalSubs } from '../../Queries/Techenical/techenical'
import Error from "../../views/Components/Custom/Error/Error";
import Loader from "../../views/Components/Custom/Loader/Loader";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";
import { Table } from 'reactstrap';
import TechnicalEmployee from './TechnicalEmployee';
import Collapse from '../../views/Components/Custom/Collapse/Collapse';
import { AddTechDep } from './AddTechDep';
import AddTechnicalEmployee from './AddTechnicalEmployee';


export default function TechDep() {
    return (
        <React.Fragment>
            <Collapse buttonLabel={<b> اضافه قسم +</b>} body={<AddTechDep />} />

            <Subscription subscription={TechnicalSubs}>
                {
                    ({ loading, error, data }) => {
                        if (loading)
                            return <Loader />
                        if (error)
                            return <Error />
                        const getDate = isoDate => {
                            let date = new Date(isoDate).toLocaleString();
                            date = date
                                .split(",")[0]
                                .split("/")
                                .map(dat => (dat < 10 && "0" + dat) || dat);
                            date = date[1] + "/" + date[0] + "/" + date[2];

                            return date;
                        };
                        if (data.technical_department.length) {
                            return (
                                <div style={{ backgroundColor: "white", textAlign: "center" }}>
                                    <Table hover bordered striped>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th> القسم بالعربيه</th>
                                                <th> القسم بالانجليزيه</th>
                                                <th>تاريخ الانشاء</th>
                                                <th>اخر تعديل</th>
                                                <th>تفاصيل الموظفين</th>
                                                <th>اضافه موظفين</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.technical_department.map(dep => {
                                                    return (
                                                        <tr key={dep.id}>
                                                            <th scope="row">{dep.id}</th>
                                                            <td>{dep.name}</td>
                                                            <td>{dep.name_en}</td>
                                                            <td>{getDate(dep.created_at)}</td>
                                                            <td>{getDate(dep.updated_at)}</td>
                                                            <td><TechnicalEmployee DepId={dep.id} /></td>
                                                            <td ><AddTechnicalEmployee id={dep.technical_department_user.map(Bid => Bid.department_user_user.id)} DepId={dep.id} /></td>

                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            )


                        }
                        else return <NoResults />


                    }
                }

            </Subscription>
        </React.Fragment>
    )
}
