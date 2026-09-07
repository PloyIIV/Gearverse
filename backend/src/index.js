import express from "express";

const app = express();
const port = 5000;
app.use(express.json())

app.get('/', (req, res) => {
  return res.json({
    message: 'HELLO JUBU JUBU'
  })
})

// app.use('/api',)