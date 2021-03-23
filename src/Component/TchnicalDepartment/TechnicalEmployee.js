import React from 'react'
import { Subscription } from 'react-apollo'
import { techEmployee } from '../../Queries/Techenical/techenical'
import NoResults from '../../views/Components/Custom/NoResults/NoResults'
import Error from "../../views/Components/Custom/Error/Error";
import Loader from "../../views/Components/Custom/Loader/Loader";
import PopUp from '../../views/Components/Custom/PopUp/PopUp';
import EmployeeForm from './EmployeeForm';


export default function TechnicalEmployee(props) {
    return (
        <Subscription subscription={techEmployee} variables={{ depId: props.DepId }}>
            {
                ({ loading, error, data }) => {
                    if (loading)
                        return <Loader />
                    if (error)
                        return <Error />
                    if (data.technical_department.length) {

                        return (
                            <PopUp
                                {...{
                                    footer: false,
                                    buttonLabel: "عرض",
                                    buttonColor: "success",
                                    body: (<EmployeeForm data={data.technical_department} />),
                                }} />
                        )

                    } else return <NoResults />
                }


            }


        </Subscription>
    )
}
