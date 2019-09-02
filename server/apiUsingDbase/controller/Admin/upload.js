import conn from '../../../config';
import path from 'path';
import multer from 'multer';

// image upload configuratio
export default class uploadController {
	static uploadImage(req, res) {
		const meetupId = parseInt(req.params.id, 10);
		const storage = multer.diskStorage({
			destination: 'server/uploads',
			filename: (req, file, cb) => {
				cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
			}
		});
		const checkFileType = (file, cb) => {
			const fileTypes = /jpeg|jpg|png|gif/;
			const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
			const mimetype = fileTypes.test(file.mimetype);
			if (extname && mimetype) {
				cb(null, true);
			} else {
				cb({ Error: 'images only' });
			}
		};
		const upload = multer({
			storage,
			limits: { fileSize: 1000000 },
			fileFilter: (req, file, cb) => {
				checkFileType(file, cb);
			}
		}).array('images', 3);
		upload(req, res, (err) => {
			const filePath = req.files.map(file => file.path);
			if (err) {
				return res.status(500).json({
					error: err,
				});
			}
			if (err === 'LIMIT_FILE_SIZE') {
				return res.status(500).json({
					err: 'file size too large, size must not be more than 1mb'
				});
			}
			if (req.files === 'undefined') {
				res.status(400).json({
					msg: 'you did not select any imae'
				});
			}
			const { userId } = req;
			const checkImage = `SELECT * FROM meetupImg WHERE  userid =${userId} AND meetupid = ${meetupId}`;
			conn.query(checkImage, (err, isExist) => {
				if (isExist.rowCount !== 0) {
					return res.status(409).json({
						status: 409,
						messgae: 'image already exist'
					});
				}
				const uploadImage = `INSERT INTO meetupImg (userid, meetupid, images) VALUES(${userId},${meetupId}, '${filePath}') RETURNING *`;
				conn.query(uploadImage, (err, uploaded) => {
					if (err) {
						res.status(500).json({
							status: 500,
							message: 'Oops something went wrong'
						});
					} else {
						res.status(201).json({
							status: 201,
							message: 'image uploaed successfully',
							uploads: {
								meetup: uploaded.rows[0].meetupid,
								userId: uploaded.rows[0].userid,
								images: uploaded.rows[0].images.split(',')
							}
						});
					}
				});
			});
		});
	}
}
