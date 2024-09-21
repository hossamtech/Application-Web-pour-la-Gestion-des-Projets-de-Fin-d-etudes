import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanHtml',
  standalone: true
})
export class CleanHtmlPipe implements PipeTransform {

  transform(value: string): string {
    return value ? value.replace(/<p>\s*(&nbsp;)?\s*<\/p>/g, '') : value;
  }


}
