import React from 'react'
import { Subscription } from 'react-apollo'
import { getEngineers } from '../../../../services/queries/Maintainance/MaintainanceReports/Reports'
import NoResults from '../../Custom/NoResults/NoResults'
import Error from "../../Custom/Error/Error";
import Loader from "../../Custom/Loader/Loader";
import PopUp from '../../Custom/PopUp/PopUp';
import EngineerList from './EngineerList';


export default function Engineer(props) {
    return (
        <Subscription subscription={getEngineers} >
            {
                ({ loading, error, data }) => {
                    if (loading)
                        return <Loader />
                    if (error)
                        return <Error />
                    if (data.user.length) {

                        return (
                            <PopUp
                                {...{
                                    footer: false,
                                    buttonLabel: "عرض",
                                    buttonColor: "success",
                                    body: (<EngineerList data={data.user} />),
                                }} />
                        )

                    } else return <NoResults />
                }


            }


        </Subscription>
    )
}
