const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const directoryPath = path.join(__dirname, '../routes');
const paths = [];

const filesName = fs.readdirSync(directoryPath, (err, files) => {
    if (err) {
        return console.log(`Unable to scan directory: ${err}`);
    }
    return files.forEach(file => paths.push(file));
});

const getFullPaths = (names) => {
    names.forEach((name) => {
        let customerPath;
        if (name !== 'index') {
            customerPath = `./routes/${name}`;
        }
        if (!(_.isUndefined(name))) {
            paths.push(customerPath);
        }
    });
}

getFullPaths(filesName);

const options = {
    swaggerDefinition: {
        components: {
            schemas: [],
            securitySchemes: [
                {
                    BasicAuth: {
                        type: 'http',
                        scheme: 'basic'
                    }
                }
            ],
        },
        schemas: {},
        openapi: '3.0.0',
        info: {
            title: 'CashD SDK',
            version: '1.0.0',
            description: 'CashD SDK Documentation for integrating with external online retailer system',
            contact: {
                email: 'eddie.le@cashd.com.au',
            },
        },
        tags: [
            // {
            //     name: 'Payment to merchant',
            //     description: 'Use CashD Wallet to pay merchant',
            // },
            // {
            //     name: 'Integrate',
            //     description: 'List of APIs support integration of CashD Wallet',
            // },
        ],
        schemes: ['http'],
        host: `localhost:${process.env.PORT}`,
        basePath: '/api/v1',

    },

    apis: paths,
};
const swaggerSpec = swaggerJSDoc(options);
router.get('/json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = {router};
