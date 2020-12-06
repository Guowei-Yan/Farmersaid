import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { routes } from '../../routes';

const App = () => (
    <Fragment>
        <Router>
            <Header />
                <Switch>
                    {
                        routes.map((route, index) => 
                            <Route key={index} {...route} />)
                    }
                </Switch>
            <Footer />
        </Router>
    </Fragment>

)

export default App;