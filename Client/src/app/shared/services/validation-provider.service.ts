import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationProviderService {

  constructor() {
    console.log('Hello ErrorHandlerProvider Provider')
}

static MatchPassword(AC: AbstractControl) {
   const newPassword = AC.get('newPassword').value
   const confirmPassword = AC.get('confirmPassword').value
    if(newPassword != confirmPassword && newPassword.length > 4) {
        AC.get('confirmPassword').setErrors( { MatchPassword: true } )
    } else {
        AC.get('confirmPassword').setErrors(null);
    }
}
}
