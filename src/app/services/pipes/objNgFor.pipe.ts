import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ObjNgFor',  pure: false })
export class ObjNgFor implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value)//.map(key => value[key]);
    }
}