import { Component } from '@angular/core';
import { EXPERIENCE, PROJECTS } from '../data/portfolio.data';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-work',
  imports: [RevealDirective],
  template: `
    <section class="section" id="experience">
      <div class="container" appReveal>
        <div class="section-head">
          <span class="eyebrow">03 · experience</span>
          <h2>Where I’ve worked</h2>
        </div>
        <ol class="timeline">
          @for (job of jobs; track $index) {
            <li class="card job" [class.is-placeholder]="job.placeholder">
              <div class="job-head">
                <div>
                  <h3>{{ job.role }}</h3>
                  <p class="company">{{ job.company }} · {{ job.location }}</p>
                </div>
                <div class="meta">
                  @if (job.placeholder) { <span class="todo-tag">Replace me</span> }
                  <span class="period">{{ job.period }}</span>
                </div>
              </div>
              @if (job.intro) { <p class="intro">{{ job.intro }}</p> }
              <ul class="points">
                @for (pt of job.points; track $index) {
                  <li>{{ pt }}</li>
                }
              </ul>
              <div class="chips">
                @for (t of job.tech; track t) { <span class="chip">{{ t }}</span> }
              </div>
            </li>
          }
        </ol>
      </div>
    </section>

    <section class="section" id="projects">
      <div class="container" appReveal>
        <div class="section-head">
          <span class="eyebrow">04 · projects</span>
          <h2>Platforms I’ve shipped</h2>
        </div>
        <div class="projects">
          @for (pr of projects; track $index) {
            <article class="card project" [class.is-placeholder]="pr.placeholder" (pointermove)="spot($event)">
              <div class="project-top">
                <span class="index">{{ ($index + 1).toString().padStart(2, '0') }}</span>
                @if (pr.placeholder) { <span class="todo-tag">Replace me</span> }
              </div>
              <h3>{{ pr.name }}</h3>
              <span class="kind">{{ pr.kind }}</span>
              <p>{{ pr.summary }}</p>
              <div class="chips">
                @for (t of pr.tech; track t) { <span class="chip">{{ t }}</span> }
              </div>
              @if (pr.liveUrl || pr.codeUrl) {
                <div class="project-links">
                  @if (pr.liveUrl) { <a [href]="pr.liveUrl" target="_blank" rel="noopener">Live ↗</a> }
                  @if (pr.codeUrl) { <a [href]="pr.codeUrl" target="_blank" rel="noopener">Code ↗</a> }
                </div>
              }
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .timeline {
      list-style: none;
      margin: 0;
      padding: 0 0 0 28px;
      position: relative;
      display: grid;
      gap: 20px;
    }
    .timeline::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 8px;
      bottom: 8px;
      width: 2px;
      background: var(--line);
    }
    .job { padding: 24px; position: relative; }
    .job::before {
      content: '';
      position: absolute;
      left: -28px;
      top: 30px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--bg);
      border: 3px solid var(--accent);
    }
    .job-head {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }
    .job h3 { font-size: 20px; }
    .company { margin: 4px 0 0; color: var(--accent); font-weight: 500; }
    .meta { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
    .period { font-family: var(--font-mono); font-size: 13px; color: var(--muted); }
    .intro { margin: 16px 0 0; padding: 14px 16px; border-radius: 10px; background: var(--accent-soft); }
    .points { margin: 16px 0; padding-left: 20px; color: var(--muted); }
    @media (min-width: 900px) { .points { columns: 2; column-gap: 40px; } .points li { break-inside: avoid; } }
    .points li { margin-bottom: 6px; }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; }

    .projects {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    .project {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .project { position: relative; overflow: hidden; }
    .project::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), var(--accent-soft), transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    .project:hover::before { opacity: 1; }
    .project > * { position: relative; }
    .project:hover { transform: translateY(-4px); border-color: var(--accent); }
    .project-top { display: flex; justify-content: space-between; align-items: center; }
    .index { font-family: var(--font-mono); font-size: 13px; color: var(--accent); }
    .project h3 { font-size: 19px; }
    .kind { font-size: 13px; font-weight: 600; color: var(--accent); margin-top: -6px; }
    .project p { margin: 0; color: var(--muted); flex: 1; }
    .project-links { display: flex; gap: 16px; margin-top: 4px; }
    .project-links a { font-weight: 600; text-decoration: none; color: var(--accent); }
  `,
})
export class WorkComponent {
  protected readonly jobs = EXPERIENCE;
  protected readonly projects = PROJECTS;

  /** Moves the card's spotlight to follow the cursor. */
  protected spot(e: PointerEvent): void {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }
}
