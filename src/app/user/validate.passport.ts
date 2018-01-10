import { FormControl } from '@angular/forms';
const PASSPORT_REGEXP = new RegExp('^[a-zA-Z0-9_]{6,20}$');
export function validatePassport(c: FormControl) {
    return PASSPORT_REGEXP.test(c.value) ? null : {
        passport: {
            valid: false,
            errorMsg: '账户只能由数字、字母、下划线构成'
        }
    };
}
