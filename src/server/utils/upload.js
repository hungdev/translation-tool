import multer from 'multer'


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, `${process.cwd()}/uploads`),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const fileFilter = (req, file, cb) => cb(null, file.mimetype === 'application/json')

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

export default upload;