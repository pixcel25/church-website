// React runtime APIs used by the application and its client-side router.
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

/*
 * Component map:
 * - Header and Footer provide the shared site chrome.
 * - Page, Title, Card, and Profile keep repeated presentation consistent.
 * - Home, Committees, Gallery, Chapels, Booking, and History are route pages.
 * - App is the lightweight path-based router used by this static Vite site.
 */

// Navigation labels and URL paths shared by the desktop and mobile menus.
const navItems = [
  ['Home', '/'],
  ['Committees', '/committees'],
  ['Gallery', '/gallery'],
  ['Chapels', '/chapels'],
  ['History', '/history'],
  ['Booking', '/booking'],
]

// Change routes without a full-page reload, preserving the single-page app experience.
function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function scrollToContact(event) {
  event.preventDefault()
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState({}, '', `${window.location.pathname}#contact`)
}

// Fixed site header with responsive navigation and scroll-aware sizing.
function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Shrink the brand row after the visitor begins scrolling to preserve space.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Build links that use the client-side router instead of browser navigation.
  const link = (label, path) => (
    <a
      key={path}
      href={path}
      onClick={(event) => { event.preventDefault(); setOpen(false); navigate(path) }}
      className="rounded px-3 py-2 text-sm font-bold text-white transition hover:bg-white/15"
    >{label}</a>
  )

  return <header className="fixed inset-x-0 top-0 z-20 bg-white shadow-lg">
    <div className={`mx-auto flex max-w-7xl items-center justify-center gap-2 px-3 transition-all sm:gap-4 sm:px-4 ${scrolled ? 'h-14 sm:h-16' : 'h-20 sm:h-28'}`}>
      <a href="/" onClick={(event) => { event.preventDefault(); navigate('/') }} className="shrink-0">
        <img src="/pictures/church-logo.jpg" alt="Mother of God Church logo" className={`rounded-full object-cover transition-all ${scrolled ? 'h-10 w-10 sm:h-12 sm:w-12' : 'h-12 w-12 sm:h-20 sm:w-20'}`} />
      </a>
      <h1 className="min-w-0 text-center text-sm font-extrabold leading-tight text-navy sm:text-2xl">Mother of God Church, Pomburpa</h1>
    </div>
    <nav className="relative border-b-4 border-gold bg-navy px-2 py-1.5 sm:px-3 sm:py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between sm:justify-center sm:gap-2">
        <div className="hidden sm:flex">{navItems.map(([label, path]) => link(label, path))}</div>
        <button type="button" aria-label="Toggle navigation" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="rounded bg-white/10 px-3 py-1 text-sm font-bold text-white transition hover:bg-white/15 sm:hidden">{open ? 'Close' : 'Menu'}</button>
        <a href="#contact" onClick={scrollToContact} className="rounded px-2 py-2 text-xs font-bold text-white transition hover:bg-white/15 sm:px-3 sm:text-sm">Contact us</a>
      </div>
      {open && <div id="mobile-navigation" className="absolute inset-x-0 top-full flex flex-col gap-1 border-t border-white/15 bg-navy px-3 py-2 shadow-lg sm:hidden">{navItems.map(([label, path]) => link(label, path))}</div>}
    </nav>
  </header>
}

// Footer contains the map, contact details, social links, and mass schedule.
function Footer() {
  return <>
    <div className="mx-auto my-8 max-w-7xl rounded-xl border-4 border-gold bg-gold px-4 py-3 text-center font-bold text-navy">Mass Timings: Mon-Sat 7:00 AM, Sunday: 7:00 AM and 9:00 AM<br />Holy hour on the first Friday of the month at 7 PM</div>
    <footer id="contact" className="scroll-mt-24 grid items-center gap-8 rounded-t-2xl bg-navy px-6 py-10 text-center text-sm font-semibold text-white sm:scroll-mt-40 md:grid-cols-3">
      <div className="min-w-0"><iframe className="mx-auto h-48 w-full max-w-sm rounded-xl border-2 border-gold" title="Map to Mother of God Church" loading="lazy" src="https://www.google.com/maps?q=Mother+of+God+Church,+Pomburpa,+Goa&output=embed" /><p className="mt-3">For site issues contact <a className="text-gold underline" href="https://www.instagram.com/pixcel25/" target="_blank" rel="noreferrer">developer</a>.</p></div>
      <p className="min-w-0">Contact us at:<br />Email: <a className="break-all text-gold" href="mailto:maededeuspomburpa@gmail.com">maededeuspomburpa@gmail.com</a><br />Phone: 09260790582</p>
      <p>Our social media:<br /><a className="text-gold" href="https://www.instagram.com/maededeus425" target="_blank" rel="noreferrer">Instagram (main)</a><br /><a className="text-gold" href="https://www.instagram.com/parish_youth_pomburpa" target="_blank" rel="noreferrer">Instagram (youth)</a><br /><a className="text-gold" href="https://youtube.com/@maededeuspomburpa1600" target="_blank" rel="noreferrer">YouTube</a></p>
    </footer>
  </>
}

// Shared page shell keeps the fixed header from covering page content.
function Page({ children }) { return <><Header /><main className="mx-auto max-w-7xl px-4 pb-4 pt-32 sm:pt-48">{children}</main><Footer /></> }
// Consistent section heading used throughout every page.
function Title({ children }) { return <h2 className="mb-6 mt-10 bg-ink px-5 py-4 text-center text-2xl font-extrabold uppercase tracking-wide text-white first:mt-0 sm:text-3xl">{children}</h2> }
// Reusable content card with the site's shared background, border, and hover style.
function Card({ children, className = '' }) { return <div className={`rounded-2xl border-4 border-transparent bg-[#e8c882] p-5 shadow-sm transition hover:border-gold ${className}`}>{children}</div> }

// Home page content, including the video, parish introduction, and staff messages.
function Home() { return <Page>
  <Title>Fest 2026</Title>
  <div className="mx-auto mb-10 max-w-4xl overflow-hidden rounded-2xl shadow-xl"><iframe className="aspect-video w-full" title="Fest 2026" src="https://www.youtube.com/embed/-lijSq8J_3A" allowFullScreen /></div>
   <div className="mb-10 flex items-center gap-3 rounded-xl border-2 border-navy bg-white p-3 sm:gap-5 sm:p-5"><img src="/pictures/dyc-logo.png" alt="DYC logo" className="w-20 shrink-0 sm:w-28" /><p className="min-w-0 flex-1 text-center text-xl font-semibold text-navy sm:text-3xl">Pilgrims of hope</p></div>
  <section className="grid gap-6 md:grid-cols-2"><img src="/pictures/church.jpg" alt="Mother of God Church" className="w-full rounded-2xl object-cover shadow-lg" /><Card><p className="leading-relaxed">The Mother of God Church (Mae de Deus Church) in Pomburpa is a historic Catholic parish church in North Goa. Founded in 1590, it is known for its Mannerist Neo-Roman style and picturesque riverside location.<br /><br />The church was founded by Franciscan Tertiaries Luisa da Madre de Deus and Ana de Santa Maria - a daughter and a mother. It was donated to the Franciscans on 11th June 1604 and was later rebuilt or remodeled in the 18th century. It features a distinctive &quot;Franciscan&quot; facade with a single nave, a tile roof, and flanking towers. Inside, the Goan Rococo design includes elaborate stucco work and a main reredos (altarpiece) influenced by the St. Cajetan church in Old Goa.<br /><br />The annual church feast is celebrated on February 2nd, the Feast of the Purification of Our Lady (also known as Our Lady of Candelaria). This festival has historically been associated with the blessing of candles. The feast was historically known for a popular saying, &quot;The Pomburpa festivals are not for the poor,&quot; due to the lavish displays of wealth by landowners and gentry.</p></Card></section>
   <Title>Message from Parish Priest</Title><section className="grid items-start gap-6 md:grid-cols-[auto_1fr]"><Profile image="/pictures/fr-pic.png" name="Fr. Agnelo Rodrigues" role="Parish priest" /><Card className="flex items-center"><p className="text-base leading-relaxed sm:text-lg">Dear Parishioners,<br /><br />I am delighted to share the wonderful news of our parish website’s redesign. This initiative is a significant step toward making our online presence more accessible, engaging, and user-friendly for all members of our community and beyond.<br /><br />Our Parish strives to promote media literacy and responsible use of technology. By leveraging digital platforms, we aim to foster connection, share the Good News, and strengthen the bonds within our parish community and with those beyond our borders.<br /><br />As we celebrate this milestone, I extend my heartfelt gratitude to the Parish Team especially Rylan and Gleena for their dedication to building a vibrant and inclusive digital space. I encourage all parishioners to explore our redesigned website, engage with its resources, and use these tools to grow in faith and community. Let us embrace these opportunities to remain fully human and guide this technological era toward serving a good purpose, in line with our mission to be a welcoming and faith-filled community.<br /><br />With my prayers and blessings,<br />Parish Priest</p></Card></section>
    <Title>Message from Deacon</Title><section className="grid items-start gap-6 md:grid-cols-[auto_1fr]"><Profile image="/pictures/kennedy.jpeg" name="Dcn. Kennedy Fernandes" role="Seminarian" /><Card className="flex items-center"><p className="text-base leading-relaxed sm:text-lg">It gives me immense Joy to carry forward my Diaconate ministry and be of service at Mother of God Church, Pomburpa. Being Part of this parish is indeed  a blessing for me and an opportunity to understand the Parishioners, learn anew and Grow in experience of Christ through service.
    The pastoral theme: "Abide in me" (Jn 15:4) is a reminder that our Parish will flourish only when Christ remains at its centre. So let's collaborate and journey together always rooted in the Word, Formed through Catechises and celebrating our faith in the Eucharist through Liturgy. Therefore,by these means a deeply rooted faith will enable all of us to withstand every storm and bear lasting fruits of holiness.May God bless us, our endeavours, our families and give us the Necessary Grace.</p></Card></section>
</Page> }
// Staff profile card used for the priest and deacon introductions.
function Profile({ image, name, role }) { return <div className="rounded-2xl bg-gold p-4 text-center font-bold text-navy"><img src={image} alt={name} className="mx-auto h-48 w-36 rounded-xl object-cover" /><p className="mt-2">{name}<br /><span className="font-normal">{role}</span></p></div> }

const members = [['FABRICA EXCO', [['ar.jpg','Fr. Agnelo Rodrigues','President'],['jp.jpg','Joseph Pereira','Vice-Coordinator'],['santan.jpg','Santan Fernandes','Treasurer'],['ad.jpg','Antonieta De DeSouza','Member'],['al.jpg','Antonette Lobo','Member']]], ['CONFRARIA', [['antony.jpeg','Antonio Gonsalves','President'],['peter.jpeg','Peter Franco','Treasurer'],['felix.jpeg','Emidio Felix Da Silva','Attorney'],['russell (1).jpeg','Russell Lobo','Member'],['victor.jpeg','Victor Fernandes','Member']]], ['PPC EXCO', [['janet.jpg',"Janet D'silva",'Moderator'],['kenny.jpg',"Kenny D'cruz",'Vice-Moderator'],['Hazel.jpg',"Hazel D'Silva",'Secretary'],['smita.jpg','Smita Rodrigues','Vice-Secretary'],['santan.jpg','Santan Fernandes','Treasurer']]], ['YOUTH EXCO', [['kallen.jpg',"Kallen D'cruz",'Coordinator'],['Valencie.jpg','Valencie Fernandes','Vice-Coordinator'],['alyssa.jpg','Alyssa Fernandes','Secretary'],['andrew.jpg','Andrew Pinto','Vice-Secretary'],['joyston.jpg','Joyston Lobo','Treasurer']]], ['CATECHISTS EXCO', [['dwena.jpg','Dwena Ribeiro','Coordinator'],['valerie.jpg','Valery Fernandes','Vice-Coordinator'],['erica.jpg','Erica Pereira','Secretary'],['joane.jpg','Joyanne De Souza','Treasurer']]]]
function Committees() { return <Page>{members.map(([group, people]) => <section key={group} className="mb-8"><Title>{group}</Title><div className="flex flex-wrap justify-center gap-5">{people.map(([image, name, role]) => <Card key={name} className="w-52 text-center font-semibold"><img src={`/pictures/${image}`} alt={name} className="mx-auto h-52 w-36 rounded-xl object-cover" /><p className="mt-3">{name}<br /><span className="font-normal">{role}</span></p></Card>)}</div></section>)}<Title>Society of St. Vincent de Paul</Title><img src="/pictures/ssvg.jpg" alt="Society of St. Vincent de Paul" className="mx-auto max-w-xl rounded-2xl" /></Page> }
function Gallery() { const events = [['5-a-side Football Tournament','DN0lyER5NAp'],['Marian Procession','DPTziZcEwCK'],['Youth Inaugural Mass','DLfIGRzyHtD'],['Our Lady of Assumption Feast','DNXP7tjzeXt'],['Grand Parents Day Celebration','DMnkAjsTq0c'],['Parish Youth','DLfaV1MSiDZ']]; return <Page><Title>Gallery</Title><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{events.map(([name, id]) => <Card key={id} className="p-3"><h3 className="mb-3 bg-ink p-3 text-center font-bold text-white">{name}</h3><a href={`https://www.instagram.com/reel/${id}/`} target="_blank" rel="noreferrer" className="block bg-white p-6 text-center text-navy underline">View event on Instagram</a></Card>)}</div></Page> }
function Chapels() { const chapels = [['St Sebastian Chapel','stseb.jpg','4 February','https://maps.app.goo.gl/wByRYTizieFFNtsq9'],['Nossa Senhora de Boa Viagem','chapel2.jpg','3 February','https://maps.app.goo.gl/9dnpbyJB6oh98NQi8'],['St Augustias Chapel','augtias.jpg','16 October','https://maps.app.goo.gl/DFqajLC9NDzDq4KU7']]; return <Page><Title>Chapels</Title><div className="flex flex-wrap justify-center gap-6">{chapels.map(([name, image, feast, location]) => <Card key={name} className="w-full max-w-sm p-0 pb-5 text-center"><h3 className="flex h-24 items-center justify-center bg-ink px-4 text-xl font-bold leading-tight text-white">{name}</h3><img src={`/pictures/${image}`} alt={name} className="h-72 w-full object-cover" /><p className="my-3"><b>Feast:</b> {feast}</p><a href={location} target="_blank" rel="noreferrer" className="font-bold text-purple-800 underline">Location</a></Card>)}</div></Page> }
 function Booking() { return <Page><Title>Hall Booking</Title><div className="flex flex-wrap justify-center gap-5">{['hallpic1.jpg','hallpic2.jpg','hallpic3.jpg'].map((image) => <img key={image} src={`/pictures/${image}`} alt="Pomburpa hall" className="w-full max-w-sm rounded-2xl shadow-lg" />)}</div><Card className="mt-8 text-lg leading-relaxed"><b>Welcome to Pomburpa hall – The Perfect Venue for Every Celebration</b><br /><br />At Pomburpa, we believe every occasion deserves to be truly unforgettable. Our elegant party hall offers the perfect blend of style, comfort, and functionality, making it an ideal venue for birthdays, weddings, anniversaries, corporate gatherings, and special social events.<br /><br />Designed with spacious interiors and a warm ambiance, the hall can be customized to suit your theme and requirements. With modern décor, adjustable lighting, and flexible seating arrangements, we create the perfect atmosphere for both intimate gatherings and grand celebrations.<br /><br />Our venue is fully equipped with state-of-the-art sound and lighting systems to keep the energy alive throughout your event. A dedicated stage and dance floor add a lively touch, ensuring entertainment and joy for every guest. For added convenience, we provide ample parking, clean restrooms, and easy accessibility.<br /><br />At Pomburpa hall, we pride ourselves on attention to detail and exceptional service.<br /><br />Celebrate life’s most special moments in a space where memories are made. Book pomburpa hall today and let us turn your celebration into a truly remarkable experience. For more details contact us.</Card></Page> }
function History() { const oldPics = Array.from({ length: 10 }, (_, index) => `c${index + 1}.jpg`); return <Page><Title>Church Archives</Title><div className="flex flex-wrap justify-center gap-4">{oldPics.map((image) => <img key={image} src={`/pictures/${image}`} alt="Church archive" className="w-full max-w-xs rounded-lg shadow-lg transition hover:scale-105" />)}</div><Title>Chapels of Pomburpa</Title><Card className="mb-6 leading-relaxed"><b>Boa Viagem Kopel (Chapel of Our Lady of Good Journey)</b><br />1500 meters in distance is the chapel of Boa Viagem in the Palmar waddo. This chapel was blessed on 10th May 1938 and stands on the bank of the river. The center altar holds the statue of Our Lady of Good Journey, with St. Francis Xavier and St. Sebastian beside it.<br /><br /><b>Sant Sebastiao Kopel (Chapel of St. Sebastian)</b><br />This chapel lies in Morodd waddo, 3500 meters away from the church. The village was given permission to celebrate this saint’s feast from 26th January 1913.<br /><br /><b>Augustias Kopel</b><br />The chapel is in Golna Waddo, 2,600 meters away from the church. The present chapel was blessed on 6th November 1897 and renovated in 1980.</Card><Title>The Village Church And Its History</Title><Card className="leading-relaxed"><b>The Beginning</b><br />The Church of Our Lady of Candeia sits imposingly on a hillside overlooking the Mapusa river. Records state that there were seven temples in Pompurpa in the past. Christianity spread through the region and reached Pompurpa before 1590. According to historical records, the Pompurpa Church was established in 1590 and the parish originally comprised Pompurpa and Olaulim.</Card><Title>Parish Priests</Title><div className="flex flex-wrap justify-center gap-5">{[['san.jpg','Late Fr. Santana Carvalho','2005-2012'],['diago.jpg','Late Fr. Agnelo Diogo Francisco Tome Baptisa De Souza','2012-2019'],['george.jpg','Fr. George Norbert Aguier','2019-2025'],['fr-pic.png','Fr. Agnelo Rodrigues','2025-present']].map(([image, name, years]) => <Card key={name} className="w-64 text-center"><img src={`/pictures/${image}`} alt={name} className="mx-auto h-44 w-36 rounded-xl object-cover" /><p className="mt-3 font-bold">{name}</p><p>Parish priest from {years}</p></Card>)}</div></Page> }

function App() { const [path, setPath] = useState(window.location.pathname); useEffect(() => { const onPopState = () => { setPath(window.location.pathname); window.scrollTo(0, 0) }; window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState) }, []); const PageComponent = { '/': Home, '/committees': Committees, '/gallery': Gallery, '/chapels': Chapels, '/history': DetailedHistory, '/booking': Booking }[path] || Home; return <PageComponent /> }

// Full historical descriptions restored from the original main branch page.
function DetailedHistory() {
  const oldPics = Array.from({ length: 10 }, (_, index) => `c${index + 1}.jpg`)
  const priests = [
    ['san.jpg', 'Late Fr. Santana Carvalho', 'Vasco da Gama', '2005-2012'],
    ['diago.jpg', 'Late Fr. Agnelo Diogo Francisco Tome Baptisa De Souza', 'Bambolim', '2012-2019'],
    ['george.jpg', 'Fr. George Norbert Aguier', 'Colva', '2019-2025'],
    ['fr-pic.png', 'Fr. Agnelo Rodrigues', 'Socorro', '2025-present'],
  ]

  return <Page>
    <Title>Church Archives</Title>
    <div className="flex flex-wrap justify-center gap-4">
      {oldPics.map((image) => <img key={image} src={`/pictures/${image}`} alt="Church archive" className="w-full max-w-xs rounded-lg shadow-lg transition hover:scale-105" />)}
    </div>

    <Title>Chapels of Pomburpa</Title>
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="leading-relaxed">
        <b>Boa Viagem Kopel (Chapel of Our Lady of Good Journey)</b><br />
        1500 meters in distance is the chapel of Boa Viagem in the Palmar waddo. This chapel was blessed on 10th May 1938 and it stands on the bank of the river. In front of the Chapel is an ark on which it is written: N. S. de Boa Viagem. And on the ark is a statue of Our Lady of Good Journey.<br />
        As one enters the chapel inside on the left side is a stone stating: DONATED BY DAUGHTER AND SON-IN-LAW / OF / MR. FRANCISCO OAÕ PEREIRA / AND / MRS. MARY PEREIRA.<br />
        The center altar holds the statue of Our Lady of Good Journey, below that at the left is a statue of St. Francis Xavier and to the right is St. Sebastian. According to Fr. Moren, there were many fishermen in that area and when they would go out to catch fish they would always have problems, like they would get less fish or their canoes would sink and thus they built this chapel dedicated to Our Lady of Good Journey, for their protection and they would look up to the chapel when in trouble.
      </Card>
      <Card className="leading-relaxed">
        <b>Sant Sebastiao Kopel (Chapel of St. Sebastian)</b><br />
        This chapel lies in Morodd waddo, 3500 meters away from the church. From 26th January 1913 the village was given permission to celebrate this saint's feast. There is only one altar of St. Sebastian: apart from that on the left is a statue of St. Francis Xavier and on the right St. Anthony.<br /><br />
        <b>Augustias Kopel (Augustias Chapel)</b><br />
        The chapel is in Golna Waddo, 2,600 meters away from the church. The main altar is dedicated to Our Lady of Augustias. It is a very old chapel; the front and the corridor of the chapel were made in 1874 and the present chapel was blessed on 6th November 1897. The chapel was enlarged and renovated in 1980.
      </Card>
    </div>

    <Title>The Village Church And Its History</Title>
    <Card className="leading-relaxed">
      <b>THE VILLAGE CHURCH AND ITS HISTORY</b><br /><br />
      <b>The Beginning</b><br />
      "The Church of our Lady of Candeia sits imposingly on a hillside looming over the Mapusa river and looking eastward at the island of Charao and the beautiful country side around." (Furtado, 1985)<br /><br />
      Records state that there were seven temples in Pompburpa in the past; of which two, Santeri (Shantadurga) and Ravalnath, are in the Bicholim taluka today. The family name of the Gaunkaris was then Kamat and there existed seven guilds or clans in the Gaunkari; while today only four remain. When Christianity began to spread in Chodna there were some who did not want to convert, so they left the place and settled in Pompa. However, in a few years Christianity spread also in Pompburpa. The village is not so big and the panchayat comprises Ecoxim, Pompburpa and Olaulim wards, though each falls in a different parish. A part of Ecoxim, which is largely Hindu, belongs to the Sadde-tin firgozo as mentioned before.<br /><br />
      There is a statue of Mother of God in the Pompa Church which is dated 1590, stating that it was established during this year, meaning Christianity had already spread in the village before 1590. Much before Pompa, Saloi (Salvador do Mundo) church was established in 1565, so probably the religion began to spread from then and finally reached Pompburpa. According to Fr. F. X. da Costa (Anais Franciscanos em Bardes, Nova Goa, 1926), the Pompburpa Church was established in 1590 and the parish comprised two gaunkari clans or groups, Pompburpa and Olaulim; today Olaulim has its own church. The Church completed four centuries in 1990 and it was then that a slab was put on the right side of the main church door which reads:<br /><br />
      <i>CHURCH - A GIFT OF LUIZA DA MADRE DE DEUS AND HER MOTHER ANA DE S. MARIA - DIED: 11.06.1604.</i><br /><br />
      On the left there is another slab:<br /><br />
      <i>ECCLESIA / B.M.V. MATRIS DEI / 1590 A.D. / POMBURPA.</i><br /><br />
      Most of the churches in Bardez were built by way of donations from the Comunidades and the public. As records tell us, the Pompburpa church was not so. It was built by two Portuguese ladies, Louisa da Madre de Deus and her mother An'na de Santa Maria. Prior to building this church the villagers were affiliated to the church of Salvador-do-Mundo. Even up to this date the Comunidade of Serula (Saloi) pays for the salary of Peddo (grave digger) and the other members working for the Pompburpa church. The church was dedicated to Mother of God (Dev-Matek: Mae-de-Deus); the church got its name for its devotion to the Mother of God.
    </Card>

    <Title>Parish Priests</Title>
    <div className="flex flex-wrap justify-center gap-5">
      {priests.map(([image, name, location, years]) => <Card key={name} className="w-56 text-center"><img src={`/pictures/${image}`} alt={name} className="mx-auto h-56 w-36 rounded-xl object-cover" /><p className="mt-3 font-semibold">{name}<br /><span className="font-normal">From: {location}<br />Parish priest from: {years}</span></p></Card>)}
    </div>
  </Page>
}

// Mount the application into the root element created in index.html.
createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
