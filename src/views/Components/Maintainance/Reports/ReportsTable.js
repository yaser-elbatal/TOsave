import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import { Query, Subscription } from 'react-apollo';
import { List_Reports } from '../../../../services/queries/Maintainance/MaintainanceReports/Reports';
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"
import Button from 'react-bootstrap/Button'
import Engineer from './Engineers';

export default class ListReports extends Component {

    constructor(props) {
        super(props);

        this.state = {
            qString: {},
            branchId: false,
            companyId: false,
            targetCursor: "",
            cursor: "",
            limit: 10,
        }

    }


    componentDidMount() {
        this.setState({
            branchId: this.props.branchId,
            targetCursor: this.props.targetCursor || ""
        })

        window.addEventListener('scroll', this.listenToScroll);
    }

    async componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll);
    }

    componentDidUpdate(prevProps, prevState) {

        const { branchId, } = this.props;
        if (branchId != prevProps.branchId) {

            this.setState({
                branchId,
                cursor: "", targetCursor: ""
            })
        }
        console.log("branchId" + branchId);

    }


    getDate(isoDate) {
        let date = new Date(isoDate).toLocaleString()
        date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
        date = date[1] + "/" + date[0] + "/" + date[2]

        return date;
    }

    ReportRow({ rep }) {
        let ind = rep.index + 1,
            repLink = `/branches/${rep.maintainance_branch.id}`,
            reportDetailsLink = { pathname: `/maintainanceReportDetails/${rep.id}`, query: { rep } },
            status =
                rep.status ?
                    { val: "", clr: "success" } :
                    { val: "new", clr: "primary" }

        return (
            <tr>
                <th scope="row">{ind}</th>
                <td><Badge style={{ fontSize: "15px" }} color={rep.status == 'new' ? "primary" : "success"}>{rep.status}</Badge></td>
                <td><Link to={repLink}>{rep.maintainance_branch.name}</Link></td>
                <td>{rep.description}</td>
                <td>{rep.title}</td>
                <td>{new ListReports().getDate(rep.updated_at)}</td>
                <td>{new ListReports().getDate(rep.created_at)}</td>
                <td><Engineer /></td>
                <td><Link className="btn btn-google-plus" to={reportDetailsLink}>عرض</Link></td>
            </tr>
        )
    }

    // shouldComponentUpdate(prevProps, prevState) {
    //     if (prevState.targetCursor != this.state.targetCursor) return false;
    //     return true;
    // }

    listenToScroll = async () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight

        const scrolled = parseInt((winScroll / height) * 100)
        //...................................................

        if (this.state.cursor != this.state.targetCursor && scrolled > 95)
            this.setState({ cursor: this.state.targetCursor != -1 ? this.state.targetCursor : this.state.cursor })
    }


    ftchMor = fetchMore => {
        fetchMore({
            variables: {
                limit: this.state.limit,
                filter: {
                    ...(this.state.branchId && { orderType: { "_eq": this.state.branchId } }),
                    id: { "_lt": this.state.cursor }
                }
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                this.setState({
                    targetCursor: !fetchMoreResult.maintainance_report.length ?
                        -1 : fetchMoreResult.maintainance_report[fetchMoreResult.maintainance_report.length - 1].id
                });
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    maintainance_report: [...prev.maintainance_report, ...fetchMoreResult.maintainance_report]
                });
            }
        });
    }


    render() {
        return (
            <div className="animated fadeIn">
                <Subscription
                    subscription={List_Reports}
                    variables={{
                        limit: this.state.limit,
                        filter: this.state.branchId == 0 ? {} :
                            {
                                ...(this.state.branchId && { "orderType": { "_eq": this.state.branchId } }),
                            }
                    }}
                    onCompleted={
                        data => {
                            if (!this.state.targetCursor)
                                this.setState({
                                    targetCursor: !data.maintainance_report.length ? "" :
                                        data.maintainance_report[data.maintainance_report.length - 1].id,
                                })
                        }
                    }
                >
                    {
                        ({ loading, error, data, fetchMore }) => {
                            if (loading) return (<Loader />);
                            if (error) return (<Error />);

                            if (this.state.cursor && this.state.cursor == this.state.targetCursor)
                                this.ftchMor(fetchMore)

                            if (data.maintainance_report.length) {
                                return (
                                    <div>
                                        <Card>
                                            <CardHeader><b>{
                                                this.props.branchId || this.props.companyId ?
                                                    `تقارير 
                                            ${this.props.branchId ? "الصيانه" : ""} 
                                            ${this.props.branchId && this.props.companyId ? "و" : ""} 
                                            ${this.props.companyId ? "الشركة" : ""}`
                                                    :
                                                    "آخر التقارير"
                                            }</b></CardHeader>
                                            <CardBody>
                                                <Table responsive hover style={{ textAlign: "center" }}>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">الحالة</th>
                                                            {<th scope="col">اسم الفرع</th>}
                                                            {<th scope="col">الوصف</th>}
                                                            <th scope="col">العنوان</th>
                                                            <th scope="col">تاريخ آخر تعديل</th>
                                                            <th scope="col">تاريخ الإنشاء</th>
                                                            <th scope="col">تخصيص مهندس</th>
                                                            <th scope="col">التفاصيل</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            data.maintainance_report.map((rep, index) =>
                                                                <this.ReportRow key={index} rep={{ ...rep, index, branchId: this.props.branchId, companyId: this.props.companyId }} />
                                                            )
                                                        }
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </div>
                                )
                            }
                            else return (<NoResults />);
                        }
                    }
                </Subscription>
            </div>
        )
    }
}