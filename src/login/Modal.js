import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, } from 'react-router-dom';
// import { th } from 'date-fns/locale';

class NewModal extends React.Component {
  constructor(props) {
    super(props);

    if(this.props.clearEditedData)
    this.props.clearEditedData();

    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);

  }
  

  toggle(e) {
    e.preventDefault();
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount(){
    if (this.props.triggered)
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  confirm(e){
    this.toggle(e);
    if( typeof this.props.confirm === 'function'){
      this.props.confirm(this.props.data);
      this.props.clearEditedData();
    }
  }

  cancel(e){
    this.toggle(e);
    if( typeof this.props.cancel === 'function'){
      this.props.cancel(this.props.data);
      this.props.clearEditedData();
    }
  }

  refuse(e){
    this.toggle(e);
    if( typeof this.props.refuse === 'function'){
      this.props.refuse(this.props.data);
      this.props.clearEditedData();
    }
  }


  render() {
    return (
      <React.Fragment>
        {
        (this.props.a)? 
        <Link to={'#'} onClick={this.toggle}>{this.props.buttonLabel}</Link>:
        <Button
        color={this.props.color}
        onClick={this.toggle}
        className={this.props.buttonClass || ""}
        style={this.props.buttonStyle || {}}
        >{this.props.buttonLabel}</Button>
        }
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.modalTitle}</ModalHeader>
          <ModalBody>{this.props.modalBody}</ModalBody>
          {this.props.noFooter?null:<ModalFooter>
            <Button color={this.props.color} onClick={(e)=>{this.confirm(e)}}>{this.props.submitLabel}</Button>&nbsp;&nbsp;
            {(!this.props.refuse)?null:<Button color="danger" onClick={this.toggle} onClick={(e)=>{this.refuse(e)}} >رفض</Button>}
            <Button color="secondary" onClick={this.toggle} >تراجع</Button>
          </ModalFooter>}
        </Modal>
      </React.Fragment>
    );
  }
}

export default NewModal;