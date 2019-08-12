import conn from '../../config';

export default class QuestionController {
	static createQuestion(req, res) {
		const {
			title,
			body
		} = req.body;
		const { userId } = req;
		const meetupId = parseInt(req.params.id, 10);

		const checkId = {
			text: 'SELECT * FROM meetup WHERE  id =$1',
			values: [meetupId]
		};
		conn.query(checkId).then((meetup) => {
			if (meetup.rowCount === 0) {
				return res.status(404).json({
					status: 404,
					message: 'this meetup has been deleted or removed by the moderator',
				});
			}
		});
		const checkExist = {
			text: 'SELECT * FROM question  WHERE  title = $1 AND body =$2 ',
			values: [title, body]
		};
		conn.query(checkExist).then((asked) => {
			if (asked.rowCount !== 0) {
				res.status(409).json({
					status: 409,
					message: 'question already asked by another person',
				});
			} else {
				const query = `INSERT INTO question (userid, meetupid, title, body) VALUES('${userId}','${meetupId}','${title}','${body}') RETURNING *`;
				conn.query(query).then((newQuestion) => {
					return res.status(201).json({
						status: 201,
						question: {
							id: newQuestion.rows[0].id,
							userId: newQuestion.rows[0].userId,
							meetupId: newQuestion.rows[0].meetupId,
							createdon: newQuestion.rows[0].createdon,
							title: newQuestion.rows[0].title,
							body: newQuestion.rows[0].body
						}
					});
				});
			}
		});
	}
}
