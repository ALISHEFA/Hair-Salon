import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
const statePath = path.join(__dirname, 'data.json');

fs.mkdirSync(uploadsDir, { recursive: true });

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'barg-admin-secret-key';
const port = Number(process.env.PORT || 3001);

const defaultSiteData = {
  brand: { name: 'برگ', tagline: 'آرایشگاه و آکادمی مردانه' },
  topbar: { location: 'کابل، افغانستان', hours: 'شنبه تا پنج‌شنبه: ۸ صبح الی ۸ شب' },
  hero: {
    eyebrow: 'هنر پیرایش، امضای شخصیت شما',
    title: 'استایل متفاوت،',
    highlight: 'اعتماد به نفس بیشتر',
    paragraph: 'در برگ، هنر پیرایش را با تجربه، دقت و سلیقه ترکیب می‌کنیم؛ جایی برای آراستگی شما و یادگیری نسل تازه‌ای از آرایشگران حرفه‌ای.',
    backgroundImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1800&q=90'
  },
  about: {
    eyebrow: 'داستان برگ',
    title: 'بیشتر از یک آرایشگاه؛',
    highlight: 'یک مکتبِ هنر و مهارت',
    paragraphOne: 'ما باور داریم که پیرایش فقط کوتاه‌کردن مو نیست؛ ترکیبی از هنر، شناخت چهره و توجه به جزئیات است. برگ فضایی حرفه‌ای برای ارائه خدمات پیرایش و پرورش آرایشگران ماهر فراهم کرده است.',
    paragraphTwo: 'هدف ما ساختن تجربه‌ای خوشایند برای مشتریان و آینده‌ای روشن برای هنرجویان این حرفه است.',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85'
  },
  services: [
    { number: '01', title: 'کوتاهی و استایل مو', description: 'مدل‌های کلاسیک و مدرن، متناسب با چهره شما.' },
    { number: '02', title: 'فید و سایه‌زنی', description: 'اجرای دقیق فید با ظرافت و مهارت حرفه‌ای.' },
    { number: '03', title: 'اصلاح و فرم‌دهی ریش', description: 'طراحی و مرتب‌سازی ریش متناسب با فرم صورت.' },
    { number: '04', title: 'مراقبت و آراستگی', description: 'رسیدگی به مو و ریش با محصولات مناسب.' }
  ],
  gallery: [
    { src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85', label: 'پیرایش کلاسیک' },
    { src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=85', label: 'استایل مدرن' },
    { src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85', label: 'اصلاح و مراقبت' }
  ],
  academy: {
    eyebrow: 'آکادمی برگ',
    title: 'مهارت امروز،',
    highlight: 'حرفه فردا',
    paragraph: 'اگر می‌خواهید پیرایشگری را از پایه بیاموزید یا مهارت‌های خود را به سطح حرفه‌ای برسانید، آکادمی برگ همراه شما است.',
    intro: 'نمونه محتوای آکادمی'
  },
  courses: [
    { title: 'آموزش پیرایش از پایه', level: 'مبتدی', lessons: '۱۸ درس', img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80' },
    { title: 'فید و سایه‌زنی حرفه‌ای', level: 'پیشرفته', lessons: '۱۲ درس', img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80' },
    { title: 'اصلاح ریش و فرم‌دهی', level: 'متوسط', lessons: '۹ درس', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80' }
  ],
  team: {
    eyebrow: 'متخصصان ما',
    title: 'با تیم برگ آشنا شوید',
    paragraph: 'تجربه، مهارت و علاقه؛ ویژگی‌های مشترک اعضای تیم ما.'
  },
  staff: [
    { name: 'استاد احمد', role: 'استاد ارشد پیرایش', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
    { name: 'استاد فرید', role: 'متخصص فید و استایل', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
    { name: 'استاد سمیع', role: 'مربی آکادمی', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' }
  ],
  comments: {
    eyebrow: 'دیدگاه مشتریان',
    title: 'تجربه شما،',
    highlight: 'ارزشمندترین نظر ما',
    paragraph: 'از تجربه‌تان در برگ برای ما بنویسید. دیدگاه شما پس از بررسی در این بخش نمایش داده می‌شود.'
  },
  contact: {
    phone: 'بعداً اضافه می‌شود',
    address: 'کابل، افغانستان',
    hours: '۸ صبح الی ۸ شب'
  },
  footer: {
    text: 'زیبایی در جزئیات است؛ مهارت در تمرین.',
    copyright: '© تمامی حقوق برای برگ محفوظ است.'
  },
  theme: {
    accent: '#c6a15b',
    dark: '#171717'
  }
};

const defaultState = {
  site: defaultSiteData,
  users: [{ username: 'admin', passwordHash: bcrypt.hashSync('admin123', 10) }]
};

const ensureStateFile = () => {
  if (!fs.existsSync(statePath)) {
    fs.writeFileSync(statePath, JSON.stringify(defaultState, null, 2));
  }
};

const readState = () => {
  ensureStateFile();
  const raw = fs.readFileSync(statePath, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed, site: { ...defaultSiteData, ...(parsed.site || {}) }, users: parsed.users || defaultState.users };
  } catch (error) {
    return defaultState;
  }
};

const writeState = (nextState) => {
  fs.writeFileSync(statePath, JSON.stringify(nextState, null, 2));
};

const ensureAuth = (req, res, next) => {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

const readSiteData = () => readState().site;

const writeSiteData = (siteData) => {
  const state = readState();
  state.site = siteData;
  writeState(state);
};

const createToken = (user) => jwt.sign({ id: user.username, username: user.username }, JWT_SECRET, { expiresIn: '8h' });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '20mb' }));
app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Server is running' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const state = readState();
  const user = state.users.find((item) => item.username === username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const isValid = bcrypt.compareSync(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  const token = createToken(user);
  return res.json({ token, user: { id: user.username, username: user.username } });
});

app.get('/api/site', (_req, res) => {
  res.json({ site: readSiteData() });
});

app.put('/api/site', ensureAuth, (req, res) => {
  const siteData = req.body;

  if (!siteData || typeof siteData !== 'object') {
    return res.status(400).json({ error: 'Site data is invalid.' });
  }

  writeSiteData(siteData);
  return res.json({ site: readSiteData() });
});

app.post('/api/upload', ensureAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file was uploaded.' });
  }

  const publicUrl = `/uploads/${req.file.filename}`;
  return res.json({ url: publicUrl });
});

app.use((error, _req, res, _next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Admin login: username = admin, password = admin123');
});
