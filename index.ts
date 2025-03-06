import fastify from 'fastify';
import compression from '@fastify/compress';
import swagger from '@fastify/swagger';
const app = fastify();

const startServer = async () => {
  app.register(compression, {
    global: true,
    encodings: ['gzip', 'deflate'],
  });

  await app.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Test Api',
        description: 'Test Api',
        version: '0.1.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          token: {
            type: 'apiKey',
            name: 'authorization',
            in: 'header',
          },
        },
      },
    },
  });

  app.get('/test', async (req, res) => {
    const string = 'a'.repeat(2000);
    res.status(200).send({ string });
  });

  await app.ready();
};

startServer()
  .then(() => {
    app.listen({ port: 3000 }, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(console.error);
