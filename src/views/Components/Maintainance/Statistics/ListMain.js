import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { List_Reports_Statistics_1 } from '../../../../services/queries/Maintainance/MaintainanceReports/Reports';
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
      radioSelected: 'month',
      selectedBranch: { id: 0, },
      selectedCompany: { id: 0, },
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

  drawByEachBranchEachMonth(allReportsNew, labels) {

    let dataSet = ["newReport", "finishedReport", "items",].map((arrName, ind) => {

      let data = {}

      switch (ind) {
        case 0: data = { borderColor: brandPrimary, label: "تقارير جديدة" }; break;
        case 1: data = { borderColor: brandSuccess, label: "تقارير معتمدة" }; break;
        case 2: data = { borderColor: brandWarning, label: "العناصر المستبدلة" }; break;
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
            // labelString: branchName,
            fontSize: 20
          }
        }],
      }
    };

    return <Line data={data} options={options} />
  }

  onChange = obj => this.setState({ selectedBranch: obj, selectedCompany: { id: 0 } })
  onChange2 = obj => this.setState({ selectedCompany: obj, selectedBranch: { id: 0 } })

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

                  if (data.reports.length) {
                    let { radioSelected, selectedBranch, selectedCompany } = this.state
                    let getUniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))

                    let unique = (array, propertyName) => (
                      array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i)
                    );

                    let allReports = data.reports;

                    allReports = allReports.map(rep => ({
                      ...rep,
                      itemsAmount: rep.items.aggregate.sum.amount,
                      distributer:
                        ["month", "monthCustom"].includes(radioSelected) ? `${rep.date.split('-')[1]}/${rep.date.split('-')[0]}` :
                          ["year", "yearCustom"].includes(radioSelected) ? rep.date.split('-')[0] :
                            "",
                      newReport: 0, finishedReport: 0, items: 0
                    }))


                    let allReportsNew =
                      unique(allReports, "distributer")
                        .map(u => {
                          allReports
                            .filter(r => {

                              let b = !selectedBranch.id ? true : r.branch.id == selectedBranch.id ? true : false,
                                c = !selectedCompany.id ? true : r.company.id == selectedCompany.id ? true : false
                              return b && c
                            })
                            .map(ar => {
                              if (ar.distributer == u.distributer) {
                                u.items += ar.itemsAmount;

                                if (ar.status) u.finishedReport += 1
                                else u.newReport += 1

                              }
                            })

                          u.sortEvid =
                            parseInt(u.date.split('-')[0]) * 100 + parseInt(u.date.split('-')[1]) * 10

                          return u;
                        })

                    allReportsNew.sort((a, b) => (a.sortEvid > b.sortEvid) ? 1 : -1)


                    let
                      newReport = allReportsNew.map(arn => arn.newReport),
                      finishedReport = allReportsNew.map(arn => arn.finishedReport),
                      items = allReportsNew.map(arn => arn.items),
                      labels = allReportsNew.map(arn => arn.distributer),

                      branchesName = [
                        { id: 0, value: "كل الفروع" },
                        ...getUniqueArray(allReports.map(arn => arn.branch))
                          .map(elm => ({ id: elm.id, value: elm.name }))
                      ],
                      companiesName = [
                        { id: 0, value: "كل الشركات" },
                        ...getUniqueArray(allReports.map(arn => arn.company))
                          .map(elm => ({ id: elm.id, value: elm.name }))
                      ]

                    console.log(companiesName);


                    let allS = [...newReport, ...finishedReport,]

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
                          data: newReport,
                        },
                        {
                          label: 'تقارير منتهية',
                          backgroundColor: brandSuccess,
                          borderColor: brandSuccess,
                          pointHoverBackgroundColor: '#fff',
                          borderWidth: 1,
                          borderDash: [8, 5],
                          data: finishedReport,
                        },
                        {
                          label: 'العناصر المستبدلة',
                          backgroundColor: brandWarning,
                          borderColor: brandWarning,
                          pointHoverBackgroundColor: '#fff',
                          borderWidth: 1,
                          borderDash: [8, 5],
                          data: items,
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
                              <CardTitle className="mb-0">تقارير الصيانة</CardTitle>
                              <div className="small text-muted">
                                {`الإحصائية 
                                ${radioSelected == "month" ? "الشهرية" :
                                    radioSelected == "year" ? "السنوية" :
                                      radioSelected == "monthCustom" ? "الشهرية المخصصة" :
                                        radioSelected == "yearCustom" ? "السنوية المخصصة" :
                                          ""}`}
                              </div>
                            </Col>
                            <Col sm="7" className="d-none d-sm-inline-block">
                              {/* <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button> */}
                              <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                                <ButtonGroup className="mr-3" aria-label="First group">
                                  <Button color="outline-secondary" onClick={() => this.setState({ radioSelected: 'yearCustom', selectedBranch: branchesName[1], selectedCompany: companiesName[0] })} active={radioSelected === 'yearCustom'}>year custom</Button>
                                  <Button color="outline-secondary" onClick={() => this.setState({ radioSelected: 'monthCustom', selectedBranch: branchesName[1], selectedCompany: companiesName[0] })} active={radioSelected === 'monthCustom'}>month custom</Button>
                                  <Button color="outline-secondary" onClick={() => this.setState({ radioSelected: 'year', selectedBranch: { id: 0 }, selectedCompany: { id: 0 } })} active={radioSelected === 'year'}>Year</Button>
                                  <Button color="outline-secondary" onClick={() => this.setState({ radioSelected: 'month', selectedBranch: { id: 0 }, selectedCompany: { id: 0 } })} active={radioSelected === 'month'}>Month</Button>
                                </ButtonGroup>
                              </ButtonToolbar>
                              {(["monthCustom", "yearCustom"].includes(radioSelected)) &&
                                <span style={{ display: "flex" }}>
                                  <span style={{ margin: "0px 20px" }}>
                                    <DrpDwn data={companiesName} selectedId={selectedCompany.id} color="instagram" onChange={this.onChange2} />
                                  </span>
                                  <DrpDwn data={branchesName} selectedId={selectedBranch.id} color="instagram" onChange={this.onChange} />
                                </span>
                              }
                            </Col>
                          </Row>
                          <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                            {(["monthCustom", "yearCustom"].includes(radioSelected)) ?
                              this.drawByEachBranchEachMonth(allReportsNew, labels) :
                              <Bar data={mainChart} options={mainChartOpts} height={300} />
                            }
                          </div>
                        </CardBody>
                        <CardFooter>
                          {(radioSelected != "branch") &&
                            <Row className="text-center">
                              <Col sm={12} md className="mb-sm-2 mb-0">
                                <div className="text-muted">تقارير جديدة</div>
                                <strong>{`${newReport.reduce((ac, el) => ac += el, 0)}`} ({`${Math.round(newReport.reduce((ac, el) => ac += el, 0) * 100 / allS.reduce((ac, el) => ac += el, 0))}`}%)</strong>
                                <Progress className="progress-xs mt-2" color="primary" value={`${parseInt(newReport.reduce((ac, el) => ac += el, 0) * 100 / allS.reduce((ac, el) => ac += el, 0))}`} />
                              </Col>
                              <Col sm={12} md className="mb-sm-2 mb-0">
                                <div className="text-muted">تقارير معتمدة</div>
                                <strong>{`${finishedReport.reduce((ac, el) => ac += el, 0)}`} ({`${Math.round(finishedReport.reduce((ac, el) => ac += el, 0) * 100 / allS.reduce((ac, el) => ac += el, 0))}`}%)</strong>
                                <Progress className="progress-xs mt-2" color="success" value={`${parseInt(finishedReport.reduce((ac, el) => ac += el, 0) * 100 / allS.reduce((ac, el) => ac += el, 0))}`} />
                              </Col>
                              <Col sm={12} md className="mb-sm-2 mb-0">
                                <div className="text-muted">عناصر مستبدلة</div>
                                <strong>{`${items.reduce((ac, el) => ac += el, 0)}`}</strong>
                                <Progress className="progress-xs mt-2" color="warning" value={`${parseInt(items.reduce((ac, el) => ac += el, 0) * 100 / allS.reduce((ac, el) => ac += el, 0))}`} />
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