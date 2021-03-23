import React from 'react'
import TrainingSTatistic from './TrainingSTatistic'
import TrainingBranchStat from './TrainingBranchStat'
import EmployeeTrainingStat from './EmployeeTrainingStat'

export default function TrainingStat() {
    return (
        <div>
            <TrainingSTatistic />
            <TrainingBranchStat />
            <EmployeeTrainingStat />


        </div>
    )
}
