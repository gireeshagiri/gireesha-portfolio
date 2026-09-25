import { Component, computed, inject } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';
import { ScrollService } from '../shared/scroll.service';

const R = 21;
const CIRC = 2 * Math.PI * R;

/**
 * Floating dock that slides in once the visitor scrolls past the hero:
 * a Resume button (its ring fills as you read down the page) and a back-to-top button.
 */
@Component({
  selector: 'app-resume-fab',
  template: `
    @if (p.resumeUrl) {
      <div class="dock show">
        <button
          type="button"
          class="top"
          [class.hidden]="!scroll.pastHero()"
          (click)="scroll.toTop()"
          aria-label="Back to top"
          [attr.tabindex]="scroll.pastHero() ? 0 : -1"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M12 19V5m0 0l-6 6m6-6l6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <a
          class="resume"
          [href]="p.resumeUrl"
          download="Gireesha_R_Resume.pdf"
          aria-label="Download resume (PDF)"
        >
          <span class="ring">
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <circle class="track" cx="24" cy="24" [attr.r]="r" />
              <circle
                class="fill"
                cx="24"
                cy="24"
                [attr.r]="r"
                [attr.stroke-dasharray]="circ"
                [attr.stroke-dashoffset]="offset()"
              />
            </svg>
            <svg class="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z M14 3v5h5 M9 13h6 M9 17h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="label">
            <strong>Resume</strong>
            <small>Download PDF</small>
          </span>
        </a>
      </div>
    }
  `,
  styles: `
    .dock {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 60;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      animation: dock-in 0.6s cubic-bezier(0.2, 0.9, 0.25, 1.3) 1.2s both;
    }
    @keyframes dock-in {
      from { opacity: 0; transform: translateY(24px) scale(0.92); }
      to { opacity: 1; transform: none; }
    }

    .top {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      border: 1px solid var(--line);
      background: color-mix(in srgb, var(--surface) 85%, transparent);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      color: var(--text);
      cursor: pointer;
      transition: transform 0.2s ease, border-color 0.2s ease;
    }
    .top { transition: transform 0.25s ease, opacity 0.25s ease, border-color 0.2s ease; }
    .top.hidden { opacity: 0; transform: translateY(10px); pointer-events: none; }
    .top:hover { transform: translateY(-2px); border-color: var(--accent); }

    .resume {
      position: relative;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 6px 18px 6px 6px;
      border-radius: 999px;
      text-decoration: none;
      color: var(--accent-ink);
      background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #7c3aed));
      box-shadow: 0 10px 30px -8px color-mix(in srgb, var(--accent) 70%, transparent);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    /* soft pulse to draw the eye when it first appears */
    .show .resume::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border: 2px solid var(--accent);
      animation: pulse 2.4s ease-out 0.4s 3;
      pointer-events: none;
    }
    @keyframes pulse {
      from { opacity: 0.7; transform: scale(1); }
      to { opacity: 0; transform: scale(1.25); }
    }
    .resume:hover {
      transform: translateY(-3px);
      box-shadow: 0 16px 36px -8px color-mix(in srgb, var(--accent) 80%, transparent);
    }

    .ring {
      position: relative;
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.18);
    }
    .ring > svg:first-child {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }
    circle { fill: none; stroke-width: 3; }
    .track { stroke: rgba(255, 255, 255, 0.25); }
    .fill {
      stroke: currentColor;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.15s linear;
    }
    .icon { position: relative; }
    .resume:hover .icon { animation: nudge 0.5s ease; }
    @keyframes nudge {
      40% { transform: translateY(-3px); }
    }

    .label { display: flex; flex-direction: column; line-height: 1.15; }
    .label strong { font-size: 15px; }
    .label small { font-size: 11px; opacity: 0.8; }

    @media (max-width: 520px) {
      .dock { right: 14px; bottom: 14px; }
      .label small { display: none; }
      .resume { padding-right: 14px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .dock { animation: none; }
      .resume, .fill, .top { transition: none; }
      .show .resume::before { animation: none; display: none; }
    }
  `,
})
export class ResumeFabComponent {
  protected readonly p = PROFILE;
  protected readonly scroll = inject(ScrollService);
  protected readonly r = R;
  protected readonly circ = CIRC;
  protected readonly offset = computed(() => CIRC * (1 - this.scroll.progress()));
}
