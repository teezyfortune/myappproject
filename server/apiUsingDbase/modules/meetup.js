import conn from '../../config';

class meetUpController {
	static CreateMeetUp(req, res) {
		const {
			location,
			images,
			topic,
			happeningon,
			tags,
		} = req.body;

		const cheCktopic = {
			text: 'SELECT * FROM meetup WHERE topic = $1 ',
			values: [topic]
		};
		conn.query(cheCktopic).then((result) => {
			if (result.rowCount !== 0) {
				res.json({ msg: 'topic already exit, enter another topic' });
			}
		});
		const sql2 = 'SELECT id FROM users WHERE isAdmin = true';
		conn.query(sql2).then((postId) => {
			const postedBy = postId.rows[0].id;
			console.log(postedBy);
			const sql = 'INSERT INTO meetup (postedBy,createdon,location,images,topic,happeningon,tags) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING  *';
			const values = [postedBy, new Date(), location, images, topic, happeningon, tags];
			conn.query(sql, values).then((meetup) => {
				res.status(201).json({
					status: 201,
					message: 'meetup created successfully',
					meetup: meetup.rows
				});
			}).catch(err => console.log(err));
		}).catch(err => console.log(err));
	}

	static getAllMeetUp(req, res) {
		const sql = 'SELECT users.username AS createdBy, meetup.createdon, meetup.location, meetup.images,meetup.topic,meetup.happeningon,meetup.tags FROM users LEFT JOIN meetup ON users.id= postedBy';
		conn.query(sql).then((meetup) => {
			res.status(200).json({
				status: 200,
				meetup: meetup.rows
			});
		}).catch(err => console.log(err));
	}
}
export default meetUpController;
