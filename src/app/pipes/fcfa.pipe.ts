import { Pipe, PipeTransform } from '@angular/core';

/** Affiche un prix en FCFA, ou "Sur demande" quand il n'y a pas de prix. */
@Pipe({ name: 'fcfa' })
export class FcfaPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    return formatFcfa(value);
  }
}

export function formatFcfa(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return 'Sur demande';
  }
  const digits = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${digits} FCFA`;
}
