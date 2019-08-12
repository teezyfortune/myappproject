import conn from '../../config';

export default class commentController {
	static comment(req, res) {
		const { comment } = req.body;
		const { userId } = req;
		const questionId = parseInt(req.params.id, 10);
		const query = `SELECT * FROM question WHERE id = ${questionId} `;
		conn.query(query, (err, question) => {
			if (question.rowCount === 0) {
				res.status(404).json({
					status: 404,
					message: ' no question found '
				});
			} else {
				const checkComment = ` SELECT * FROM comments WHERE questionid= ${questionId} AND userid = ${userId}`;
				conn.query(checkComment, (err, ifExist) => {
					if (ifExist.rowCount !== 0) {
						res.status(409).json({
							status: 409,
							message: 'comment already exist'
						});
					} else {
						const { title, body } = question.rows[0];
						const NewComment = `INSERT INTO comments (questionid, userid, title, body, comment) VALUES(${questionId},${userId},'${title}', '${body}','${comment}') RETURNING *`;
						conn.query(NewComment, (err, comment) => {
							if (err) {
								res.status(400).json({
									status: 400,
									message: 'Oosp some thing went wrong'
								});
							} else {
								res.status(201).json({
									status: 201,
									data: {
										question: comment.rows[0].questionId,
										title: comment.rows[0].title,
										body: comment.rows[0].body,
										comment: comment.rows[0].comment,
										commentAt: comment.rows[0].commentAt

									}
								});
							}
						});
					}
				});
			}
		});
	}
}
