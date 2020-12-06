import express from 'express';
import config from './config';

import routeApi from './api';

const app = express();

app.use(express.static(__dirname, { dotfiles: 'allow'}));

app.use("/styles", express.static(`${__dirname}/public/css`));
app.use("/scripts", express.static(`${__dirname}/public/js`));
app.use("/img", express.static(`${__dirname}/public/images`));
app.use("/cat-icons", express.static(`${__dirname}/public/images/category-icons`));
app.use("/chk-icons", express.static(`${__dirname}/public/images/checklist-icons`));
app.use("/map", express.static(`${__dirname}/public/data`));

app.use("/res-styles", express.static(`${__dirname}/node_modules/bootstrap/dist/css`));
app.use("/res-scripts", express.static(`${__dirname}/node_modules/bootstrap/dist/js`));
app.use("/jquery", express.static(`${__dirname}/node_modules/jquery/dist`));
app.use("/popperjs", express.static(`${__dirname}/node_modules/popper.js/dist/umd`));
app.use("/html2canvas", express.static(`${__dirname}/node_modules/html2canvas/dist`));
app.use("/jspdf", express.static(`${__dirname}/node_modules/jspdf/dist`));
app.use("/jspdf-autotable", express.static(`${__dirname}/node_modules/jspdf-autotable/dist`));

app.use("/api", routeApi);


/**
 * Function to point all the routes to index.html
 * 
 * @param {array} route Port number on which the server listens to request
 * 
 * 
 */

app.get(config.routes, (request, response) => {
    response.sendFile(`${__dirname}/public/index.html`);
});

/**
 * Function to listen to requests on a port on the server
 * 
 * @param {integer} port Port number on which the server listens to request
 * 
 * 
 */

app.listen(config.port, () => console.log(`Server running on port ${config.port}`))
