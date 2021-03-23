import React from 'react'
import IncRepCount from './IncRepCount'
import IncBrStat from './IncBrStat'
import IncBrInjured from './IncBrInjured'

export default function IncidentStatistics() {
    return (
        <div>
            <IncRepCount />
            <IncBrStat />
            <IncBrInjured />

        </div>
    )
}
