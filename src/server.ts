import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';


process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

  let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database connected successfully');
    console.log('Database connected successfully')
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
      console.log(`Example app listening on port ${config.port}`);

    });
  } catch (error) {
    errorLogger.error('Error connecting to MongoDB:', error);
  }


  process.on('unhandledRejection', error => {
        console.log('Unhandled Rejection detected. Shutting down...');

    if(server) {
      server.close(() => {
        errorLogger.error(error);    
    process.exit(1);

      })
    } else {
      process.exit(1);
    }
  })
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if(server){
    server.close()
  }
})

