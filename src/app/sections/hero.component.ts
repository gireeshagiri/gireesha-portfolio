import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { PROFILE, STATS } from '../data/portfolio.data';

/** Phrases the hero types out one after another. */
const PHRASES = [
  'scalable Angular apps',
  'reusable component libraries',
  'clean state with NgRx',
  'dynamic theming systems',
  'fast, responsive UIs',
];

interface CountStat {
  target: number;
  decimals: number;
  prefix: string;
  suffix: string;
  label: string;
}

function parseStat(value: string, label: string): CountStat {
  const m = value.match(/^(\D*)([\d.]+)(.*)$/);
  if (!m) return { target: 0, decimals: 0, prefix: value, suffix: '', label };
  const decimals = m[2].includes('.') ? m[2].split('.')[1].length : 0;
  return { prefix: m[1], target: parseFloat(m[2]), decimals, suffix: m[3], label };
}

@Component({
  selector: 'app-hero',
  template: `
    <section class="hero" id="top">
      <div class="bg" aria-hidden="true">
        <span class="orb one"></span>
        <span class="orb two"></span>
        <span class="gridlines"></span>
      </div>

      <div class="container grid">
        <div class="copy">
          <p class="status rise" style="--d: 0"><span class="dot" aria-hidden="true"></span>{{ p.badge }}</p>
          <h1 class="rise" style="--d: 1">
            Hi, I’m <span class="nowrap">{{ p.name }}.</span><br />
            <span class="accent">{{ p.title }}.</span>
          </h1>
          <p class="typed rise" style="--d: 2" aria-live="off">
            I build <span class="word">{{ typed() }}</span><span class="caret" aria-hidden="true"></span>
          </p>
          <p class="lead rise" style="--d: 3">{{ p.tagline }}</p>
          <div class="cta rise" style="--d: 4">
            <a class="btn primary" href="#contact">
              Get in touch
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12h14m0 0l-6-6m6 6l-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <a class="btn ghost" href="#projects">See my work</a>
          </div>
          <ul class="facts rise" style="--d: 5">
            @for (s of stats; track s.label; let i = $index) {
              <li>
                <strong>{{ s.prefix }}{{ counts()[i] }}{{ s.suffix }}</strong>
                <span>{{ s.label }}</span>
              </li>
            }
          </ul>
        </div>

        <figure
          class="code card rise"
          style="--d: 3"
          aria-label="Profile summary written as TypeScript"
          (pointermove)="tilt($event)"
          (pointerleave)="resetTilt()"
          [style.transform]="tiltTransform()"
        >
          <div class="code-top">
            <span></span><span></span><span></span>
            <em>developer.ts</em>
          </div>
          <pre><code><span class="k">const</span> developer = {{ '{' }}
  name: <span class="s">'{{ p.name }}'</span>,
  role: <span class="s">'{{ p.title }}'</span>,
  stack: [<span class="s">'Angular'</span>, <span class="s">'TypeScript'</span>, <span class="s">'RxJS'</span>, <span class="s">'NgRx'</span>],
  domain: <span class="s">'Insurance platforms'</span>,
  basedIn: <span class="s">'Hosur, Tamil Nadu'</span>,
  leads: <span class="s">'team of 4 developers'</span>,
{{ '}' }} <span class="k">satisfies</span> Engineer;<span class="cursor" aria-hidden="true"></span></code></pre>
          <div class="glow" aria-hidden="true"></div>
        </figure>
      </div>

      <a class="scroll-hint" href="#about" aria-label="Scroll to About">
        <span></span>
      </a>
    </section>
  `,
  styles: `
    .hero {
      position: relative;
      padding: 72px 0 104px;
      overflow: hidden;
      isolation: isolate;
    }

    /* ── Animated background ── */
    .bg { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
    .gridlines {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(var(--line) 1px, transparent 1px),
        linear-gradient(90deg, var(--line) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 20%, transparent 75%);
      -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 20%, transparent 75%);
      opacity: 0.55;
    }
    .orb {
      position: absolute;
      width: 420px;
      height: 420px;
      border-radius: 50%;
      filter: blur(90px);
      opacity: 0.35;
    }
    .orb.one { background: var(--accent); top: -120px; left: -80px; animation: drift 16s ease-in-out infinite alternate; }
    .orb.two { background: #7c3aed; bottom: -160px; right: -60px; animation: drift 20s ease-in-out infinite alternate-reverse; }
    @keyframes drift {
      to { transform: translate(120px, 60px) scale(1.15); }
    }

    .grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      gap: 48px;
      align-items: center;
    }

    /* ── Staggered entrance ── */
    .rise { animation: rise 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both; animation-delay: calc(var(--d) * 110ms); }
    @keyframes rise {
      from { opacity: 0; transform: translateY(22px); filter: blur(4px); }
      to { opacity: 1; transform: none; filter: none; }
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: var(--muted);
      padding: 6px 12px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: color-mix(in srgb, var(--surface) 80%, transparent);
      backdrop-filter: blur(6px);
      margin: 0 0 24px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      flex: none;
      animation: ping 2s ease-out infinite;
    }
    @keyframes ping {
      0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55); }
      100% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
    }
    h1 { font-size: clamp(36px, 6vw, 60px); }
    .accent {
      background: linear-gradient(100deg, var(--accent) 20%, #a855f7 60%, var(--accent) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: shimmer 6s linear infinite;
    }
    @keyframes shimmer { to { background-position: 200% center; } }
    .nowrap { white-space: nowrap; }

    .typed {
      margin: 18px 0 0;
      font-family: var(--font-mono);
      font-size: clamp(15px, 2vw, 18px);
      color: var(--muted);
      min-height: 1.7em;
    }
    .word { color: var(--text); font-weight: 500; }
    .caret {
      display: inline-block;
      width: 2px;
      height: 1.1em;
      margin-left: 3px;
      vertical-align: -0.15em;
      background: var(--accent);
      animation: blink 1s steps(1) infinite;
    }
    @keyframes blink { 50% { opacity: 0; } }

    .lead {
      font-size: 18px;
      color: var(--muted);
      max-width: 34em;
      margin: 14px 0 32px;
    }
    .cta { display: flex; flex-wrap: wrap; gap: 12px; }
    .cta .primary svg { transition: transform 0.2s ease; }
    .cta .primary:hover svg { transform: translateX(3px); }

    .facts {
      list-style: none;
      padding: 0;
      margin: 40px 0 0;
      display: grid;
      grid-template-columns: repeat(4, auto);
      justify-content: start;
      gap: 16px 28px;
    }
    .facts li { display: flex; flex-direction: column; padding-left: 14px; border-left: 2px solid var(--line); }
    .facts strong { font-family: var(--font-display); font-size: 24px; font-variant-numeric: tabular-nums; }
    .facts span { font-size: 13px; color: var(--muted); max-width: 9.5em; line-height: 1.35; margin-top: 2px; }

    /* ── Code card ── */
    .code {
      position: relative;
      margin: 0;
      background: var(--code-bg);
      border-color: rgba(255, 255, 255, 0.06);
      color: var(--code-text);
      overflow: hidden;
      transition: transform 0.25s ease;
      will-change: transform;
      box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.5);
    }
    .glow {
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(135deg, var(--accent), transparent 40%, transparent 60%, #7c3aed);
      -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
      opacity: 0.8;
    }
    .code-top {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    }
    .code-top span { width: 10px; height: 10px; border-radius: 50%; background: #3a3a46; }
    .code-top span:nth-child(1) { background: #ff5f57; }
    .code-top span:nth-child(2) { background: #febc2e; }
    .code-top span:nth-child(3) { background: #28c840; }
    .code-top em {
      margin-left: 10px;
      font-style: normal;
      font-family: var(--font-mono);
      font-size: 12px;
      color: #8b8b99;
    }
    pre {
      margin: 0;
      padding: 20px;
      font-family: var(--font-mono);
      font-size: 13.5px;
      line-height: 1.8;
      overflow-x: auto;
    }
    .k { color: #ff7b8a; }
    .s { color: #9fe0a8; }
    .cursor {
      display: inline-block;
      width: 8px;
      height: 1.1em;
      margin-left: 4px;
      vertical-align: -0.2em;
      background: #e7e7ee;
      animation: blink 1s steps(1) infinite;
    }

    /* ── Scroll hint ── */
    .scroll-hint {
      position: absolute;
      left: 50%;
      bottom: 24px;
      width: 24px;
      height: 38px;
      margin-left: -12px;
      border: 2px solid var(--line);
      border-radius: 14px;
      display: flex;
      justify-content: center;
      padding-top: 6px;
    }
    .scroll-hint span {
      width: 4px;
      height: 8px;
      border-radius: 2px;
      background: var(--accent);
      animation: wheel 1.6s ease-in-out infinite;
    }
    @keyframes wheel {
      0% { opacity: 0; transform: translateY(0); }
      30% { opacity: 1; }
      100% { opacity: 0; transform: translateY(12px); }
    }

    @media (max-width: 860px) {
      .hero { padding: 40px 0 88px; }
      .grid { grid-template-columns: 1fr; gap: 40px; }
      .orb { width: 280px; height: 280px; }
    }
    @media (max-width: 520px) {
      .facts { grid-template-columns: repeat(2, 1fr); }
    }
    @media (prefers-reduced-motion: reduce) {
      .rise, .orb, .accent, .dot, .scroll-hint span { animation: none; }
      .code { transition: none; }
    }
  `,
})
export class HeroComponent implements OnInit, OnDestroy {
  protected readonly p = PROFILE;
  protected readonly stats = STATS.map((s) => parseStat(s.value, s.label));
  protected readonly counts = signal(this.stats.map(() => '0'));
  protected readonly typed = signal('');
  protected readonly tiltTransform = signal('');

  private timers: ReturnType<typeof setTimeout>[] = [];
  private raf = 0;
  private reduced = false;

  ngOnInit(): void {
    this.reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (this.reduced) {
      this.typed.set(PHRASES[0]);
      this.counts.set(this.stats.map((s) => s.target.toFixed(s.decimals)));
      return;
    }
    this.timers.push(setTimeout(() => this.countUp(), 700));
    this.typeLoop(0, 0, false);
  }

  ngOnDestroy(): void {
    this.timers.forEach(clearTimeout);
    cancelAnimationFrame(this.raf);
  }

  /** Types a phrase, pauses, deletes it, moves to the next. */
  private typeLoop(phrase: number, chars: number, deleting: boolean): void {
    const text = PHRASES[phrase];
    this.typed.set(text.slice(0, chars));
    let next: () => void;
    let delay: number;
    if (!deleting && chars < text.length) {
      next = () => this.typeLoop(phrase, chars + 1, false);
      delay = 55;
    } else if (!deleting) {
      next = () => this.typeLoop(phrase, chars, true);
      delay = 1800;
    } else if (chars > 0) {
      next = () => this.typeLoop(phrase, chars - 1, true);
      delay = 28;
    } else {
      next = () => this.typeLoop((phrase + 1) % PHRASES.length, 0, false);
      delay = 300;
    }
    this.timers = [setTimeout(next, delay)];
  }

  /** Counts every stat up from zero with an ease-out curve. */
  private countUp(): void {
    const start = performance.now();
    const duration = 1400;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      this.counts.set(this.stats.map((s) => (s.target * eased).toFixed(s.decimals)));
      if (t < 1) this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }

  protected tilt(e: PointerEvent): void {
    if (this.reduced || e.pointerType !== 'mouse') return;
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    this.tiltTransform.set(`perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`);
  }

  protected resetTilt(): void {
    this.tiltTransform.set('');
  }
}
