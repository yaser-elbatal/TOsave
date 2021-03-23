import React, { Component } from 'react'
import EmRepStat from './EmRepStat';
import EmDepStat from './EmDepStat';

export class EmergancyStatistics extends Component {
    render() {
        return (
            <div className="animated fadeIn">

                <EmRepStat />

                <EmDepStat />




            </div>
        )
    }
}

export default EmergancyStatistics
