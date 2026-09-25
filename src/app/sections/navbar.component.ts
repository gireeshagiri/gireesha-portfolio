import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';
import { ThemeService } from '../shared/theme.service';
import { ScrollService } from '../shared/scroll.service';

interface NavLink {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  template: `
    <header class="bar" [class.scrolled]="scroll.scrolled()">
      <span class="progress" [style.transform]="'scaleX(' + scroll.progress() + ')'" aria-hidden="true"></span>
      <nav class="container inner" aria-label="Main">
        <a class="brand" href="#top" (click)="menuOpen.set(false)">
          <span class="mark">{{ profile.initials }}</span>
          <span class="brand-name">{{ profile.name }}</span>
        </a>

        <ul class="links" [class.open]="menuOpen()">
          @for (link of links; track link.id) {
            <li>
              <a
                [href]="'#' + link.id"
                [class.active]="active() === link.id"
                (click)="menuOpen.set(false)"
                >{{ link.label }}</a
              >
            </li>
          }
        </ul>

        <div class="actions">
          <button
            class="icon-btn"
            type="button"
            (click)="theme.toggle()"
            [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          >
            @if (theme.theme() === 'dark') {
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            } @else {
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
            }
          </button>
          <button
            class="icon-btn menu-btn"
            type="button"
            (click)="menuOpen.update((v) => !v)"
            [attr.aria-expanded]="menuOpen()"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              @if (menuOpen()) {
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              } @else {
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              }
            </svg>
          </button>
        </div>
      </nav>
    </header>
  `,
  styles: `
    .bar {
      position: sticky;
      top: 0;
      z-index: 50;
      background: color-mix(in srgb, var(--bg) 82%, transparent);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s ease;
    }
    .bar.scrolled { border-bottom-color: var(--line); }
    .progress {
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      height: 2px;
      transform-origin: left;
      background: linear-gradient(90deg, var(--accent), #a855f7);
      pointer-events: none;
    }
    .inner {
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      font-weight: 600;
    }
    .mark {
      width: 34px;
      height: 34px;
      border-radius: 9px;
      display: grid;
      place-items: center;
      background: var(--accent);
      color: var(--accent-ink);
      font-family: var(--font-display);
      font-size: 14px;
    }
    .links {
      list-style: none;
      display: flex;
      gap: 4px;
      margin: 0;
      padding: 0;
    }
    .links a {
      display: block;
      padding: 8px 12px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 14px;
      color: var(--muted);
      transition: color 0.2s ease, background-color 0.2s ease;
    }
    .links a:hover { color: var(--text); }
    .links a { position: relative; }
    .links a::after {
      content: '';
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 3px;
      height: 2px;
      border-radius: 2px;
      background: var(--accent);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
    .links a:hover::after { transform: scaleX(0.4); }
    .links a.active { color: var(--text); }
    .links a.active::after { transform: scaleX(1); }
    .actions { display: flex; gap: 6px; }
    .icon-btn {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 10px;
      border: 1px solid var(--line);
      background: var(--surface);
      color: var(--text);
      cursor: pointer;
    }
    .menu-btn { display: none; }


    @media (max-width: 760px) {
      .brand-name { display: none; }
      .menu-btn { display: grid; }
      .links {
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        flex-direction: column;
        padding: 8px 16px 16px;
        background: var(--bg);
        border-bottom: 1px solid var(--line);
        display: none;
      }
      .links.open { display: flex; }
      .links a { padding: 12px; font-size: 16px; }
    }
  `,
})
export class NavbarComponent implements OnInit, OnDestroy {
  protected readonly theme = inject(ThemeService);
  protected readonly scroll = inject(ScrollService);
  protected readonly profile = PROFILE;
  protected readonly menuOpen = signal(false);
  protected readonly active = signal('');

  protected readonly links: NavLink[] = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') return;
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) this.active.set(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    // Sections render in the same tick as the navbar; observe on the next frame.
    requestAnimationFrame(() => {
      for (const l of this.links) {
        const el = document.getElementById(l.id);
        if (el) this.observer?.observe(el);
      }
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
