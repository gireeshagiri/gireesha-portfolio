import { Component, signal } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [RevealDirective],
  template: `
    <section class="section" id="contact">
      <div class="container" appReveal>
        <div class="card panel">
          <span class="eyebrow">05 · contact</span>
          <h2>Let’s build something good together.</h2>
          <p class="sub">
            Have a project, a role or just a question about Angular? The quickest way to reach me is email.
          </p>

          <div class="rows">
            <div class="row">
              <span class="label">Email</span>
              <a [href]="'mailto:' + p.email">{{ p.email }}</a>
              <button type="button" class="copy" (click)="copy(p.email)">
                {{ copied() ? 'Copied ✓' : 'Copy' }}
              </button>
            </div>
            <div class="row">
              <span class="label">Phone</span>
              <a [href]="'tel:' + p.phone.replace(' ', '')">{{ p.phone }}</a>
            </div>
            <div class="row">
              <span class="label">LinkedIn</span>
              <a [href]="p.linkedin" target="_blank" rel="noopener">View profile ↗</a>
            </div>
            @if (p.github) {
              <div class="row">
                <span class="label">GitHub</span>
                <a [href]="p.github" target="_blank" rel="noopener">View code ↗</a>
              </div>
            }
          </div>

          <a class="btn primary" [href]="'mailto:' + p.email + '?subject=Hello%20Gireesha'">
            Email me
          </a>
        </div>
      </div>
    </section>

    <footer class="container foot">
      <span>© {{ year }} {{ p.name }}</span>
      <span>Built with Angular 21 · signals · zoneless</span>
    </footer>
  `,
  styles: `
    .panel {
      padding: clamp(28px, 5vw, 56px);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .eyebrow { font-family: var(--font-mono); font-size: 13px; color: var(--accent); }
    h2 { font-size: clamp(26px, 4vw, 40px); margin: 12px 0 14px; max-width: 18em; }
    .sub { color: var(--muted); max-width: 34em; margin: 0 0 28px; }
    .rows {
      width: 100%;
      max-width: 520px;
      border: 1px solid var(--line);
      border-radius: 12px;
      margin-bottom: 28px;
      text-align: left;
    }
    .row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border-bottom: 1px solid var(--line);
      min-width: 0;
    }
    .row:last-child { border-bottom: 0; }
    .label {
      width: 76px;
      flex: none;
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--muted);
      text-transform: uppercase;
    }
    .row a {
      font-weight: 500;
      text-decoration: none;
      overflow-wrap: anywhere;
      flex: 1;
    }
    .row a:hover { color: var(--accent); }
    .copy {
      flex: none;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid var(--line);
      background: var(--surface-2);
      color: var(--text);
      cursor: pointer;
    }
    .foot {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      padding-top: 8px;
      padding-bottom: 40px;
      font-size: 13px;
      color: var(--muted);
    }
  `,
})
export class ContactComponent {
  protected readonly p = PROFILE;
  protected readonly year = new Date().getFullYear();
  protected readonly copied = signal(false);

  protected async copy(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  }
}
