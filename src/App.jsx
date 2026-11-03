import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, X } from 'lucide-react'

const photos = {
  entry: '/images/exterior-dusk.jpg',
  lounge: '/images/lounge-minimal.jpg',
  bedroom: '/images/penthouse-master.jpg',
  pool: '/images/amenities-grid.jpg',
  kitchen: '/images/89ff9c7a9cc100104c3a21c31fdbd83639bd9f3e.jpg',
  dining: '/images/8d3b3820b4041be437388defe81d7503c30f0062.jpg',
  corridor: '/images/060958f36570a12380360562a6c671fadf7432e0.jpg',
  entrance: '/images/images (7).jpg',
}

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About us', to: '/about' },
  { label: 'Rooms', to: '/residences' },
  { label: 'Gallery', to: '/gallery' },
]

const heroSlides = [
  { image: photos.lounge, alt: 'A welcoming lounge at Abus Apartment', caption: 'A WARMER KIND OF WELCOME' },
  { image: photos.entry, alt: 'The entrance to the Abus Apartment residence', caption: 'A PLACE TO ARRIVE' },
  { image: photos.bedroom, alt: 'A private bedroom at Abus Apartment', caption: 'ROOM TO MAKE YOUR OWN' },
  { image: photos.pool, alt: 'The swimming pool at Abus Apartment', caption: 'SPACE TO SLOW DOWN' },
]

const amenities = [
  { number: '01', title: 'Power, considered.', detail: '24/7 power automation.' },
  { number: '02', title: 'A sense of security.', detail: 'Secure, gated access.' },
  { number: '03', title: 'Water, taken care of.', detail: 'Treated water loops.' },
]

const gallery = [
  { image: photos.lounge, alt: 'The apartment living room' },
  { image: photos.kitchen, alt: 'A fitted apartment kitchen' },
  { image: photos.bedroom, alt: 'A private apartment bedroom' },
  { image: photos.pool, alt: 'The apartment swimming pool' },
  { image: photos.dining, alt: 'The apartment dining room' },
  { image: photos.corridor, alt: 'An apartment hallway' },
]

const faqs = [
  {
    question: 'Where is Abus Apartment?',
    answer: 'You will find us at No 29 Marble Hill Road, Okpanam, Delta State, Nigeria.',
  },
  {
    question: 'How can I ask about availability and pricing?',
    answer: 'Send an enquiry to our concierge by phone or WhatsApp. We can share the latest details directly.',
  },
  {
    question: 'What facilities are available?',
    answer: 'The residence has 24/7 power automation, secure gated access and treated water loops.',
  },
  {
    question: 'Can I arrange a visit?',
    answer: 'Contact the concierge and let us know you would like to arrange a visit.',
  },
]

function useRevealOnScroll() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    const revealTargets = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      revealTargets.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            currentObserver.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -9% 0px', threshold: 0.08 },
    )

    revealTargets.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [location.pathname])
}

function Logo({ footer = false }) {
  return (
    <Link className={`brand-lockup${footer ? ' brand-lockup-footer' : ''}`} to="/" aria-label="Abus Apartment — home">
      <img className="brand-logo" src="/images/logo.png" alt="Abus Apartment logo" />
      <span className="brand-type">
        <strong>ABUS</strong>
        <small>APARTMENT</small>
      </span>
    </Link>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24)
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav-shell">
        <Logo />
        <button
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`primary-nav${menuOpen ? ' is-open' : ''}`} id="primary-navigation" aria-label="Main navigation">
          {navigation.map(({ label, to }) => (
            <NavLink className="nav-link" end={to === '/'} key={to} onClick={() => setMenuOpen(false)} to={to}>
              {label}
            </NavLink>
          ))}
          <Link className="nav-enquire" onClick={() => setMenuOpen(false)} to="/contact">
            Enquire <ArrowUpRight size={14} strokeWidth={1.7} />
          </Link>
        </nav>
      </div>
    </header>
  )
}

function Eyebrow({ children, light = false }) {
  return <p className={`eyebrow${light ? ' eyebrow-light' : ''}`}><span />{children}</p>
}

function ButtonLink({ children, to = '/contact', light = false }) {
  return (
    <Link className={`button-link${light ? ' button-link-light' : ''}`} to={to}>
      <span>{children}</span><ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.6} />
    </Link>
  )
}

function Home() {
  const [openFaq, setOpenFaq] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [sliderPaused, setSliderPaused] = useState(false)

  useEffect(() => {
    if (sliderPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [sliderPaused])

  function changeSlide(direction) {
    setActiveSlide((current) => (current + direction + heroSlides.length) % heroSlides.length)
  }

  return (
    <>
      <section
        aria-label="Abus Apartment highlights"
        className="opening"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setSliderPaused(false)
        }}
        onFocus={() => setSliderPaused(true)}
        onMouseEnter={() => setSliderPaused(true)}
        onMouseLeave={() => setSliderPaused(false)}
      >
        <div className="opening-copy">
          <div className="opening-topline"><span>ABUS APARTMENT</span><span>OKPANAM&nbsp; / &nbsp;DELTA STATE</span></div>
          <div className="opening-message">
            <Eyebrow light>A PRIVATE ADDRESS, THOUGHTFULLY MADE</Eyebrow>
            <h1>Come home<br />to a <em>different</em><br /><em>kind of calm.</em></h1>
            <p>A considered residential address in Okpanam, where the details of everyday living are already taken care of.</p>
            <div className="opening-actions">
              <ButtonLink light to="/residences">Discover the rooms</ButtonLink>
              <a className="quiet-link" href="tel:+2348039566143">Call the concierge <span>+234 803 956 6143</span></a>
            </div>
          </div>
          <div className="opening-foot"><span>DESIGNED FOR THE WAY YOU LIVE</span><a href="#introduction" aria-label="Scroll to discover Abus Apartment"><ArrowDown size={16} /></a></div>
        </div>
        <div aria-label="Featured spaces" className="opening-visual" role="region" aria-roledescription="carousel">
          {heroSlides.map((slide, index) => (
            <img
              alt={slide.alt}
              aria-hidden={activeSlide !== index}
              className={`opening-slide${activeSlide === index ? ' is-active' : ''}`}
              fetchPriority={index === 0 ? 'high' : undefined}
              key={slide.image}
              src={slide.image}
            />
          ))}
          <div className="opening-image-shade" />
          <div className="opening-graphic" aria-hidden="true"><span /><i /><b /></div>
          <div aria-live="polite" className="image-index"><span>0{activeSlide + 1}</span><i /> {heroSlides[activeSlide].caption}</div>
          <div className="image-marker"><span>ABUS</span><span>OKPANAM<br />DELTA STATE</span></div>
          <span className="opening-vertical">A HOME IN OKPANAM · DELTA STATE</span>
          <div className="slider-controls">
            <button aria-label="Previous image" onClick={() => changeSlide(-1)} type="button"><ArrowLeft size={16} /></button>
            <div className="slider-pagination" aria-label="Choose a hero image">
              {heroSlides.map((slide, index) => (
                <button
                  aria-label={`Show image ${index + 1}: ${slide.caption.toLowerCase()}`}
                  aria-pressed={activeSlide === index}
                  className={activeSlide === index ? 'is-active' : ''}
                  key={slide.image}
                  onClick={() => setActiveSlide(index)}
                  type="button"
                />
              ))}
            </div>
            <button aria-label="Next image" onClick={() => changeSlide(1)} type="button"><ArrowRight size={16} /></button>
          </div>
        </div>
      </section>

      <div className="address-ribbon" aria-label="Abus Apartment address">
        <span>NO 29 MARBLE HILL ROAD</span><i /><span>OKPANAM, DELTA STATE</span><i /><span>A MORE CONSIDERED ADDRESS</span>
      </div>

      <section className="introduction section-wrap" id="introduction">
        <div className="intro-index" data-reveal><span>01</span><i /> A PLACE WITH INTENTION</div>
        <div className="intro-content" data-reveal>
          <h2>Less noise.<br /><em>More room for life.</em></h2>
          <div className="intro-aside">
            <p>Abus Apartment is a private residential address in Okpanam, Delta State. Thoughtful spaces, quiet comforts and the reassurance of knowing the essentials are in place.</p>
            <ButtonLink to="/about">A little about our approach</ButtonLink>
          </div>
        </div>
        <figure className="intro-image" data-reveal>
          <img src={photos.kitchen} alt="Kitchen interior at Abus Apartment" loading="lazy" />
          <figcaption><span>THE THOUGHTFUL DETAILS</span><span>OKPANAM, NIGERIA</span></figcaption>
        </figure>
        <div className="intro-vertical" aria-hidden="true">A PLACE TO LAND, AND TO BEGIN AGAIN</div>
      </section>

      <section className="residence-preview">
        <div className="residence-preview-top section-wrap" data-reveal>
          <Eyebrow>ROOMS WITH A SENSE OF PLACE</Eyebrow>
          <p>Explore a closer look at life inside Abus.</p>
        </div>
        <div className="editorial-rooms">
          <Link className="room room-large" to="/residences">
            <img src={photos.lounge} alt="Living room at Abus Apartment" loading="lazy" />
            <span className="room-number">01 / THE LIVING SPACES</span>
            <span className="room-copy"><span>Ease into</span><em>the evening.</em><ArrowUpRight size={19} /></span>
          </Link>
          <Link className="room room-bedroom" to="/residences">
            <img src={photos.bedroom} alt="Bedroom interior at Abus Apartment" loading="lazy" />
            <span className="room-number">02 / A PRIVATE RETREAT</span>
            <span className="room-copy"><span>A quieter</span><em>kind of rest.</em><ArrowUpRight size={19} /></span>
          </Link>
          <Link className="room room-pool" to="/residences">
            <img src={photos.pool} alt="Swimming pool at Abus Apartment" loading="lazy" />
            <span className="room-number">03 / A MOMENT OUTSIDE</span>
            <span className="room-copy"><span>Find a little</span><em>room to pause.</em><ArrowUpRight size={19} /></span>
          </Link>
        </div>
        <div className="residence-preview-bottom section-wrap">
          <span>THE SPACES AT ABUS APARTMENT</span>
          <ButtonLink to="/residences">Explore the spaces</ButtonLink>
        </div>
      </section>

      <section className="assurance">
        <div className="assurance-image">
          <img src={photos.entry} alt="Arrival at the Abus Apartment residence" loading="lazy" />
          <span>THE ABUS ADDRESS · OKPANAM</span>
        </div>
        <div className="assurance-copy">
          <Eyebrow light>COMFORT, BUILT INTO THE EVERYDAY</Eyebrow>
          <h2>Peace of mind<br />is part of <em>the plan.</em></h2>
          <p>The important things are considered, so you can settle into the things that matter to you.</p>
          <div className="assurance-list">
            {amenities.map((amenity) => (
              <article className="assurance-item" key={amenity.number}>
                <span>{amenity.number}</span><h3>{amenity.title}</h3><p>{amenity.detail}</p><Check size={15} aria-hidden="true" />
              </article>
            ))}
          </div>
          <ButtonLink light to="/contact">Ask our concierge</ButtonLink>
        </div>
      </section>

      <section className="gallery-section section-wrap">
        <div className="gallery-heading" data-reveal>
          <div><Eyebrow>AN OPEN DOOR, A CLOSER LOOK</Eyebrow><h2>Spaces that speak<br /><em>for themselves.</em></h2></div>
          <ButtonLink to="/gallery">See the gallery</ButtonLink>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <figure className={`gallery-tile gallery-tile-${index + 1}`} data-reveal key={item.image}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <figcaption><span>0{index + 1}</span><ArrowUpRight size={15} /></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <LocationBand />

      <section className="faq-section section-wrap">
        <div className="faq-heading" data-reveal>
          <Eyebrow>A FEW USEFUL THINGS</Eyebrow>
          <h2>Before you<br /><em>make yourself at home.</em></h2>
          <p>Have another question? Our concierge is always a good place to start.</p>
          <ButtonLink>Talk to the concierge</ButtonLink>
        </div>
        <div className="faq-list" data-reveal>
          {faqs.map((faq, index) => (
            <article className={`faq-item${openFaq === index ? ' faq-open' : ''}`} key={faq.question}>
              <button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} type="button">
                <span><small>0{index + 1}</small>{faq.question}</span><ChevronDown size={17} />
              </button>
              <div className="faq-answer"><p>{faq.answer}</p></div>
            </article>
          ))}
        </div>
      </section>

      <ContactInvitation />
    </>
  )
}

function PageIntro({ label, heading, summary }) {
  return (
    <section className="page-intro section-wrap">
      <Eyebrow>{label}</Eyebrow>
      <div className="page-intro-row"><h1>{heading}</h1><p>{summary}</p></div>
    </section>
  )
}

function Residences() {
  return (
    <>
      <PageIntro
        label="A CLOSER LOOK AT ABUS"
        heading={<>A place to live<br /><em>in your own way.</em></>}
        summary="A considered collection of interiors and shared spaces at No 29 Marble Hill Road, Okpanam."
      />
      <section className="spaces-story section-wrap">
        <figure className="spaces-feature" data-reveal>
          <img src={photos.lounge} alt="Living space at Abus Apartment" />
          <figcaption><span>01</span> THE LIVING SPACES</figcaption>
        </figure>
        <div className="spaces-copy" data-reveal>
          <Eyebrow>ROOM TO SETTLE IN</Eyebrow>
          <h2>Make space<br />for <em>the everyday.</em></h2>
          <p>Step inside Abus Apartment. Explore the living areas, private rooms, and considered details in the gallery.</p>
          <ButtonLink to="/gallery">Explore the gallery</ButtonLink>
          <p className="availability-note">For current apartment configurations, availability and pricing, please speak with our concierge.</p>
        </div>
        <figure className="spaces-detail" data-reveal>
          <img src={photos.bedroom} alt="A bedroom interior at Abus Apartment" loading="lazy" />
          <figcaption><span>02</span> A PRIVATE PLACE TO REST</figcaption>
        </figure>
      </section>
      <section className="spaces-facilities">
        <div className="section-wrap facilities-inner">
          <div className="facilities-heading" data-reveal><Eyebrow light>THE ESSENTIALS ARE HERE</Eyebrow><h2>Comfort that<br /><em>doesn’t need explaining.</em></h2></div>
          <div className="facilities-list">
            {amenities.map((amenity) => (
              <div className="facility-row" data-reveal key={amenity.number}><span>{amenity.number}</span><h3>{amenity.title}</h3><p>{amenity.detail}</p><ArrowDownRight size={17} /></div>
            ))}
          </div>
        </div>
      </section>
      <LocationBand />
      <ContactInvitation />
    </>
  )
}

function About() {
  return (
    <>
      <PageIntro
        label="ABOUT ABUS APARTMENT"
        heading={<>A thoughtful address.<br /><em>A Nigerian welcome.</em></>}
        summary="An independently minded residential address in Okpanam, Delta State, grounded in comfort, care and a genuine sense of place."
      />
      <section className="about-story section-wrap">
        <figure className="about-story-image" data-reveal>
          <img src={photos.entry} alt="The Abus Apartment entrance in Okpanam" />
          <figcaption>NO 29 MARBLE HILL ROAD · OKPANAM</figcaption>
        </figure>
        <div className="about-story-copy" data-reveal>
          <Eyebrow>OUR APPROACH</Eyebrow>
          <h2>Comfort is a feeling.<br /><em>Thoughtfulness is how it begins.</em></h2>
          <p>Abus Apartment brings together a welcoming residential setting and practical comforts that make everyday living feel easier.</p>
          <p>From secure gated access to treated water loops and 24/7 power automation, the essentials are part of the address. The rest is space to settle in and make it your own.</p>
          <ButtonLink to="/contact">Meet the concierge</ButtonLink>
        </div>
      </section>
      <section className="about-principles">
        <div className="section-wrap principles-inner">
          <div className="principles-heading" data-reveal><Eyebrow light>A PLACE WITH PURPOSE</Eyebrow><h2>Made for living.<br /><em>Rooted in place.</em></h2></div>
          <div className="principles-list">
            <article data-reveal><span>01</span><h3>Consider the everyday.</h3><p>Thoughtful shared spaces and useful comforts.</p></article>
            <article data-reveal><span>02</span><h3>Feel at ease.</h3><p>Gated access, power automation and treated water.</p></article>
            <article data-reveal><span>03</span><h3>Stay connected to place.</h3><p>A residential address on Marble Hill Road, Okpanam.</p></article>
          </div>
        </div>
      </section>
      <LocationBand />
      <ContactInvitation />
    </>
  )
}

function Gallery() {
  return (
    <>
      <PageIntro
        label="THE ABUS APARTMENT GALLERY"
        heading={<>An invitation<br />to <em>look closer.</em></>}
        summary="Explore the rooms, residential details and shared facilities that make up the Abus address."
      />
      <section className="journal-intro section-wrap" data-reveal>
        <span className="journal-coordinate">OKPANAM &nbsp; / &nbsp; DELTA STATE</span>
        <p>Step inside Abus Apartment.<br /><em>A closer look at the spaces.</em></p>
      </section>
      <section className="journal-mosaic section-wrap">
        {gallery.map((item, index) => (
          <figure className={`mosaic-image mosaic-image-${index + 1}`} data-reveal key={item.image}>
            <img src={item.image} alt={item.alt} loading="lazy" />
            <figcaption><span>ABUS / 0{index + 1}</span><span>{item.alt}</span></figcaption>
          </figure>
        ))}
        <div className="mosaic-note" data-reveal><span>AN ADDRESS APART</span><p>Room for a little more <em>life.</em></p></div>
      </section>
      <LocationBand />
      <ContactInvitation />
    </>
  )
}

function LocationBand() {
  return (
    <section className="location-band">
      <div className="location-mark" aria-hidden="true">A<span>.</span></div>
      <div className="location-copy" data-reveal>
        <Eyebrow light>ROOTED IN OKPANAM</Eyebrow>
        <h2>A familiar road.<br /><em>A different feeling.</em></h2>
        <address>No 29 Marble Hill Road<br />Okpanam, Delta State, Nigeria</address>
      </div>
      <a className="map-link" href="https://maps.google.com/?q=No+29+Marble+Hill+Road,+Okpanam,+Delta+State,+Nigeria" target="_blank" rel="noreferrer">
        <span>OPEN IN MAPS</span><ArrowUpRight size={18} />
      </a>
    </section>
  )
}

function ContactInvitation() {
  return (
    <section className="contact-invitation">
      <span className="invitation-orbit invitation-orbit-one" />
      <span className="invitation-orbit invitation-orbit-two" />
      <div className="invitation-content" data-reveal>
        <Eyebrow light>THE NEXT STEP IS A SIMPLE ONE</Eyebrow>
        <h2>Let’s find your<br /><em>place at Abus.</em></h2>
        <p>For enquiries about the residence, availability or a visit, our concierge is here to help.</p>
        <ButtonLink light>Start a conversation</ButtonLink>
      </div>
      <span className="invitation-index">ABUS APARTMENT&nbsp; / &nbsp;OKPANAM</span>
    </section>
  )
}

function Concierge() {
  const [form, setForm] = useState({ name: '', email: '', interest: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const whatsappText = encodeURIComponent(
    `Hello Abus Apartment, my name is ${form.name}${form.email ? ` (${form.email})` : ''}. I am enquiring about ${form.interest || 'the residence'}.${form.message ? ` ${form.message}` : ''}`,
  )

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setSubmitted(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageIntro
        label="THE ABUS CONCIERGE"
        heading={<>Good things begin<br /><em>with a conversation.</em></>}
        summary="Tell us what you would like to know. We’ll help you with the next step."
      />
      <section className="concierge-layout section-wrap">
        <div className="concierge-aside" data-reveal>
          <figure><img src={photos.entrance} alt="The entrance to the Abus Apartment residence" /><figcaption>YOUR ADDRESS IN OKPANAM</figcaption></figure>
          <div className="concierge-coordinates"><span>FIND YOUR WAY HERE</span><address>No 29 Marble Hill Road<br />Okpanam, Delta State<br />Nigeria</address></div>
          <a className="concierge-phone" href="tel:+2348039566143"><span>CALL THE CONCIERGE</span><strong>+234 803 956 6143</strong><ArrowUpRight size={17} /></a>
          <a className="concierge-whatsapp" href="https://wa.me/2348039566143" target="_blank" rel="noreferrer">OPEN WHATSAPP <ArrowUpRight size={15} /></a>
        </div>
        <div className="concierge-form-wrap" data-reveal>
          <div className="form-heading"><Eyebrow>WE’RE LISTENING</Eyebrow><h2>What can we<br /><em>help you with?</em></h2></div>
          <form className="concierge-form" onSubmit={handleSubmit}>
            <label htmlFor="enquiry-name">Your name<input id="enquiry-name" autoComplete="name" name="name" onChange={updateField} placeholder="How should we address you?" required value={form.name} /></label>
            <label htmlFor="enquiry-email">Email address<input id="enquiry-email" autoComplete="email" name="email" onChange={updateField} placeholder="you@example.com" type="email" value={form.email} /></label>
            <label htmlFor="enquiry-interest">I’d like to know about<select id="enquiry-interest" name="interest" onChange={updateField} required value={form.interest}>
              <option disabled value="">Choose a subject</option>
              <option>the residence</option><option>availability and pricing</option><option>arranging a visit</option><option>something else</option>
            </select></label>
            <label htmlFor="enquiry-message">A note for our concierge<textarea id="enquiry-message" name="message" onChange={updateField} placeholder="Share any details you think would be helpful." rows="3" value={form.message} /></label>
            <button className="form-submit" type="submit">PREPARE MY ENQUIRY <ArrowUpRight size={16} /></button>
            {submitted && <div aria-live="polite" className="form-confirmation"><p>Your enquiry is ready. Continue in WhatsApp to send it to the concierge.</p><a href={`https://wa.me/2348039566143?text=${whatsappText}`} rel="noreferrer" target="_blank">CONTINUE IN WHATSAPP <ArrowUpRight size={15} /></a></div>}
            <p className="form-note">Your enquiry opens in WhatsApp; no information is submitted to a website server.</p>
          </form>
        </div>
      </section>
    </>
  )
}

function NotFound() {
  return <section className="not-found"><Eyebrow>ABUS APARTMENT</Eyebrow><h1>This address<br /><em>is elsewhere.</em></h1><ButtonLink to="/">Return to the residence</ButtonLink></section>
}

export default function App() {
  useRevealOnScroll()

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content" className="main-content">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Residences />} path="/residences" />
          <Route element={<Gallery />} path="/gallery" />
          <Route element={<Gallery />} path="/journal" />
          <Route element={<Concierge />} path="/contact" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand"><Logo footer /><p>A considered residential address<br />in Okpanam, Delta State.</p></div>
          <div className="footer-nav"><span>EXPLORE</span>{navigation.map(({ label, to }) => <NavLink end={to === '/'} key={to} to={to}>{label}</NavLink>)}</div>
          <div className="footer-contact"><span>FIND US</span><address>No 29 Marble Hill Road<br />Okpanam, Delta State, Nigeria</address><a href="tel:+2348039566143">+234 803 956 6143</a></div>
          <Link className="footer-back-top" to="/" aria-label="Back to top"><ArrowUpRight size={18} /></Link>
        </div>
        <div className="footer-base">        <span>© 2026 ABUS APARTMENT</span><a href="https://wa.me/2348039566143" rel="noreferrer" target="_blank">A CONVERSATION, WHEN YOU’RE READY <ArrowUpRight size={12} /></a><span>OKPANAM · DELTA STATE · NIGERIA</span></div>
      </footer>
    </div>
  )
}
