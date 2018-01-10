import { FormControl } from '@angular/forms';
const PASSPORT_REGEXP = new RegExp('^[a-zA-Z0-9_]{6,16}$');
export function validatePassword(c: FormControl) {
    return PASSPORT_REGEXP.test(c.value) ? null : {
        passport: {
            valid: false,
            errorMsg: '密码只能由数字、字母、下划线构成'
        }
    };
}
