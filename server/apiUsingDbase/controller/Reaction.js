import conn from '../../config';

export default class ReactionController {
	static getLike(req, res) {
		const questionId = parseInt(req.params.id, 10);
		const { userId } = req;

		const confirmLIkes = {
			text: 'SELECT * FROM questionlikes WHERE questionid = $1 AND userid= $2 AND likes = true',
			values: [questionId, userId]
		};
		conn.query(confirmLIkes, (err, liked) => {
			if (liked.rowCount !== 0) {
				const UpdateReaction = `UPDATE questionlikes SET likes  = ${false} WHERE questionId = ${questionId} AND  userid = ${userId} RETURNING *`;
				conn.query(UpdateReaction, (err, reaction) => {
					return res.status(200).json({
						status: 'success',
						updated: reaction.rows[0]
					});
				});
			} else {
				const query = `INSERT INTO questionlikes (questionid, userid, likes) VALUES(${questionId}, ${userId}, ${true}) RETURNING *`;
				conn.query(query, (err, like) => {
					if (err) {
						res.status(401).json({
							satus: 401,
							message: 'Oops!! something went wrong'
						});
					} else {
						res.status(201).json({
							status: 201,
							messaege: 'question liked',
							reaction: like.rows[0]
						});
					}
				});
			}
		});
	}

	static getUnLike(req, res) {
		const { userId } = req;
		const questionId = parseInt(req.params.id, 10);
		const confirmLIkes = {
			text: 'SELECT * FROM questionlikes WHERE questionid = $1 AND userid= $2 AND likes = false',
			values: [questionId, userId]
		};
		conn.query(confirmLIkes, (err, liked) => {
			if (liked.rowCount !== 0) {
				const UpdateReaction = `UPDATE questionlikes SET likes  = ${true} WHERE questionid = ${questionId} AND  userid = ${userId} RETURNING *`;
				conn.query(UpdateReaction, (err, reaction) => {
					return res.status(200).json({
						status: 'success',
						updated: reaction.rows[0]
					});
				});
			} else {
				const query = `INSERT INTO questionlikes (questionid, userid, likes) VALUES(${questionId}, ${userId}, ${false}) RETURNING *`;
				conn.query(query, (err, like) => {
					console.log(err);
					if (err) {
						res.status(401).json({
							satus: 401,
							message: 'Oops!! something went wrong'
						});
					} else {
						return res.status(201).json({
							status: 201,
							message: 'question unliked',
							reaction: like.rows[0]
						});
					}
				});
			}
		});
	}
}
