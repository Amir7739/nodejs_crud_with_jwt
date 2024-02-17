const express = require('express');

const employeeRoutes = require('./routes/employeeRoutes');
const userRouter = require('./routes/userroutes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const bodyParser = require('body-parser');


require('./config/database');

const app = express();
const port = 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/emp",employeeRoutes)
app.use("/users",userRouter);



// Server listening
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });