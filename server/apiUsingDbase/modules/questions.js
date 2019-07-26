
export default class QuestionHandle {
	static createQuestion(req, res) {
		const {
			createdby,
			meetup,
			title,
			body
		} = req.body;

		if (!createdby || !meetup || !title || !body) {
			res.json({ msg: 'all fields require' });
		}
	}
}
