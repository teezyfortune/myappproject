import conn from '../../../config';

export default class AdminController {
	static CreateMeetUp(req, res) {
		const {
			location,
			images,
			topic,
			happeningon,
			tags,
		} = req.body;
		const { userId } = req;
		const cheCktopic = {
			text: 'SELECT * FROM meetup WHERE topic = $1 AND userid = $2',
			values: [topic, userId]
		};
		conn.query(cheCktopic).then((result) => {
			if (result.rowCount !== 0) {
				res.status(409).json({
					status: 409,
					msg: 'topic already exist, enter another topic',
				});
			} else {
				const sql = `INSERT INTO meetup (userid,location,images,topic,happeningon,tags) VALUES(${userId}, '${location}', '${images}', '${topic}','${happeningon}', '${tags}') RETURNING  *`;
				conn.query(sql).then((meetup) => {
					res.status(201).json({
						status: 201,
						message: 'meetup created successfully',
						meetup: meetup.rows[0]
					});
				}).catch(err => console.log(err));
			}
		}).catch(err => console.log(err));
}

	static getAllMeetUp(req, res) {
		const sql = 'SELECT users.username AS createdBy, meetup.createdon, meetup.location, meetup.images,meetup.topic,meetup.happeningon,meetup.tags FROM users LEFT JOIN meetup ON users.id = userid';
		conn.query(sql).then((meetup) => {
			res.status(200).json({
				status: 'ok',
				meetup: meetup.rows[0]
			});
		}).catch(err => console.log(err));
	}

	static getOneMeetUp(req, res) {
		const id = req.params.id;
		const sql = ' SELECT * FROM meetup WHERE id = $1';
		const values = [id];
		conn.query(sql, values, (err, singleMeetup) => {
			if (singleMeetup.rowCount === 0) {
				res.status(404).json({
					status: 'error',
					message: `no meetup with this id: ${id} `
				});
			} else {
				res.status(200).json({
					status: 'ok',
					data: singleMeetup.rows[0]
				});
			}
		});
	}

	static UpdateMeetup(req, res) {
		const id = req.params.id;
		const query = 'SELECT * FROM meetup WHERE id = $1';
		const {
			location,
			images,
			topic,
			happeningon,
			tags
		} = req.body;
		const values = [id];
		conn.query(query, values, (err, result) => {
			if (result.rowCount === 0) {
				return res.status(404).json({
					status: 'error',
					message: `no meetup with thais id: ${id}`
				});
			}
		});
		const sql = {
			name: 'UpdateQuery',
			text: 'UPDATE meetup SET location = $1, images = $2, topic = $3, happeningon = $4, tags= $5 RETURNING *',
			values: [location, images, topic, happeningon, tags]
		};
		conn.query(sql, (err, Updatedmeetup) => {
			if (err) {
				res.status(400).json({
					status: 'error',
					message: 'please try again'
				});
			} else {
			  res.status(200).json({
					status: 'success',
					message: 'meetup updated successfully',
					data: Updatedmeetup.rows[0]
				});
			}
		});
	}

	static DeleteMeetup(req, res) {
		const id = parseInt(req.params.id, 10);
		const query = 'SELECT * FROM meetup WHERE id = $1';
		const values = [id];
		conn.query(query, values, (err, result) => {
			if (result.rowCount === 0) {
				res.status(404).json({
					status: 'error',
					message: `no user with the id ${id}`
				});
			}
			const DeleteSql = 'DElETE FROM meetup WHERE id =$1 RETURNING*';
			const value = [id];
			conn.query(DeleteSql, value, (deleted) => {
				if (err) {
					res.status(404).json({
						status: 'error',
						message: 'meetup not found'
					});
				} else {
					res.status(200).json({
						status: 'success',
						message: 'meetup deleted successfully',
						data: deleted.rows[0]
					});
				}
			});
		});
	}
}
