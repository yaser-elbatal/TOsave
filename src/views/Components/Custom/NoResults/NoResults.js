import React from 'react';

let style = {
    div: {
        position: "relative",
        top: "10%",
        fontSize: "20px",
        fontFamily: "cursive",
        fontWeight: "700",
        display: "block",
        textAlign: "center",
    },
    img: {

    }
}

export default ({ num = 1 }) => (
    <div className="noResults" style={style.div}>
        <div style={{ fontSize: "100px" }}>
            <i className="fa fa-file-o" aria-hidden="true"></i>
            {/* <i className="fa fa-batter-empty" aria-hidden="true"></i> */}
        </div>
        <div>! There Are No Results</div>
    </div>
);
    // <div style={style.div}>
    //     <img src={require(`../../../../assets/img/error/${num}.png`)} sty={style.img} />
    // </div>