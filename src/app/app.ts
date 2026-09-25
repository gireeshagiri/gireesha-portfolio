import { Component, inject } from '@angular/core';
import { NavbarComponent } from './sections/navbar.component';
import { HeroComponent } from './sections/hero.component';
import { AboutSkillsComponent } from './sections/about-skills.component';
import { SkillsComponent } from './sections/skills.component';
import { WorkComponent } from './sections/work.component';
import { ContactComponent } from './sections/contact.component';
import { ResumeFabComponent } from './sections/resume-fab.component';
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, HeroComponent, AboutSkillsComponent, SkillsComponent, WorkComponent, ContactComponent, ResumeFabComponent],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-about />
      <app-skills />
      <app-work />
      <app-contact />
    </main>
    <app-resume-fab />
  `,
})
export class App {
  // Inject once at the root so the saved theme is applied on first paint.
  private readonly theme = inject(ThemeService);
}
