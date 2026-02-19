const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');
const multer = require('multer');

const profiles = require(path.join(__dirname, 'profiles.json'));
const posts = require(path.join(__dirname, 'posts.json'));
const uploadsDir = path.join(__dirname, 'uploads');

const server = jsonServer.create();
const router = jsonServer.router({ profiles, posts });
const middlewares = jsonServer.defaults();
const port = 3001;
const delayFromEnv = Number.parseInt(process.env.MOCK_DELAY_MS ?? '0', 10);
const responseDelayMs =
  Number.isNaN(delayFromEnv) || delayFromEnv < 0 ? 0 : delayFromEnv;

fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    const extension = path.extname(file.originalname) || '.jpg';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `post-${uniqueSuffix}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed'));
      return;
    }

    cb(null, true);
  },
});

server.use(middlewares);
server.use('/uploads', jsonServer.defaults({ static: uploadsDir }));

if (responseDelayMs > 0) {
  server.use((req, res, next) => {
    setTimeout(next, responseDelayMs);
  });
}

server.post('/posts', (req, res, next) => {
  if (!req.is('multipart/form-data')) {
    return res.status(415).json({
      error: 'POST /posts supports only multipart/form-data with photoFile',
    });
  }

  return upload.single('photoFile')(req, res, (error) => {
    if (error) {
      return next(error);
    }

    if (!req.file) {
      return res.status(400).json({
        error: 'photoFile is required for multipart/form-data requests',
      });
    }

    req.body.photo = `http://localhost:${port}/uploads/${req.file.filename}`;
    return next();
  });
});

server.use(jsonServer.bodyParser);

server.post('/posts', (req, res, next) => {
  if (typeof req.body.profileId === 'string') {
    const parsedProfileId = Number.parseInt(req.body.profileId, 10);

    if (!Number.isNaN(parsedProfileId)) {
      req.body.profileId = parsedProfileId;
    }
  }

  return next();
});

server.use((req, res, next) => {
  if (req.path.startsWith('/profiles')) {
    const allowedMethods = new Set(['GET', 'HEAD', 'OPTIONS']);

    if (!allowedMethods.has(req.method)) {
      return res
        .status(405)
        .json({ error: 'Method not allowed for profiles mock' });
    }
  }

  return next();
});

server.use(router);
server.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: error.message });
  }

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return next();
});

server.listen(port, () => {
  console.log(
    `Mock API is running on http://localhost:${port} (delay: ${responseDelayMs}ms)`,
  );
});
