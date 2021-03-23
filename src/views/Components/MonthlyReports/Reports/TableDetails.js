import React, { Component, useCallback } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import { BrowserRouter, Link } from 'react-router-dom';
import ImgModal from "react-modal-image";
import Collapse from "../../Custom/Collapse/Collapse"
import TabComments from "./TabComments"
import "./print.css"


export default class TableComments extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {

    }


    getDate = (isoDate) => {
        let date = new Date(isoDate).toLocaleString()
        date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
        date = date[1] + "/" + date[0] + "/" + date[2]

        return date;
    }

    printHandler = () => {
        window.print();
    }

    render() {
        let { data } = this.props

        return (
            <div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
                    <button className="btn btn-primary" onClick={this.printHandler}>طباعة التقرير</button>
                </div>
                <div>
                    {
                        data.map((dat, ind) => {
                            return (
                                <Card key={ind} style={{ marginTop: "5px" }}>
                                    <CardHeader>
                                        <div><b>{`${ind + 1} - التصنيف [${dat.name_en}]`}</b></div>
                                    </CardHeader>
                                    <CardBody style={{ backgroundColor: '#F0FDFD' }}>
                                        {
                                            dat.items.map((itm, ind, itms) => {
                                                console.log(itm);

                                                return (
                                                    <div style={{ backgroundColor: "#f7e4c8", padding: "10px", marginBottom: "10px" }} >
                                                        <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
                                                            <div style={{ display: "inline", fontWeight: "600", display: "flex", justifyContent: "flex-start" }}>
                                                                <div style={{ marginLeft: "10px" }}>{`${ind + 1} - العنصر [${itm.name_en}]`}</div>
                                                                <div style={{ marginLeft: "10px" }}>{`عدد الصور (${itm.images_number})`}</div>
                                                                {itm.isNeglected && <div style={{ marginLeft: "10px" }}>
                                                                    <Badge style={{ fontSize: "15px" }} color="danger">تم حذف العنصر</Badge>
                                                                </div>}
                                                            </div>
                                                            <div className="small text-muted">تاريخ الإنشاء {this.getDate(itm.created_at)}</div>
                                                        </div>
                                                        {itm.details.comment && <div style={{ border: "1px solid #d6d6d6", marginTop: "10px", padding: "5px" }}>
                                                            {itm.details.comment}
                                                        </div>}
                                                        <div>
                                                            <div style={{ display: "flex", flexWrap: "wrap", border: "1px solid #d6d6d6", marginTop: "5px" }}>
                                                                {
                                                                    itm.details.images.split(',').filter(Boolean).map((img, ind) => {
                                                                        let editedImg = !img.includes("http") ? `https://${img}` : img;
                                                                        return (
                                                                            <div key={ind} className="img" style={{ width: "70px", margin: "7px 7px 7px 0px" }}>
                                                                                <ImgModal small={editedImg} large={editedImg} alt={`صورة توضيحية - ${ind + 1}`} />
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                        <div style={{ paddingTop: "15px" }}>
                                                            <Collapse
                                                                buttonLabel={<b>التعليقات</b>}
                                                                body={<TabComments detailId={itm.details.id} configId={itm.details.config_id} />}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            )
                                        }
                                    </CardBody>
                                </Card>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}


