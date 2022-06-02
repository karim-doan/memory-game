import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Animal } from '../animal'
import { AnimalService } from './../animal.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent implements OnInit {

  animal: Animal | undefined;

  constructor(
    private route: ActivatedRoute,
    private AnimalService: AnimalService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getAnimal();
  }

  getAnimal(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.AnimalService.getAnimal(id)
      .subscribe(animal => { console.log(animal); return this.animal = animal});
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.animal) {
      this.AnimalService.updateAnimal(this.animal)
        .subscribe(() => this.goBack());
    }
  }
}
