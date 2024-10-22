import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharCountService {
  constructor() {}

  updateCharCount(
    inputId: string,
    charCountId: string,
    maxLength: number
  ): void {
    const inputElement = document.getElementById(
      inputId
    ) as HTMLInputElement | null;
    const charCountElement = document.getElementById(charCountId);
    if (inputElement && charCountElement) {
      charCountElement.textContent = `${inputElement.value.length}/${maxLength}`;
    }
  }
}
