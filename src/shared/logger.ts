// import winston from 'winston';
// import path from 'path';
// import DailyRotateFile from 'winston-daily-rotate-file';

// const logFormat = winston.format.combine(
//   winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//   winston.format.printf(({ timestamp, level, message }) => {
//     return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
//   })
// );

// const logger = winston.createLogger({
//   level: 'info',
//   format: logFormat,
//   transports: [
//     new winston.transports.Console(),
// new DailyRotateFile({
//     level: 'info',
//     filename: path.join(process.cwd(), 'logs', 'winston', 'successes', 'success-%DATE%.log'),
//     datePattern: 'YYYY-MM-DD-HH',
//     zippedArchive: true,
//     maxSize: '20m',
//     maxFiles: '14d'
//   })
//   ],
// });

// const errorLogger = winston.createLogger({
//   level: 'error',
//   format: logFormat,
//   transports: [
//     new winston.transports.Console(),
//  new DailyRotateFile({
//     level: 'error',
//     filename: path.join(process.cwd(), 'logs', 'winston', 'errors', 'error-%DATE%.log'),
//     datePattern: 'YYYY-MM-DD-HH',
//     zippedArchive: true,
//     maxSize: '20m',
//     maxFiles: '14d'
//   })
//   ],
// });

// export { logger, errorLogger };



import winston from 'winston';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  })
);



// ✅ Info / Success Logger
const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [

    new DailyRotateFile({
      level: 'info',
      filename: path.join(process.cwd(), 'logs', 'winston', 'successes', '%DATE%-success.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

// ❌ Error Logger
const errorLogger = winston.createLogger({
  level: 'error',
  format: logFormat,
  transports: [
 
    new DailyRotateFile({
      level: 'error',
      filename: path.join(process.cwd(), 'logs', 'winston', 'errors', '%DATE%-error.log'),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { logger, errorLogger };
