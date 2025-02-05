import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from '../rick-and-morty.service';
import {Location, NgIf} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: any = null;

  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService,
    private location: Location,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.rickAndMortyService.getCharacterById(id).subscribe({
      next: (data: any) => {
        this.character = data;
        this.titleService.setTitle(`Rick and Morty • ${this.character.name}`)
      },
      error: (err) => {
        console.error('Error fetching character details:', err);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

}
