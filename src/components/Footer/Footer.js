import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <Fragment>
        <div className="d-flex justify-content-around mt-5 footer-style">
            <div className="container-fluid my-2">
                <div className="row">
                    <div className="col-lg-6 col-sm-12 mt-2">
                        <b><u>Icons Source</u></b>
                        <ul>
                            <li>
                                <div>
                                Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a>
                                </div>
                            </li>
                            <li>
                                <div>
                                Icons made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a>
                                </div>
                            </li>
                            <li>
                                <div>
                                Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a>
                                </div>
                            </li>
                        </ul>
                        <div>
                            <Link  to="/icon-source" target="_blank">More...</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 mt-2">
                        <b><u>Checklist Source</u></b>
                        <ul>
                            <li>
                                <div>
                                    <a href="https://content.api.worksafe.vic.gov.au/sites/default/files/2018-06/ISBN-15-minute-farm-safety-check-2010-02.pdf" title="WorkSafe Australia" target="_blank">
                                        WorkSafe Victoria - 15 Minute Farm Safety Check
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
);
export default Footer;