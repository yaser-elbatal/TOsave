import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { wrongStat } from '../../../Queries/RiskAssmentsQuery/RiskStatisticsQuery';
import Loader from '../../../views/Components/Custom/Loader/Loader';
import Error from '../../../views/Components/Custom/Error/Error';
import NoResults from '../../../views/Components/Custom/NoResults/NoResults';

export default class WrongStatistic extends Component {
    render() {
        return (
            <Query query={wrongStat}>
                 {
               ({ loading, error, data }) => {
                if (loading) return <Loader />;
                if (error) {console.log(error);
                 return <Error />;}
                if(data.risk_assessment.length){
                   return <div>Hell</div>

                }else return <NoResults />
          }
          }    
            </Query>
        )
    }
}
