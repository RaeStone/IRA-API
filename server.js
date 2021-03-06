const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const routers = require('./routes/iraRouter.js');
const investmentRouter = require('./routes/investmentRouter.js');
const transactionRouter = require('./routes/transactionRouter.js');
const performanceRouter = require('./routes/performanceRouter.js');

app.use(cors());
app.use('/iras', routers);
app.use('/investments', investmentRouter);
app.use('/transactions', transactionRouter);
app.use('/performances', performanceRouter);

app.get('/', (req, res) => {
    res.send('IRA API by Rae Painter');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});