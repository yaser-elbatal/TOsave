import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

export default (props) => {
    const {
        buttonLabel,
        body
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    let newBody = React.cloneElement(body, {toggle})

    return (
        <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>
                {buttonLabel}
            </Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>{newBody}</CardBody>
                </Card>
            </Collapse>
        </div>
    );
}