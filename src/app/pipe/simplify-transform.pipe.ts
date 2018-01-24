import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'simplifyTransform'})
export class SimplifyTransformPipe implements PipeTransform {
    transform(content: string, maxLength?: number, addEllipsis?: boolean, ellipsisAdditional: string = '...'): string {
        if (content.length > maxLength) {
            var transformContent = content.substring(0, maxLength);
            if (addEllipsis) {
                transformContent = transformContent + ellipsisAdditional;
            }
            return transformContent;
        }
        return content;
    }
}