import { Injectable, effect, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.initialTheme());

  constructor() {
    effect(() => {
      const t = this.theme();
      document.documentElement.setAttribute('data-theme', t);
      try {
        localStorage.setItem(STORAGE_KEY, t);
      } catch {
        /* storage unavailable — theme still works for this visit */
      }
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  private initialTheme(): Theme {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      /* ignore */
    }
    return 'dark';
  }
}
