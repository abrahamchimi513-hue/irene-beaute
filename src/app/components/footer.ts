import { Component } from '@angular/core';
import { SITE } from '../data/site.config';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="container footer__inner">
        <div>
          <img class="footer__logo" src="images/logo.jpg" alt="Logo Irène Beauty and Shop" width="96" height="96" />
          <p class="footer__brand">{{ site.name }}</p>
          <p class="footer__sub">{{ site.tagline }}</p>
        </div>
        <p class="footer__addr">
          {{ site.addressLines[0] }}, {{ site.city }}
          <br />
          {{ site.addressLines[1] }}
          <br />
          {{ site.phoneDisplay }}
        </p>
      </div>
      <div class="container footer__legal">
        <p>&copy; {{ year }} {{ site.name }}. Tous droits réservés.</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
