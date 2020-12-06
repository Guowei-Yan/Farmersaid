import React, {Fragment, Component} from 'react';
import PriorityForm from '../PriorityForm/PriorityForm';


class ChecklistItem extends Component {

    constructor(props) {

        super(props);

        this.state = {
            priority_value: "NA"
        }

        this.updatePriorityValue = this.updatePriorityValue.bind(this);
        this.updateReportItemCount = this.updateReportItemCount.bind(this);

    }

    /**
     * Function to update the state of the priority value
     * 
     * @param {integer} priority_value The updated priority value
     * 
     */

    updatePriorityValue(priority_value) {
        this.setState({
            priority_value
        })
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

        const priorityColors = {
            "NA": ".badge-priority-value",
            1: "priority-value-1",
            2: "priority-value-2", 
            3: "priority-value-3",
            4: "priority-value-4",
            5: "priority-value-5",
            6: "priority-value-6"
        }

        const { priority_value } = this.state;
        const { checklistItem, index } = this.props;

        return (
            <Fragment>
                <div className="row text-center">
                    <div className="col-md-2">
                        <img src={`/chk-icons/${checklistItem.question_id}.svg`} className="img-fluid" />
                    </div>
                    <div className="col-md-6 my-auto">
                        {checklistItem.question_text}
                    </div>
                    <div className="h5 col-md-2 my-auto">
                        Priority: <span
                            id = "my_span"
                            className={`badge badge-success ${priorityColors[priority_value]}`}
                            data-toggle="tooltip"
                            data-placement="top"
                            title="1 being the highest; 6 being the lowest">
                                {priority_value}
                            </span>
                    </div>
                    <div className="col-md-2 mt-2">
                        <a className="btn btn-success help-me-prioritize" data-toggle="collapse" href={`#collapseExample-${index}`} role="button" aria-expanded="false" aria-controls={`collapseExample-${index}`}>
                            Edit Priority!
                        </a>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <div className="collapse" id={`collapseExample-${index}`}>
                            <div className="card card-body priority-card">
                                <PriorityForm 
                                {...checklistItem}
                                updateReportItemCount={this.updateReportItemCount}
                                updatePriorityValue={this.updatePriorityValue} />
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )

    }
}

export default ChecklistItem;