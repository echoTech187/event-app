import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Nahkoda API',
        version: '1.0.0',
        description: 'Nahkoda API Description',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local Server',
        },
        {
            url: 'http://192.168.61.199:3000',
            description: 'Production Server',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;