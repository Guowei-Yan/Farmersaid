import React, { Fragment } from 'react';
import { GiFarmer } from 'react-icons/gi';
import Categories from '../Categories/Categories';

const Home = () => (
    localStorage.getItem("farmers_aid_password") === null
    ?
    window.location.href = "/authorization"
    :
    <Fragment>
        <div className="container-fluid home-container">
            <div className="jumbotron text-center">
                <h1 className="display-4"><GiFarmer /> Towards hazard-free farming</h1>
            </div>
        </div>
        <Categories />
    </Fragment>
);

export default Home;