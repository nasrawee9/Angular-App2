import { AbstractControl, ValidationErrors } from '@angular/forms'

export function InputDataValidator(control: AbstractControl): ValidationErrors | null {
  // get value from control
  const v = control.value;
  let count = 0;
  // get value by using split to turn it to array, then filter space items.
  const array = v.split('\n').map((item: string) => item.trim().split(',').map(num => parseFloat(num)));
  // check string regex
  const stringRegex = v.split('\n');
  for (let i = 0; i < stringRegex.length; i++) {
    if (!stringRegex[i].match(/^([0-9]+(\.[0-9]+)?,{1} ?)*[0-9]+(\.[0-9]+)?$/)) {
      return { 'invalidChars': true };
    }
  }

  // if array length exceed 10, return error
  array.forEach((item: number[]) => {
    if (item.length > 10) {
      count++;
    }
  })

  // if at least one array exceed 10, return yes
  if (count) {
    return { 'inputData': true }
  }
  // if exceed 10 line, return yes
  if (array.length > 10) {
    return { 'exceedLine': true }
  }
  // if array length less than 10, return good
  else {
    return null;
  }

}