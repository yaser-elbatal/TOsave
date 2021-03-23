import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { List_Cities } from '../../../services/queries/SelectNeighbour';
import Loader from "../Custom/Loader/Loader"
import Error from "../Custom/Error/Error"
import DrpDwn from "../Custom/DropDown/DropDown"


export default class SelectNeighbour extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCity: 0,
            selectedArea: 0,
            selectedNeighb: 0,
        }
    }

    onChangeCity = obj => {
        this.setState({ selectedCity: parseInt(obj.id), selectedArea: 0, selectedNeighb: 0 });
        this.props.onChange({ neighborhood: 0 });
    }
    onChangeArea = obj => {
        this.setState({ selectedArea: parseInt(obj.id), selectedNeighb: 0 });
        this.props.onChange({ neighborhood: 0 });
    }
    onChangeNeighbour = obj => {
        this.setState({ selectedNeighb: parseInt(obj.id) });
        this.props.onChange({ neighborhood: parseInt(obj.id) });
    }

    render() {
        return (
            <Query
                query={List_Cities}
                onCompleted={
                    (data) => {
                        if (data.city.length) {
                            let selectedNeighbour = this.props.neighborhoodId || false,
                                allData = data.city;

                            if (selectedNeighbour) {
                                allData.map(cit => {
                                    let selectedCity = cit.id;
                                    cit.area.map(are => {
                                        let selectedArea = are.id;
                                        are.neighbor.map(nei => {
                                            let selectedNeighb = nei.id;
                                            if (selectedNeighb == selectedNeighbour)
                                                this.setState({ selectedCity, selectedArea, selectedNeighb })
                                        })
                                    })
                                })
                            }
                        }
                    }
                }
            >
                {
                    ({ loading, error, data }) => {
                        if (loading) return (<Loader />);
                        if (error) return (<Error />);

                        if (data.city.length) {

                            let allData = data.city, dataCity, dataArea, dataNeighbour;

                            dataCity = allData.map(c => ({ id: c.id, value: c.name, area: c.area }));
                            dataArea =
                                dataCity &&
                                dataCity.find(f => (f.id == this.state.selectedCity) && f.area && f.area.length) &&
                                dataCity
                                    .find(f => f.id == this.state.selectedCity)
                                    .area
                                    .map(a => ({ id: a.id, value: a.name, neighbor: a.neighbor }));
                            dataNeighbour =
                                dataArea &&
                                dataArea.find(f => f.id == this.state.selectedArea && f.neighbor && f.neighbor.length) &&
                                dataArea.find(f => f.id == this.state.selectedArea)
                                    .neighbor
                                    .map(a => ({ id: a.id, value: a.name, }));

                            return (
                                <div style={{ marginBottom: "15px", flex: "auto", display: "flex" }} >
                                    {
                                        dataCity && dataCity.length != 0 &&
                                        <span style={{ marginLeft: "10px" }}>
                                            <DrpDwn data={[{ id: 0, value: "اختر مدينة" }, ...dataCity]} selectedId={this.state.selectedCity} color="instagram" onChange={this.onChangeCity} />
                                        </span>
                                    }
                                    {
                                        !(this.state.selectedCity && dataArea && dataArea.length != 0) ? <span></span> :
                                            <span style={{ marginLeft: "10px" }}>
                                                <DrpDwn data={[{ id: 0, value: "اختر منطقة" }, ...dataArea]} selectedId={this.state.selectedArea} color="instagram" onChange={this.onChangeArea} />
                                            </span>
                                    }
                                    {
                                        !(this.state.selectedArea && dataNeighbour && dataNeighbour.length != 0) ? <span></span> :
                                            <span style={{ marginLeft: "10px" }}>
                                                <DrpDwn data={[{ id: 0, value: "اختر حي" }, ...dataNeighbour]} selectedId={this.state.selectedNeighb} color="instagram" onChange={this.onChangeNeighbour} />
                                            </span>
                                    }
                                </div>
                            )
                        }
                        else return (<span></span>);
                    }
                }
            </Query>
        )
    }
}