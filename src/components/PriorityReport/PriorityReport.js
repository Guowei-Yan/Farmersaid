import React, { Component, Fragment } from 'react';
import { FaDownload } from 'react-icons/fa';

import Spinner from '../Spinner/Spinner';
import * as api from '../../api';

let returnObj = null;

class PriorityReport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryArr: null
        }

        this.handleDownloadReport = this.handleDownloadReport.bind(this);
        this.handleBackLinkClick = this.handleBackLinkClick.bind(this);
        this.displayReport = this.displayReport.bind(this);

    }

    /**
     * 
     * Function invoked automatically when the component is about to mount
     * 
     */

    componentWillMount() {

        api.getCategories()
        .then(response => {
            this.setState({
                categoryArr: response.results
            });
        });

    }

    /**
     * 
     * Function invoked to format the contents the report in a table in a pdf file
     * 
     */

    handleDownloadReport() {

    const priority_report_pdf = new jsPDF();

    priority_report_pdf.fromHTML("<h2 style='font-family: helvetica;'><u>Farmer's Aid</u></h2>", 15, 10);
    priority_report_pdf.fromHTML("<h5 style='font-family: helvetica'>Your priority report</h5>", 15, 20);
    priority_report_pdf.autoTable({
        html: '#tbl-priority-report',
        headStyles: {
            fillColor: "#67c250",
            cellWidth: "wrap",
            fontSize: 11
        },
        bodyStyles: {
            fontSize: 11
        },
        startY: 45
    })
    priority_report_pdf.save("Report.pdf");

    }

    /**
     * 
     * Function invoked to redirect the report page to the previous page
     * 
     */

    handleBackLinkClick() {
        window.history.back();
    }

    /**
     * 
     * Function invoked to display the report items
     * 
     */
    
    displayReport(reportItems){
    
        const priorityColors = {
            1: "priority-value-1",
            2: "priority-value-2", 
            3: "priority-value-3",
            4: "priority-value-4",
            5: "priority-value-5",
            6: "priority-value-6"
        }
    
        if (reportItems.length > 0) {
            
            returnObj =
            this.state.categoryArr == null
            ?
            <Spinner />
            :
            <Fragment>
                 <div className="float-left mb-3 mt-3">
                    <a href="#" className="text-success" onClick={this.handleBackLinkClick}>
                        Back to recent checklist
                    </a>
                </div>
                <div className="float-right download-report mb-3 mt-3" title="Download report" onClick={this.handleDownloadReport}>
                    <FaDownload /> Download Report
                </div>
                <table className="table" id="tbl-priority-report">
                    <thead>
                        <tr>
                            <th scope="col">Checklist Item</th>
                            <th scope="col">Category</th>
                            <th scope="col">Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reportItems.map(({question_text, category_id, priority_value}, index) => 
                                
                                    <tr key={index} className={priorityColors[priority_value]}>
                                        <td>{question_text}</td>
                                        <td>{this.state.categoryArr[category_id-1].category_text}</td>
                                        <td>{priority_value}</td>
                                    </tr>
                            )
                        }  
                    </tbody>
                </table>  
            </Fragment>
        }
        else {
            returnObj = <div className="h4">
                            You have not added any item from the checklist to the report!
                        </div>
        }
    
        return returnObj;
    }

    /**
     * 
     * Function invoked to render the component on the page
     * 
     */

    render() {
        
        let reportItems = JSON.parse(localStorage.getItem("reportItems"));
        reportItems = reportItems.sort((a, b) => (a.priority_value > b.priority_value) ? 1 : -1);

        return (
            localStorage.getItem("farmers_aid_password") === null
            ?
            window.location.href = "/authorization"
            :
            <div className="container-fluid">
                <div className="h2 mt-5">Your Priority Report</div>
                {this.displayReport(reportItems)}
            </div>
        );
    }
    
};

export default PriorityReport;