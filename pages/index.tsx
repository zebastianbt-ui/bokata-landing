
import React from "react";

export default function Page() {
  const scrollToHash = React.useCallback((hash: string) => {
    if (!hash?.startsWith('#')) return;
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, []);

  const onAnchorClick = (e: React.MouseEvent, hash: string) => { e.preventDefault(); scrollToHash(hash); };

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<any>(null);
  const openPlan = (plan:any)=>{ setSelectedPlan(plan); setDrawerOpen(true); };

  const [authOpen, setAuthOpen] = React.useState(false);
  const [authMode, setAuthMode] = React.useState<'login'|'signup'>('login');
  const openAuth = (m:'login'|'signup'='login')=>{ setAuthMode(m); setAuthOpen(true); };

  const PLAN_MAP = React.useMemo(()=> ({
    manad:{title:'Månad',price:'790 kr/månad',note:'Utan bindningstid, mest flexibelt'},
    ettar:{title:'1 år (Populär)',price:'630 kr/månad · 7 560 kr',note:'Spara 1 920 kr jämfört med månadspris'},
    tvar:{title:'2 år (Bästa deal)',price:'550:-/månad · 13 200 kr',note:'Spara 5 760 kr jämfört med månadspris'},
  }),[]);

  const handleAuthSubmit=(email:string,mode:'login'|'signup',planKey:'manad'|'ettar'|'tvar'='manad')=>{
    if(mode==='signup'){ setAuthOpen(false); openPlan((PLAN_MAP as any)[planKey]||PLAN_MAP.manad); }
    else { window.location.href='/login'+(email?`?email=${encodeURIComponent(email)}`:''); }
  };

  return (
    <div className="min-h-screen text-gray-900 bg-white">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-pink-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-2 font-bold text-xl"><ForkLogo/><span>Bokäta</span></a>
          <nav className="hidden md:flex items-center gap-4 text-base">
            <a href="#features" onClick={(e)=>onAnchorClick(e,'#features')} className="px-3 py-1 rounded-full text-pink-700 font-semibold hover:bg-pink-50">Funktioner</a>
            <a href="#pricing" onClick={(e)=>onAnchorClick(e,'#pricing')} className="px-3 py-1 rounded-full text-pink-700 font-semibold hover:bg-pink-50">Priser</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={()=>openAuth('login')} className="hidden sm:inline-flex items-center px-4 py-2 rounded-full border border-pink-200 text-pink-700 hover:bg-pink-50">Log in</button>
            <button onClick={()=>openAuth('signup')} className="inline-flex items-center px-4 py-2 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700">Sign up</button>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-[#3d015f] via-[#2a0044] to-pink-600 text-white px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">Bokäta</h1>
          <h2 className="text-2xl md:text-3xl mb-4">Den lagar inte mat. Den lagar allt annat.</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">AI‑assistenten som sköter bokningar, svarar gäster automatiskt och fyller dina bord utan krångel.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#pricing" onClick={(e)=>onAnchorClick(e,'#pricing')} className="inline-flex justify-center items-center px-6 py-3 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700">Kom igång nu</a>
          </div>
        </div>
      </section>

      <section className="px-6 py-10" id="features">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-pink-100 shadow-[0_14px_40px_rgba(236,72,153,0.15)]">
          <div className="bg-gradient-to-br from-[#3d015f] via-[#2a0044] to-pink-700 text-white text-center px-6 py-10">
            <h3 className="text-3xl md:text-4xl font-extrabold">Funktioner</h3>
            <div className="mt-4 flex justify-center gap-2 text-sm">
              <a href="#features" onClick={(e)=>onAnchorClick(e,'#features')} className="px-4 py-2 rounded-full bg-white text-pink-700 font-semibold ring-1 ring-pink-200">Funktioner</a>
              <a href="#pricing" onClick={(e)=>onAnchorClick(e,'#pricing')} className="px-4 py-2 rounded-full bg-white text-pink-700 font-semibold ring-1 ring-pink-200">Priser</a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10" id="pricing">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-pink-100 shadow-[0_14px_40px_rgba(236,72,153,0.15)]">
          <div className="bg-gradient-to-br from-[#3d015f] via-[#2a0044] to-pink-700 text-white text-center px-6 py-10">
            <h2 className="text-3xl md:text-4xl font-extrabold">Priser</h2>
            <p className="mt-2"><span className="inline-block bg-white text-pink-700 font-semibold px-3 py-1 rounded-full">Gratisperiod: 14 dagar!</span></p>
            <p className="opacity-90 text-sm mt-2">Priser inkl. moms. Fakturering via Stripe. Ingen bindningstid på månadsplanen.</p>
          </div>
          <div className="bg-white px-6 md:px-10 py-10">
            <div className="grid md:grid-cols-3 gap-8">
              <PriceCard title="Månad" priceLine="790 kr/månad" note="Utan bindningstid, mest flexibelt" cta="Starta månadsplan" onSelect={()=>openPlan(PLAN_MAP.manad)} />
              <PriceCard title="1 år (Populär)" highlight priceLine="630 kr/månad · 7 560 kr" note="Spara 1 920 kr jämfört med månadspris" cta="Välj årsplan" onSelect={()=>openPlan(PLAN_MAP.ettar)} />
              <PriceCard title="2 år (Bästa deal)" priceLine="550:-/månad · 13 200 kr" note="Spara 5 760 kr jämfört med månadspris" cta="Välj 2‑årsplan" onSelect={()=>openPlan(PLAN_MAP.tvar)} />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-pink-100 text-center text-xs text-gray-500 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© {new Date().getFullYear()} Bokäta</p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#" className="hover:text-pink-700">Integritet</a>
              <a href="#" className="hover:text-pink-700">Villkor</a>
            </div>
          </div>
        </div>
      </footer>

      <PlanDrawer open={drawerOpen} plan={selectedPlan} onClose={()=>setDrawerOpen(false)} />
      <AuthModal open={authOpen} mode={authMode} onClose={()=>setAuthOpen(false)} onSubmit={handleAuthSubmit} onToggleMode={(m)=>setAuthMode(m as any)} />
    </div>
  );
}

function ForkLogo(){return(<svg className="h-8 w-8" viewBox="0 0 64 64" fill="none"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FF2BD0"/><stop offset="100%" stopColor="#7A3CFF"/></linearGradient></defs><g transform="rotate(-25 32 32)"><rect x="18" y="10" width="8" height="18" rx="3" fill="url(#g)"/><rect x="28" y="10" width="8" height="18" rx="3" fill="url(#g)"/><rect x="38" y="10" width="8" height="18" rx="3" fill="url(#g)"/><rect x="26" y="28" width="12" height="26" rx="6" fill="url(#g)"/></g></svg>)};

function Feature({children}:{children:React.ReactNode}){return <div className="rounded-2xl bg-white p-5 border border-pink-100 shadow-sm">{children}</div>}
function PriceCard({ title, priceLine, note, cta, highlight, onSelect }: any){
  return(<div className={\`relative bg-white p-6 rounded-2xl shadow-sm border \${highlight?'border-2 border-pink-500':'border-pink-100'}\`}>
    {highlight&&<span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded-full bg-pink-600 text-white shadow">Populär</span>}
    <h3 className="text-xl font-semibold mb-1">{title}</h3>
    <p className="text-gray-800">{priceLine}</p>
    {note && <p className="text-sm text-gray-500 mt-2">{note}</p>}
    <button onClick={()=>onSelect&&onSelect({title,price:priceLine,note})} className="mt-5 w-full rounded-full bg-pink-600 text-white py-2.5 hover:bg-pink-700">{cta}</button>
  </div>)
}

function PlanDrawer({ open, plan, onClose }: any){
  return(<div className={\`fixed inset-0 z-50 \${open?'':'pointer-events-none'}\`}>
    <div className={\`absolute inset-0 bg-black/30 \${open?'opacity-100':'opacity-0'}\`} onClick={onClose}/>
    <aside className={\`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl border-l border-pink-100 transform \${open?'translate-x-0':'translate-x-full'}\`}>
      <div className="p-6 flex items-start justify-between border-b">
        <div><h3 className="text-xl font-bold">{plan?.title??'Plan'}</h3><p className="text-gray-600">{plan?.price}</p></div>
        <button aria-label="Stäng" onClick={onClose} className="rounded-full px-2 py-1 hover:bg-gray-100">✕</button>
      </div>
      <div className="p-6 space-y-4 text-sm">
        <p>{plan?.note}</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700"><li>Fakturering via Stripe.</li><li>Ingen bindningstid på månadsplan.</li><li>Avsluta när som helst inför nästa period.</li></ul>
        <a href="/signup" className="inline-flex justify-center items-center px-4 py-2 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700">Fortsätt</a>
      </div>
    </aside>
  </div>)
}

function AuthModal({ open, mode='login', onClose, onSubmit, onToggleMode }: any){
  const [email,setEmail]=React.useState(''); const [planKey,setPlanKey]=React.useState<'manad'|'ettar'|'tvar'>('manad');
  React.useEffect(()=>{ if(!open){setEmail('');setPlanKey('manad')} },[open]);
  const title = mode==='signup'?'Skapa konto':'Logga in';
  const next = ()=> onSubmit && onSubmit(email, mode, planKey);
  return(<div className={\`fixed inset-0 z-50 \${open?'':'hidden'}\`}>
    <div className="absolute inset-0 bg-black/30" onClick={onClose}/>
    <div className="absolute inset-0 flex items-start justify-center mt-28 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-pink-100 p-6">
        <h3 className="text-2xl font-bold text-center mb-6">{title}</h3>
        {mode==='signup'&&(<div className="mb-4">
          <div className="text-sm font-medium mb-2">Välj plan</div>
          <div className="flex gap-2">
            <button className={\`px-3 py-1.5 rounded-full border text-sm \${planKey==='manad'?'bg-pink-600 text-white border-pink-600':'border-gray-300'}\`} onClick={()=>setPlanKey('manad')}>Månad</button>
            <button className={\`px-3 py-1.5 rounded-full border text-sm \${planKey==='ettar'?'bg-pink-600 text-white border-pink-600':'border-gray-300'}\`} onClick={()=>setPlanKey('ettar')}>1 år</button>
            <button className={\`px-3 py-1.5 rounded-full border text-sm \${planKey==='tvar'?'bg-pink-600 text-white border-pink-600':'border-gray-300'}\`} onClick={()=>setPlanKey('tvar')}>2 år</button>
          </div>
        </div>)}
        <label className="block text-sm text-gray-700 mb-2">Ange e‑postadressen för ditt konto</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="E‑post" className="w-full h-12 rounded-lg border border-gray-300 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
        <button onClick={next} className="w-full h-12 rounded-full bg-pink-700 text-white font-semibold">Nästa</button>
        <div className="text-center text-sm mt-4">
          {mode==='login'?<span>Inget konto än? <button onClick={()=>onToggleMode&&onToggleMode('signup')} className="text-pink-700 hover:underline">Skapa ett konto</button></span>:
            <span>Har du redan ett konto? <button onClick={()=>onToggleMode&&onToggleMode('login')} className="text-pink-700 hover:underline">Logga in</button></span>}
        </div>
      </div>
    </div>
  </div>)
}

function Faq(){return null;}
