import React from 'react';
import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText,
} from 'reactstrap';


export default ({
    header = false,
    footer = false,
    body = false,
    style = {},
    headerStyle = {},
    footerStyle = {},
    bodyStyle = {},
}) => {
    return (
        <Card style={style}>
                {header && <CardHeader style={headerStyle}>{header}</CardHeader>}
                <CardBody style={bodyStyle}>{body}</CardBody>
                {footer && <CardFooter style={footerStyle}>{footer}</CardFooter>}
            </Card>
        );
};