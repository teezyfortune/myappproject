import express from 'express';
import bodyParser from 'body-parser';
import Routes from './server/apiUsingDbase/Routes/Routes';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/users', Routes);

app.use(express.static('../server/uploads'));
app.use(express.static('client'));

const port = process.env.PORT || process.env.NODE_ENV;

app.listen(port, () => console.log(`server running on ${port}`));
export default app;
