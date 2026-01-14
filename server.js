import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.post('/', (req, res) => {
    const {header, url} = req.body;
    console.log('header: ', header);
    console.log('url: ', url);

    const queryParams = req.query;
    // console.log(queryParams)

    const queryString = new URLSearchParams(queryParams).toString();
    // console.log(queryString)

    fetch(`${url}?${queryString}`, {
        headers: header
    })
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(err => {
            console.error('Error:', err);
            res.status(500).json({ error: 'Failed to fetch data' });
        })
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});