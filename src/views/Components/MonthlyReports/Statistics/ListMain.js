import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { List_Reports_Statistics_1 } from '../../../../services/queries/MonthlyReports/Reports';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import Loader from "../../Custom/Loader/Loader"
import Error from "../../Custom/Error/Error"
import NoResults from "../../Custom/NoResults/NoResults"
import DrpDwn from "../../Custom/DropDown/DropDown"
import { Bar, HorizontalBar, Line } from 'react-chartjs-2';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Progress,
  Row,
} from 'reactstrap';

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


export default class ListReports extends Component {

  constructor(props) {
    super(props);

    this.state = {
      qString: {},
      radioSelected: 'branches',
      selectedBranchName: false,
    }

  }

  componentDidMount() {
  }


  getDate(isoDate) {
    let date = new Date(isoDate).toLocaleString()
    date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
    date = date[1] + "/" + date[0] + "/" + date[2]

    return date;
  }

  drawByEachBranchEachMonth(branchName, arrayOfAll = [], unique) {
    arrayOfAll.map(a => { a.s0 = 0; a.s1 = 0; a.s2 = 0; return a })
    console.log(unique(arrayOfAll, "branchOryearOrMonth"));
    let allReportsNew =
      unique(arrayOfAll, "branchOryearOrMonth")
        .map(u => {
          arrayOfAll.map(ar => {

            if (ar.monthely_branch.name_en != this.state.selectedBranchName) return

            if (ar.branchOryearOrMonth == u.branchOryearOrMonth &&
              ar.monthely_branch.name_en == branchName) {
              u[`s${ar.status}`] += 1
              return ar
            }
          })

          if (["branch", "month", "year"].includes(branchName))
            u.sortEvid = parseInt(u.year) * 100 + parseInt(u.month) * 10

          return u;
        })

    allReportsNew.sort((a, b) => (a.sortEvid > b.sortEvid) ? 1 : -1)
    console.log(allReportsNew);

    let labels = allReportsNew.map(arn => arn.branchOryearOrMonth)

    let dataSet = ["s0", "s1", "s2",].map((arrName, ind) => {

      let data = {}

      switch (ind) {
        case 0: data = { borderColor: brandPrimary, label: "تقارير جديدة" }; break;
        case 1: data = { borderColor: brandWarning, label: "تقارير تحت المراجعة" }; break;
        case 2: data = { borderColor: brandSuccess, label: "تقارير معتمدة" }; break;
      }

      return ({
        label: data.label,
        fill: false,
        lineTension: .3,
        borderColor: data.borderColor, // The main line color
        borderDash: [], // try [5, 15] for instance
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "yellow",
        pointHoverBorderColor: "brown",
        pointRadius: 4,
        data: allReportsNew.reduce((acc, elm) => [...acc, elm[arrName]], []),
        spanGaps: false,
      })
    })

    var data = {
      labels: labels,
      datasets: dataSet
    };

    var options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips,
        intersect: true,
        mode: 'index',
        position: 'nearest',
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
          }
        }
      },
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          scaleLabel: {
            display: true,
            labelString: branchName,
            fontSize: 20
          }
        }],
      }
    };

    return <Line data={data} options={options} />

  }

  onChange = obj => this.setState({ 'selectedBranchName': obj.value })

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Query query={List_Reports_Statistics_1}>
              {
                ({ loading, error, data }) => {
                  if (loading) return (<Loader />);
                  if (error) return (<Error />);

                  if (data.monthely_report.length) {
                    let { radioSelected } = this.state
                    let getUniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))

                    let unique = (array, propertyName) => (
                      array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i)
                    );

                    let allReports = data.monthely_report;

                    allReports = allReports.map(
                      rep => ({
                        ...rep,
                        branchOryearOrMonth:
                          radioSelected == "year" ? rep.year :
                            radioSelected == "month" ? `${rep.month}/${rep.year}` :
                              radioSelected == "branches" ? rep.monthely_branch.name_en :
                                radioSelected == "branch" ? `${rep.month}/${rep.year}` :
                                  "",
                        s0: 0, s1: 0, s2: 0
                      })
                    )

                    let allReportsNew =
                      unique(allReports, "branchOryearOrMonth")
                        .map(u => {
                          allReports
                            .map(ar => {
                              if (ar.branchOryearOrMonth == u.branchOryearOrMonth) {
                                u[`s${ar.status}`] += 1
                                return ar
                              }
                            })

                          if (["branch", "month", "year"].includes(radioSelected))
                            u.sortEvid = parseInt(u.year) * 100 + parseInt(u.month) * 10

                          return u;
                        })

                    allReportsNew.sort((a, b) => (a.sortEvid > b.sortEvid) ? 1 : -1)

                    let
                      s0 = allReportsNew.map(arn => arn.s0),
                      s1 = allReportsNew.map(arn => arn.s1),
                      s2 = allReportsNew.map(arn => arn.s2),
                      labels = allReportsNew.map(arn => arn.branchOryearOrMonth),
                      branchesName =
                        getUniqueArray(allReports.map(arn => arn.monthely_branch.name_en))
                          .map((value, id) => ({ id, value }));


                    let allS = [...s0, ...s1, ...s2]

                    const mainChart = {
                      labels: labels,
                      datasets: [
                        {
                          label: 'تقارير جديدة',
                          backgroundColor: brandPrimary,
                          borderColor: brandPrimary,
                          pointHoverBackgroundColor: '#fff',
                          borderWidth: 1,
                          borderDash: [8, 5],
                          data: s0,
                        },
                        {
                          label: 'تقارير تحت المراجعة',
                          backgroundColor: brandWarning,
                          borderColor: brandWarning,
                          pointHoverBackgroundColor: '#fff',
                          borderWidth: 1,
                          borderDash: [8, 5],
                          data: s1,
                        },
                        {
                          label: 'تقارير معتمدة',
                          backgroundColor: brandSuccess,
                          borderColor: brandSuccess,
                          pointHoverBackgroundColor: '#fff',
                          borderWidth: 1,
                          borderDash: [8, 5],
                          data: s2,
                        },
                      ],
                    };

                    const mainChartOpts = {
                      tooltips: {
                        enabled: false,
                        custom: CustomTooltips,
                        intersect: true,
                        mode: 'index',
                        position: 'nearest',
                        callbacks: {
                          labelColor: function (tooltipItem, chart) {
                            return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
                          }
                        }
                      },
                      maintainAspectRatio: false,
                      legend: {
                        display: false,
                      },
                      scales: {
                        xAxes: [
                          {
                            barPercentage: 0.2,
                            gridLines: {
                              drawOnChartArea: true
                            },
                          }],
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                              maxTicksLimit: 5,
                              stepSize: Math.ceil(Math.max(...allS) / 5),
                              max: Math.max(...allS),
                            },
                          }],
                      },
                      elements: {
                        point: {
                          radius: 0,
                          hitRadius: 10,
                          hoverRadius: 4,
                          hoverBorderWidth: 3,
                        },
                      },
                    };

                    return (
                      <Card>
                        <CardBody>
                          <Row>
                            <Col sm="5">
                              <CardTitle className="mb-0">التقارير الشهرية</CardTitle>
                              <div className="small text-muted">
                                {`الإحصائية 
                                ${this.state.radioSelected == "month" ? "الشهرية" :
                                    this.state.radioSelected == "year" ? "السنوية" :
                                      this.state.radioSelected == "branches" ? "بالفروع" :
                                        this.state.radioSelected == "branch" ? "بالفرع" :
                                          ""}`}
                              </div>
                            </Col>
                            <Col sm="7" className="d-none d-sm-inline-block">
                              {/* <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button> */}
                              <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                                <ButtonGroup className="mr-3" aria-label="First group">
                                  <Button color="outline-secondary" onClick={() => this.setState({ radioSelected: 'branch', selectedBranchName: branchesName[0].value })} active={this.state.radioSelected === 'branch'}>by branch</Button>
                                  <Button color="outline-secondary" onClick={() => this.setState({ radioSelected: 'year' })} active={this.state.radioSelected === 'year'}>Year</Button>
                                  <Button color="outline-secondary" onClick={() => this.setState({ radioSelected: 'month' })} active={this.state.radioSelected === 'month'}>Month</Button>
                                  <Button color="outline-secondary" onClick={() => this.setState({ radioSelected: 'branches' })} active={this.state.radioSelected === 'branches'}>by branches</Button>
                                </ButtonGroup>
                              </ButtonToolbar>
                              {(this.state.radioSelected == "branch") &&
                                <span style={{ marginLeft: "10px" }}>
                                  <DrpDwn data={branchesName} color="instagram" onChange={this.onChange} />
                                </span>
                              }
                            </Col>
                          </Row>
                          <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                            {(this.state.radioSelected == "branch") ?
                              this.drawByEachBranchEachMonth(this.state.selectedBranchName || branchesName[0].value, allReports, unique) :
                              <Bar data={mainChart} options={mainChartOpts} height={300} />
                            }
                          </div>
                        </CardBody>
                        <CardFooter>
                          {(this.state.radioSelected != "branch") &&
                            <Row className="text-center">
                              <Col sm={12} md className="mb-sm-2 mb-0">
                                <div className="text-muted">تقارير جديدة</div>
                                <strong>{`${s0.reduce((ac, el) => ac += el, 0)}`} ({`${Math.round(s0.reduce((ac, el) => ac += el, 0) * 100 / allS.reduce((ac, el) => ac += el, 0))}`}%)</strong>
                                <Progress className="progress-xs mt-2" color="primary" value={`${parseInt(s0.reduce((ac, el) => ac += el, 0) * 100 / allS.reduce((ac, el) => ac += el, 0))}`} />
                              </Col>
                              <Col sm={12} md className="mb-sm-2 mb-0">
                                <div className="text-muted">تقارير تحت المراجعة</div>
                                <strong>{`${s1.reduce((ac, el) => ac += el, 0)}`} ({`${Math.round(s1.reduce((ac, el) => ac += el, 0) * 100 / allS.reduce((ac, el) => ac += el, 0))}`}%)</strong>
                                <Progress className="progress-xs mt-2" color="warning" value={`${parseInt(s1.reduce((ac, el) => ac += el, 0) * 100 / allS.reduce((ac, el) => ac += el, 0))}`} />
                              </Col>
                              <Col sm={12} md className="mb-sm-2 mb-0">
                                <div className="text-muted">تقارير معتمدة</div>
                                <strong>{`${s2.reduce((ac, el) => ac += el, 0)}`} ({`${Math.round(s2.reduce((ac, el) => ac += el, 0) * 100 / allS.reduce((ac, el) => ac += el, 0))}`}%)</strong>
                                <Progress className="progress-xs mt-2" color="success" value={`${parseInt(s2.reduce((ac, el) => ac += el, 0) * 100 / allS.reduce((ac, el) => ac += el, 0))}`} />
                              </Col>
                            </Row>
                          }
                        </CardFooter>
                      </Card>
                    )
                  }
                }
              }
            </Query>
          </Col>
        </Row>
      </div>
    )
  }
}




// {
//   label: "Stock A",
//     fill: false,
//       lineTension: 0.1,
//         backgroundColor: "rgba(225,0,0,0.4)",
//           borderColor: "red", // The main line color
//             borderCapStyle: 'square',
//               borderDash: [], // try [5, 15] for instance
//                 borderDashOffset: 0.0,
//                   borderJoinStyle: 'miter',
//                     pointBorderColor: "black",
//                       pointBackgroundColor: "white",
//                         pointBorderWidth: 1,
//                           pointHoverRadius: 8,
//                             pointHoverBackgroundColor: "yellow",
//                               pointHoverBorderColor: "brown",
//                                 pointHoverBorderWidth: 2,
//                                   pointRadius: 4,
//                                     pointHitRadius: 10,
//                                       notice the gap in the data and the spanGaps: true
//   data: [65, 59, 80, 81, 56, 55, 40, , 60, 55, 30, 78],
//     spanGaps: true,
//   }