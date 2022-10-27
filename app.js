const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());

// GET endpoint to return profile info
app.get('/', (_, res) => {
	return res.status(200).json({
		slackUsername: 'godCode',
		backend: true,
		age: 22,
		bio: 'Full-stack software engineer with 3+ years of experience in the full software development cycle. Experienced managing a 5 or more cross-functional (product and engineering) team and collaborated with six business partners to successfully launch and maintain products across several industries.',
	});
});

// Handle 404 error
app.use('**', (_, res) => {
	return res.status(404).json({
		status: false,
		error: 'Sorry endpoint not found on this server',
	});
});

app.listen(PORT, () => console.log(`App started on port ${PORT}`));
