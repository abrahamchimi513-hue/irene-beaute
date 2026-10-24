import { Injectable, signal } from '@angular/core';

/** Garde en mémoire la prestation choisie pour pré-remplir le formulaire de rendez-vous. */
@Injectable({ providedIn: 'root' })
export class BookingService {
  readonly selectedServiceId = signal<string>('');

  choose(serviceId: string): void {
    this.selectedServiceId.set(serviceId);
  }
}
