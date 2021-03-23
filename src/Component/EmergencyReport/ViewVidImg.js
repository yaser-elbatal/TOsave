import React from 'react'
import { Player } from 'video-react';
import ModalImage from "react-modal-image";
import PopUp from '../../views/Components/Custom/PopUp/PopUp';
import { Badge } from 'reactstrap';
// import FancyVideo from 'react-videojs-fancybox';


function ViewVidImg({ assets }) {
    let vedios = []
    let imgs = []
    let ex = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp']

    assets && assets.split(',').filter(Boolean).map(path => {

        if (ex.includes(path.split('.').pop()))
            imgs.push(!path.includes("http") ? `https://${path}` : path)

        else
            vedios.push(!path.includes("http") ? `https://${path}` : path)
    })

    return (
        <React.Fragment>
            {
                !imgs.length ? <Badge color="danger" style={{ padding: "10px" }}>لايوجد صور</Badge> :
                    <PopUp
                        {...{
                            buttonLabel: "عرض الصور",
                            buttonColor: "success",
                            body: (
                                <div style={{ display: "flex", flexWrap: "wrap", border: "1px solid #D6D6D6", marginTop: "5px" }}>
                                    {
                                        imgs.length && imgs.map((img, ind) => {
                                            return (
                                                <div key={ind} style={{ width: "40px", margin: "7px 7px 7px 0px" }}>
                                                    <ModalImage small={img} large={img} alt={`صورة توضيحية - ${ind + 1}`} />
                                                </div>)
                                        })
                                    }
                                </div>),

                            footer: false
                        }}
                    />
            }<br />{
                !vedios.length ? <Badge color="danger" style={{ padding: "10px" }}>لايوجد فيديو</Badge> : <PopUp
                    {...{
                        buttonLabel: "عرض الفيديو",
                        buttonColor: "success",
                        body: (
                            vedios.length && vedios.map((vid, indx) => {
                                console.log(vid);

                                return (
                                    <div key={indx} style={{ width: "50%", maxHeight: "20%" }}>
                                        <Player style={{ height: "10px" }}>
                                            <source src={vid} />
                                        </Player>


                                    </div>)
                            })
                        ),

                        footer: false
                    }}
                />
            }
        </React.Fragment>






    )
}


export default ViewVidImg
