import React, { Component } from "react";
import { Badge, Table } from "reactstrap";
import ImgModal from "react-modal-image";
import NonNormalRisk from "./NonNormalRisk";
import NoResults from "../../views/Components/Custom/NoResults/NoResults";

export class RiskItemesDetailes extends Component {
  render() {
    const { data } = this.props
    console.log(data);


    let tdHeadStyle = { width: "25%", textAlign: "right", fontWeight: "700" },
      tdStyle = { width: "75%", textAlign: "right", }

    return (
      <React.Fragment>
        {
          data.length ?

            data.map((det, indx) => {
              return (

                det.item_details ?

                  det.item_details.map((item, ind) => (

                    <Table borderless hover style={{
                      textAlign: "center",
                    }} className="border border-primary" key={ind} >
                      <tbody>
                        <tr>
                          <td style={tdHeadStyle}> اسم العنصر</td>
                          <td style={tdStyle}> <Badge key={indx} color="primary" style={{ padding: "5px", }}>{det.title}</Badge></td>
                        </tr>
                        <tr>
                          <td style={tdHeadStyle}>صوره التقرير</td>
                          <td style={tdStyle}>
                            <div style={{ maxWidth: "55px" }}>
                              <ImgModal small={item.image} large={item.image} alt="الصورة" />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style={tdHeadStyle}>حاله التقرير</td>
                          <td style={tdStyle}> <Badge style={{ padding: "5px" }} color={item.status ? "success" : "danger"}>
                            {item.status ? "Normal" : "un-normal"}
                          </Badge></td>
                        </tr>
                        <tr>
                          <td style={tdHeadStyle}>التعليق</td>
                          <td style={tdStyle}> <Badge style={{ padding: "5px" }} color="success">
                            {item.comment}
                          </Badge></td>
                        </tr>




                      </tbody>
                    </Table>


                  )) : "لم يتم وضع تفاصيل للعناصر بعد.........")
            }) : <NoResults />
        }
      </React.Fragment >
    )


  }
}

export default RiskItemesDetailes;
