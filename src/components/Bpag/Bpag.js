import React, { Component, Fragment } from 'react';
import * as api from '../../api';
import DonutInjury from '../DonutInjury/DonutInjury';
import Spinner from '../Spinner/Spinner';

class Bpag extends Component {

    constructor (props) {

        super(props);

        this.state = {
            injury_data: null
        }

        
    }

    /**
     * 
     * Function invoked automatically when the component is about to mount
     * 
     */

    componentWillMount() {

        api.getInjuryData()
        .then(response => {
            this.setState({
                injury_data: response
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
                <div className="h3 mt-5">Injuries by age-group and body part</div>
                <div className="h6 mt-3">
                    For an age-group and body part, know the cause and percentage of people affected by that injury by clicking a section on the chart.
                </div>
                    {
                        this.state.injury_data === null ?
                        <Spinner />
                        :
                        <DonutInjury results = {this.state.injury_data} />
                    }

                </div>
            </Fragment>
        );
    }

}

export default Bpag;