import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { itemsSta } from '../../../Queries/RiskAssmentsQuery/RiskStatisticsQuery';
import Loader from "../../../views/Components/Custom/Loader/Loader";
import Error from "../../../views/Components/Custom/Error/Error";
import NoResults from "../../../views/Components/Custom/NoResults/NoResults";
import CategoriesStatistic from './CategoriesStatistic';


export default class ItemsBranchStatistic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            qString: {},
            branchId: false,
            date: false,

        }

    }

    componentDidMount() {
        this.setState({
            branchId: this.props.branchId,
            date: this.props.date,
        })
    }
    componentDidUpdate(prevProps, prevState) {

        const { branchId, date } = this.props;
        if (branchId != prevProps.branchId || date != prevProps.date) {
            this.setState({
                branchId: parseInt(branchId),
                date,
            })
        }
    }


    render() {
        return (
            <Query query={itemsSta} variables={{
                // filterBranch: !this.state.branchId && !this.state.date ? {} :
                filterBranch: !this.state.branchId ? {} :
                    {
                        ...(this.state.branchId && { "branch_id": { "_eq": parseInt(this.state.branchId) } }),
                        // ...(this.props.date && { "created_at":  { "_eq":  this.props.date }  }),

                    }
            }}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Loader />;
                        if (error) return <Error />;

                        if (data.risk_assessment.length) {

                            const getDate = (isoDate) => {
                                let date = new Date(isoDate).toLocaleString()
                                date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
                                date = date[1] + "/" + date[0] + "/" + date[2]

                                return date;
                            }

                            let unique = (array, propertyName) => array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);

                            let getUniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
                            // let bids = getUniqueArray(data.risk_assessment.map(r=>({bid: r.branch_id, created_at: r.created_at, bname: r.risk_assessment_branch.name_ar, reps: []})))

                            let bids = unique(data.risk_assessment.map(r => ({ bid: r.branch_id, created_at: r.created_at, bname: r.risk_assessment_branch.name, reps: [] })), 'bid')

                            bids = (!this.state.date) ?
                                bids : bids.filter(rep => this.state.date == (`${rep.created_at.split("-")[0]}-${rep.created_at.split("-")[1]}`))


                            let bid = bids.map(b => {
                                b.reps = data.risk_assessment.filter(ra => b.bid == ra.branch_id)
                                return b
                            })

                            let ItemId = data.risk_assessment.map(r => (r.risk_assessment_details).map(b => (b.risk_assessment_item.id)))

                            let items = ItemId.reduce((a, b) => b.concat(a), [])
                            return <CategoriesStatistic items={items} RiskItems={bid} Branches={data.risk_assessment} />

                        }
                        else return <NoResults />
                    }}

            </Query>
        )
    }
}