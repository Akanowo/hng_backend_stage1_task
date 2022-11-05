const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET endpoint to return profile info
app.use('/', apiRouter);

// Handle 404 error
app.use('**', (_, res) => {
	return res.status(404).json({
		status: false,
		error: 'Sorry endpoint not found on this server',
	});
});

app.listen(PORT, () => console.log(`App started on port ${PORT}`));
