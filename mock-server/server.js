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
const usersCountIntervalFromEnv = Number.parseInt(
  process.env.MOCK_USERS_COUNT_INTERVAL_MS ?? '20000',
  10,
);
const usersCountIncreaseIntervalMs =
  Number.isNaN(usersCountIntervalFromEnv) || usersCountIntervalFromEnv < 100
    ? 20_000
    : usersCountIntervalFromEnv;
const delayFromEnv = Number.parseInt(process.env.MOCK_DELAY_MS ?? '0', 10);
const responseDelayMs =
  Number.isNaN(delayFromEnv) || delayFromEnv < 0 ? 0 : delayFromEnv;
let usersCount = profiles.length;

fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    const extension = path.extname(file.originalname) || '.jpg';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filePrefix = req.path.includes('/avatar') ? 'avatar' : 'post';
    cb(null, `${filePrefix}-${uniqueSuffix}${extension}`);
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

setInterval(() => {
  const randomIncrease = Math.floor(Math.random() * 20) + 1;
  usersCount += randomIncrease;
}, usersCountIncreaseIntervalMs);

server.get('/stats/users-count', (req, res) => {
  return res.status(200).json({
    usersCount,
    increasesEveryMs: usersCountIncreaseIntervalMs,
  });
});

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

server.put('/profiles/:id', (req, res) => {
  const profileId = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(profileId)) {
    return res.status(400).json({ error: 'Invalid profile id' });
  }

  const existingProfile = router.db
    .get('profiles')
    .find({ id: profileId })
    .value();

  if (!existingProfile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const editableFields = [
    'username',
    'firstName',
    'lastName',
    'dateOfBirth',
    'country',
    'city',
    'about',
    'followersCount',
    'followingCount',
    'postsCount',
  ];
  const updates = {};

  editableFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  ['followersCount', 'followingCount', 'postsCount'].forEach((numericField) => {
    if (typeof updates[numericField] === 'string') {
      const parsedValue = Number.parseInt(updates[numericField], 10);

      if (!Number.isNaN(parsedValue)) {
        updates[numericField] = parsedValue;
      }
    }
  });

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No editable fields provided' });
  }

  const updatedProfile = router.db
    .get('profiles')
    .find({ id: profileId })
    .assign(updates)
    .write();

  return res.status(200).json(updatedProfile);
});

server.put('/profiles/:id/avatar', (req, res, next) => {
  const profileId = Number.parseInt(req.params.id, 10);

  if (Number.isNaN(profileId)) {
    return res.status(400).json({ error: 'Invalid profile id' });
  }

  const existingProfile = router.db
    .get('profiles')
    .find({ id: profileId })
    .value();

  if (!existingProfile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  if (!req.is('multipart/form-data')) {
    return res.status(415).json({
      error:
        'PUT /profiles/:id/avatar supports only multipart/form-data with avatarFile',
    });
  }

  return upload.single('avatarFile')(req, res, (error) => {
    if (error) {
      return next(error);
    }

    if (!req.file) {
      return res.status(400).json({
        error: 'avatarFile is required for multipart/form-data requests',
      });
    }

    const avatar = `http://localhost:${port}/uploads/${req.file.filename}`;
    const updatedProfile = router.db
      .get('profiles')
      .find({ id: profileId })
      .assign({ avatar })
      .write();

    return res.status(200).json(updatedProfile);
  });
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
