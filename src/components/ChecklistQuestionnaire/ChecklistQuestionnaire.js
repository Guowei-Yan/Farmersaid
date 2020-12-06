import React, { Component, Fragment } from 'react';
import * as api from '../../api';
import Spinner from '../Spinner/Spinner';


class ChecklistQuestionnaire extends Component {
    constructor(props) {
        
        super(props);
        
        this.state = {
            questions: null,
            manualQ: "manual-yes",
            operatorQ: "operator-yes",
            damQ: "dam-yes"
        }

        this.displayChecklistQuestionnaire = this.displayChecklistQuestionnaire.bind(this);
        this.handleManualSelectChange = this.handleManualSelectChange.bind(this);
        this.handleOperatorSelectChange = this.handleOperatorSelectChange.bind(this);
        this.handleDamSelectChange = this.handleDamSelectChange.bind(this);
        this.handleChecklistQuestionnaireSubmitClick = this.handleChecklistQuestionnaireSubmitClick.bind(this);

    }

    /**
     * 
     * Function invoked automatically when the component is about to mount
     * 
     */

    componentWillMount() {       
        
        api.getChecklistQuestionnaire()
            .then(response => 
                this.setState({
                    questions: response.results
                }));
    }

    /**
     * 
     * Function to return the HTML markup for the checklist questionnaire form
     * 
     */

    displayChecklistQuestionnaire() {

        let questionsArr = [];

        this.state.questions.map(({ question_text }, index) => {
            questionsArr.push(question_text);
        });

        return (
            <div className="container-fluid">
                <div className="h2 mt-2">Checklist Questionnaire</div>
                <div className="h5 mt-2">Please fill in a small questionnaire to help us serve you better!</div>
                <div className="my-5 checklist-questionnaire p-5">
                    <form>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                {questionsArr[0]}
                                <input ref="childrenCount" type="number" className="form-control" max="20" min="0" defaultValue="0" />
                            </div>
                            <div className="col-md-6 form-group">
                                {questionsArr[1]}
                                <select className="form-control" onChange={this.handleManualSelectChange}>
                                    <option value="manual-yes">Yes</option>
                                    <option value="manual-no">No</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group">
                                {questionsArr[2]}
                                <select className="form-control" onChange={this.handleOperatorSelectChange}>
                                    <option value="operator-yes">Yes</option>
                                    <option value="operator-no">No</option>
                                </select>
                            </div>
                            <div className="col-md-6 form-group" onChange={this.handleDamSelectChange}>
                                {questionsArr[3]}
                                <select className="form-control">
                                    <option value="dam-yes">Yes</option>
                                    <option value="dam-no">No</option>
                                </select>
                            </div>
                            <div className="col-md-12 mt-3 text-center">
                                <button type="button" className="btn btn-success" onClick={this.handleChecklistQuestionnaireSubmitClick}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )

    }

    /**
     * 
     * Function that handles the change event for the "Do you have operator's manual for each of your vehicle?" dropdown
     * 
     * @param {object} e The event object
     * 
     */

    handleManualSelectChange(e) {

        this.setState({
            manualQ: e.target.value
        })

    }

    /**
     * 
     * Function that handles the change event for the "Do you usually start your tractor from operator's seat?" dropdown
     * 
     * @param {object} e The event object
     * 
     */

    handleOperatorSelectChange(e) {

        this.setState({
            operatorQ: e.target.value
        })

    }

    /**
     * 
     * Function that handles the change event for the "Is there a dam near your farm?" dropdown
     * 
     * @param {object} e The event object
     * 
     */

    handleDamSelectChange(e) {

        this.setState({
            damQ: e.target.value
        })

    }

    /**
     * 
     * Function that handles the click event for the checklist questionnaire form submission
     * 
     * @param {object} e The event object
     * 
     */

    handleChecklistQuestionnaireSubmitClick(e) {
        
        e.preventDefault();

        localStorage.setItem("checklist_questionnaire_responded", true);
        
        const redirectTo = new URLSearchParams(window.location.search).get("redirectTo");

        window.location.href = redirectTo;

        let q3seq = null;
        let q3sev = 2;
        let q20seq = null;
        let q20sev = 2;

        if (this.refs.childrenCount.value==0){
            q3seq = 4;
            q20seq = 4;
        }
        else if (this.refs.childrenCount.value<=2 && this.refs.childrenCount.value>1){
            q3seq = 3;
            q20seq = 3;
        }
        else if (this.refs.childrenCount.value>2 && this.refs.childrenCount.value<=4){
            q3seq = 2;
            q20seq = 2;
        }
        else {
            q3seq = 1;
            q20seq = 1;
        }
        api.updateTable(3,2,q3seq);
        api.updateTable(20,2,q20seq);
        let q5sev = null;
        let q5seq = 3;
        if (this.state.manualQ=='manual-yes'){
            q5sev = 4;
        }
        else{
            q5sev = 2;
        };
        api.updateTable(5,q5sev,3);
        let q11sev = null;
        let q11seq = 3;
        if (this.state.operatorQ=='operator-yes'){
            q11sev = 4;
        }
        else{
            q11sev = 2;
        };
        api.updateTable(11,q11sev,3);
        let q38sev = 4;
        let q38seq = null;
        if (this.state.operatorQ=='operator-yes'){
            q38seq = 3;
        }
        else{
            q38seq = 4;
        };
        api.updateTable(38,4,q38seq);

        
        
    }

    /**
     * 
     * Function invoked to render the component on the page
     * 
     */

    render() {

        return(
            localStorage.getItem("farmers_aid_password") === null
            ?
            window.location.href = "/authorization"
            :
            this.state.questions == null
            ?
            <Spinner />
            :
            <div className="container-fluid mt-5">
                {this.displayChecklistQuestionnaire()}

            </div>
        )

    }
    
}

export default ChecklistQuestionnaire;