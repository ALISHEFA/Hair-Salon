import React, { useState } from 'react';
import { Menu, X, Scissors, ArrowLeft, Star, Play, GraduationCap, Users, Award, Instagram, Facebook, Phone, MapPin, Clock3, ChevronLeft, MessageCircle, Sparkles } from 'lucide-react';

const photos = [
  {src:'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85', label:'پیرایش کلاسیک'},
  {src:'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=85', label:'استایل مدرن'},
  {src:'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85', label:'اصلاح و مراقبت'},
];
const courses = [
  {title:'آموزش پیرایش از پایه', level:'مبتدی', lessons:'۱۸ درس', img:'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80'},
  {title:'فید و سایه‌زنی حرفه‌ای', level:'پیشرفته', lessons:'۱۲ درس', img:'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80'},
  {title:'اصلاح ریش و فرم‌دهی', level:'متوسط', lessons:'۹ درس', img:'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'},
];
const staff = [
  {name:'استاد احمد', role:'استاد ارشد پیرایش', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'},
  {name:'استاد فرید', role:'متخصص فید و استایل', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'},
  {name:'استاد سمیع', role:'مربی آکادمی', img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80'},
];
function App(){
 const [menu,setMenu]=useState(false), [comment,setComment]=useState(''), [person,setPerson]=useState(''), [sent,setSent]=useState(false);
 const nav=[['خانه','#home'],['درباره ما','#about'],['خدمات','#services'],['گالری','#gallery'],['آکادمی','#academy'],['تیم ما','#team'],['نظرات','#comments']];
 const submit=(e)=>{e.preventDefault(); if(person.trim()&&comment.trim()){setSent(true);setComment('');setPerson('');}};
 return <div>
  <div className="topline"><div className="container topinner"><span><MapPin size={14}/> کابل، افغانستان</span><span><Clock3 size={14}/> شنبه تا پنج‌شنبه: ۸ صبح الی ۸ شب</span><span className="topphone"><Phone size={14}/> تماس با ما</span></div></div>
  <header className="header"><div className="container navrow">
   <a className="brand" href="#home"><span className="brandmark"><Scissors size={24}/></span><span><b>برگ</b><small>آرایشگاه و آکادمی مردانه</small></span></a>
   <nav className={menu?'nav open':'nav'}>{nav.map(([t,h])=><a key={h} href={h} onClick={()=>setMenu(false)}>{t}</a>)}</nav>
   <a className="navcta" href="#academy">ورود به آکادمی <ArrowLeft size={16}/></a>
   <button className="menubtn" onClick={()=>setMenu(!menu)} aria-label="منو">{menu?<X/>:<Menu/>}</button>
  </div></header>
  <main>
   <section className="hero" id="home"><div className="herooverlay"></div><div className="container herocontent">
    <div className="eyebrow"><span></span> هنر پیرایش، امضای شخصیت شما</div>
    <h1>استایل متفاوت،<br/><em>اعتماد به نفس بیشتر</em></h1>
    <p>در برگ، هنر پیرایش را با تجربه، دقت و سلیقه ترکیب می‌کنیم؛ جایی برای آراستگی شما و یادگیری نسل تازه‌ای از آرایشگران حرفه‌ای.</p>
    <div className="herobuttons"><a className="btn gold" href="#services">دیدن خدمات <ArrowLeft size={17}/></a><a className="btn outline" href="#academy"><Play size={16}/> آشنایی با آکادمی</a></div>
    <div className="herofoot"><div><b>۱۰+</b><span>سال تجربه</span></div><div><b>۵۰۰+</b><span>مشتری راضی</span></div><div><b>۱۲۰+</b><span>شاگرد آموزش‌دیده</span></div></div>
   </div><div className="herovertical">BARBERING · STYLE · EDUCATION</div></section>
   <section className="intro section" id="about"><div className="container introgrid"><div className="introvisual"><img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85" onError={e=>e.currentTarget.src='https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=85'} alt="فضای آرایشگاه"/><div className="experience"><b>۱۰+</b><span>سال در دنیای<br/>پیرایش مردانه</span></div></div><div className="introtext"><div className="eyebrow dark"><span></span> داستان برگ</div><h2>بیشتر از یک آرایشگاه؛<br/><em>یک مکتبِ هنر و مهارت</em></h2><p>ما باور داریم که پیرایش فقط کوتاه‌کردن مو نیست؛ ترکیبی از هنر، شناخت چهره و توجه به جزئیات است. برگ فضایی حرفه‌ای برای ارائه خدمات پیرایش و پرورش آرایشگران ماهر فراهم کرده است.</p><p>هدف ما ساختن تجربه‌ای خوشایند برای مشتریان و آینده‌ای روشن برای هنرجویان این حرفه است.</p><a className="textlink" href="#team">با تیم ما آشنا شوید <ArrowLeft size={16}/></a></div></div></section>
   <section className="services section" id="services"><div className="container"><div className="sectionhead"><div><div className="eyebrow"><span></span> خدمات ما</div><h2>آراستگی با <em>جزئیات حرفه‌ای</em></h2></div><p>با توجه به سلیقه و فرم چهره شما، بهترین استایل را پیشنهاد می‌کنیم.</p></div><div className="servicegrid">
    {[['01','کوتاهی و استایل مو','مدل‌های کلاسیک و مدرن، متناسب با چهره شما.'],['02','فید و سایه‌زنی','اجرای دقیق فید با ظرافت و مهارت حرفه‌ای.'],['03','اصلاح و فرم‌دهی ریش','طراحی و مرتب‌سازی ریش متناسب با فرم صورت.'],['04','مراقبت و آراستگی','رسیدگی به مو و ریش با محصولات مناسب.']].map(x=><article className="service" key={x[0]}><span className="serviceno">{x[0]}</span><div className="serviceicon"><Scissors/></div><h3>{x[1]}</h3><p>{x[2]}</p><a href="#contact" aria-label="تماس"><ArrowLeft size={18}/></a></article>)}
   </div></div></section>
   <section className="gallery section" id="gallery"><div className="container"><div className="sectionhead"><div><div className="eyebrow"><span></span> نمونه‌کارها</div><h2>هنر ما را <em>از نزدیک ببینید</em></h2></div><a className="textlink" href="#contact">مشاهده همه نمونه‌کارها <ArrowLeft size={16}/></a></div><div className="gallerygrid">{photos.map(p=><div className="galleryitem" key={p.label}><img src={p.src} alt={p.label}/><span>{p.label}</span></div>)}</div></div></section>
   <section className="academy section" id="academy"><div className="container academygrid"><div className="academytext"><div className="eyebrow"><span></span> آکادمی برگ</div><h2>مهارت امروز،<br/><em>حرفه فردا</em></h2><p>اگر می‌خواهید پیرایشگری را از پایه بیاموزید یا مهارت‌های خود را به سطح حرفه‌ای برسانید، آکادمی برگ همراه شما است.</p><div className="academyfeatures"><span><Play size={17}/> ویدیوهای آموزشی</span><span><GraduationCap size={18}/> آموزش مرحله‌به‌مرحله</span><span><Award size={18}/> راهنمایی استادان</span></div><a className="btn gold" href="#contact">درخواست معلومات درباره آموزش <ArrowLeft size={17}/></a></div><div className="coursearea"><div className="coursehead"><b>دوره‌های آموزشی</b><span>نمونه محتوای آکادمی</span></div>{courses.map(c=><article className="course" key={c.title}><img src={c.img} alt={c.title}/><div><h3>{c.title}</h3><span>{c.level} <i>•</i> {c.lessons}</span></div><button aria-label="مشاهده دوره"><ChevronLeft/></button></article>)}</div></div></section>
   <section className="team section" id="team"><div className="container"><div className="sectionhead"><div><div className="eyebrow dark"><span></span> متخصصان ما</div><h2>با <em>تیم برگ</em> آشنا شوید</h2></div><p>تجربه، مهارت و علاقه؛ ویژگی‌های مشترک اعضای تیم ما.</p></div><div className="teamgrid">{staff.map(s=><article className="teammate" key={s.name}><img src={s.img} alt={s.name}/><div><h3>{s.name}</h3><p>{s.role}</p></div></article>)}</div></div></section>
   <section className="comments section" id="comments"><div className="container commentsgrid"><div><div className="eyebrow"><span></span> دیدگاه مشتریان</div><h2>تجربه شما،<br/><em>ارزشمندترین نظر ما</em></h2><p>از تجربه‌تان در برگ برای ما بنویسید. دیدگاه شما پس از بررسی در این بخش نمایش داده می‌شود.</p><div className="rating"><div className="stars"><Star/><Star/><Star/><Star/><Star/></div><b>رضایت مشتریان در اولویت ما است</b></div></div><form className="commentform" onSubmit={submit}><h3>دیدگاه خود را بنویسید</h3><label>نام شما</label><input value={person} onChange={e=>setPerson(e.target.value)} placeholder="نام خود را وارد کنید" required/><label>نظر شما</label><textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="تجربه خود را با ما شریک سازید..." rows="4" required/><button className="btn gold" type="submit">ارسال دیدگاه <ArrowLeft size={17}/></button>{sent&&<div className="success">سپاس از دیدگاه شما! نظر شما برای بررسی ثبت شد.</div>}<small>یادآوری: این نسخه نمایشی است؛ دیدگاه‌ها هنوز در سرور ذخیره نمی‌شوند.</small></form></div></section>
   <section className="contact section" id="contact"><div className="container contactrow"><div><div className="eyebrow"><span></span> در تماس باشید</div><h2>آماده یک <em>تغییر تازه</em> هستید؟</h2><p>برای دریافت معلومات بیشتر درباره خدمات یا دوره‌های آموزشی با ما تماس بگیرید.</p></div><div className="contactinfo"><span><Phone/> شماره تماس: بعداً اضافه می‌شود</span><span><MapPin/> آدرس: کابل، افغانستان</span><span><Clock3/> ساعات کاری: ۸ صبح الی ۸ شب</span></div></div></section>
  </main>
  <footer className="footer"><div className="container footerrow"><a className="brand" href="#home"><span className="brandmark"><Scissors size={22}/></span><span><b>برگ</b><small>آرایشگاه و آکادمی مردانه</small></span></a><p>زیبایی در جزئیات است؛ مهارت در تمرین.</p><div className="social"><a href="#contact" aria-label="اینستاگرام"><Instagram/></a><a href="#contact" aria-label="فیسبوک"><Facebook/></a></div></div><div className="copyright">© تمامی حقوق برای برگ محفوظ است.</div></footer>
 </div>
}
export default App;
