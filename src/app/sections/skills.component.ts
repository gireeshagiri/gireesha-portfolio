import { Component } from '@angular/core';
import { SKILLS } from '../data/portfolio.data';
import { RevealDirective } from '../shared/reveal.directive';

interface Pill {
  name: string;
  hue: number;
}

/** One border colour per skill group. */
const GROUP_HUES = [352, 262, 200, 150, 30, 320];

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  template: `
    <section class="section alt" id="skills">
      <div class="container" appReveal>
        <div class="section-head">
          <span class="eyebrow">02 · skills</span>
          <h2>What I work with</h2>
        </div>
      </div>

      <div class="marquee" appReveal>
        <div class="track">
          @for (s of rowA; track $index) {
            <span class="pill" [style.--h]="s.hue" [attr.aria-hidden]="$index >= half ? true : null">{{ s.name }}</span>
          }
        </div>
        <div class="track reverse" aria-hidden="true">
          @for (s of rowB; track $index) {
            <span class="pill" [style.--h]="s.hue">{{ s.name }}</span>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .alt { background: var(--surface-2); overflow: hidden; }
    .marquee {
      display: grid;
      gap: 14px;
      mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
      -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
    }
    .track {
      display: flex;
      gap: 12px;
      width: max-content;
      animation: scroll 45s linear infinite;
    }
    .track.reverse { animation-direction: reverse; animation-duration: 55s; }
    .marquee:hover .track { animation-play-state: paused; }
    @keyframes scroll {
      from { transform: translateX(0); }
      to { transform: translateX(-50%); }
    }
    .pill {
      flex: none;
      padding: 10px 20px;
      border-radius: 999px;
      font-size: 15px;
      font-weight: 600;
      color: var(--text);
      background: var(--surface);
      border: 1.5px solid hsl(var(--h) 70% 55% / 0.55);
      transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    }
    .pill:hover {
      border-color: hsl(var(--h) 75% 58%);
      box-shadow: 0 0 18px -4px hsl(var(--h) 75% 58%);
      transform: translateY(-2px);
    }

    @media (prefers-reduced-motion: reduce) {
      .track { animation: none; flex-wrap: wrap; width: auto; padding: 0 16px; }
      .track.reverse { display: none; }
      .marquee { mask-image: none; -webkit-mask-image: none; }
    }
  `,
})
export class SkillsComponent {
  private readonly all: Pill[] = SKILLS.flatMap((g, gi) =>
    g.items.map((name) => ({ name, hue: GROUP_HUES[gi % GROUP_HUES.length] })),
  );

  // Split the skills across two rows, each doubled so the loop is seamless.
  private readonly a = this.all.filter((_, i) => i % 2 === 0);
  private readonly b = this.all.filter((_, i) => i % 2 === 1);
  protected readonly half = this.a.length * 2;
  protected readonly rowA = [...this.a, ...this.a, ...this.a, ...this.a];
  protected readonly rowB = [...this.b, ...this.b, ...this.b, ...this.b];
}
