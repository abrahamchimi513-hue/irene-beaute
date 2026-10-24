import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SERVICES } from '../data/services';
import { BookingService } from '../services/booking.service';
import { WhatsappService } from '../services/whatsapp.service';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  template: `
    <section id="rendez-vous" class="section section--tint">
      <div class="container booking">
        <div class="booking__intro">
          <p class="eyebrow">Rendez-vous</p>
          <h2 class="section__title">Réservez votre moment</h2>
          <p class="section__lead">
            Remplissez ce formulaire. Un message est préparé pour vous et s'ouvre dans WhatsApp, il
            ne reste qu'à l'envoyer. Irène confirme ensuite l'horaire avec vous.
          </p>
        </div>

        <form class="form panel" (ngSubmit)="submit()" novalidate>
          <div class="field">
            <label for="b-name">Votre nom</label>
            <input
              id="b-name"
              name="name"
              type="text"
              autocomplete="name"
              [(ngModel)]="name"
              [attr.aria-invalid]="submitted && !name.trim()"
            />
            @if (submitted && !name.trim()) {
              <p class="field__error" role="alert">Indiquez votre nom.</p>
            }
          </div>

          <div class="field">
            <label for="b-service">Service souhaité</label>
            <select
              id="b-service"
              name="service"
              [ngModel]="booking.selectedServiceId()"
              (ngModelChange)="booking.selectedServiceId.set($event)"
              [attr.aria-invalid]="submitted && !booking.selectedServiceId()"
            >
              <option value="">Choisir un service</option>
              @for (s of services; track s.id) {
                <option [value]="s.id">{{ s.name }}</option>
              }
            </select>
            @if (submitted && !booking.selectedServiceId()) {
              <p class="field__error" role="alert">Choisissez un service.</p>
            }
          </div>

          <div class="field-row">
            <div class="field">
              <label for="b-date">Date souhaitée</label>
              <input
                id="b-date"
                name="date"
                type="date"
                [min]="today"
                [(ngModel)]="date"
                [attr.aria-invalid]="submitted && !date"
              />
              @if (submitted && !date) {
                <p class="field__error" role="alert">Choisissez une date.</p>
              }
            </div>
            <div class="field">
              <label for="b-time">Heure souhaitée</label>
              <input id="b-time" name="time" type="time" [(ngModel)]="time" />
            </div>
          </div>

          <div class="field">
            <label for="b-note">Précisions (facultatif)</label>
            <textarea
              id="b-note"
              name="note"
              rows="3"
              [(ngModel)]="note"
              placeholder="Couleur, forme, style de coiffure..."
            ></textarea>
          </div>

          <button class="btn btn--wa btn--block" type="submit">Envoyer ma demande sur WhatsApp</button>
        </form>
      </div>
    </section>
  `,
})
export class BookingComponent {
  protected readonly booking = inject(BookingService);
  private readonly whatsapp = inject(WhatsappService);

  protected readonly services = SERVICES;
  protected readonly today = new Date().toISOString().slice(0, 10);

  protected name = '';
  protected date = '';
  protected time = '';
  protected note = '';
  protected submitted = false;

  protected submit(): void {
    this.submitted = true;
    const serviceId = this.booking.selectedServiceId();
    if (!this.name.trim() || !serviceId || !this.date) {
      return;
    }
    const service = SERVICES.find((s) => s.id === serviceId);
    const [y, m, d] = this.date.split('-');

    const lines = [
      'Bonjour Irène, je voudrais prendre rendez-vous.',
      '',
      `Nom : ${this.name.trim()}`,
      `Service : ${service?.name ?? serviceId}`,
      `Date souhaitée : ${d}/${m}/${y}`,
    ];
    if (this.time) {
      lines.push(`Heure souhaitée : ${this.time}`);
    }
    if (this.note.trim()) {
      lines.push(`Précisions : ${this.note.trim()}`);
    }
    lines.push('', 'Merci de me confirmer la disponibilité.');
    this.whatsapp.open(lines.join('\n'));
  }
}
