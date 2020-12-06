import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import Spinner from '../Spinner/Spinner';
import * as api from '../../api';

class Categories extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            categories: null,
            home_page_stats: null,
        }

        if (localStorage.getItem("reportItems") === null)
            localStorage.setItem("reportItems", JSON.stringify([]));
        
        this.displayStatistics = this.displayStatistics.bind(this);
    }

    /**
     * 
     * Function invoked automatically when a component updates
     * 
     */

    componentDidUpdate() {
        $('[data-toggle="tooltip"]').tooltip();
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
                categories: response.results
            });
        });

        api.getHomePageStats()
        .then(response => 
            this.setState({
                home_page_stats: response.results
            }))
    }

    /**
     * 
     * Function returning the HTML markup code to display statistics under each category
     * 
     * @param {string} category_id The category id
     * @param {string} homePageStatsObj The object holding the statistical data
     * @param {integer} index The parameter holding the index of the map method
     * 
     */

    displayStatistics(category_id, homePageStatsObj, index) {

        let value = 100;
        let cause = null;
        let ttip = "Top regions affected: ";

        switch (category_id) {
            case 1:
                value *= homePageStatsObj.percentage_tractor;
                cause = "tractor accidents";
                ttip += "Corangamite, South Gippsland, Baw Baw, Yarra Ranges";
                break;
            
            case 2:
                value *= homePageStatsObj.percentage_fall;
                cause = "falling from heights";
                ttip += "Corangamite, Glenelg, Colac-Otway, Ballarat";
                break;
            
            case 3:
                value *= homePageStatsObj.percentage_chemical
                cause = "chemicals";
                ttip += "Benalla";
                break;

            case 4:
                value *= homePageStatsObj.percentage_else
                cause = "other reasons";
                ttip += "East Gippsland, Campaspe, Colac-Otway, Moira";
                break;
        
            default:
                break;
        }

        
        return <div className="py-2"
        data-toggle="tooltip"
        data-placement="bottom"
        title={`${ttip}`}>
            <FaInfoCircle /> {` ${value}% of the fatalities`}
        </div>;

    }

    /**
     * 
     * Function invoked to render the component on the page
     * 
     */

    render() {
        const categories = this.state.categories;
        const homePageStatsArr = this.state.home_page_stats;

        return(
            localStorage.getItem("farmers_aid_password") === null
            ?
            window.location.href = "/authorization"
            :
            <Fragment>
                <div className="container-fluid mt-5">
                {
                    categories == null || homePageStatsArr == null
                    ?
                    <Spinner />
                    :
                    <Fragment>
                        <div className="h3">Safety Assessment</div>
                        <div className="h6 mt-4">Get a checklist from the below categories to assess the safety on your farm</div>
                        <div className="row p-5">    
                            {
                                categories.map(({category_id, category_text}, index) => (
                                    <div key={index} className="col-lg-3 col-sm-12 category-links text-center mt-2">
                                        <Link to={`/safety-measures/${category_id}`}>
                                            <div className="category-box p-5">
                                                <img src={`/cat-icons/${category_id}.svg`} className="img-fluid" />
                                                <p className="mt-1">{category_text}</p>
                                            </div>
                                        </Link>
                                        {
                                            this.displayStatistics(category_id, homePageStatsArr[0],index)
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </Fragment>
                }
                </div>
            </Fragment>
        );
    }
}

export default Categories;