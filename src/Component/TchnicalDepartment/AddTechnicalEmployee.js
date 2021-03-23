import React from 'react'
import { Subscription } from 'react-apollo';
import { AllUser } from '../../Queries/Techenical/techenical';
import NoResults from '../../views/Components/Custom/NoResults/NoResults';
import Error from "../../views/Components/Custom/Error/Error";
import Loader from "../../views/Components/Custom/Loader/Loader";
import MutateEmployee from './MutateEmployee';
import { Alert } from 'reactstrap';

function AddTechnicalEmployee(props) {

    return (
        <Subscription subscription={AllUser} variables={{ dep_user_ids: props.id }} >
            {
                ({ loading, error, data }) => {
                    if (loading)
                        return <Loader />
                    if (error)
                        return <Error />
                    if (data.user.length) {
                        return (
                            <MutateEmployee data={data.user} id={data.user.map(user => user.id)} DepId={props.DepId} />


                        )
                    }
                    else return <Alert color="danger" style={{
                        textAlign: "center", fontSize: "larger", fontFamily: "Times New Roman",
                        fontWeight: 600,
                    }} >لايوجد موظفين .....</Alert>


                }

            }


        </Subscription>
    )
}

export default AddTechnicalEmployee
