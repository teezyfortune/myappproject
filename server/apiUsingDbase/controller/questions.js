import conn from '../../config';

export default class QuestionController {
	static createQuestion(req, res) {
		const {
			title,
			body
		} = req.body;
		const { userId, meetupId } = req;
		const checkExist = {
			text: 'SELECT * FROM question  WHERE title = $1 and body =$2',
			values: [title]
		};
		conn.query(checkExist).then((asked) => {
			if (asked.rowCount !== 0) {
				res.status(409).json({
					status: 409,
					message: 'question already asked by another person',
				});
			}
		});

		const query = 'INSERT INTO question(userid, meetupId, createdon, title, body) VALUES(1$,$2,$3,$4,$5) RETURNING *';
		const values = [userId, meetupId, new Date(), title.trim().toLowerCase(), body.trim().toLowerCase()];
		conn.query(query, values).then((newQuestion) => {
			client.end();
			res.status(201).json({
				status: 201,
				question: {
					id: newQustion.rows.id,
					userId: newQustion.rows.userId,
					meetupId: newQustion.rows.meetupId,
					createdon: newQuestion.rows.createdon,
					title: newQustion.rows.title,
					body: newQustion.rows.body
				}
			});
		});
	}
}
