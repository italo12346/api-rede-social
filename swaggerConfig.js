const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Rede Social',
      version: '1.0.0',
      description: 'Documentação da API',
    },
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      },
    },
  },
  apis: ['doc/api-docs.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
