import React, { Component } from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6


export default class RichTextEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: this.props.text || '' } // You can also pass a Quill Delta here
    }

    handleChange = (html) => {
        this.props.result(html)
        
    }



    render() {
        return (
            <div style={{marginBottom: "10px"}}>
                <ReactQuill
                    theme="snow"
                    defaultValue={this.state.text}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}