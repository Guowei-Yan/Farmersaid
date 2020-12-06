import React, { Component, Fragment } from 'react';
import ChecklistItem from '../ChecklistItem/ChecklistItem';

class ChecklistItems extends Component {

    constructor(props) {
        super(props);

        this.updateReportItemCount = this.updateReportItemCount.bind(this);
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
        this.props.updateReportItemCount(reportItemCount);
    }


    /**
     * 
     * Function invoked to render the component on the page
     * 
     */

    render() {

        return (
            <ul className="list-group list-group-flush mt-5">
                {
                    this.props.checklistItems.map((checklistItem, index) => 
                        <li key={index} className="list-group-item checklist-item">
                            <ChecklistItem
                            checklistItem={checklistItem}
                            index={index}
                            updateReportItemCount={this.updateReportItemCount} />
                        </li>
                    )
                }
            </ul>
        );

    }

}

export default ChecklistItems;