import { Injectable } from '@angular/core';
import { SITE } from '../data/site.config';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  /** Lien WhatsApp, avec un message pré-rempli si fourni. */
  link(message?: string): string {
    const base = `https://wa.me/${SITE.whatsappNumber}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }

  /** Ouvre WhatsApp dans un nouvel onglet avec le message pré-rempli. */
  open(message: string): void {
    window.open(this.link(message), '_blank', 'noopener');
  }
}
