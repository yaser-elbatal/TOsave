import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

export default ({
        clickableElm,
        bodyElm,
        containerClickableElmStyle={},
        containerBodyElmStyle={},
        dir = "top",
    }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <div>
            <span style={{ textDecoration: "underline", color: "blue", ...containerClickableElmStyle }} href="#" id="Tooltip">{clickableElm}</span>
            <Tooltip style={containerBodyElmStyle} placement={dir} isOpen={tooltipOpen} target="Tooltip" toggle={toggle}>{bodyElm}</Tooltip>
        </div>
    );
}