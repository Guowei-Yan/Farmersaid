import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';

class Header extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            activeLink : 'home'
        }

        this.handleHomeClick = this.handleHomeClick.bind(this);
        this.handleRegionClick = this.handleRegionClick.bind(this);
        this.handleBpagClick = this.handleBpagClick.bind(this);
    }

    /**
     * 
     * Function invoked automatically when the component has mounted
     * 
     */

    componentDidMount() {
        
        this.setState({
            activeLink: window.location.pathname.split("/")[1] || 'home'
        });
    }

    /**
     * 
     * Function that handles the click event for home link
     * 
     */

    handleHomeClick() {
        this.setState({
            activeLink: 'home'
        });
    }

    /**
     * 
     * Function that handles the click event for region link
     * 
     */

    handleRegionClick() {
        this.setState({
            activeLink: 'injury-by-regions'
        });
    }

    /**
     * 
     * Function that handles the click event for the Age group link
     * 
     */

    handleBpagClick() {
        this.setState({
            activeLink: 'injury-by-bp-ag'
        });
    }

    /**
     * 
     * Function invoked to render the component on the page
     * 
     */

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">
                    <img src="" />
                    Farm Aegis
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto mx-2">
                        <li className={this.state.activeLink == 'home' ? 'nav-item active' : 'nav-item'} onClick={this.handleHomeClick}>
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className={this.state.activeLink == 'injury-by-regions' ? 'nav-item active' : 'nav-item'} onClick={this.handleRegionClick}>
                            <Link to="/injury-by-regions" className="nav-link">Regions</Link>
                        </li>
                        <li className={this.state.activeLink == 'injury-by-bp-ag' ? 'nav-item active' : 'nav-item'} onClick={this.handleBpagClick}>
                                <Link to="/injury-by-bp-ag" className="nav-link">Age-group</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );

    }

}

export default Header;