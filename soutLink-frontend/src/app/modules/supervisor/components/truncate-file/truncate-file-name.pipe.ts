import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateFileName',
  standalone: true
})
export class TruncateFileNamePipe implements PipeTransform {

  transform(value: string, maxLength: number = 10): string {
    if (!value) return '';
    if (value.length <= maxLength) return value;

    const extensionIndex = value.lastIndexOf('.');
    const extension = extensionIndex !== -1 ? value.substring(extensionIndex) : '';
    const nameWithoutExtension = value.substring(0, extensionIndex !== -1 ? extensionIndex : value.length);

    const truncatedName = nameWithoutExtension.substring(0, maxLength - 3) + '...';
    return `${truncatedName}`;
  }
}
