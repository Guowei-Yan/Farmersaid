import React, { Component, Fragment } from 'react';
import { FaPlus, FaEdit, FaTimes, FaCheck } from 'react-icons/fa';
import * as api from '../../api';

class PriorityForm extends Component {

    constructor(props) {
        super(props);
        this.priority_matrix = [
            ["NA", "NA", "NA", "NA"],
            ["NA", 1, 1, 2, 3],
            ["NA", 1, 2, 3, 4],
            ["NA", 2, 3, 4, 5],
            ["NA", 3, 4, 5, 6]
        ]
        this.state= {
            severity_qs: null,
            frequency_qs: null,
            current_severity_value: this.props.default_sev || 0,
            current_frequency_value: this.props.default_freq || 0,
            priority_value: this.priority_matrix[this.props.default_sev][this.props.default_freq],
            button_flag: "add",
            select_disable: "",
            edit_mode: false
        }



        this.handleSeverityChange = this.handleSeverityChange.bind(this);
        this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
        this.updatePriorityValue = this.updatePriorityValue.bind(this);
        this.handleAddToReportClick = this.handleAddToReportClick.bind(this);
        this.handleEditPriorityClick = this.handleEditPriorityClick.bind(this);
        this.handleEditModeButtons = this.handleEditModeButtons.bind(this);
        this.handleSaveEditClick = this.handleSaveEditClick.bind(this);
        this.handleRemoveFromReportClick = this.handleRemoveFromReportClick.bind(this);
        this.getReportCount = this.getReportCount.bind(this);
        this.displayReportButton = this.displayReportButton.bind(this);
        this.restoreFormState = this.restoreFormState.bind(this);
    }

    /**
     * 
     * Function invoked automatically when the component has mounted
     * 
     */

    componentDidMount() {

        $('[data-toggle="tooltip"]').tooltip();

        this.restoreFormState();

        this.props.updatePriorityValue(this.priority_matrix[this.state.current_severity_value][this.state.current_frequency_value]);
    }

    /**
     * 
     * Function invoked automatically when the component is about to mount
     * 
     */

    componentWillMount() {
        
        // Get the severity questions
        
        api.getSeverityQs()
            .then(response => 
                this.setState({
                    severity_qs: response.results
                }));
        
        // Get the frequency questions
        api.getFrequencyQs()
        .then(response => 
            this.setState({
                frequency_qs: response.results
            }));
    }

    /**
     * 
     * Function invoked automatically when a component updates
     * 
     */

    componentDidUpdate(prevProps, prevState) {

        if (prevState.current_severity_value != this.state.current_severity_value || prevState.current_frequency_value != this.state.current_frequency_value) {
            this.updatePriorityValue();
        }

        $('[data-toggle="tooltip"]').tooltip();
    }

    /**
     * 
     * Function that handles the change event for the severity dropdown
     * 
     * @param {object} e The event object
     * 
     */

    handleSeverityChange(e) {
        
        this.setState({
            current_severity_value: e.target.value
        });

    }

    /**
     * 
     * Function that handles the change event for the frequency dropdown
     * 
     * @param {object} e The event object
     * 
     */

    handleFrequencyChange(e) {
        
        this.setState({
            current_frequency_value: e.target.value
        });
        
    }

    /**
     * 
     * Function to update the state of the priority value
     * 
     */

    updatePriorityValue() {

        this.setState({
            priority_value: this.priority_matrix[parseInt(this.state.current_severity_value)][parseInt(this.state.current_frequency_value)]
        });

        this.props.updatePriorityValue(this.priority_matrix[this.state.current_severity_value][this.state.current_frequency_value]);
    }

    /**
     * 
     * Function that handles the click event for the add button to add items to the priority report
     * 
     */

    handleAddToReportClick() {
        
        let reportItems = JSON.parse(localStorage.getItem("reportItems"));

        this.setState({
            button_flag: "remove",
            select_disable: "disabled"
        });

        reportItems.push({
            question_text: this.props.question_text,
            category_id: this.props.category_id,
            priority_value: this.state.priority_value,
            button_flag: "remove",
            current_severity_value: this.state.current_severity_value,
            current_frequency_value: this.state.current_frequency_value,
            select_disable: "disabled"
        });

        localStorage.setItem("reportItems", JSON.stringify(reportItems));

        this.props.updateReportItemCount(this.getReportCount());
    }

    handleEditPriorityClick() {
        
        this.setState({
            edit_mode: true,
            select_disable: ""
        });
    }

    /**
     * 
     * Function that handles returning appropriate button if the form is in edit mode
     * 
     */

    handleEditModeButtons() {
        
        let returnButton = null;

        if (this.state.edit_mode) {
            returnButton = <button
                            type="button"
                            className="btn btn-success btn-add-to-report mx-2 mt-4"
                            title="Save changes"
                            onClick={this.handleSaveEditClick}>
                                <FaCheck />
                            </button>
        }
        else {
            returnButton = <button
                            type="button"
                            className="btn btn-success btn-add-to-report mx-2 mt-4"
                            title="Edit priority"
                            onClick={this.handleEditPriorityClick}>
                                <FaEdit />
                            </button>
        }

        return returnButton;
    }

    /**
     * 
     * Function that handles the click event for the edit button to save the updated values
     * 
     */

    handleSaveEditClick() {

        let reportItems = JSON.parse(localStorage.getItem("reportItems"))

        reportItems.forEach(reportItem => {
            if (reportItem.question_text == this.props.question_text) {
                
                reportItem.current_severity_value = this.state.current_severity_value;
                reportItem.current_frequency_value = this.state.current_frequency_value;
                reportItem.priority_value = this.state.priority_value;

                return;
            }
        });

        localStorage.setItem("reportItems", JSON.stringify(reportItems));

        this.setState({
            edit_mode: false,
            select_disable: "disabled"
        });
    }

    /**
     * 
     * Function that handles the click event for the remove button to remove items from the priority report
     * 
     */

    handleRemoveFromReportClick() {
        let reportItems = JSON.parse(localStorage.getItem("reportItems"));

        reportItems.map((reportItem, index) => {
            if (reportItem.question_text == this.props.question_text)
                reportItems.splice(index, 1);
        });
        localStorage.setItem("reportItems", JSON.stringify(reportItems));
        this.setState({
            button_flag: "add",
            select_disable: "",
            current_severity_value: 0,
            current_frequency_value: 0
        });

        this.props.updateReportItemCount(this.getReportCount());
    }

    /**
     * 
     * Function that returns the number of items added to the report
     * 
     */    

    getReportCount() {
        return JSON.parse(localStorage.getItem("reportItems")).length
    }

    /**
     * 
     * Function that returns the HTML markup for the appropriate button based on the button flag (add/remove)
     * 
     */

    displayReportButton() {
        let returnButton = null;

        if (this.state.button_flag == "add")
            returnButton =  <button
                            type="button"
                            className="btn btn-success btn-add-to-report mt-4"
                            title="Add to priority report"
                            onClick={this.handleAddToReportClick} disabled={this.state.priority_value != "NA" ? "" : "disabled"}>
                            <FaPlus />
                            </button>
        else if (this.state.button_flag == "remove")
            returnButton =  <Fragment>
                                {this.handleEditModeButtons()}
                                <button
                                type="button"
                                className="btn btn-success btn-add-to-report mt-4"
                                title="Remove from priority report"
                                onClick={this.handleRemoveFromReportClick}>
                                    <FaTimes />
                                </button>
                            </Fragment>

        return returnButton;
    }

    /**
     * 
     * Function that restores the form values on page refresh
     * 
     */

    restoreFormState() {
        
        // Set the appropriate button flags

        const reportItems = JSON.parse(localStorage.getItem("reportItems"));
        
        if (reportItems != null) {

            reportItems.forEach(reportItem => {
                if (reportItem.question_text == this.props.question_text) {
                    
                    this.setState({
                        button_flag: reportItem.button_flag,
                        current_frequency_value: reportItem.current_frequency_value,
                        current_severity_value: reportItem.current_severity_value,
                        select_disable: reportItem.select_disable
                    });

                    return;
                }
            });

        }
    }

    /**
     * 
     * Function invoked to render the component on the page
     * 
     */

    render() {
        const {severity_qs, frequency_qs} = this.state;

        const priorityColors = {
            "NA": ".badge-priority-value",
            1: "priority-value-1",
            2: "priority-value-2", 
            3: "priority-value-3",
            4: "priority-value-4",
            5: "priority-value-5",
            6: "priority-value-6"
        }
        return(
            <form>
                <div className="row">
                    <div className="col-md-5 my-auto">
                        <div className="form-group select-form-group">
                        <label htmlFor="selectSeverity">Severity level</label>
                            <select id="selectSeverity" className="form-control" onChange={this.handleSeverityChange} disabled={this.state.select_disable}>
                                {
                                    severity_qs == null
                                    ?
                                    <option></option>
                                    :
                                    <Fragment>
                                        <option value="0" selected={this.state.current_severity_value == "0" ? `selected` : ``}>--Select Severity Level--</option>
                                        {

                                            severity_qs.map(({ severity_id, severity_text }, index) => 
                                            <option key={index} value={severity_id} selected={this.state.current_severity_value == severity_id ? `selected` : ``}>
                                                {severity_text}
                                            </option>
                                                )
                                        }
                                    </Fragment>
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-5 my-auto">
                        <div className="form-group select-form-group">
                            <label htmlFor="selectFrequency">Frequency level</label>
                            <select id="selectFrequency" className="form-control" onChange={this.handleFrequencyChange} disabled={this.state.select_disable}>
                                {
                                    frequency_qs == null
                                    ?
                                    <option></option>
                                    :
                                    <Fragment>
                                        <option value="0" selected={this.state.current_frequency_value == "0" ? `selected` : ``}>--Select Frequency Level--</option>
                                        {

                                            frequency_qs.map(({ frequency_id, frequency_text }, index) => 
                                            <option key={index} value={frequency_id} selected={ this.state.current_frequency_value == frequency_id ? `selected` : ``}>
                                                {frequency_text}
                                            </option>
                                                )
                                        }
                                    </Fragment>
                                }
                            </select>
                        </div>
                    </div>
                    {/* <div className="col-md-2 my-auto text-center">
                        <div className="h5 mt-4" >
                            Priority:   <span
                                        id = "my_span"
                                        className={`badge badge-success ${priorityColors[this.state.priority_value]}`}
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="1 being the highest; 6 being the lowest">
                                            {this.state.priority_value}
                                        </span>
                        </div>
                    </div> */}
                    <div className="col-md-2 my-auto text-center">
                        {this.displayReportButton()}
                    </div>
                </div>
            </form>
        );

    }

}

export default PriorityForm;