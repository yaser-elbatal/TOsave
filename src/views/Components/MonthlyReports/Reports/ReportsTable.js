import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from "reactstrap";
import { Query } from "react-apollo";
import { List_Reports } from "../../../../services/queries/MonthlyReports/Reports";
import Loader from "../../Custom/Loader/Loader";
import Error from "../../Custom/Error/Error";
import NoResults from "../../Custom/NoResults/NoResults";

export default class ListReports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qString: {},
      branchId: false,
      status: false,
      date: false,
      targetCursor: "",
      cursor: "",
      limit: 10,
    };
  }

  componentDidMount() {
    this.setState({
      branchId: this.props.branchId,
      targetCursor: this.props.targetCursor || "",
      status: this.props.status,
      targetCursor: this.props.targetCursor || "",
      date: this.props.date,
      targetCursor: this.props.targetCursor || "",
    });
    window.addEventListener("scroll", this.listenToScroll);
  }

  async componentWillUnmount() {
    window.removeEventListener("scroll", this.listenToScroll);
  }

  componentDidUpdate() {
    const { branchId, status, date } = this.props;
    // console.log(date);

    if (
      branchId != this.state.branchId ||
      status != this.state.status ||
      date != this.state.date
    )
      this.setState({ branchId, status, date });
  }

  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString();
    date = date
      .split(",")[0]
      .split("/")
      .map((dat) => (dat < 10 && "0" + dat) || dat);
    date = date[1] + "/" + date[0] + "/" + date[2];

    return date;
  }

  ReportRow({ rep }) {
    let ind = rep.index + 1,
      repLink = `/branches/${rep.monthely_branch.id}`,
      reportDetailsLink = `/monthlyReportDetails/${rep.id}`,
      // createdByLink = `/users/${rep.monthly_report_created_by.id}`,
      status =
        rep.status == 0
          ? { val: "جديد", clr: "primary" }
          : rep.status == 1
            ? { val: "تحت المراجعة", clr: "warning" }
            : { val: "معتمد", clr: "success" };

    return (
      <tr>
        <th scope="row">{ind}</th>
        <td>
          <Badge style={{ fontSize: "15px" }} color={status.clr}>
            {status.val}
          </Badge>
        </td>
        {!rep.branchId && (
          <td>
            <Link to={repLink}>{rep.monthely_branch.name}</Link>
          </td>
        )}
        <td>{`${rep.month} / ${rep.year}`}</td>
        {/* <td>
          <Link to={createdByLink}>
            {rep.monthly_report_created_by.username}
          </Link>
        </td> */}
        <td>{new ListReports().getDate(rep.updated_at)}</td>
        <td>{new ListReports().getDate(rep.created_at)}</td>
        <td>
          <Link className="btn btn-google-plus" to={reportDetailsLink}>
            عرض
          </Link>
        </td>
      </tr>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.targetCursor != this.state.targetCursor) return false;
    return true;
  }

  listenToScroll = async () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = parseInt((winScroll / height) * 100);
    //...................................................
    if (this.state.cursor != this.state.targetCursor && scrolled > 95)
      this.setState({
        cursor:
          this.state.targetCursor != -1
            ? this.state.targetCursor
            : this.state.cursor,
      });
  };

  ftchMor = (fetchMore) => {
    fetchMore({
      variables: {
        limit: this.state.limit,
        filterBranch: {
          ...(this.state.branchId && {
            branch_id: { _eq: parseInt(this.state.branchId) },
          }),
          ...(this.state.status && {
            status: { _eq: parseInt(this.state.status) - 1 },
          }),
          ...(this.state.date && {
            month: { _eq: this.state.date.split("/")[0] },
            year: { _eq: this.state.date.split("/")[1] },
          }),
          id: { _lt: this.state.cursor },
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        this.setState({
          targetCursor: !fetchMoreResult.monthely_report.length
            ? -1
            : fetchMoreResult.monthely_report[
              fetchMoreResult.monthely_report.length - 1
            ].id,
        });
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          monthely_report: [
            ...prev.monthely_report,
            ...fetchMoreResult.monthely_report,
          ],
        });
      },
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Query
          query={List_Reports}
          onCompleted={(data) => {
            if (!this.state.targetCursor)
              this.setState({
                targetCursor: !data.monthely_report.length
                  ? ""
                  : data.monthely_report[data.monthely_report.length - 1].id,
              });
          }}
          variables={{
            limit: this.state.limit,
            filterBranch:
              !this.state.branchId && !this.state.status && !this.state.date
                ? {}
                : {
                  ...(this.state.branchId && {
                    branch_id: { _eq: parseInt(this.state.branchId) },
                  }),
                  ...(this.state.status && {
                    status: { _eq: parseInt(this.state.status) - 1 },
                  }),
                  ...(this.state.date && {
                    month: { _eq: this.state.date.split("/")[0] },
                    year: { _eq: this.state.date.split("/")[1] },
                  }),
                },
          }}
        >
          {({ loading, error, data, fetchMore }) => {
            if (loading) return <Loader />;
            if (error) return <Error />;

            if (
              this.state.cursor &&
              this.state.cursor == this.state.targetCursor
            )
              this.ftchMor(fetchMore);

            if (data.monthely_report.length) {
              return (
                <div>
                  <Card>
                    <CardHeader>
                      <b>
                        {this.props.branchId ? "تقارير الفرع" : "آخر التقارير"}
                      </b>
                    </CardHeader>
                    <CardBody>
                      <Table responsive hover style={{ textAlign: "center" }}>
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">الحالة</th>
                            {!this.props.branchId && (
                              <th scope="col">اسم الفرع</th>
                            )}
                            <th scope="col">شهر / عام</th>
                            {/* <th scope="col">بواسطة</th> */}
                            <th scope="col">تاريخ آخر تعديل</th>
                            <th scope="col">تاريخ الإنشاء</th>
                            <th scope="col">التفاصيل</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.monthely_report.map((rep, index) => (
                            <this.ReportRow
                              key={index}
                              rep={{
                                ...rep,
                                index,
                                branchId: this.props.branchId,
                              }}
                            />
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </div>
              );
            } else return <NoResults />;
          }}
        </Query>
      </div>
    );
  }
}
