import express = require('express')
const app: Application = express()
import cors from 'cors'

import { Application } from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler'
import routes from './app/routes'
import status from 'http-status'
// import { generateFacultyId, generateStudentId } from './app/modules/user/user.utils'
import cookieParser from 'cookie-parser'

app.use(cors())

app.use(cookieParser())
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes)

app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // res.send('Server is working!')
  Promise.reject(new Error('Unhandled Promise Rejection'))
})

app.use(globalErrorHandler)

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [{
      path: req.originalUrl,
      message: 'API Not Found'
    }]
  })
})




// const testId = async() => {
//   const testId = await generateFacultyId()
// console.log(testId)
// }
// testId()


export default app
