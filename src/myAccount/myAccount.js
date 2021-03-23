import React, { Component } from 'react'
import my_Acoount from './myAccountQuery' ;
import { Query } from 'react-apollo';
import Loader from '../views/Components/Custom/Loader/Loader'
import Error from '../views/Components/Custom/Error/Error'
import { Card, CardImg, Row,Col, CardBody, CardTitle, CardSubtitle, Button} from 'reactstrap';
import EditMyAccout from './EditMyAccout';

export class myAccount extends Component {


    render() {

let user_id = JSON.parse(localStorage.getItem("AnnatLogin")).id

        return (
            <Query query={my_Acoount} variables={{user_id:user_id}}>

                {
                    
                    ({loading,error,data})=>{
                        if (loading) return (<div style={{position: "fixed", top: "50%", left: "45%"}} ><Loader /></div>);
                        if(error) return (<div><Error /></div>)
                        
                        const getDate = (isoDate) => {
                            let date = new Date(isoDate).toLocaleString()
                            date = date.split(',')[0].split('/').map(dat => (((dat < 10) && ("0" + dat)) || dat))
                            date = date[1] + "/" + date[0] + "/" + date[2]
              
                            return date;
                          }

                        const Admin = data.user


                        if(Admin.length)
                        
                        
                            return(
                                Admin.map(admin=>{
                                    return (
                                        <div key={admin.id} >

                                     <div className="card" style={{width: "25rem"}}>
                                    <img src={admin.avatar} className="card-img-top" alt={admin.name} />
                                    {/* <div className="card-body">
                                                </div> */}
                                                  <ul className="list-group list-group-flush" style={{padding:"0"}} >
                                                  <li className="list-group-item" ><h5 style={{float:"right"}}>الاسم :</h5><span style={{float:"left",fontSize:"16px"}}>{admin.name}</span></li>

                                                      {/* <li className="list-group-item" ><h5 style={{float:"right"}}>البريد الاكتروني :</h5><span style={{float:"left",fontSize:"16px"}}>{admin.email}</span></li> */}

                                                      <li className="list-group-item" ><h5 style={{float:"right"}}>اسم المستخدم :</h5><span style={{float:"left",fontSize:"16px"}}>{admin.phone}</span></li>
                                                    <li className="list-group-item"><h5 style={{float:"right"}}>  تاريخ الانشاء:</h5><span style={{float:"left",fontSize:"16px"}}>{getDate(admin.created_at)}</span></li>
                                                    <li className="list-group-item"><h5 style={{float:"right"}}>اخر تحديث :</h5><span style={{float:"left",fontSize:"16px"}}>{getDate(admin.updated_at)}</span></li>
                                                  </ul>
                                                <div className="card-body" style={{marginRight:"30px",textAlign:"center"}} >
                                                <EditMyAccout Admin={Admin}  />
                                                </div>
                                            </div>
                                            </div>
                                        
                                    )}))

                            else return (<div>there are no Admin you are Hacker</div>)

                        }
                        
                       



                    
                }

                
            </Query>
        )
    }
}

export default myAccount
