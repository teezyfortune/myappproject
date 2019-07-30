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
		const { userId } = req;
		console.log('>>>>>', userId);
		const cheCktopic = {
			text: 'SELECT * FROM meetup WHERE topic = $1 AND userid = $2',
			values: [userId, topic]
		};
		conn.query(cheCktopic).then((result) => {
			if (result.rowCount !== 0) {
				res.json({ msg: 'topic already exist, enter another topic' });
			}
		}).catch(err => console.log(err));

		const sql = `INSERT INTO meetup (userid,location,images,topic,happeningon,tags) VALUES(${userId}, '${location}', '${images}', '${topic}','${happeningon}', '${tags}') RETURNING  *`;
		conn.query(sql).then((meetup) => {
			res.status(201).json({
				status: 201,
				message: 'meetup created successfully',
				meetup: meetup.rows
			});
		}).catch(err => console.log(err));
	}

	static getAllMeetUp(req, res) {
		const sql = 'SELECT users.username AS createdBy, meetup.createdon, meetup.location, meetup.images,meetup.topic,meetup.happeningon,meetup.tags FROM users LEFT JOIN meetup ON users.id= userid';
		conn.query(sql).then((meetup) => {
			res.status(200).json({
				status: 200,
				meetup: meetup.rows
			});
		}).catch(err => console.log(err));
	}
}
export default meetUpController;
