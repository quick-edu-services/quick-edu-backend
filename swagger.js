import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Quick-Edu API',
        description: 'API documentation for Quick-Edu application',
    },
    host: 'localhost:5000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
