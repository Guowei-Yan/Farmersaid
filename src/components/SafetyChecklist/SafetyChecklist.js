import React, { Component, Fragment } from 'react';
import Spinner from '../Spinner/Spinner';
import ChecklistItems from '../ChecklistItems/ChecklistItems';
import { Link } from 'react-router-dom';
import * as api from '../../api';
import ChecklistQuestionnaire from '../ChecklistQuestionnaire/ChecklistQuestionnaire';

class SafetyChecklist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checklistItems: null,
            categories: null,
            reportItemCount: 0
        }

        this.updateReportItemCount = this.updateReportItemCount.bind(this);
    }

    /**
     * 
     * Function invoked automatically when the component is about to mount
     * 
     */

    componentWillMount() {
        const pathArr = window.location.pathname.split("/");

        const reportItems = JSON.parse(localStorage.getItem("reportItems"));

        if(pathArr.length > 2) {
            
            api.getChecklistItems(pathArr[2])
            .then(response => {
                this.setState({
                    checklistItems: response.results
                });
            })

            api.getCategories()
            .then(response => {
                this.setState({
                    categories: response.results
                });
            })
        }

        if (reportItems != null) {
            this.setState({
                reportItemCount: reportItems.length
            })
        }
    }

    /**
     * 
     * Function invoked automatically when the component has mounted
     * 
     */

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    /**
     * Function to update the count of the report items displayed at the right bottom of the checklist page
     * 
     * @param {integer} reportItemCount The updated report count
     * 
     */

    updateReportItemCount(reportItemCount) {
        this.setState({
            reportItemCount
        });
    }

    /**
     * 
     * Function invoked to render the component on the page
     * 
     */

    render() {

        const { checklistItems, categories } = this.state;

        return(

            localStorage.getItem("checklist_questionnaire_responded") === null
            ?
            window.location.href = `/checklist-questionnaire?redirectTo=${window.location.pathname}`
            :
            <Fragment>
                <div className="container-fluid mt-5">
                    {
                        categories === null
                        ?
                        <Spinner />
                        :
                        <Fragment>
                            <div className="h3">
                                {categories[window.location.pathname.split("/")[2] - 1].category_text}
                            </div>
                            <div className="h6 my-4">
                                Assess your safety on the farm using the checklist items below. These items have been assigned a default priority based on your response to the checklist questionnaire, the severity and frequency of occurrence of the risk which can be changed to suit your needs.
                            </div>
                        </Fragment>
                    }
                    <Link to="/" className="text-success">
                        Back to categories
                    </Link>
                    <Link to="/priority-report">
                        <span className="badge badge-success badge-generate-report float-right p-2">
                            Generate Report
                        </span>
                    </Link>
                    <div 
                    className="float-right badge-items-in-report p-4 mr-2 fixed-bottom mb-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Items in the report">
                        #{this.state.reportItemCount}
                    </div>
                    {
                        checklistItems == null
                        ?
                        <Spinner />
                        :
                        <ChecklistItems
                        checklistItems={checklistItems}
                        updateReportItemCount={this.updateReportItemCount} />
                        
                    }
                </div>
            </Fragment>
        );
    }

}

export default SafetyChecklist;