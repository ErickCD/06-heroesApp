import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string {

    // Si no tiene imágen
    if(!hero.id && !hero.alt_img) return 'assets/no-image.png';

    // Si tiene una imágen alternativa
    if( hero.alt_img ) return hero.alt_img;

    // Si tiene una imágen por defecto
    return 'assets/heroes/' + hero.id + '.jpg';
  }

}
