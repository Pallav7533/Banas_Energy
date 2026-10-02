import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ArrowDownRight, ArrowRight, Calculator, Check, Home, Mail, MapPin, Menu, Phone, Sun, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';

const PHONE = '+91 9825093590';
const PHONE_ALT = '+91 9724066707';
const EMAIL = 'banaspvtltd@gmail.com';
const ADDRESS = '22 RJ Complex, Opp. APMC Market, Lakhani, Tharad, Banaskantha, Gujarat 385545, India';
const WA = '919825093590';
const brandImage = '/brand/banas-energy-logo.jpeg';
const waLink = (message: string) => `https://wa.me/${WA}?text=${encodeURIComponent(message)}`;

const guides = [
  { slug: 'is-your-roof-ready-for-solar', title: 'Is your roof ready for solar?', label: 'Before you begin', image: '/images/homeowner-roof.jpg', intro: 'A rooftop is more than a place to put panels. A little preparation makes the first conversation clearer and helps a site assessment focus on the right questions.', sections: [
    ['Start with the roof itself', 'Think about the roof’s material, age, general condition and any repairs already planned. A solar system is a long-term addition, so it is sensible to discuss roof work before installation planning begins.'],
    ['Notice shade and open space', 'Water tanks, parapet walls, trees and nearby buildings can cast shade or limit usable area. A few clear photographs from different corners can help explain the roof, but an on-site assessment is needed for a proper layout.'],
    ['Bring what you already know', 'A recent electricity bill, property type and approximate roof dimensions are useful starting points. You do not need to have every answer before asking questions.']
  ]},
  { slug: 'understanding-rooftop-solar', title: 'Rooftop solar, in plain language', label: 'Solar basics', image: '/images/panels-detail.jpg', intro: 'A home solar system brings together panels, an inverter, mounting structure and electrical connections. Understanding each part helps homeowners compare options without getting lost in jargon.', sections: [
    ['Panels make electricity', 'Photovoltaic cells in the panels convert sunlight into direct-current electricity. The amount produced changes with sunlight, panel orientation, shading and system design.'],
    ['An inverter makes it usable', 'The inverter converts the electricity into the form used by household appliances. The right configuration depends on the proposed system and the property’s electrical setup.'],
    ['The roof and wiring matter too', 'Mounting, cabling, protections and a careful connection plan are part of the system—not afterthoughts. Ask what equipment is included and how the layout suits your roof.']
  ]},
  { slug: 'grid-tied-or-hybrid-solar', title: 'Grid-tied or hybrid: what is the difference?', label: 'System choices', image: '/images/inverter.jpg', intro: 'Different solar configurations serve different needs. The right conversation starts with how a household uses electricity and what it expects during a grid outage.', sections: [
    ['Grid-connected systems', 'A grid-tied system works alongside the electricity grid. Its design and connection depend on local utility requirements and the property’s electrical arrangements.'],
    ['Hybrid systems and storage', 'A hybrid configuration can include a battery, subject to system design. Storage adds equipment and considerations; it should be explored when backup needs are part of the brief.'],
    ['Ask about your actual use', 'List the appliances you want to run, when they are used, and what should happen during an outage. That is more useful than choosing a system label first.']
  ]},
  { slug: 'reading-your-electricity-bill', title: 'What your electricity bill can—and cannot—tell you', label: 'Planning', image: '/images/home-evening.jpg', intro: 'A monthly bill is a helpful planning clue, not a solar proposal. It gives a starting point for understanding household consumption while leaving important site-specific questions open.', sections: [
    ['Look for energy used', 'Find the billing period and energy-consumption units on the bill. Comparing several months can show whether usage shifts across seasons.'],
    ['Bill amount is not system size', 'The amount due can include charges beyond energy usage. Tariffs, fixed charges and billing arrangements differ, so bill value alone cannot determine a final system size or savings.'],
    ['Use it as a conversation starter', 'A recent bill helps an advisor ask better questions. Pair it with roof details and daily usage patterns for a more grounded discussion.']
  ]},
  { slug: 'solar-roof-space-and-shade', title: 'Roof space, direction and shade', label: 'Roof planning', image: '/images/rooftops-aerial.jpg', intro: 'Every roof is different. Orientation, usable area and shade throughout the day influence how a rooftop layout can be planned.', sections: [
    ['Usable area is not the whole roof', 'Access paths, edges, tanks and other rooftop equipment affect where panels can fit. Leave room for safe access and maintenance.'],
    ['Shade changes through the day', 'A tree or wall may cast a longer shadow in the morning or evening. Observations at different times can be useful, though detailed assessment is still required.'],
    ['Share a simple roof sketch', 'Approximate dimensions and a sketch showing tanks, stair access and nearby obstructions can make a first conversation more productive.']
  ]},
  { slug: 'questions-to-ask-before-a-solar-quote', title: 'Questions to ask before accepting a solar quote', label: 'Buyer’s checklist', image: '/images/solar-home-hero.jpg', intro: 'A clear quote should make it easier to understand what is proposed. These practical questions help homeowners compare scope and assumptions, not just a headline price.', sections: [
    ['What exactly is included?', 'Ask for the equipment list, mounting and electrical scope, installation work, protections and any exclusions to be stated clearly.'],
    ['What assumptions are behind the estimate?', 'Ask how roof conditions, shade, consumption, tariff and system configuration have been considered. Estimated production and savings are not guarantees.'],
    ['Who handles the next steps?', 'Clarify how the site assessment, utility-related process, handover and support are handled. Make sure any terms and responsibilities are written down.']
  ]}
];

function Meta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = description;
    const setOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
      el.content = content;
    };
    setOg('og:title', title); setOg('og:description', description); setOg('og:type', 'website'); setOg('og:image', '/images/solar-home-hero.jpg');
  }, [title, description]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => setOpen(false), [location]);
  const links = [['Home', '/'], ['About Us', '/about'], ['Solutions', '/solutions'], ['Projects', '/projects'], ['Reviews', '/reviews'], ['Blog', '/blog'], ['Contact Us', '/contact']];
  const consultationLink = waLink('Hello Banas Energy, I would like a rooftop solar consultation for my home. Please guide me on the next step.');
  return <>
    <div className="topline"><div className="container topline-inner"><span>Local home-solar guidance for Banaskantha</span><span><a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a> &nbsp;·&nbsp; <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span></div></div>
    <header className="navbar"><div className="container nav-inner">
       <Link href="/" aria-label="Banas Energy home" data-testid="link-brand-home"><img className="brand-logo" src={brandImage} alt="Banas Energy" /></Link>
      <nav className="nav-links" aria-label="Main navigation">{links.map(([label, href]) => <Link key={href} href={href} aria-current={location === href ? 'page' : undefined}>{label}</Link>)}</nav>
      <a className="nav-cta" href={consultationLink} target="_blank" rel="noreferrer">Get Free Solar Consultation <ArrowRight size={15} /></a>
       <button className="menu-button" data-testid="button-mobile-navigation" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}<a href={consultationLink} target="_blank" rel="noreferrer" className="nav-cta">Get Free Solar Consultation <ArrowRight size={15} /></a></nav>}
    </header>
  </>;
}

function Footer() {
  return <footer className="footer"><div className="container">
    <div className="footer-grid">
      <div><img className="footer-logo" src={brandImage} alt="Banas Energy" /><p>Powering a Brighter Future.<br />A local guide to home rooftop solar in Banaskantha.</p><a href={waLink('Hello Banas Energy, I would like to ask about rooftop solar for my home.')}>Start a WhatsApp conversation <ArrowRight size={14} /></a></div>
      <div><h3>Explore</h3><div className="footer-links">{[['About us','/about'],['Home solar solutions','/solutions'],['Illustrative gallery','/projects'],['Homeowner guides','/blog']].map(([t,h])=><Link key={h} href={h}>{t}</Link>)}</div></div>
      <div><h3>Get in touch</h3><div className="footer-links"><a href={`tel:${PHONE.replace(/\s/g,'')}`}>{PHONE}</a><a href={`tel:${PHONE_ALT.replace(/\s/g,'')}`}>{PHONE_ALT}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a><Link href="/contact">Visit / message us</Link></div></div>
      <div><h3>Find us</h3><p>{ADDRESS}</p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noreferrer">Open directions <ArrowRight size={14} /></a><iframe className="footer-map" title="Map search for the Banas Energy address in Lakhani, Tharad, Banaskantha" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`} /></div>
    </div>
    <div className="footer-bottom"><span>© Banas Energy Pvt. Ltd.</span><span><Link href="/privacy-policy">Privacy policy</Link> &nbsp;·&nbsp; <Link href="/terms">Terms</Link></span><span>GSTIN 24ABICS9434J1ZX</span></div>
  </div></footer>;
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="site-shell"><Header /><main>{children}</main><Footer /></div>;
}

function Intro({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image?: string }) {
  return <section className="page-intro"><div className="container"><div className="page-intro-copy"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{text}</p></div>{image && <img className="page-intro-art" src={image} alt="Residential rooftop solar imagery" />}</div></section>;
}

function CTA({ title = 'A good solar conversation starts with your home.', text = 'Tell us what you know so far. We’ll help you understand the next useful step.', message = 'Hello Banas Energy, I would like to discuss rooftop solar for my home.' }: { title?: string; text?: string; message?: string }) {
  return <div className="container" style={{ padding: '38px 0' }}><div className="cta-band"><div><h2>{title}</h2><p>{text}</p></div><a className="button-secondary" href={waLink(message)} target="_blank" rel="noreferrer">Message on WhatsApp <ArrowRight size={16} /></a></div></div>;
}

function BrandMarquee() {
  const names = ['TATA POWER SOLAR', 'ADANI SOLAR', 'WAAREE', 'APSYSTEMS'];
  return <section className="brand-marquee-section" aria-label="Solar brands and technologies homeowners may explore">
    <div className="container brand-marquee-heading"><div><span className="eyebrow">Names of interest only</span><h2>Solar brands & technologies</h2></div><p>Not an affiliation, partnership or supply relationship.</p></div>
    <div className="marquee-viewport" tabIndex={0} aria-label="Scrolling list of solar brands and technologies">
      <div className="marquee-track">{[0,1].map(copy=><div className="marquee-set" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>{names.map(name=><span className="marquee-name" key={name}><Sun size={15}/>{name}</span>)}</div>)}</div>
    </div>
    <p className="marquee-note">Names shown for homeowner awareness only; no endorsement or supplier relationship is implied.</p>
  </section>;
}

function HomePage() {
  return <Shell><Meta title="Banas Energy | Home rooftop solar in Banaskantha" description="Understand residential rooftop solar with Banas Energy, a local home-solar guide in Banaskantha, Gujarat." />
     <section className="hero"><div className="hero-image" role="img" aria-label="Illustrative residential rooftop solar in Gujarat" /><div className="container hero-content"><div className="hero-copy reveal"><div className="eyebrow">Home rooftop solar · Banaskantha</div><h1>Solar for your home.<br /><span className="hero-accent">Made clearer.</span></h1><p>Local guidance to help you understand rooftop solar and decide what makes sense for your home.</p><div className="hero-actions"><a className="button-primary" data-testid="link-home-consultation" href={waLink('Hello Banas Energy, I would like to discuss residential rooftop solar for my home.')} target="_blank" rel="noreferrer">Talk to Banas Energy <ArrowRight size={17} /></a><Link data-testid="link-home-calculator" className="button-secondary" href="/solutions#calculator">Try the solar calculator <Calculator size={17} /></Link></div></div></div></section>
     <section className="home-intro section"><div className="container home-intro-grid"><div><div className="eyebrow">A local starting point</div><h2>Good advice starts with your roof.</h2><p>Every home is different. We’ll help you ask the right questions about your electricity use, roof and options—without the jargon.</p><Link href="/about" className="text-link" data-testid="link-home-about">About Banas Energy <ArrowRight size={16} /></Link></div><img src="/images/homeowner-roof.jpg" alt="Homeowner looking across a residential rooftop with solar panels" /></div></section>
     <section className="home-solar section"><div className="container"><div className="home-solar-heading"><div><div className="eyebrow">Rooftop solar, up close</div><h2>See what could fit your home.</h2></div><p>Illustrative solar imagery. A site assessment is needed to understand your property.</p></div><div className="home-solar-grid"><Link href="/solutions" className="home-solar-photo home-solar-wide" data-testid="link-home-solution"><img src="/images/panels-detail.jpg" alt="Illustrative close view of rooftop solar panels" /><span>Understand the system <ArrowRight size={18}/></span></Link><Link href="/projects" className="home-solar-photo" data-testid="link-home-gallery"><img src="/images/solar-home-hero.jpg" alt="Illustrative home with rooftop solar in a rural setting" /><span>Browse illustrative imagery <ArrowRight size={18}/></span></Link></div><p className="disclaimer home-gallery-note">Gallery imagery is illustrative only and does not represent completed Banas Energy projects.</p></div></section>
     <section className="home-next section"><div className="container home-next-grid"><div><div className="eyebrow">Your next step</div><h2>Bring your questions.<br />We’ll start there.</h2><p>Share your bill, roof details or simply what you want to know.</p><a className="button-primary" data-testid="link-home-whatsapp" href={waLink('Hello Banas Energy, I would like to ask about rooftop solar for my home.')} target="_blank" rel="noreferrer">Message on WhatsApp <ArrowRight size={16}/></a></div><div className="home-facts"><div><span>01</span><p>Talk through your home and electricity use.</p></div><div><span>02</span><p>Understand the practical system choices.</p></div><div><span>03</span><p>Choose whether to explore a site assessment.</p></div></div></div></section>
     <section className="home-trust"><div className="container home-trust-inner"><div><span className="eyebrow">Reviews, honestly</span><h2>Verified reviews are not published yet.</h2><p>We don’t invent testimonials or ratings. Ask us directly about your home.</p></div><Link className="text-link" href="/reviews" data-testid="link-home-reviews">Our reviews approach <ArrowRight size={16}/></Link></div></section>
     <section className="home-contact section"><div className="container home-contact-grid"><div><div className="eyebrow">Local to Banaskantha</div><h2>Find Banas Energy.</h2><p>{ADDRESS}</p><div className="hero-actions"><Link href="/contact" className="button-primary" data-testid="link-home-contact">Contact us <ArrowRight size={16}/></Link><a className="button-secondary" data-testid="link-home-directions" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noreferrer">Get directions <MapPin size={16}/></a></div></div><iframe title="Address-based map search for Banas Energy in Lakhani, Tharad, Banaskantha" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`} /></div></section>
  </Shell>;
}

function AboutPage() {
  return <Shell><Meta title="About Banas Energy | Local rooftop solar guidance" description="Learn about Banas Energy Pvt. Ltd. and its homeowner-focused rooftop solar guidance in Banaskantha, Gujarat." />
    <Intro eyebrow="About Banas Energy" title="Local perspective. Clearer solar conversations." text="Banas Energy Pvt. Ltd. is here to help homeowners around Banaskantha understand residential rooftop solar, ask informed questions and explore their options at their own pace." image="/images/home-evening.jpg" />
     <section className="section"><div className="container split"><div className="image-frame"><img src="/images/homeowner-roof.jpg" alt="A residential rooftop in the Banaskantha region" /><span className="photo-caption">A home-first point of view</span></div><div><div className="eyebrow">The way we work</div><h2 className="serif" style={{ fontSize: 45, fontWeight: 500 }}>Useful answers first.</h2><p style={{ color: '#75645e', lineHeight: 1.8 }}>A solar decision touches your roof, household routines and electricity bill. Our aim is to make those details easier to talk about, explain the parts of a rooftop system in plain language, and keep assumptions visible.</p><p style={{ color: '#75645e', lineHeight: 1.8 }}>Every home is different. A useful estimate depends on property details and an appropriate assessment; no calculator or general guide can replace that conversation.</p><a href={waLink('Hello Banas Energy, I have questions about residential rooftop solar for my home.')} target="_blank" rel="noreferrer" className="button-primary">Talk through your questions <ArrowRight size={16} /></a></div></div></section>
    <section className="section section-soft"><div className="container"><div className="section-heading"><div><div className="eyebrow">Our simple principles</div><h2>Confidence comes from clarity.</h2></div></div><div className="steps">{[['01','Be specific','Start with the property, not a generic promise.'],['02','Explain the moving parts','Make equipment and estimates easier to understand.'],['03','Keep assumptions visible','Separate an indicative estimate from a confirmed proposal.'],['04','Let homeowners decide','Questions and next steps should remain in your hands.']].map(([n,t,d])=><div className="step" key={n}><div className="step-num">{n}</div><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>
    <CTA />
  </Shell>;
}

function CalculatorWidget() {
  type CalcValues = { bill:string; kwh:string; property:string; roof:string; area:string; city:string; generation:string; offset:string; tariff:string; systemCost:string };
  const form = useForm<CalcValues>({ defaultValues:{bill:'',kwh:'',property:'Independent house',roof:'RCC / concrete',area:'',city:'',generation:'120',offset:'82',tariff:'7.2',systemCost:'58000'} });
  const values = form.watch();
  const [result, setResult] = useState<null | { capacity:number; monthly:number; cost:number; payback:number }>(null);
  const [calcError, setCalcError] = useState('');
  const calc = (values:CalcValues) => {
    const {bill,kwh,area,generation,offset,tariff,systemCost} = values;
    if (!(Number(bill) > 0) && !(Number(kwh) > 0)) { setCalcError('Enter a monthly bill or monthly electricity use to calculate an estimate.'); setResult(null); return; }
    setCalcError('');
    const monthlyKwh = Number(kwh) > 0 ? Number(kwh) : Number(bill) / Number(tariff || 7.2);
    const byUsage = Math.max(.5, monthlyKwh / Number(generation || 120));
    const byArea = Number(area) > 0 ? Number(area) / 95 : 99;
    const capacity = Math.max(.5, Math.min(10, Math.min(byUsage, byArea)));
    const saving = Math.min(Number(bill) || monthlyKwh * Number(tariff || 7.2), capacity * Number(generation || 120) * Number(tariff || 7.2) * (Number(offset || 82) / 100));
    const cost = capacity * Number(systemCost || 58000);
    setResult({ capacity, monthly: saving, cost, payback: cost / Math.max(saving * 12, 1) });
  };
  const share = () => {
    if (!result) return;
    const message = `Hello Banas Energy, I used your indicative rooftop solar calculator. Inputs: monthly bill ₹${values.bill || 'not provided'}; monthly use ${values.kwh || 'not provided'} kWh; property ${values.property}; roof ${values.roof}; approximate area ${values.area || 'not provided'} sq ft; city/PIN ${values.city || 'not provided'}. Assumptions: ${values.generation} kWh/kW/month, ${values.offset}% bill offset, ₹${values.tariff}/kWh and ₹${values.systemCost}/kW. Illustrative result: ${result.capacity.toFixed(1)} kW capacity, around ₹${Math.round(result.monthly).toLocaleString('en-IN')} monthly offset, ₹${Math.round(result.cost).toLocaleString('en-IN')} indicative cost and ${result.payback.toFixed(1)} year simple payback. Please help me understand the assumptions.`;
    window.open(waLink(message), '_blank', 'noopener,noreferrer');
  };
  return <div className="calc-wrap"><Form {...form}><form className="calc-panel" onSubmit={form.handleSubmit(calc)}><div className="eyebrow">An indicative starting point</div><h2>Estimate your solar fit</h2><p className="form-note">Use a monthly bill or energy use. No name or phone required. Adjust inputs to see how the estimate changes.</p><div className="calc-fields">
    <div className="field"><label htmlFor="calc-bill">Monthly electricity bill (₹)</label><input id="calc-bill" type="number" min="0" {...form.register('bill')} placeholder="e.g. 4500" /></div>
    <div className="field"><label htmlFor="calc-kwh">Monthly electricity use (kWh), optional</label><input id="calc-kwh" type="number" min="0" {...form.register('kwh')} placeholder="Use this instead of bill" /></div>
    <div className="field"><label htmlFor="calc-property">Property type</label><select id="calc-property" {...form.register('property')}><option>Independent house</option><option>Apartment / shared roof</option><option>Other residential property</option></select></div>
    <div className="field"><label htmlFor="calc-roof">Roof type</label><select id="calc-roof" {...form.register('roof')}><option>RCC / concrete</option><option>Metal sheet</option><option>Tile / other</option><option>Not sure</option></select></div>
    <div className="field"><label htmlFor="calc-area">Approximate usable roof area (sq ft), optional</label><input id="calc-area" type="number" min="0" {...form.register('area')} placeholder="If known" /></div>
    <div className="field"><label htmlFor="calc-city">City or PIN, optional</label><input id="calc-city" {...form.register('city')} placeholder="Your area" /></div>
  </div><details style={{marginTop:20}}><summary style={{cursor:'pointer',fontWeight:700,fontSize:13}}>Adjust estimate assumptions</summary><div className="calc-fields" style={{marginTop:14}}>
    <div className="field"><label htmlFor="assume-yield">Generation per kW / month (kWh)</label><input id="assume-yield" type="number" min="1" {...form.register('generation')} /></div>
    <div className="field"><label htmlFor="assume-offset">Usable bill offset (%)</label><input id="assume-offset" type="number" min="0" max="100" {...form.register('offset')} /></div>
    <div className="field"><label htmlFor="assume-tariff">Reference tariff (₹/kWh)</label><input id="assume-tariff" type="number" min="0.1" step=".1" {...form.register('tariff')} /></div>
    <div className="field"><label htmlFor="assume-cost">Indicative cost (₹/kW)</label><input id="assume-cost" type="number" min="1" {...form.register('systemCost')} /></div>
  </div></details><button className="button-primary" type="submit" style={{marginTop:20}}><Calculator size={17}/> Calculate an indicative range</button>{calcError && <p role="alert" className="form-note" style={{color:'#963b22'}}>{calcError}</p>}</form></Form>
    <div className="calc-result"><div className="eyebrow">Your estimate</div><h2>{result ? 'A useful first conversation' : 'A starting point, not a promise'}</h2>{result ? <><p style={{lineHeight:1.65,color:'#665953'}}>Based on your inputs and the editable assumptions below. A site assessment and tariff details can change the outcome.</p><div className="metrics"><div className="metric"><span>Indicative capacity</span><strong>{result.capacity.toFixed(1)} kW</strong></div><div className="metric"><span>Possible monthly bill offset</span><strong>₹{Math.round(result.monthly).toLocaleString('en-IN')}</strong></div><div className="metric"><span>Indicative system cost</span><strong>₹{Math.round(result.cost).toLocaleString('en-IN')}</strong></div><div className="metric"><span>Simple payback estimate</span><strong>{result.payback.toFixed(1)} yrs</strong></div></div><button onClick={share} className="button-primary" type="button">Share these inputs on WhatsApp <ArrowRight size={16}/></button></> : <p style={{lineHeight:1.7,color:'#665953'}}>Enter your bill or monthly usage and select “Calculate” to see an indicative capacity, bill offset, cost and simple payback estimate. The calculation is local to this page; nothing is sent unless you choose to share.</p>}
    <div className="disclaimer" style={{marginTop:22}}><strong>Editable assumptions:</strong> monthly generation per kW, bill-offset share, reference tariff and indicative system cost can all be adjusted above. Simple payback = assumed cost ÷ annual bill offset. The initial values are 120 kWh/kW/month, 82%, ₹7.20/kWh and ₹58,000/kW. No subsidy, export credit, financing, degradation, tax, roof work or utility charge is assumed. This is illustrative only—not a quote, production guarantee or promise of savings.</div>
    </div></div>;
}

function SolutionsPage() {
  return <Shell><Meta title="Home rooftop solar solutions | Banas Energy" description="Understand rooftop solar components, configurations and an indicative calculator for homeowners in Banaskantha." />
    <Intro eyebrow="Home solar, made clearer" title="Understand the system before choosing the system." text="A residential solar proposal is made of practical choices. Learn what the components do, consider the roof and household needs, and use an indicative calculator as a starting point." image="/images/panels-detail.jpg" />
    <section className="section"><div className="container split"><div><div className="eyebrow">What makes a rooftop system</div><h2 className="serif" style={{fontSize:44,fontWeight:500}}>Several pieces. One considered plan.</h2><div className="feature-list">{[['Solar panels','Generate direct-current electricity from sunlight. Their layout depends on roof space, shade and orientation.'],['Inverter','Converts electricity into a form used by household circuits; the right type depends on system design.'],['Mounting & electrical work','The structure, wiring and protections connect the system safely to the property.'],['Grid connection or storage','The configuration should reflect your household’s use, outage priorities and applicable utility requirements.']].map(([t,d])=><div className="feature-item" key={t}><span className="feature-icon"><Sun size={18}/></span><div><strong>{t}</strong><p>{d}</p></div></div>)}</div></div><div className="image-frame"><img src="/images/inverter.jpg" alt="Residential solar inverter equipment installed inside a home" /></div></div></section>
    <section className="section section-soft" id="calculator" style={{ scrollMarginTop: '132px' }}><div className="container"><div className="section-heading"><div><div className="eyebrow">Try the estimate</div><h2>Explore an indicative solar fit.</h2></div><p>Use optional bill, consumption, property and roof information. The result is transparent about its assumptions and is not a quote.</p></div><CalculatorWidget /></div></section>
    <CTA />
  </Shell>;
}

const projectImages = [
  ['/images/home-evening.jpg','Home rooftop at dusk'],
  ['/images/panels-detail.jpg','Panel layout on a residential roof'],
  ['/images/rooftops-aerial.jpg','Rooftop solar in a residential setting'],
  ['/images/homeowner-roof.jpg','A home-first solar conversation'],
  ['/images/inverter.jpg','Inverter equipment in a home'],
  ['/images/solar-home-hero.jpg','Sunlit home with rooftop panels']
];
function ProjectsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  return <Shell><Meta title="Illustrative rooftop solar gallery | Banas Energy" description="Illustrative residential rooftop solar imagery for homeowners. These are not Banas Energy installations or customer projects." />
    <Intro eyebrow="A visual guide" title="Imagine what rooftop solar can look like." text="This gallery uses illustrative imagery to help make residential solar easier to picture. It does not show Banas Energy installations, actual customers or specific completed projects." image="/images/rooftops-aerial.jpg" />
    <section className="section"><div className="container"><p className="disclaimer" style={{marginBottom:28}}><strong>Illustrative imagery only.</strong> Every image and card below is generated illustrative material. None represents work completed by Banas Energy, a named location, an actual customer or a specified system.</p><div className="project-grid">{projectImages.map(([img,title],i)=><article className="project-card" key={title}><button onClick={()=>setSelected(i)} aria-label={`View illustrative image: ${title}`}><img src={img} alt={`Illustrative rooftop solar scene: ${title}`} /><div className="project-copy"><small>Illustrative imagery · not a Banas Energy project</small><h3>{title}</h3><p>A visual reference only. Actual system design depends on the property and assessment.</p></div></button></article>)}</div></div></section>
    {selected !== null && <div className="modal-backdrop" role="presentation" onClick={()=>setSelected(null)}><section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="gallery-title" onClick={e=>e.stopPropagation()}><button className="modal-close" aria-label="Close detail" onClick={()=>setSelected(null)}><X size={20}/></button><img src={projectImages[selected][0]} alt={`Illustrative rooftop solar scene: ${projectImages[selected][1]}`} /><div className="eyebrow">Illustrative imagery only</div><h2 id="gallery-title" className="serif" style={{fontSize:32,fontWeight:500,margin:'9px 0'}}>A visual reference—not a company installation.</h2><p style={{lineHeight:1.7,color:'#75645e'}}>This generated image does not depict Banas Energy work, an actual customer or a named project. Your own home’s layout and requirements need individual discussion.</p><a className="button-primary" href={waLink(`Hello Banas Energy, I viewed the illustrative gallery and would like to discuss solar for my home.`)} target="_blank" rel="noreferrer">Ask about my home <ArrowRight size={16}/></a></section></div>}
    <CTA title="Your home is its own project." text="Talk through your roof and household needs with a local team." />
  </Shell>;
}

function ReviewsPage() {
  return <Shell><Meta title="Homeowner reviews | Banas Energy" description="Banas Energy does not currently publish verified homeowner reviews. Contact the team directly with questions." />
    <Intro eyebrow="Homeowner voices" title="Trust is better earned than borrowed." text="We do not publish testimonials or ratings until verified reviews are available. If you have questions, speak with Banas Energy directly." image="/images/home-evening.jpg" />
    <section className="section"><div className="container"><div className="review-empty"><div className="review-empty-icon"><Check size={27}/></div><div className="eyebrow" style={{marginTop:20}}>An honest note</div><h2 className="serif" style={{fontSize:38,fontWeight:500,margin:'12px 0'}}>Verified reviews are not published yet.</h2><p style={{color:'#75645e',lineHeight:1.75,maxWidth:560,margin:'0 auto 25px'}}>We won’t invent customer stories or ratings. We’d rather answer your questions directly and help you understand what a solar conversation for your home could involve.</p><div style={{display:'flex',justifyContent:'center',gap:12,flexWrap:'wrap'}}><a className="button-primary" href={waLink('Hello Banas Energy, I have a question about residential rooftop solar.')} target="_blank" rel="noreferrer">Ask us on WhatsApp <ArrowRight size={16}/></a><a className="button-secondary" href={`tel:${PHONE.replace(/\s/g,'')}`}>Call {PHONE}</a></div></div></div></section>
    <CTA />
  </Shell>;
}

function BlogPage() {
  return <Shell><Meta title="Home solar guides | Banas Energy" description="Six plain-language rooftop solar guides for homeowners exploring panels, roof readiness, estimates and solar system choices." />
    <Intro eyebrow="Homeowner field notes" title="Good questions make a good beginning." text="Short, practical guides to help you understand rooftop solar and have a more useful conversation about your own home." image="/images/panels-detail.jpg" />
    <section className="section"><div className="container"><div className="article-grid">{guides.map(guide=><Link key={guide.slug} href={`/blog/${guide.slug}`} className="article-card"><img src={guide.image} alt={`Illustrative image for guide: ${guide.title}`} /><div className="article-card-body"><small>{guide.label}</small><h3>{guide.title}</h3><p>{guide.intro}</p><span className="text-link">Read guide <ArrowRight size={15}/></span></div></Link>)}</div></div></section><CTA title="Have a question that isn’t in a guide?" text="Ask about your own property directly. We’ll help you work out a useful next question." />
  </Shell>;
}

function ArticlePage({ params }: { params: { slug?: string } }) {
  const article = guides.find(g=>g.slug===params.slug);
  if (!article) return <NotFound />;
  return <Shell><Meta title={`${article.title} | Banas Energy homeowner guide`} description={article.intro} />
    <Intro eyebrow={`Homeowner guide · ${article.label}`} title={article.title} text={article.intro} image={article.image} />
    <section className="section"><div className="container split" style={{alignItems:'start'}}><article className="prose">{article.sections.map(([title,body])=><section key={title}><h2>{title}</h2><p>{body}</p></section>)}<p>These general notes are for orientation, not a site-specific technical assessment or financial guarantee. A suitable system and its outcomes depend on the property and applicable requirements.</p><Link href="/blog" className="text-link"><ArrowRight size={16} style={{transform:'rotate(180deg)'}}/> All homeowner guides</Link></article><aside><div className="image-frame" style={{minHeight:320}}><img src={article.image} alt={`Illustrative residential solar scene related to ${article.title}`} /></div><div className="disclaimer" style={{marginTop:16}}>Illustrative imagery; not a depiction of Banas Energy work or a named customer.</div><div style={{marginTop:24}}><a className="button-primary" href={waLink(`Hello Banas Energy, I read “${article.title}” and have a question about rooftop solar for my home.`)} target="_blank" rel="noreferrer">Ask a follow-up <ArrowRight size={16}/></a></div></aside></div></section>
  </Shell>;
}

function ContactPage() {
  type ContactValues = { name: string; phone: string; city: string; property: string; bill: string; message: string };
  const form = useForm<ContactValues>({ defaultValues: { name:'', phone:'', city:'', property:'', bill:'', message:'' }, mode:'onSubmit' });
  const [directLink, setDirectLink] = useState('');
  const [error, setError] = useState('');
  const submit = (values: ContactValues) => {
    setError(''); setDirectLink('');
    const fields = [['Name',values.name],['Phone',values.phone],['City or PIN',values.city],['Property type',values.property],['Monthly bill (₹)',values.bill],['Message',values.message]].filter(([,v])=>String(v||'').trim());
    const message = `Hello Banas Energy, I would like to enquire about rooftop solar for my home.\n${fields.map(([k,v])=>`${k}: ${String(v).trim()}`).join('\n')}`;
    const url = waLink(message); setDirectLink(url);
    const popup = window.open(url,'_blank','noopener,noreferrer');
    if (!popup) setError('Your browser blocked the WhatsApp window. Use the direct link below to continue. Your entered information has not been submitted.');
  };
  return <Shell><Meta title="Contact Banas Energy | Banaskantha rooftop solar" description="Contact Banas Energy Pvt. Ltd. by WhatsApp, phone, email or directions at its Lakhani, Tharad address." />
    <Intro eyebrow="Start with a question" title="Tell us a little about your home." text="Share only what you’re comfortable sharing. Your enquiry opens a WhatsApp message so you can review and send it yourself." image="/images/homeowner-roof.jpg" />
    <section className="section"><div className="container contact-grid"><div className="contact-card"><h2>Home solar enquiry</h2><p className="form-note">Required fields are marked. Your form does not contact a server; WhatsApp opens with the details you entered for you to review.</p>
      <Form {...form}><form onSubmit={form.handleSubmit(submit)}><div className="form-grid">
        <div className="field"><label htmlFor="name">Your name *</label><input id="name" autoComplete="name" placeholder="Name" {...form.register('name',{required:'Please enter your name.'})} />{form.formState.errors.name && <span className="field-error" role="alert">{form.formState.errors.name.message}</span>}</div>
        <div className="field"><label htmlFor="phone">Phone *</label><input id="phone" type="tel" autoComplete="tel" placeholder="Phone number" {...form.register('phone',{required:'Please enter a phone number.',pattern:{value:/^[+0-9 ()-]{8,18}$/,message:'Enter a valid phone number.'}})} />{form.formState.errors.phone && <span className="field-error" role="alert">{form.formState.errors.phone.message}</span>}</div>
        <div className="field"><label htmlFor="city">City or PIN, optional</label><input id="city" placeholder="Your area" {...form.register('city')} /></div>
        <div className="field"><label htmlFor="property">Property type</label><select id="property" {...form.register('property')}><option value="">Select if known</option><option>Independent house</option><option>Apartment / shared roof</option><option>Other residential property</option></select></div>
        <div className="field field-full"><label htmlFor="bill">Approximate monthly bill (₹), optional</label><input id="bill" type="number" min="0" placeholder="Optional" {...form.register('bill')} /></div>
        <div className="field field-full"><label htmlFor="message">What would you like to know?</label><textarea id="message" placeholder="Share a question or a little context" {...form.register('message')} /></div>
      </div><button className="button-primary" type="submit" style={{marginTop:18}}>Continue to WhatsApp <ArrowRight size={16}/></button>
      {error && <p role="alert" style={{color:'#963b22',fontWeight:600}}>{error}</p>}
      {directLink && <p className="form-note">If WhatsApp did not open, <a className="text-link" href={directLink} target="_blank" rel="noreferrer">open your prepared message directly <ArrowRight size={14}/></a>. It is only sent when you choose Send in WhatsApp.</p>}
      </form></Form></div>
      <aside><div className="contact-card"><div className="eyebrow">Banas Energy Pvt. Ltd.</div><h2>We’re local to Lakhani.</h2>
        <div className="contact-detail"><Phone size={20}/><div><strong>Call</strong><br/><a href={`tel:${PHONE.replace(/\s/g,'')}`}>{PHONE}</a><br/><a href={`tel:${PHONE_ALT.replace(/\s/g,'')}`}>{PHONE_ALT}</a></div></div>
        <div className="contact-detail"><Mail size={20}/><div><strong>Email</strong><br/><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div>
        <div className="contact-detail"><MapPin size={20}/><div><strong>Address</strong><br/><span>{ADDRESS}</span><br/><a className="text-link" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}>Get directions <ArrowRight size={14}/></a></div></div>
        <div className="contact-detail"><Check size={20}/><div><strong>GSTIN</strong><br/><span>24ABICS9434J1ZX</span></div></div>
      </div><div style={{marginTop:18,border:'1px solid #eadfd3'}}><iframe className="map-frame" title="Map search for Banas Energy at 22 RJ Complex, Lakhani, Tharad, Banaskantha, Gujarat" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`} /><p className="form-note" style={{padding:'0 16px 12px'}}>Map search uses the supplied address; no coordinates are assumed. <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noreferrer">Open in Google Maps <ArrowRight size={13}/></a></p></div></aside>
    </div></section>
  </Shell>;
}

function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const isPrivacy = type === 'privacy';
  return <Shell><Meta title={`${isPrivacy?'Privacy policy':'Terms of use'} | Banas Energy`} description={`${isPrivacy?'How Banas Energy handles information you choose to share.':'Important notes about using Banas Energy’s website and indicative solar information.'}`} />
    <Intro eyebrow="Website information" title={isPrivacy ? 'Privacy policy' : 'Terms of use'} text={isPrivacy ? 'A clear explanation of what happens when you use this website or choose to contact Banas Energy.' : 'Helpful context for using the Banas Energy website and its general solar information.'} />
    <section className="section"><div className="container prose">{isPrivacy ? <>
      <h2>Information you choose to share</h2><p>This website has no lead-submission backend. If you complete the contact form, the entered details are placed into a WhatsApp message addressed to Banas Energy. Your browser may open WhatsApp; you review the message and decide whether to send it. A WhatsApp message is handled under WhatsApp’s own terms and privacy practices.</p>
      <h2>Calculator inputs</h2><p>The indicative calculator runs in your browser. Its inputs are not sent to Banas Energy unless you choose to share them through WhatsApp.</p>
      <h2>External services</h2><p>Links to WhatsApp, phone, email and Google Maps open or use those services. Their handling of information is governed by their respective policies. The map is based on the address supplied by Banas Energy.</p>
      <h2>Contact</h2><p>For privacy questions, contact Banas Energy Pvt. Ltd. at <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or at {ADDRESS}.</p>
    </> : <>
      <h2>General information, not a technical proposal</h2><p>Website copy and guides are general homeowner information. They are not technical, financial, legal or utility advice and cannot replace a property assessment or written proposal.</p>
      <h2>Calculator estimates</h2><p>Calculator results are illustrative estimates based on editable assumptions. Actual capacity, production, bill impact, cost and payback can differ based on roof condition, design, equipment, usage, tariff, utility arrangements and other factors. Results are not promises or guarantees, and no subsidy or export credit is assumed.</p>
      <h2>Illustrative imagery and gallery</h2><p>Images on the gallery page are illustrative generated imagery. They do not represent Banas Energy installations, actual customers, specific locations or completed projects.</p>
      <h2>Brands and technologies</h2><p>Names of third-party solar brands are shown only as technologies homeowners may explore; they do not imply affiliation, endorsement, partnership or authorized supply.</p>
      <h2>Contact and external links</h2><p>When you choose to use WhatsApp, telephone, email or map links, you interact with those services directly. Contact details on this website are supplied for Banas Energy Pvt. Ltd.</p>
      <h2>Contact details</h2><p>{ADDRESS}<br/><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
    </>}</div></section>
  </Shell>;
}

function NotFound() {
  return <Shell><Meta title="Page not found | Banas Energy" description="The page requested could not be found. Explore Banas Energy home solar guidance." /><section className="section"><div className="container review-empty"><div className="eyebrow">404 · Not found</div><h1 className="serif" style={{fontSize:42,fontWeight:500}}>This page isn’t on the roof plan.</h1><p>Try the home page or explore our homeowner solar guides.</p><Link className="button-primary" href="/">Back to home <ArrowRight size={16}/></Link></div></section></Shell>;
}

function Router() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start',
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location]);
  return <Switch key={location}>
    <Route path="/" component={HomePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/solutions" component={SolutionsPage} />
    <Route path="/projects" component={ProjectsPage} />
    <Route path="/reviews" component={ReviewsPage} />
    <Route path="/blog" component={BlogPage} />
    <Route path="/blog/:slug">{params => <ArticlePage params={params} />}</Route>
    <Route path="/contact" component={ContactPage} />
    <Route path="/privacy-policy">{()=><LegalPage type="privacy"/>}</Route>
    <Route path="/terms">{()=><LegalPage type="terms"/>}</Route>
    <Route component={NotFound} />
  </Switch>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter>;
}

export default App;