import conn from '../../config';

export default class rsvpController {
	static rsvp(req, res) {
		const { response } = req.body;
		const meetupId = parseInt(req.params.id, 10);
		const { userId } = req;

		const squery = {
			text: `SELECT * FROM rsvp WHERE meetupid = ${meetupId} AND userid = ${userId}`
		};
		conn.query(squery, (err, answered) => {
			if (answered.rowCount !== 0) {
				res.status(409).json({
					status: 409,
					message: 'error'
				});
			} else {
				const sql = `INSERT INTO rsvp (meetupid, userid, response) VALUES(${meetupId}, ${userId},'${response.trim().toLowerCase()}') RETURNING * `;
				conn.query(sql, (err, response) => {
					if (err) {
						res.status(500).json({
							status: 500,
							message: 'error',
						});
					} else {
						return res.status(201).json({
							response: {
								meetup: response.rows[0].meetupId,
								user: response.rows[0].userId,
								response: response.rows[0].response
							}
						});
					}
				});
			}
		});
	}
}
