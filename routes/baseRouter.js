const baseRouter = require('express').Router();

baseRouter
	.route('/')
	.get((req, res) => {
		return res.status(200).json({
			slackUsername: 'godCode',
			backend: true,
			age: 22,
			bio: 'Full-stack software engineer with 3+ years of experience in the full software development cycle. Experienced managing a 5 or more cross-functional (product and engineering) team and collaborated with six business partners to successfully launch and maintain products across several industries.',
		});
	})
	.post(async (req, res) => {
		const { operation_type, x, y } = req.body;

		if (!operation_type) {
			return res
				.status(400)
				.json({ status: false, error: 'operation_type is required' });
		}

		const responseData = {
			slackUsername: 'godCode',
			operation_type,
			result: 0,
		};

		switch (operation_type) {
			case 'addition':
				responseData.result = Number.parseInt(x) + Number.parseInt(y);
				return res.status(200).json(responseData);
			case 'subtraction':
				responseData.result = Number.parseInt(x) - Number.parseInt(y);
				return res.status(200).json(responseData);
			case 'multiplication':
				responseData.result = Number.parseInt(x) * Number.parseInt(y);
				return res.status(200).json(responseData);

			default:
				// const openai = require('../utils/oepnapi');

				// let response;

				// try {
				// 	response = await openai.createCompletion({
				// 		model: 'code-davinci-002',
				// 		prompt: `"""
				// 			${operation_type}
				// 			"""`,
				// 		temperature: 0,
				// 		max_tokens: 64,
				// 		top_p: 1.0,
				// 		frequency_penalty: 0.0,
				// 		presence_penalty: 0.0,
				// 		stop: ['"""'],
				// 	});
				// } catch (error) {
				// 	console.log(error.response);
				// 	return res.status(422).json({ status: false, error: error.message });
				// }
				// console.log('openai response: ', response);
				// return res.status(200).json({
				// 	status: tru,
				// 	data: response,
				// });

				const operation_type_split = operation_type.split(' ');
				const values = [];

				for (let i = 0; i < operation_type_split.length; i++) {
					if (!Number.isNaN(Number.parseInt(operation_type_split[i]))) {
						values.push(operation_type_split[i]);
					}
				}

				if (values.length !== 2) {
					return res.status(400).json({
						status: false,
						error: 'Please include only two numbers',
					});
				}

				if (
					operation_type_split.includes('addition') ||
					operation_type_split.includes('add') ||
					operation_type_split.includes('sum') ||
					operation_type_split.includes('plus')
				) {
					console.log('Adding..');
					console.log(values);
					responseData.result =
						Number.parseInt(values[0]) + Number.parseInt(values[1]);
					return res.status(200).json({ status: true, data: responseData });
				}

				if (
					operation_type_split.includes('subtraction') ||
					operation_type_split.includes('subtract') ||
					operation_type_split.includes('minus')
				) {
					responseData.result =
						Number.parseInt(values[0]) - Number.parseInt(values[1]);
					return res.status(200).json({ status: true, data: responseData });
				}

				if (
					operation_type_split.includes('multiplication') ||
					operation_type_split.includes('multiply')
				) {
					responseData.result =
						Number.parseInt(values[0]) * Number.parseInt(values[1]);
					return res.status(200).json({ status: true, data: responseData });
				}
		}
	});

module.exports = baseRouter;
