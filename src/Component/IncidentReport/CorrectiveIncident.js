import React from 'react'
import { Query } from 'react-apollo'
import { CorrectivAction } from '../../Queries/IncidentQuery/IncidentReportQuery'
import NoResults from '../../views/Components/Custom/NoResults/NoResults'
import Loader from '../../views/Components/Custom/Loader/Loader'
import Error from '../../views/Components/Custom/Error/Error'
import { Badge, Table } from 'reactstrap'
import Accordion from '../../views/Components/Custom/Accordion/Accordion'

function CorrectiveIncident({ incRebID }) {

    const getDate = isoDate => {

        let date = new Date(isoDate).toLocaleString();
        date = date.split(",")[0].split("/").map(dat => (dat < 10 && "0" + dat) || dat);
        date = date[1] + "/" + date[0] + "/" + date[2];
        return date;
    };

    return (
        <Query query={CorrectivAction} variables={{ incRebort: incRebID }} >
            {
                ({ loading, error, data }) => {
                    if (loading)
                        return <Loader />
                    if (error)
                        return <Error />
                    if (data.incident_corrective_actions.length) {

                        let dataAcc = data.incident_corrective_actions.map((corr, index) => {

                            let title = <div>

                                <span >
                                    الاجراء رقم: <span>{index + 1}</span>
                                    <div style={{ marginRight: "850px" }}>
                                        <div className="small text-muted">
                                            تاريخ الانشاء {getDate(corr.created_at)}
                                        </div>
                                        <div className="small text-muted">
                                            تاريخ آخر تعديل {getDate(corr.updated_at)}
                                        </div>
                                    </div>
                                </span>


                            </div>

                            let body = <Table borderless hover style={{ textAlign: "center", }} className="border border-primary" key={corr.id} >
                                <tbody>
                                    <tr>
                                        <td>#</td>
                                        <td>{corr.id}</td>
                                    </tr>
                                    <tr>
                                        <td>النوع</td>
                                        <td style={{ fontSize: "15px" }}>
                                            <Badge style={{ padding: "10px" }} color="info">{corr.action}</Badge>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>تاريخ التحقيق</td>
                                        <td>{corr.due_date}</td>
                                    </tr>
                                    <tr>
                                        <td>تاريخ الانشاء</td>
                                        <td>{getDate(corr.created_at)}</td>
                                    </tr>
                                    <tr>
                                        <td>اخر تحديث</td>
                                        <td>{getDate(corr.updated_at)}</td>
                                    </tr>

                                </tbody>
                            </Table>
                            return { title, body }

                        })
                        return (<Accordion rightTitle={true} data={dataAcc} />)

                    }
                    else return <NoResults />

                }}

        </Query>
    )
}

export default CorrectiveIncident
