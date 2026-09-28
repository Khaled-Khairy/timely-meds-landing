'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { APP_CONFIG } from '@/config/app';
import { ar } from '@/i18n/ar';
import { en } from '@/i18n/en';

type Lang = 'ar' | 'en';
type Dict = typeof ar | typeof en;

// ─── Icons ────────────────────────────────────────────────────────────────────
const BellIcon = () => (
  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const ClipboardIcon = () => (
  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" />
    <line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
  </svg>
);
const PhoneCallIcon = () => (
  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.07 3.43 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
  </svg>
);
const MicIcon = () => (
  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const DownloadIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const PlusIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const MenuIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const XIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Download Button ───────────────────────────────────────────────────────────
// Used in hero and as a standalone CTA. Always uses the large size.
function DownloadBtn({ label, variant = 'primary' }: { label: string; variant?: 'primary' | 'ghost-white' }) {
  const apk = APP_CONFIG.APK_DOWNLOAD_URL;
  const cls = variant === 'ghost-white' ? 'btn btn-lg btn-ghost-white' : 'btn btn-lg btn-primary';
  return (
    <a href={apk} download className={cls} id="hero-download-btn">
      <DownloadIcon />
      {label}
    </a>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ d, lang, toggle }: { d: Dict; lang: Lang; toggle: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: '#features', label: d.nav_features },
    { href: '#screens',  label: d.nav_screens },
    { href: '#how',      label: d.nav_how },
    { href: '#video',    label: d.nav_video },
    { href: '#support',  label: d.nav_support },
    { href: '#download', label: d.nav_download },
    { href: '#faq',      label: d.nav_faq },
  ];
  return (
    <nav
      id="navbar"
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b border-white/20"
      style={{ background: 'rgba(255,255,255,0.92)' }}
    >
      {/* Inner row — consistent height, flex layout */}
      <div
        className="container-xl"
        style={{
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'space-between',
          minHeight:       '4rem',
          paddingBlock:    '0.625rem',
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0" style={{ gap: '0.625rem' }}>
          <Image src="/logo.png" alt="Timely Meds" width={36} height={36} className="rounded-xl" />
          <span className="font-bold text-lg hidden sm:block" style={{ color: '#E87D2A' }}>
            {lang === 'ar' ? APP_CONFIG.APP_NAME_AR : APP_CONFIG.APP_NAME_EN}
          </span>
        </a>

        {/* Desktop links — hidden on mobile via CSS @media in globals.css */}
        <ul
          id="desktop-nav-links"
          style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}
        >
          {links.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-semibold transition-colors hover:text-blue-600"
                style={{ color: '#6A6A6A' }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Language switcher */}
          <button
            id="lang-toggle-btn"
            onClick={toggle}
            className="btn btn-sm btn-outline"
          >
            {d.switch_lang}
          </button>

          {/* Nav download — visibility controlled via CSS @media in globals.css */}
          <a
            href={APP_CONFIG.APK_DOWNLOAD_URL}
            download
            id="nav-download-btn"
            className="btn btn-sm btn-blue"
          >
            <DownloadIcon />
            {d.nav_download_btn}
          </a>

          {/* Hamburger — visibility controlled via CSS @media in globals.css */}
          <button
            id="mobile-menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{ padding: '0.25rem', display: 'flex', alignItems: 'center' }}
          >
            {open ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu — visibility controlled via CSS @media in globals.css */}
      {open && (
        <div
          id="mobile-menu"
          style={{ background: 'white', borderTop: '1px solid #f0f0f0' }}
        >
          <ul
            className="container-xl"
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           '0.25rem',
              listStyle:     'none',
              margin:        0,
              paddingBlock:  '1rem',
            }}
          >
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  style={{
                    display:     'block',
                    fontSize:    '1rem',
                    fontWeight:  600,
                    color:       '#6A6A6A',
                    padding:     '0.625rem 0',
                  }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li style={{ paddingTop: '0.5rem' }}>
              <a
                href={APP_CONFIG.APK_DOWNLOAD_URL}
                download
                id="mobile-download-btn"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <DownloadIcon />
                {d.nav_download_btn}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ d }: { d: Dict }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        background:    'linear-gradient(160deg,#f0f7ff 0%,#fdf6ed 100%)',
        /* Top padding accounts for 64px fixed navbar + comfortable breathing room */
        paddingTop:    'clamp(6rem, 12vw, 9rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        minHeight:     '100svh',
        display:       'flex',
        alignItems:    'center',
      }}
    >
      {/* Decorative blobs */}
      <div className="hero-blob w-96 h-96 top-10" style={{ background: '#1877F2', insetInlineStart: '-5rem' }} />
      <div className="hero-blob w-72 h-72 bottom-20" style={{ background: '#E87D2A', insetInlineEnd: '2rem' }} />

      <div className="container-xl relative z-10" style={{ width: '100%' }}>
        <div
          style={{
            display:               'grid',
            gridTemplateColumns:   'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap:                   'clamp(2rem, 6vw, 4rem)',
            alignItems:            'center',
          }}
        >
          {/* Text column */}
          <div className="animate-fadeup">
            {/* Badge */}
            <span
              id="hero-badge"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '0.5rem',
                fontSize:       '0.875rem',
                fontWeight:     700,
                paddingInline:  '1rem',
                paddingBlock:   '0.5rem',
                borderRadius:   '999px',
                background:     '#BBD4FB',
                color:          '#1877F2',
                marginBottom:   '1.5rem',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {d.hero_badge}
            </span>

            {/* Headline */}
            <h1
              style={{
                fontSize:     'clamp(2.5rem, 7vw, 4.5rem)',
                fontWeight:   900,
                lineHeight:   1.15,
                marginBottom: '1.5rem',
              }}
            >
              <span className="gradient-text">{d.hero_title_1}</span>
              <br />
              <span style={{ color: '#E87D2A' }}>{d.hero_title_2}</span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize:     '1.0625rem',
                fontWeight:   500,
                color:        '#6A6A6A',
                lineHeight:   1.8,
                maxWidth:     '500px',
                marginBottom: '2rem',
              }}
            >
              {d.hero_subtitle}
            </p>

            {/* CTA */}
            <div style={{ marginBottom: '1.75rem' }}>
              <DownloadBtn label={d.hero_download} />
            </div>

            {/* Meta pills */}
            <div
              style={{
                display:    'flex',
                flexWrap:   'wrap',
                gap:        '0.625rem',
              }}
            >
              {[
                [d.hero_version, APP_CONFIG.APP_VERSION].join(': '),
                [d.hero_size, APP_CONFIG.APK_SIZE].join(': '),
                d.hero_android + ' ' + APP_CONFIG.MIN_ANDROID_VERSION + '+',
                d.hero_free,
              ].map(label => (
                <span
                  key={label}
                  className="info-pill"
                  style={{ background: 'white', color: '#6A6A6A', border: '1px solid #DEDEDE' }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Phone mockups column */}
          <div
            style={{
              position:        'relative',
              display:         'flex',
              justifyContent:  'center',
              alignItems:      'flex-end',
              gap:             '1.5rem',
              paddingBlock:    '2rem',
            }}
          >
            <div
              className="animate-float hidden sm:block"
              style={{ animationDelay: '0.5s', marginBottom: '-2.5rem', zIndex: 1 }}
            >
              <PhoneMockup src="/screen3.jpeg" alt="Add Medicine" />
            </div>
            <div className="animate-float" style={{ zIndex: 2 }}>
              <PhoneMockup src="/screen2.jpeg" alt="Home Screen" tall />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Phone Mockup ──────────────────────────────────────────────────────────────
function PhoneMockup({ src, alt, tall }: { src: string; alt: string; tall?: boolean }) {
  const h = tall ? 480 : 400;
  const w = Math.round(h * 0.46);
  return (
    <div
      className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-800"
      style={{ width: w, height: h, background: '#111' }}
    >
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full bg-gray-900 z-10" />
      <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} />
    </div>
  );
}

// ─── Features ──────────────────────────────────────────────────────────────────
function Features({ d }: { d: Dict }) {
  const feats = [
    { icon: <BellIcon />,      title: d.feat1_title, desc: d.feat1_desc, color: '#1877F2' },
    { icon: <CalendarIcon />,  title: d.feat2_title, desc: d.feat2_desc, color: '#44A249' },
    { icon: <ClipboardIcon />, title: d.feat3_title, desc: d.feat3_desc, color: '#8B5CF6' },
    { icon: <PhoneCallIcon />, title: d.feat4_title, desc: d.feat4_desc, color: '#EF4444' },
    { icon: <MicIcon />,       title: d.feat5_title, desc: d.feat5_desc, color: '#E87D2A' },
    { icon: <GlobeIcon />,     title: d.feat6_title, desc: d.feat6_desc, color: '#0EA5E9' },
  ];
  return (
    <section id="features" className="section-pad" style={{ background: '#FDFDFD' }}>
      <div className="container-xl">
        <div className="section-header">
          <h2>{d.features_title}</h2>
          <p>{d.features_subtitle}</p>
        </div>

        <div
          style={{
            display:               'grid',
            gridTemplateColumns:   'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap:                   '1.75rem',
          }}
        >
          {feats.map(f => (
            <div key={f.title} className="feat-card group">
              {/* Icon wrapper */}
              <div
                style={{
                  width:           '3.5rem',
                  height:          '3.5rem',
                  borderRadius:    '14px',
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  marginBottom:    '1.25rem',
                  background:      f.color + '18',
                  color:           f.color,
                  flexShrink:      0,
                  transition:      'transform .25s',
                }}
                className="group-hover:scale-110"
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize:     '1.125rem',
                  fontWeight:   700,
                  marginBottom: '0.625rem',
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize:   '0.9375rem',
                  lineHeight: 1.75,
                  color:      '#6A6A6A',
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── App Screens ───────────────────────────────────────────────────────────────
function Screens({ d }: { d: Dict }) {
  const screens = [
    { src: '/screen2.jpeg', label: d.screen1_label, desc: d.screen1_desc },
    { src: '/screen3.jpeg', label: d.screen2_label, desc: d.screen2_desc },
    { src: '/screen1.jpeg', label: d.screen3_label, desc: d.screen3_desc },
  ];
  return (
    <section
      id="screens"
      className="section-pad"
      style={{ background: 'linear-gradient(160deg,#f0f7ff,#fff)' }}
    >
      <div className="container-xl">
        <div className="section-header">
          <h2>{d.screens_title}</h2>
          <p>{d.screens_subtitle}</p>
        </div>

        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap:                 '3rem 2rem',
            justifyItems:        'center',
          }}
        >
          {screens.map(s => (
            <div
              key={s.src}
              style={{
                display:       'flex',
                flexDirection: 'column',
                alignItems:    'center',
                gap:           '1.5rem',
                width:         '100%',
                maxWidth:      '260px',
              }}
            >
              {/* Phone frame */}
              <div
                style={{
                  position:     'relative',
                  borderRadius: '2rem',
                  overflow:     'hidden',
                  boxShadow:    '0 20px 60px rgba(0,0,0,.18)',
                  border:       '4px solid #1f2937',
                  width:        '100%',
                  maxWidth:     '220px',
                  aspectRatio:  '220/470',
                  background:   '#111',
                  transition:   'transform .3s',
                }}
                className="hover:scale-105"
              >
                <div
                  className="absolute top-2 left-1/2 -translate-x-1/2 z-10"
                  style={{ width: '3.5rem', height: '0.875rem', borderRadius: '999px', background: '#111827' }}
                />
                <Image src={s.src} alt={s.label} fill style={{ objectFit: 'cover' }} />
              </div>

              {/* Caption */}
              <div style={{ textAlign: 'center', paddingInline: '0.5rem' }}>
                <p style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: '0.375rem' }}>{s.label}</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.6, color: '#6A6A6A' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ──────────────────────────────────────────────────────────────
function HowItWorks({ d }: { d: Dict }) {
  const steps = [
    { num: d.step1_num, title: d.step1_title, desc: d.step1_desc },
    { num: d.step2_num, title: d.step2_title, desc: d.step2_desc },
    { num: d.step3_num, title: d.step3_title, desc: d.step3_desc },
  ];
  return (
    <section id="how" className="section-pad" style={{ background: '#F7F9FF' }}>
      <div className="container-xl">
        <div className="section-header">
          <h2>{d.how_title}</h2>
          <p>{d.how_subtitle}</p>
        </div>

        <div
          style={{
            display:               'grid',
            gridTemplateColumns:   'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap:                   '2.5rem',
          }}
        >
          {steps.map(s => (
            <div
              key={s.num}
              style={{
                display:       'flex',
                flexDirection: 'column',
                alignItems:    'center',
                textAlign:     'center',
                gap:           '1.25rem',
              }}
            >
              {/* Step number circle */}
              <div
                style={{
                  width:           '5rem',
                  height:          '5rem',
                  borderRadius:    '50%',
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  fontSize:        '1.75rem',
                  fontWeight:      900,
                  color:           'white',
                  background:      'linear-gradient(135deg,#1877F2,#0ea5e9)',
                  boxShadow:       '0 8px 24px rgba(24,119,242,.30)',
                  flexShrink:      0,
                }}
              >
                {s.num}
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>{s.title}</h3>
              <p
                style={{
                  fontSize:  '0.9375rem',
                  lineHeight: 1.75,
                  color:      '#6A6A6A',
                  maxWidth:   '260px',
                }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Download Section ──────────────────────────────────────────────────────────
function Download({ d }: { d: Dict }) {
  const steps = [d.dl_guide_1, d.dl_guide_2, d.dl_guide_3, d.dl_guide_4];
  return (
    <section
      id="download"
      className="section-pad relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#1877F2 0%,#0c4fb5 100%)' }}
    >
      {/* Decorative blobs */}
      <div
        className="hero-blob"
        style={{
          width:            '20rem',
          height:           '20rem',
          top:              0,
          insetInlineStart: 0,
          background:       'white',
          opacity:          0.07,
        }}
      />
      <div
        className="hero-blob"
        style={{
          width:           '16rem',
          height:          '16rem',
          bottom:          0,
          insetInlineEnd:  0,
          background:      '#E87D2A',
          opacity:         0.10,
        }}
      />

      <div className="container-xl relative z-10">
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap:                 'clamp(2rem, 5vw, 4rem)',
            alignItems:          'start',
          }}
        >
          {/* Left/top: CTA column */}
          <div style={{ color: 'white' }}>
            <h2
              style={{
                fontSize:     'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight:   900,
                lineHeight:   1.2,
                marginBottom: '1rem',
              }}
            >
              {d.dl_title}
            </h2>
            <p
              style={{
                fontSize:     '1.125rem',
                opacity:      0.9,
                lineHeight:   1.7,
                marginBottom: '1.75rem',
              }}
            >
              {d.dl_subtitle}
            </p>

            {/* Meta pills */}
            <div
              style={{
                display:      'flex',
                flexWrap:     'wrap',
                gap:          '0.625rem',
                marginBottom: '2rem',
              }}
            >
              {[
                d.dl_version + ': ' + APP_CONFIG.APP_VERSION,
                d.dl_size    + ': ' + APP_CONFIG.APK_SIZE,
                d.dl_android + ' '  + APP_CONFIG.MIN_ANDROID_VERSION + '+',
              ].map(label => (
                <span
                  key={label}
                  className="info-pill"
                  style={{
                    background: 'rgba(255,255,255,.18)',
                    border:     '1px solid rgba(255,255,255,.30)',
                    color:      'white',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Download CTA */}
            <a
              href={APP_CONFIG.APK_DOWNLOAD_URL}
              download
              id="download-section-btn"
              className="btn btn-lg btn-ghost-white"
            >
              <DownloadIcon />
              {d.dl_btn}
            </a>

            <p
              style={{
                marginTop: '1rem',
                fontSize:  '0.875rem',
                opacity:   0.7,
                lineHeight: 1.6,
              }}
            >
              {d.dl_note}
            </p>
          </div>

          {/* Right/bottom: Installation guide */}
          <div
            style={{
              borderRadius:   '1.5rem',
              background:     'rgba(255,255,255,.10)',
              backdropFilter: 'blur(12px)',
              border:         '1px solid rgba(255,255,255,.20)',
              padding:        '2rem',
            }}
          >
            <h3
              style={{
                fontSize:     '1.375rem',
                fontWeight:   900,
                color:        'white',
                marginBottom: '1.5rem',
              }}
            >
              {d.dl_guide_title}
            </h3>
            <ol
              style={{
                display:       'flex',
                flexDirection: 'column',
                gap:           '1.125rem',
                listStyle:     'none',
                margin:        0,
                padding:       0,
              }}
            >
              {steps.map((step, i) => (
                <li
                  key={i}
                  style={{
                    display:    'flex',
                    alignItems: 'flex-start',
                    gap:        '1rem',
                  }}
                >
                  <span
                    style={{
                      width:           '2.25rem',
                      height:          '2.25rem',
                      borderRadius:    '50%',
                      display:         'flex',
                      alignItems:      'center',
                      justifyContent:  'center',
                      fontSize:        '0.875rem',
                      fontWeight:      900,
                      color:           '#1877F2',
                      background:      'white',
                      flexShrink:      0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      color:      'white',
                      fontWeight: 500,
                      lineHeight: 1.65,
                      paddingTop: '0.25rem',
                    }}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── User Guide Video ─────────────────────────────────────────────────────────
// Fetches instructionsVideoUrl from GET /api/settings (server-side) then
// embeds it as a 9:16 portrait YouTube iframe — perfect for vertical videos.
async function fetchVideoUrl(): Promise<string | null> {
  try {
    // Call our local proxy route (/api/settings) to avoid CORS and
    // normalise the backend response shape on the server side.
    const res = await fetch('/api/settings', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json() as { videoUrl?: string | null };
    return data.videoUrl ?? null;
  } catch {
    return null;
  }
}

function extractYoutubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('?')[0];
    return u.searchParams.get('v');
  } catch {
    return null;
  }
}

function UserGuideVideo({ d, videoId }: { d: Dict; videoId: string | null }) {
  return (
    <section id="video" className="section-pad" style={{ background: 'linear-gradient(160deg,#f7f9ff,#fff)' }}>
      <div className="container-xl">
        <div className="section-header">
          <h2>{d.video_title}</h2>
          <p>{d.video_subtitle}</p>
        </div>

        <div
          style={{
            display:        'flex',
            justifyContent: 'center',
          }}
        >
          {videoId ? (
            <div
              style={{
                position:     'relative',
                width:        '100%',
                maxWidth:     '340px',
                aspectRatio:  '9 / 16',
                borderRadius: '20px',
                overflow:     'hidden',
                boxShadow:    '0 24px 72px rgba(24,119,242,.18), 0 8px 24px rgba(0,0,0,.12)',
                border:       '3px solid #e8f0fe',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
                title="User Guide"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  inset:    0,
                  width:    '100%',
                  height:   '100%',
                  border:   'none',
                }}
              />
            </div>
          ) : (
            <div
              style={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'center',
                gap:            '1rem',
                width:          '100%',
                maxWidth:       '340px',
                aspectRatio:    '9 / 16',
                borderRadius:   '20px',
                background:     'linear-gradient(135deg,#1877F2 0%,#0c4fb5 100%)',
                color:          'white',
                textAlign:      'center',
                padding:        '2rem',
              }}
            >
              <svg width="56" height="56" viewBox="0 0 24 24" fill="white" opacity={0.6}>
                <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>
              </svg>
              <p style={{ fontSize: '1.0625rem', fontWeight: 700, opacity: 0.9 }}>{d.video_unavailable}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── WhatsApp Support + Emergency Contacts ────────────────────────────────────
function WhatsAppSection({ d }: { d: Dict }) {
  const waUrl = `https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}`;
  return (
    <section
      id="support"
      className="section-pad"
      style={{ background: '#f0faf4' }}
    >
      <div className="container-xl">
        <div
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap:                 'clamp(2rem, 5vw, 4rem)',
            alignItems:          'center',
          }}
        >
          {/* WhatsApp CTA card */}
          <div
            style={{
              background:   'white',
              borderRadius: '24px',
              padding:      'clamp(1.75rem, 4vw, 2.5rem)',
              boxShadow:    '0 8px 40px rgba(37,211,102,.12)',
              border:       '1.5px solid #d4f5e2',
              display:      'flex',
              flexDirection:'column',
              gap:          '1.25rem',
            }}
          >
            {/* Badge */}
            <span
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '0.4rem',
                fontSize:      '0.8125rem',
                fontWeight:    700,
                color:         '#16a34a',
                background:    '#dcfce7',
                borderRadius:  '999px',
                padding:       '0.3rem 0.875rem',
                alignSelf:     'flex-start',
              }}
            >
              <span style={{ fontSize: '1rem' }}>✅</span>
              {d.whatsapp_badge}
            </span>

            <h2
              style={{
                fontSize:   'clamp(1.375rem, 3.5vw, 1.875rem)',
                fontWeight: 900,
                lineHeight: 1.25,
                color:      '#111',
              }}
            >
              {d.whatsapp_title}
            </h2>

            <p
              style={{
                fontSize:   '0.9375rem',
                lineHeight: 1.75,
                color:      '#555',
              }}
            >
              {d.whatsapp_subtitle}
            </p>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="whatsapp-support-btn"
              style={{
                display:         'inline-flex',
                alignItems:      'center',
                justifyContent:  'center',
                gap:             '0.625rem',
                padding:         '0.875rem 1.75rem',
                borderRadius:    '14px',
                background:      'linear-gradient(135deg,#25D366,#128C7E)',
                color:           'white',
                fontWeight:      800,
                fontSize:        '1rem',
                textDecoration:  'none',
                boxShadow:       '0 6px 24px rgba(37,211,102,.35)',
                transition:      'transform .25s, box-shadow .25s',
                alignSelf:       'flex-start',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 32px rgba(37,211,102,.45)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = '';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 24px rgba(37,211,102,.35)';
              }}
            >
              {/* WhatsApp SVG logo */}
              <svg width="22" height="22" viewBox="0 0 32 32" fill="white">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.741 5.494 2.043 7.8L0 32l8.4-2.004A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.293 22.72c-.344.97-2.01 1.86-2.762 1.977-.703.109-1.588.155-2.562-.16-.59-.19-1.348-.443-2.322-.867-4.09-1.765-6.763-5.88-6.969-6.153-.204-.273-1.667-2.216-1.667-4.228s1.056-2.997 1.43-3.411c.374-.414.815-.517 1.088-.517.273 0 .545.003.785.014.251.012.588-.096.92.702.344.82 1.17 2.834 1.273 3.039.103.204.172.443.034.716-.137.272-.204.442-.407.681-.204.24-.43.535-.614.717-.205.204-.417.424-.18.833.237.408 1.056 1.74 2.268 2.818 1.557 1.384 2.87 1.813 3.278 2.016.408.204.645.172.885-.103.24-.273 1.022-1.19 1.294-1.598.273-.408.545-.34.917-.204.374.137 2.378 1.12 2.786 1.322.408.205.68.308.783.48.103.17.103.972-.24 1.94z"/>
              </svg>
              {d.whatsapp_btn}
            </a>
          </div>

          {/* Emergency contacts feature highlight */}
          <div
            style={{
              display:      'flex',
              flexDirection:'column',
              gap:          '1.5rem',
            }}
          >
            {/* Icon + heading */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div
                style={{
                  width:          '3.5rem',
                  height:         '3.5rem',
                  borderRadius:   '14px',
                  background:     '#fee2e2',
                  color:          '#ef4444',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  flexShrink:     0,
                }}
              >
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.07 3.43 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1875rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  {d.whatsapp_contacts_title}
                </h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: '#555' }}>
                  {d.whatsapp_contacts_desc}
                </p>
              </div>
            </div>

            {/* Visual: fake contact list */}
            <div
              style={{
                background:   'white',
                borderRadius: '16px',
                padding:      '1.25rem',
                boxShadow:    '0 4px 20px rgba(0,0,0,.06)',
                border:       '1px solid #f0f0f0',
                display:      'flex',
                flexDirection:'column',
                gap:          '0.75rem',
              }}
            >
              {[
                { initials: 'أ م', name: 'أحمد محمد', phone: '+20 10x xxxx xxxx', color: '#ef4444' },
                { initials: 'س ك', name: 'سارة كريم',  phone: '+20 11x xxxx xxxx', color: '#1877F2' },
              ].map(c => (
                <div
                  key={c.name}
                  style={{
                    display:     'flex',
                    alignItems:  'center',
                    gap:         '0.875rem',
                    padding:     '0.625rem 0.75rem',
                    borderRadius:'10px',
                    background:  '#fafafa',
                    border:      '1px solid #f0f0f0',
                  }}
                >
                  <div
                    style={{
                      width:          '2.5rem',
                      height:         '2.5rem',
                      borderRadius:   '50%',
                      background:     c.color + '18',
                      color:          c.color,
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      fontWeight:     700,
                      fontSize:       '0.75rem',
                      flexShrink:     0,
                    }}
                  >
                    {c.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                    <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111', margin: 0 }}>{c.name}</p>
                    <p style={{ fontSize: '0.8125rem', color: '#888', margin: 0, unicodeBidi: 'plaintext' }}>{c.phone}</p>
                  </div>
                  <div
                    style={{
                      width:          '2rem',
                      height:         '2rem',
                      borderRadius:   '50%',
                      background:     '#f0faf4',
                      color:          '#16a34a',
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.07 3.43 2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// ─── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ({ d }: { d: Dict }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section id="faq" className="section-pad" style={{ background: '#F2F2F2' }}>
      <div className="container-xl">
        <div className="section-header">
          <h2>{d.faq_title}</h2>
          <p>{d.faq_subtitle}</p>
        </div>

        <div
          style={{
            maxWidth:      '760px',
            marginInline:  'auto',
            display:       'flex',
            flexDirection: 'column',
            gap:           '0.75rem',
          }}
        >
          {(d.faq_items as unknown as Array<{ q: string; a: string }>).map((item, i) => (
            <div
              key={i}
              id={`faq-item-${i}`}
              style={{
                borderRadius: '16px',
                overflow:     'hidden',
                cursor:       'pointer',
                background:   'white',
                border:       openIdx === i ? '1.5px solid #1877F2' : '1.5px solid #EBEBEB',
                boxShadow:    '0 2px 12px rgba(0,0,0,.05)',
              }}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              {/* Question row */}
              <div
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'space-between',
                  gap:            '1rem',
                  paddingInline:  '1.5rem',
                  paddingBlock:   '1.125rem',
                }}
              >
                <span style={{ fontSize: '0.9375rem', fontWeight: 700, lineHeight: 1.5 }}>{item.q}</span>
                <span
                  className="shrink-0 transition-transform duration-300"
                  style={{ color: '#1877F2', transform: openIdx === i ? 'rotate(45deg)' : 'rotate(0)' }}
                >
                  <PlusIcon />
                </span>
              </div>

              {/* Answer */}
              {openIdx === i && (
                <div
                  style={{
                    color:         '#6A6A6A',
                    paddingInline: '1.5rem',
                    paddingBottom: '1.25rem',
                    fontSize:      '0.9375rem',
                    lineHeight:    1.75,
                  }}
                >
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer({ d, lang }: { d: Dict; lang: Lang }) {
  const year = new Date().getFullYear();
  const footerLinks = [
    { href: '#features', label: d.nav_features },
    { href: '#download', label: d.nav_download },
    { href: '#faq',      label: d.nav_faq },
    ...(APP_CONFIG.PRIVACY_POLICY_URL ? [{ href: APP_CONFIG.PRIVACY_POLICY_URL, label: d.footer_privacy }] : []),
    ...(APP_CONFIG.SUPPORT_EMAIL      ? [{ href: 'mailto:' + APP_CONFIG.SUPPORT_EMAIL, label: d.footer_contact }] : []),
  ];

  return (
    <footer
      style={{
        background:    '#111',
        paddingTop:    '3.5rem',
        paddingBottom: '2rem',
      }}
    >
      <div className="container-xl">
        {/* Top row */}
        <div
          style={{
            display:       'flex',
            flexWrap:      'wrap',
            alignItems:    'flex-start',
            justifyContent:'space-between',
            gap:           '2.5rem',
            marginBottom:  '2.5rem',
          }}
        >
          {/* Brand */}
          <div
            style={{
              display:       'flex',
              flexDirection: 'column',
              gap:           '0.75rem',
              minWidth:      '200px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Image src="/logo.png" alt="Timely Meds" width={44} height={44} className="rounded-xl" />
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#E87D2A' }}>
                {lang === 'ar' ? APP_CONFIG.APP_NAME_AR : APP_CONFIG.APP_NAME_EN}
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#6A6A6A', maxWidth: '260px', lineHeight: 1.65 }}>
              {d.footer_desc}
            </p>
          </div>

          {/* Links */}
          <div
            style={{
              display:  'flex',
              flexWrap: 'wrap',
              gap:      '1rem 2rem',
              paddingTop: '0.25rem',
            }}
          >
            {footerLinks.map(item => (
              <a
                key={item.href}
                href={item.href}
                style={{
                  fontSize:   '0.875rem',
                  fontWeight: 600,
                  color:      '#9A9A9A',
                  transition: 'color .2s',
                  textDecoration: 'none',
                }}
                className="hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop:    '1px solid #2a2a2a',
            paddingTop:   '1.5rem',
            textAlign:    'center',
            fontSize:     '0.8125rem',
            color:        '#6A6A6A',
          }}
        >
          {'© ' + year + ' ' + (lang === 'ar' ? APP_CONFIG.APP_NAME_AR : APP_CONFIG.APP_NAME_EN) + ' — ' + d.footer_rights}
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang]       = useState<Lang>('ar');
  const [videoId, setVideoId] = useState<string | null>(null);
  const d      = lang === 'ar' ? ar : en;
  const toggle = () => setLang(l => l === 'ar' ? 'en' : 'ar');

  // Fetch the YouTube video URL from the backend on mount
  useEffect(() => {
    fetchVideoUrl().then(url => {
      if (url) {
        const id = extractYoutubeId(url);
        setVideoId(id);
      }
    });
  }, []);

  return (
    <div dir={d.dir} lang={d.lang} style={{ fontFamily: "'Cairo', sans-serif" }}>
      <Navbar d={d} lang={lang} toggle={toggle} />
      <main>
        <Hero d={d} />
        <Features d={d} />
        <Screens d={d} />
        <HowItWorks d={d} />
        <UserGuideVideo d={d} videoId={videoId} />
        <WhatsAppSection d={d} />
        <Download d={d} />
        <FAQ d={d} />
      </main>
      <Footer d={d} lang={lang} />
    </div>
  );
}






