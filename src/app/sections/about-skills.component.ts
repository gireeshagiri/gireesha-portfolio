import { Component } from '@angular/core';
import { EDUCATION, PROFILE } from '../data/portfolio.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [RevealDirective],
  template: `
    <section class="section" id="about">
      <div class="container about" appReveal>
        <div class="section-head">
          <span class="eyebrow">01 · about</span>
          <h2>A bit about me</h2>
        </div>
        <div class="about-body">
          <div class="text">
            @for (para of p.about; track $index) {
              <p>{{ para }}</p>
            }
          </div>
          <aside class="card side">
            <dl>
              <div><dt>Based in</dt><dd>{{ p.location }}</dd></div>
              <div><dt>Current role</dt><dd>Frontend / Angular Developer, Swiftant IT Solutions</dd></div>
              <div><dt>Languages</dt><dd>{{ p.languages }}</dd></div>
              @for (e of education; track $index) {
                <div>
                  <dt>Education @if (e.placeholder) { <span class="todo-tag">Replace me</span> }</dt>
                  <dd>{{ e.degree }}<br /><span class="sub">{{ e.school }} · {{ e.period }}@if (e.note) { · {{ e.note }} }</span></dd>
                </div>
              }
            </dl>
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: `
    .about-body {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 40px;
      align-items: start;
    }
    .text p { margin: 0 0 18px; font-size: 17px; color: var(--muted); }
    .text p:first-child { color: var(--text); font-size: 18px; }
    .side { padding: 8px 24px; }
    dl { margin: 0; }
    dl > div { padding: 14px 0; border-bottom: 1px solid var(--line); }
    dl > div:last-child { border-bottom: 0; }
    dt {
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      display: flex;
      gap: 8px;
      align-items: center;
    }
    dd { margin: 4px 0 0; font-weight: 500; }
    dd .sub { font-weight: 400; color: var(--muted); font-size: 14px; }

    @media (max-width: 860px) {
      .about-body { grid-template-columns: 1fr; }
    }
  `,
})
export class AboutSkillsComponent {
  protected readonly p = PROFILE;
  protected readonly education = EDUCATION;
}
