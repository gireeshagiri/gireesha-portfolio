import { Injectable, computed, signal } from '@angular/core';

/** One shared, rAF-throttled scroll listener for the whole page. */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  readonly y = signal(0);
  readonly progress = signal(0); // 0 → 1 down the page
  readonly heroBottom = signal(600);

  /** True once the visitor has scrolled past most of the hero. */
  readonly pastHero = computed(() => this.y() > this.heroBottom() * 0.7);
  readonly scrolled = computed(() => this.y() > 8);

  private ticking = false;

  constructor() {
    const update = () => {
      this.ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      this.y.set(y);
      this.progress.set(max > 0 ? Math.min(1, y / max) : 0);
      const hero = document.getElementById('top');
      if (hero) this.heroBottom.set(hero.offsetTop + hero.offsetHeight);
    };
    const onScroll = () => {
      if (!this.ticking) {
        this.ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    requestAnimationFrame(update);
  }

  toTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
