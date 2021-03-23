import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardFooter, Table, Badge } from 'reactstrap';
import { List_Branches } from '../../../../services/queries/Maintainance/Companies';
import { Query } from 'react-apollo';
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"

export default ({ company_id, company_name }) => {
    return (
        <Query query={List_Branches} variables={{ company_id }}>
            {
                ({ loading, error, data }) => {
                    if (loading) return (<Loader />);
                    if (error) return (<Error />);

                    if (data.company_maintain_branches.length) {

                        return (
                            <div>
                                <Card>
                                    <CardHeader>
                                        <span style={{ fontSize: "20px" }} >
                                            <i className="fa fa-map-marker"></i>
                                        </span>
                                        <b>الفروع المرتبطة بـ  {company_name}</b>
                                    </CardHeader>
                                    <CardBody>
                                        <Table responsive hover style={{ textAlign: "center" }}>
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">اسم الفرع</th>
                                                    <th scope="col">المكان</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.company_maintain_branches.map((branch, ind) => {
                                                        return (
                                                            <tr>
                                                                <td>{ind + 1}</td>
                                                                <td>
                                                                    <Link to={`/branches/${branch.relation_branches.id}`}>
                                                                        {branch.relation_branches.name_ar}
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    {`
                                                                ${branch.relation_branches.neighborhood.name} / 
                                                                ${branch.relation_branches.neighborhood.area.name} / 
                                                                ${branch.relation_branches.neighborhood.area.city.name}
                                                                `}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </div>
                        );
                    }
                    else return (<NoResults />);
                }
            }
        </Query>
    )
}