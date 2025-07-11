
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookstore API',
      version: '1.0.0',
      description: 'API documentation for Bookstore Project',
    },
    servers: [{ url: 'http://localhost:8000/api' }],
  },
  apis: ['./routes/*.js'], 
  components: {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
},
};

module.exports = swaggerJSDoc(options);
