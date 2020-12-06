import React, { Component, Fragment } from "react";
import md5 from 'md5';

class Authorization extends Component {

    constructor(props) {
        super(props);

        this.state = {
            application_password: md5("Groot"),
            message: "",
            message_class: ""
        }

        this.handleSubmitPasswordClick = this.handleSubmitPasswordClick.bind(this);
    }

    /**
     * 
     * Function to handle the submission of the password form on click of submit button
     * 
     * @param {object} e The event object bound to onClick
     * 
     */

    handleSubmitPasswordClick(e) {

        e.preventDefault();
        
        const application_password = md5(this.refs.txt_application_password.value);

        if (application_password === null || application_password === "" || application_password === " " || application_password !== this.state.application_password)
            this.setState({
                message: "Access denied!",
                message_class: "text-danger"
            });
        else {

            this.setState({
                message: "Access granted!",
                message_class: "text-success"
            });

            localStorage.setItem("farmers_aid_password", application_password);

            window.location.href = "/";

        }

    }

    render() {
        return(
            <Fragment>
                <div className="container-fluid">
                    <div className="d-flex justify-content-around text-center mt-5">
                        <div className="authorization-card p-5">
                            Password<span className="required-field">*</span>
                            <form onSubmit={this.handleSubmitPasswordClick} className="mt-3">
                                <div className="form-group">
                                    <input ref="txt_application_password" type="password" className="form-control" />
                                    <button type="button" className="btn btn-success btn-authorization mt-3" onClick={this.handleSubmitPasswordClick}>Submit</button>
                                    <div className={`${this.state.message_class} mt-3`}>{this.state.message}</div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }    
}

export default Authorization;