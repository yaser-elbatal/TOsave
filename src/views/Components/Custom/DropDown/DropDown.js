/*
defaultValue
selectedId
data => [{value,id},..]

*/

import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default class DropD extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      dropdownOpen: false,
      dropDownValue: {}
    };
  }


  componentDidMount() {

    if (this.props.data) {
      let
        selectedId = this.props.selectedId,
        selectedIndex = this.props.selectedIndex,
        dropDownValue = {};

      if ((selectedId || selectedId == 0) && this.props.data.map(d => d.id).includes(selectedId)) {
        dropDownValue = this.props.data.find(item => item.id == this.props.selectedId)
      } else if ((selectedIndex || selectedIndex == 0) && this.props.data.length - 1 > this.props.selectedIndex) {
        dropDownValue = this.props.data.find((item, ind) => ind == this.props.selectedIndex)
      } else { dropDownValue = this.props.data[0] }

      this.setState({ dropDownValue });
    }

  }

  componentDidUpdate(previousProps, previousState) {

    if (
      (!Number.isNaN(this.props.selectedId) && !Number.isNaN(this.props.selectedIndex)) &&
      (this.props.selectedId != previousProps.selectedId ||
        this.props.selectedIndex != previousProps.selectedIndex ||
        !(this.props.data.every(e => previousProps.data.includes(e))))
    ) {
      let
        selectedId = (this.props.selectedId || this.props.selectedId == 0) ? this.props.selectedId : previousProps.selectedId,
        selectedIndex = (this.props.selectedIndex || this.props.selectedIndex == 0) ? this.props.selectedIndex : previousProps.selectedIndex,
        data = this.props.data || previousProps.data,
        dropDownValue = {};

      if (data) {
        if ((selectedId || selectedId == 0) && data.map(d => parseInt(d.id)).includes(parseInt(selectedId))) {
          dropDownValue = data.find(item => item.id == selectedId)
        } else if ((selectedIndex || selectedIndex == 0) && data.length - 1 > selectedIndex) {
          dropDownValue = data[selectedIndex]
        } else {
          dropDownValue = Object.keys(this.state.dropDownValue) ? this.state.dropDownValue : data[0]
        }

        this.setState({ dropDownValue })
      }
    }
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  changeValue = e => {
    this.setState({
      dropDownValue: {
        id: e.currentTarget.id,
        value: e.currentTarget.textContent
      }
    });

    this.props.onChange({
      id: e.currentTarget.id,
      value: e.currentTarget.textContent
    });
  }



  render() {

    let items = this.props.data.map((elm, ind) => {
      let { id, value } = elm;
      return (
        <DropdownItem key={ind} id={id} onClick={this.changeValue} >
          {value}
        </DropdownItem>
      );
    });

    return (
      <div className="overload" >
        <Dropdown className="d-inline-block" onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle color={this.props.color || "secondary"} caret>
            {Object.keys(this.state.dropDownValue || {}).length ? this.state.dropDownValue.value : this.props.defaultValue}
          </DropdownToggle>
          <DropdownMenu>
            {items}
          </DropdownMenu>
        </Dropdown>

        {/* for making a global style */}
        <style dangerouslySetInnerHTML={{
          __html: `
        .dropdown-menu.show { z-index: 99999999999 }
        ${this.props.color && ".dropdown-toggle {}"}
        `}} />

      </div>
    );
  }
}