import React, { Component, Fragment } from 'react';
import * as api from '../../api';
import VicMap from '../VicMap/VicMap';
import Spinner from '../Spinner/Spinner';

class Regions extends Component {

    constructor (props) {

        super(props);

        this.state = {
            injury_fatality_data: null
        }

        
    }

    /**
     * 
     * Function invoked automatically when the component is about to mount
     * 
     */

    componentWillMount() {
        api.getInjuryFatalityData()
            .then(response => {
                this.setState({
                    injury_fatality_data: response
                })
            });
    }

    /**
     * 
     * Function invoked to render the component on the page
     * 
     */
    
    render () {

        return (
            localStorage.getItem("farmers_aid_password") === null
            ?
            window.location.href = "/authorization"
            :
            <Fragment>
                <div className="container-fluid mt-5">
                    <div className="h3">Injuries by region</div>
                    <div className="h6 mt-3">
                        For a region on the map of Victoria, know the number of injuries per ten thousand population, major cause and the prevention tips for that injury.
                    </div>
                    {
                        this.state.injury_fatality_data === null ?
                        <Spinner />
                        :
                        <VicMap results = {this.state.injury_fatality_data} />
                    }

                </div>
            </Fragment>
        );

    }
}

export default Regions;