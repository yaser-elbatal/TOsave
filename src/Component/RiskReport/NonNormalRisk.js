import React from 'react'
import { Badge } from 'reactstrap';
import ImgModal from "react-modal-image";
import EditCorrectionAction from './EditCorrectionAction';


function NonNormalRisk({ data }) {

    let tdHeadstyle = { width: "25%", textAlign: "right", fontWeight: "700" },
        tdstyle = { width: "75%", textAlign: "right", },

        getDate = isoDate => {
            let date = new Date(isoDate).toLocaleString();
            date = date
                .split(",")[0]
                .split("/")
                .map(dat => (dat < 10 && "0" + dat) || dat);
            date = date[1] + "/" + date[0] + "/" + date[2];

            return date;
        };
    console.log(data);

    return (
        <React.Fragment>
            <tr>
                <td style={tdHeadstyle}>وصف المشكله</td>
                {
                    data.risk_assessment_details_non_normal_state ?

                        <td style={tdstyle}>
                            <Badge style={{ padding: "10px" }} color="danger">
                                {data.risk_assessment_details_non_normal_state.title_ar}
                            </Badge>
                        </td>

                        :
                        <td style={tdstyle}>
                            <Badge style={{ padding: "10px" }} color="primary">  لايوجد... حاله طبيعيه </Badge>
                        </td>
                }
            </tr>
            {
                data.status ?

                    <td style={tdstyle}>
                        <Badge style={{ padding: "10px" }} color="primary">  لايوجد مشكله.... حاله طبيعيه </Badge>
                    </td>
                    :
                    <tr>
                        <td style={tdHeadstyle}>تصحيح المشكله</td>

                        <td style={tdstyle}>
                            {

                                data.detail_correction_action.length ?

                                    data.detail_correction_action.map((correct, indx) => {
                                        console.log(correct)


                                        return <div key={indx} >
                                            <span >{correct.comment}</span>

                                            <div style={{ width: "50px" }}>
                                                <ImgModal small={correct.image} large={correct.image} alt={undefined} />
                                            </div>
                                            <div className="small text-muted" >
                                                تاريخ الانشاء:    {getDate(correct.created_at)}</div>
                                            <div style={{ display: "-webkit-box" }}>
                                                <EditCorrectionAction DetailId={data.id} data={correct} />
                                            </div>


                                        </div>


                                    }

                                    )
                                    :
                                    <Badge style={{ padding: "10px" }} color="danger">  لم يتم حل المشكله بعد... </Badge>
                            }

                        </td>



                    </tr>}




        </React.Fragment >
    )
}

export default NonNormalRisk
