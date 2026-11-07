import React, { useEffect, useState } from 'react';
import { Menu, X, Scissors, ArrowLeft, Star, Play, GraduationCap, Award, Instagram, Facebook, Phone, MapPin, Clock3, ChevronLeft, LogIn, LogOut, Save, Upload, ShieldCheck } from 'lucide-react';

const DEFAULT_TOKEN_KEY = 'barg-admin-token';
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

const deepClone = (value) => JSON.parse(JSON.stringify(value));

function App() {
  const [site, setSite] = useState(defaultSiteData);
  const [menu, setMenu] = useState(false);
  const [comment, setComment] = useState('');
  const [person, setPerson] = useState('');
  const [sent, setSent] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem(DEFAULT_TOKEN_KEY) || '');
  const [loginForm, setLoginForm] = useState({ username: 'admin', password: 'admin123' });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setAuthToken = (nextToken) => {
    setToken(nextToken);
    if (nextToken) {
      localStorage.setItem(DEFAULT_TOKEN_KEY, nextToken);
    } else {
      localStorage.removeItem(DEFAULT_TOKEN_KEY);
    }
  };

  const fetchSite = async (authToken = token) => {
    const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
    const response = await fetch('/api/site', { headers });
    const data = await response.json();
    if (data.site) {
      setSite(data.site);
    }
  };

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        await fetchSite();
      } catch (error) {
        console.error('Failed to load site data', error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    if (token) {
      fetchSite(token);
    }
  }, [token]);

  const nav = [
    ['خانه', '#home'],
    ['درباره ما', '#about'],
    ['خدمات', '#services'],
    ['گالری', '#gallery'],
    ['آکادمی', '#academy'],
    ['تیم ما', '#team'],
    ['نظرات', '#comments']
  ];

  const updateSectionField = (section, key, value) => {
    setSite((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
  };

  const updateArrayField = (section, index, key, value) => {
    setSite((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) => i === index ? { ...item, [key]: value } : item)
    }));
  };

  const updateTheme = (key, value) => {
    setSite((prev) => ({
      ...prev,
      theme: { ...prev.theme, [key]: value }
    }));
  };

  const saveSite = async () => {
    if (!token) {
      setLoginError('برای ذخیره‌سازی تغییرات، ابتدا وارد حساب ادمین شوید.');
      setIsAdminOpen(true);
      return;
    }

    try {
      const response = await fetch('/api/site', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(site)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save');
      }
      setSite(data.site);
      setLoginError('');
    } catch (error) {
      setLoginError(error.message || 'خطا در ذخیره تغییرات.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setAuthToken(data.token);
      setIsAdminOpen(true);
      await fetchSite(data.token);
    } catch (error) {
      setLoginError(error.message || 'نام کاربری یا رمز عبور نامعتبر است.');
    }
  };

  const handleLogout = () => {
    setAuthToken('');
    setLoginError('');
    setIsAdminOpen(false);
  };

  const handleUpload = async (fieldKey, file) => {
    if (!file || !token) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Upload failed');
    }

    if (fieldKey.startsWith('hero')) {
      updateSectionField('hero', 'backgroundImage', data.url);
    } else if (fieldKey.startsWith('about')) {
      updateSectionField('about', 'image', data.url);
    } else {
      const [section, index, key] = fieldKey.split(':');
      updateArrayField(section, Number(index), key, data.url);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (person.trim() && comment.trim()) {
      setSent(true);
      setComment('');
      setPerson('');
    }
  };

  return (
    <div className="app-shell" style={{ '--gold': site.theme.accent, '--dark': site.theme.dark }}>
      <div className="topline">
        <div className="container topinner">
          <span><MapPin size={14}/> {site.topbar.location}</span>
          <span><Clock3 size={14}/> {site.topbar.hours}</span>
          <span className="topphone"><Phone size={14}/> تماس با ما</span>
        </div>
      </div>

      <header className="header">
        <div className="container navrow">
          <a className="brand" href="#home">
            <span className="brandmark"><Scissors size={24}/></span>
            <span>
              <b>{site.brand.name}</b>
              <small>{site.brand.tagline}</small>
            </span>
          </a>

          <nav className={menu ? 'nav open' : 'nav'}>
            {nav.map(([title, href]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>{title}</a>
            ))}
          </nav>

          <a className="navcta" href="#academy">ورود به آکادمی <ArrowLeft size={16}/></a>
          <button className="admin-toggle" onClick={() => setIsAdminOpen((prev) => !prev)}>
            {isAdminOpen ? 'بستن داشبورد' : 'داشبورد ادمین'}
          </button>
          {token && (
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={14}/> خروج
            </button>
          )}
          <button className="menubtn" onClick={() => setMenu(!menu)} aria-label="منو">{menu ? <X/> : <Menu/>}</button>
        </div>
      </header>

      {isAdminOpen && (
        <aside className="adminpanel">
          {!token ? (
            <div className="login-card">
              <div className="login-header">
                <ShieldCheck size={28} />
                <h3>ورود به پنل مدیریت</h3>
              </div>

              <form onSubmit={handleLogin} className="login-form">
                <label>نام کاربری
                  <input
                    value={loginForm.username}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
                  />
                </label>
                <label>رمز عبور
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  />
                </label>
                <button type="submit" className="btn gold"><LogIn size={16}/> ورود</button>
                {loginError && <p className="login-error">{loginError}</p>}
                <small>نام کاربری پیش‌فرض: admin | رمز عبور: admin123</small>
              </form>
            </div>
          ) : (
            <>
              <div className="adminheader">
                <h3>داشبورد مدیریت</h3>
                <div className="admin-actions">
                  <button onClick={() => setSite(deepClone(defaultSiteData))}>بازنشانی</button>
                  <button className="primary" onClick={saveSite}><Save size={15}/> ذخیره</button>
                </div>
              </div>

              <div className="admin-grid">
                <div className="admin-card">
                  <h4>اطلاعات برند</h4>
                  <label>نام برند<input value={site.brand.name} onChange={(e) => updateSectionField('brand', 'name', e.target.value)} /></label>
                  <label>عنوان برند<input value={site.brand.tagline} onChange={(e) => updateSectionField('brand', 'tagline', e.target.value)} /></label>
                </div>

                <div className="admin-card">
                  <h4>رنگ و ظاهر</h4>
                  <label>رنگ اصلی<input type="color" value={site.theme.accent} onChange={(e) => updateTheme('accent', e.target.value)} /></label>
                  <label>رنگ پس‌زمینه<input type="color" value={site.theme.dark} onChange={(e) => updateTheme('dark', e.target.value)} /></label>
                </div>

                <div className="admin-card">
                  <h4>بخش هدر</h4>
                  <label>موقعیت<input value={site.topbar.location} onChange={(e) => updateSectionField('topbar', 'location', e.target.value)} /></label>
                  <label>ساعات کاری<input value={site.topbar.hours} onChange={(e) => updateSectionField('topbar', 'hours', e.target.value)} /></label>
                </div>

                <div className="admin-card wide">
                  <h4>سربرگ</h4>
                  <label>
                    تصویر پس‌زمینه
                    <div className="upload-row">
                      <input value={site.hero.backgroundImage} onChange={(e) => updateSectionField('hero', 'backgroundImage', e.target.value)} />
                      <input type="file" accept="image/*" onChange={(e) => handleUpload('hero:backgroundImage', e.target.files[0])} />
                    </div>
                  </label>
                  <label>عنوان کوتاه<input value={site.hero.eyebrow} onChange={(e) => updateSectionField('hero', 'eyebrow', e.target.value)} /></label>
                  <label>عنوان اصلی<input value={site.hero.title} onChange={(e) => updateSectionField('hero', 'title', e.target.value)} /></label>
                  <label>متن برجسته<input value={site.hero.highlight} onChange={(e) => updateSectionField('hero', 'highlight', e.target.value)} /></label>
                  <label>توضیح<input value={site.hero.paragraph} onChange={(e) => updateSectionField('hero', 'paragraph', e.target.value)} /></label>
                </div>

                <div className="admin-card wide">
                  <h4>درباره ما</h4>
                  <label>عنوان کوتاه<input value={site.about.eyebrow} onChange={(e) => updateSectionField('about', 'eyebrow', e.target.value)} /></label>
                  <label>تصویر<input value={site.about.image} onChange={(e) => updateSectionField('about', 'image', e.target.value)} /></label>
                  <label>عنوان اصلی<input value={site.about.title} onChange={(e) => updateSectionField('about', 'title', e.target.value)} /></label>
                  <label>متن برجسته<input value={site.about.highlight} onChange={(e) => updateSectionField('about', 'highlight', e.target.value)} /></label>
                  <label>پارگراف اول<textarea value={site.about.paragraphOne} onChange={(e) => updateSectionField('about', 'paragraphOne', e.target.value)} /></label>
                  <label>پارگراف دوم<textarea value={site.about.paragraphTwo} onChange={(e) => updateSectionField('about', 'paragraphTwo', e.target.value)} /></label>
                </div>

                <div className="admin-card wide">
                  <h4>خدمات</h4>
                  {site.services.map((service, index) => (
                    <div key={service.number || index} className="mini-list">
                      <label>شماره<input value={service.number} onChange={(e) => updateArrayField('services', index, 'number', e.target.value)} /></label>
                      <label>عنوان<input value={service.title} onChange={(e) => updateArrayField('services', index, 'title', e.target.value)} /></label>
                      <label>توضیح<textarea value={service.description} onChange={(e) => updateArrayField('services', index, 'description', e.target.value)} /></label>
                    </div>
                  ))}
                </div>

                <div className="admin-card wide">
                  <h4>گالری</h4>
                  {site.gallery.map((photo, index) => (
                    <div key={photo.label || index} className="mini-list">
                      <label>عنوان<input value={photo.label} onChange={(e) => updateArrayField('gallery', index, 'label', e.target.value)} /></label>
                      <label>تصویر<input value={photo.src} onChange={(e) => updateArrayField('gallery', index, 'src', e.target.value)} /></label>
                    </div>
                  ))}
                </div>

                <div className="admin-card wide">
                  <h4>آکادمی</h4>
                  <label>عنوان کوتاه<input value={site.academy.eyebrow} onChange={(e) => updateSectionField('academy', 'eyebrow', e.target.value)} /></label>
                  <label>عنوان اصلی<input value={site.academy.title} onChange={(e) => updateSectionField('academy', 'title', e.target.value)} /></label>
                  <label>متن برجسته<input value={site.academy.highlight} onChange={(e) => updateSectionField('academy', 'highlight', e.target.value)} /></label>
                  <label>توضیح<textarea value={site.academy.paragraph} onChange={(e) => updateSectionField('academy', 'paragraph', e.target.value)} /></label>
                  <label>متن زیر دوره‌ها<input value={site.academy.intro} onChange={(e) => updateSectionField('academy', 'intro', e.target.value)} /></label>
                </div>

                <div className="admin-card wide">
                  <h4>دوره‌ها</h4>
                  {site.courses.map((course, index) => (
                    <div key={course.title || index} className="mini-list">
                      <label>عنوان<input value={course.title} onChange={(e) => updateArrayField('courses', index, 'title', e.target.value)} /></label>
                      <label>سطح<input value={course.level} onChange={(e) => updateArrayField('courses', index, 'level', e.target.value)} /></label>
                      <label>تعداد درس<input value={course.lessons} onChange={(e) => updateArrayField('courses', index, 'lessons', e.target.value)} /></label>
                      <label>تصویر<input value={course.img} onChange={(e) => updateArrayField('courses', index, 'img', e.target.value)} /></label>
                    </div>
                  ))}
                </div>

                <div className="admin-card wide">
                  <h4>تیم</h4>
                  <label>عنوان کوتاه<input value={site.team.eyebrow} onChange={(e) => updateSectionField('team', 'eyebrow', e.target.value)} /></label>
                  <label>عنوان اصلی<input value={site.team.title} onChange={(e) => updateSectionField('team', 'title', e.target.value)} /></label>
                  <label>توضیح<input value={site.team.paragraph} onChange={(e) => updateSectionField('team', 'paragraph', e.target.value)} /></label>
                </div>

                <div className="admin-card wide">
                  <h4>اعضا تیم</h4>
                  {site.staff.map((personItem, index) => (
                    <div key={personItem.name || index} className="mini-list">
                      <label>نام<input value={personItem.name} onChange={(e) => updateArrayField('staff', index, 'name', e.target.value)} /></label>
                      <label>سمت<input value={personItem.role} onChange={(e) => updateArrayField('staff', index, 'role', e.target.value)} /></label>
                      <label>تصویر<input value={personItem.img} onChange={(e) => updateArrayField('staff', index, 'img', e.target.value)} /></label>
                    </div>
                  ))}
                </div>

                <div className="admin-card wide">
                  <h4>نظرات</h4>
                  <label>عنوان کوتاه<input value={site.comments.eyebrow} onChange={(e) => updateSectionField('comments', 'eyebrow', e.target.value)} /></label>
                  <label>عنوان اصلی<input value={site.comments.title} onChange={(e) => updateSectionField('comments', 'title', e.target.value)} /></label>
                  <label>متن برجسته<input value={site.comments.highlight} onChange={(e) => updateSectionField('comments', 'highlight', e.target.value)} /></label>
                  <label>توضیح<textarea value={site.comments.paragraph} onChange={(e) => updateSectionField('comments', 'paragraph', e.target.value)} /></label>
                </div>

                <div className="admin-card">
                  <h4>تماس و فوتر</h4>
                  <label>تلفن<input value={site.contact.phone} onChange={(e) => updateSectionField('contact', 'phone', e.target.value)} /></label>
                  <label>آدرس<input value={site.contact.address} onChange={(e) => updateSectionField('contact', 'address', e.target.value)} /></label>
                  <label>ساعات کاری<input value={site.contact.hours} onChange={(e) => updateSectionField('contact', 'hours', e.target.value)} /></label>
                  <label>متن فوتر<input value={site.footer.text} onChange={(e) => updateSectionField('footer', 'text', e.target.value)} /></label>
                  <label>کپی‌رایت<input value={site.footer.copyright} onChange={(e) => updateSectionField('footer', 'copyright', e.target.value)} /></label>
                </div>
              </div>
            </>
          )}
        </aside>
      )}

      <main>
        <section className="hero" id="home" style={{ backgroundImage: `linear-gradient(90deg,#111e 0%,#111b 42%,#1113 100%), url('${site.hero.backgroundImage}')` }}>
          <div className="herooverlay"></div>
          <div className="container herocontent">
            <div className="eyebrow"><span></span> {site.hero.eyebrow}</div>
            <h1>{site.hero.title}<br/><em>{site.hero.highlight}</em></h1>
            <p>{site.hero.paragraph}</p>
            <div className="herobuttons">
              <a className="btn gold" href="#services">دیدن خدمات <ArrowLeft size={17}/></a>
              <a className="btn outline" href="#academy"><Play size={16}/> آشنایی با آکادمی</a>
            </div>
            <div className="herofoot">
              <div><b>۱۰+</b><span>سال تجربه</span></div>
              <div><b>۵۰۰+</b><span>مشتری راضی</span></div>
              <div><b>۱۲۰+</b><span>شاگرد آموزش‌دیده</span></div>
            </div>
          </div>
          <div className="herovertical">BARBERING · STYLE · EDUCATION</div>
        </section>

        <section className="intro section" id="about">
          <div className="container introgrid">
            <div className="introvisual">
              <img src={site.about.image} onError={(e) => e.currentTarget.src = defaultSiteData.about.image} alt="فضای آرایشگاه" />
              <div className="experience"><b>۱۰+</b><span>سال در دنیای<br/>پیرایش مردانه</span></div>
            </div>
            <div className="introtext">
              <div className="eyebrow dark"><span></span> {site.about.eyebrow}</div>
              <h2>{site.about.title}<br/><em>{site.about.highlight}</em></h2>
              <p>{site.about.paragraphOne}</p>
              <p>{site.about.paragraphTwo}</p>
              <a className="textlink" href="#team">با تیم ما آشنا شوید <ArrowLeft size={16}/></a>
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="container">
            <div className="sectionhead">
              <div>
                <div className="eyebrow"><span></span> خدمات ما</div>
                <h2>آراستگی با <em>جزئیات حرفه‌ای</em></h2>
              </div>
              <p>با توجه به سلیقه و فرم چهره شما، بهترین استایل را پیشنهاد می‌کنیم.</p>
            </div>
            <div className="servicegrid">
              {site.services.map((service) => (
                <article className="service" key={service.number}>
                  <span className="serviceno">{service.number}</span>
                  <div className="serviceicon"><Scissors/></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a href="#contact" aria-label="تماس"><ArrowLeft size={18}/></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery section" id="gallery">
          <div className="container">
            <div className="sectionhead">
              <div>
                <div className="eyebrow"><span></span> نمونه‌کارها</div>
                <h2>هنر ما را <em>از نزدیک ببینید</em></h2>
              </div>
              <a className="textlink" href="#contact">مشاهده همه نمونه‌کارها <ArrowLeft size={16}/></a>
            </div>
            <div className="gallerygrid">
              {site.gallery.map((photo) => (
                <div className="galleryitem" key={photo.label}>
                  <img src={photo.src} alt={photo.label} />
                  <span>{photo.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="academy section" id="academy">
          <div className="container academygrid">
            <div className="academytext">
              <div className="eyebrow"><span></span> {site.academy.eyebrow}</div>
              <h2>{site.academy.title}<br/><em>{site.academy.highlight}</em></h2>
              <p>{site.academy.paragraph}</p>
              <div className="academyfeatures">
                <span><Play size={17}/> ویدیوهای آموزشی</span>
                <span><GraduationCap size={18}/> آموزش مرحله‌به‌مرحله</span>
                <span><Award size={18}/> راهنمایی استادان</span>
              </div>
              <a className="btn gold" href="#contact">درخواست معلومات درباره آموزش <ArrowLeft size={17}/></a>
            </div>
            <div className="coursearea">
              <div className="coursehead">
                <b>دوره‌های آموزشی</b>
                <span>{site.academy.intro}</span>
              </div>
              {site.courses.map((course) => (
                <article className="course" key={course.title}>
                  <img src={course.img} alt={course.title} />
                  <div>
                    <h3>{course.title}</h3>
                    <span>{course.level} <i>•</i> {course.lessons}</span>
                  </div>
                  <button aria-label="مشاهده دوره"><ChevronLeft/></button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="team section" id="team">
          <div className="container">
            <div className="sectionhead">
              <div>
                <div className="eyebrow dark"><span></span> {site.team.eyebrow}</div>
                <h2>{site.team.title}</h2>
              </div>
              <p>{site.team.paragraph}</p>
            </div>
            <div className="teamgrid">
              {site.staff.map((item) => (
                <article className="teammate" key={item.name}>
                  <img src={item.img} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="comments section" id="comments">
          <div className="container commentsgrid">
            <div>
              <div className="eyebrow"><span></span> {site.comments.eyebrow}</div>
              <h2>{site.comments.title}<br/><em>{site.comments.highlight}</em></h2>
              <p>{site.comments.paragraph}</p>
              <div className="rating">
                <div className="stars"><Star/><Star/><Star/><Star/><Star/></div>
                <b>رضایت مشتریان در اولویت ما است</b>
              </div>
            </div>

            <form className="commentform" onSubmit={submit}>
              <h3>دیدگاه خود را بنویسید</h3>
              <label>نام شما</label>
              <input value={person} onChange={(e) => setPerson(e.target.value)} placeholder="نام خود را وارد کنید" required />
              <label>نظر شما</label>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="تجربه خود را با ما شریک سازید..." rows="4" required />
              <button className="btn gold" type="submit">ارسال دیدگاه <ArrowLeft size={17}/></button>
              {sent && <div className="success">سپاس از دیدگاه شما! نظر شما برای بررسی ثبت شد.</div>}
              <small>یادآوری: این نسخه نمایشی است؛ دیدگاه‌ها هنوز در سرور ذخیره نمی‌شوند.</small>
            </form>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="container contactrow">
            <div>
              <div className="eyebrow"><span></span> در تماس باشید</div>
              <h2>آماده یک <em>تغییر تازه</em> هستید؟</h2>
              <p>برای دریافت معلومات بیشتر درباره خدمات یا دوره‌های آموزشی با ما تماس بگیرید.</p>
            </div>
            <div className="contactinfo">
              <span><Phone/> شماره تماس: {site.contact.phone}</span>
              <span><MapPin/> آدرس: {site.contact.address}</span>
              <span><Clock3/> ساعات کاری: {site.contact.hours}</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerrow">
          <a className="brand" href="#home">
            <span className="brandmark"><Scissors size={22}/></span>
            <span>
              <b>{site.brand.name}</b>
              <small>{site.brand.tagline}</small>
            </span>
          </a>
          <p>{site.footer.text}</p>
          <div className="social">
            <a href="#contact" aria-label="اینستاگرام"><Instagram/></a>
            <a href="#contact" aria-label="فیسبوک"><Facebook/></a>
          </div>
        </div>
        <div className="copyright">{site.footer.copyright}</div>
      </footer>
    </div>
  );
}

export default App;
