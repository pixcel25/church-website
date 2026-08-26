import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const navItems = [
  ['Home', '/'],
  ['Committees', '/committees'],
  ['Gallery', '/gallery'],
  ['Chapels', '/chapels'],
  ['History', '/history'],
  ['Booking', '/booking'],
]

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const link = (label, path) => (
    <a
      key={path}
      href={path}
      onClick={(event) => { event.preventDefault(); setOpen(false); navigate(path) }}
      className="rounded px-3 py-2 text-sm font-bold text-white transition hover:bg-white/15"
    >{label}</a>
  )

  return <header className="fixed inset-x-0 top-0 z-20 bg-white shadow-lg">
    <div className={`mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 transition-all ${scrolled ? 'h-16' : 'h-28'}`}>
      <a href="/" onClick={(event) => { event.preventDefault(); navigate('/') }} className="shrink-0">
        <img src="/pictures/church-logo.jpg" alt="Mother of God Church logo" className={`rounded-full object-cover transition-all ${scrolled ? 'h-12 w-12 opacity-0 sm:opacity-100' : 'h-20 w-20'}`} />
      </a>
      <h1 className="text-center text-lg font-extrabold text-navy sm:text-2xl">Mother of God Church, Pomburpa</h1>
    </div>
    <nav className="border-b-4 border-gold bg-navy px-3 py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between sm:justify-center sm:gap-2">
        <div className="hidden sm:flex">{navItems.map(([label, path]) => link(label, path))}</div>
        <button aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)} className="rounded bg-white/10 px-3 py-1 text-2xl text-white sm:hidden">&#9776;</button>
        <a href="#contact" className="rounded px-3 py-2 text-sm font-bold text-white transition hover:bg-white/15">Contact us</a>
      </div>
      {open && <div className="flex flex-col gap-1 border-t border-white/15 pt-2 sm:hidden">{navItems.map(([label, path]) => link(label, path))}</div>}
    </nav>
  </header>
}

function Footer() {
  return <>
    <div className="mx-auto my-8 max-w-7xl rounded-xl border-4 border-gold bg-gold px-4 py-3 text-center font-bold text-navy">Mass Timings: Mon-Sat 7:00 AM, Sunday: 7:00 AM and 9:00 AM<br />Holy hour on the first Friday of the month at 7 PM</div>
    <footer id="contact" className="grid gap-8 rounded-t-2xl bg-navy px-6 py-10 text-center text-sm font-semibold text-white md:grid-cols-3">
      <div><iframe className="mx-auto h-48 w-full max-w-sm rounded-xl border-2 border-gold" title="Map to Mother of God Church" loading="lazy" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123036.52092362508!2d73.73651424285326!3d15.490279148135633" /><p className="mt-3">For site issues contact <a className="text-gold underline" href="https://www.instagram.com/pixcel25/" target="_blank" rel="noreferrer">developer</a>.</p></div>
      <p>Contact us at:<br />Email: <a className="text-gold" href="mailto:maededeuspomburpa@gmail.com">maededeuspomburpa@gmail.com</a><br />Phone: 09260790582</p>
      <p>Our social media:<br /><a className="text-gold" href="https://www.instagram.com/maededeus425" target="_blank" rel="noreferrer">Instagram (main)</a><br /><a className="text-gold" href="https://www.instagram.com/parish_youth_pomburpa" target="_blank" rel="noreferrer">Instagram (youth)</a><br /><a className="text-gold" href="https://youtube.com/@maededeuspomburpa1600" target="_blank" rel="noreferrer">YouTube</a></p>
    </footer>
  </>
}

function Page({ children }) { return <><Header /><main className="mx-auto max-w-7xl px-4 pb-4 pt-40 sm:pt-48">{children}</main><Footer /></> }
function Title({ children }) { return <h2 className="mb-6 bg-ink px-5 py-4 text-center text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">{children}</h2> }
function Card({ children, className = '' }) { return <div className={`rounded-2xl border-4 border-transparent bg-[#e8c882] p-5 shadow-sm transition hover:border-gold ${className}`}>{children}</div> }

function Home() { return <Page>
  <Title>First Novena</Title>
  <div className="mx-auto mb-10 max-w-4xl overflow-hidden rounded-2xl shadow-xl"><iframe className="aspect-video w-full" title="First Novena" src="https://www.youtube.com/embed/ZCI3L-Jm0q8" allowFullScreen /></div>
  <div className="mb-10 flex items-center gap-5 rounded-xl border-2 border-navy bg-white p-5"><img src="/pictures/dyc-logo.png" alt="DYC logo" className="w-28" /><p className="flex-1 text-center text-3xl font-semibold text-navy">Pilgrims of hope</p></div>
  <section className="grid gap-6 md:grid-cols-2"><img src="/pictures/church.jpg" alt="Mother of God Church" className="w-full rounded-2xl object-cover shadow-lg" /><Card><p className="leading-relaxed">The Mother of God Church (Mae de Deus Church) in Pomburpa is a historic Catholic parish church in North Goa. Founded in 1590, it is known for its Mannerist Neo-Roman style and picturesque riverside location. The church was donated to the Franciscans on 11th June 1604 and later rebuilt in the 18th century. Its annual feast is celebrated on February 2nd, the Feast of the Purification of Our Lady.</p></Card></section>
  <Title>Message from Parish Priest</Title><section className="grid items-center gap-6 md:grid-cols-[auto_1fr]"><Profile image="/pictures/fr-pic.png" name="Fr. Agnelo Rodrigues" role="Parish priest" /><Card><p className="leading-relaxed">Dear Parishioners, I am delighted to share the wonderful news of our parish website’s redesign. Our parish strives to promote media literacy and responsible use of technology. By leveraging digital platforms, we aim to foster connection, share the Good News, and strengthen the bonds within our parish community. With my prayers and blessings.</p></Card></section>
  <Title>Message from Deacon</Title><section className="grid items-center gap-6 md:grid-cols-[auto_1fr]"><Profile image="/pictures/jofyho.jpg" name="Dcn. Jofhuo Fernandes" role="Seminarian" /><Card><p className="leading-relaxed">It is a blessing and a joy to serve as a Deacon at the Mother of God Church, Pomburpa. In close collaboration with our Parish Priest, I look forward to helping our parish grow ever more deeply in faith, love, and hope. I invite all parishioners to join me in a spirit of cooperation and fraternal communion.</p></Card></section>
</Page> }
function Profile({ image, name, role }) { return <div className="rounded-2xl bg-gold p-4 text-center font-bold text-navy"><img src={image} alt={name} className="mx-auto h-48 w-36 rounded-xl object-cover" /><p className="mt-2">{name}<br /><span className="font-normal">{role}</span></p></div> }

const members = [['FABRICA EXCO', [['ar.jpg','Fr. Agnelo Rodrigues','President'],['jp.jpg','Joseph Pereira','Vice-Coordinator'],['santan.jpg','Santan Fernandes','Treasurer'],['ad.jpg','Antonieta De DeSouza','Member'],['al.jpg','Antonette Lobo','Member']]], ['PPC EXCO', [['janet.jpg',"Janet D'silva",'Moderator'],['kenny.jpg',"Kenny D'cruz",'Vice-Moderator'],['Hazel.jpg',"Hazel D'Silva",'Secretary'],['smita.jpg','Smita Rodrigues','Vice-Secretary'],['santan.jpg','Santan Fernandes','Treasurer']]], ['YOUTH EXCO', [['kallen.jpg',"Kallen D'cruz",'Coordinator'],['Valencie.jpg','Valencie Fernandes','Vice-Coordinator'],['alyssa.jpg','Alyssa Fernandes','Secretary'],['andrew.jpg','Andrew Pinto','Vice-Secretary'],['joyston.jpg','Joyston Lobo','Treasurer']]], ['CATECHISTS EXCO', [['dwena.jpg','Dwena Ribeiro','Coordinator'],['valerie.jpg','Valery Fernandes','Vice-Coordinator'],['erica.jpg','Erica Pereira','Secretary'],['joane.jpg','Joyanne De Souza','Treasurer']]]]
function Committees() { return <Page>{members.map(([group, people]) => <section key={group} className="mb-8"><Title>{group}</Title><div className="flex flex-wrap justify-center gap-5">{people.map(([image, name, role]) => <Card key={name} className="w-44 text-center font-semibold"><img src={`/pictures/${image}`} alt={name} className="mx-auto h-52 w-36 rounded-xl object-cover" /><p className="mt-3">{name}<br /><span className="font-normal">{role}</span></p></Card>)}</div></section>)}<Title>Society of St. Vincent de Paul</Title><img src="/pictures/ssvg.jpg" alt="Society of St. Vincent de Paul" className="mx-auto max-w-xl rounded-2xl" /></Page> }
function Gallery() { const events = [['5-a-side Football Tournament','DN0lyER5NAp'],['Marian Procession','DPTziZcEwCK'],['Youth Inaugural Mass','DLfIGRzyHtD'],['Our Lady of Assumption Feast','DNXP7tjzeXt'],['Grand Parents Day Celebration','DMnkAjsTq0c'],['Parish Youth','DLfaV1MSiDZ']]; return <Page><Title>Gallery</Title><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{events.map(([name, id]) => <Card key={id} className="p-3"><h3 className="mb-3 bg-ink p-3 text-center font-bold text-white">{name}</h3><a href={`https://www.instagram.com/reel/${id}/`} target="_blank" rel="noreferrer" className="block bg-white p-6 text-center text-navy underline">View event on Instagram</a></Card>)}</div></Page> }
function Chapels() { const chapels = [['St Sebastian Chapel','stseb.jpg','4 February','https://maps.app.goo.gl/wByRYTizieFFNtsq9'],['Nossa Senhora de Boa Viagem','chapel2.jpg','3 February','https://maps.app.goo.gl/9dnpbyJB6oh98NQi8'],['St Augustias Chapel','augtias.jpg','16 October','https://maps.app.goo.gl/DFqajLC9NDzDq4KU7']]; return <Page><Title>Chapels</Title><div className="flex flex-wrap justify-center gap-6">{chapels.map(([name, image, feast, location]) => <Card key={name} className="w-full max-w-sm p-0 pb-5 text-center"><h3 className="bg-ink p-4 text-xl font-bold text-white">{name}</h3><img src={`/pictures/${image}`} alt={name} className="h-72 w-full object-cover" /><p className="my-3"><b>Feast:</b> {feast}</p><a href={location} target="_blank" rel="noreferrer" className="font-bold text-purple-800 underline">Location</a></Card>)}</div></Page> }
function Booking() { return <Page><Title>Hall Booking</Title><div className="flex flex-wrap justify-center gap-5">{['hallpic1.jpg','hallpic2.jpg','hallpic3.jpg'].map((image) => <img key={image} src={`/pictures/${image}`} alt="Pomburpa hall" className="w-full max-w-sm rounded-2xl shadow-lg" />)}</div><Card className="mt-8 text-lg leading-relaxed"><b>Welcome to Pomburpa Hall, the perfect venue for every celebration.</b> Our elegant party hall offers style, comfort, and functionality for birthdays, weddings, anniversaries, corporate gatherings, and social events. With spacious interiors, adjustable lighting, flexible seating, sound and lighting systems, a stage, dance floor, ample parking, clean restrooms, and easy accessibility, we can help make your special moment unforgettable. For more details, contact us.</Card></Page> }
function History() { const oldPics = Array.from({ length: 10 }, (_, index) => `c${index + 1}.jpg`); return <Page><Title>Church Archives</Title><div className="flex flex-wrap justify-center gap-4">{oldPics.map((image) => <img key={image} src={`/pictures/${image}`} alt="Church archive" className="w-full max-w-xs rounded-lg shadow-lg transition hover:scale-105" />)}</div><Title>Chapels of Pomburpa</Title><Card className="mb-6 leading-relaxed"><b>Boa Viagem Kopel (Chapel of Our Lady of Good Journey)</b><br />1500 meters in distance is the chapel of Boa Viagem in the Palmar waddo. This chapel was blessed on 10th May 1938 and stands on the bank of the river. The center altar holds the statue of Our Lady of Good Journey, with St. Francis Xavier and St. Sebastian beside it.<br /><br /><b>Sant Sebastiao Kopel (Chapel of St. Sebastian)</b><br />This chapel lies in Morodd waddo, 3500 meters away from the church. The village was given permission to celebrate this saint’s feast from 26th January 1913.<br /><br /><b>Augustias Kopel</b><br />The chapel is in Golna Waddo, 2,600 meters away from the church. The present chapel was blessed on 6th November 1897 and renovated in 1980.</Card><Title>The Village Church And Its History</Title><Card className="leading-relaxed"><b>The Beginning</b><br />The Church of Our Lady of Candeia sits imposingly on a hillside overlooking the Mapusa river. Records state that there were seven temples in Pompurpa in the past. Christianity spread through the region and reached Pompurpa before 1590. According to historical records, the Pompurpa Church was established in 1590 and the parish originally comprised Pompurpa and Olaulim.</Card><Title>Parish Priests</Title><div className="flex flex-wrap justify-center gap-5">{[['san.jpg','Late Fr. Santana Carvalho','2005-2012'],['diago.jpg','Late Fr. Agnelo Diogo Francisco Tome Baptisa De Souza','2012-2019'],['george.jpg','Fr. George Norbert Aguier','2019-2025'],['fr-pic.png','Fr. Agnelo Rodrigues','2025-present']].map(([image, name, years]) => <Card key={name} className="w-64 text-center"><img src={`/pictures/${image}`} alt={name} className="mx-auto h-44 w-36 rounded-xl object-cover" /><p className="mt-3 font-bold">{name}</p><p>Parish priest from {years}</p></Card>)}</div></Page> }

function App() { const [path, setPath] = useState(window.location.pathname); useEffect(() => { const onPopState = () => { setPath(window.location.pathname); window.scrollTo(0, 0) }; window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState) }, []); const PageComponent = { '/': Home, '/committees': Committees, '/gallery': Gallery, '/chapels': Chapels, '/history': History, '/booking': Booking }[path] || Home; return <PageComponent /> }

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
