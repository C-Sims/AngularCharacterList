import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../rick-and-morty.service';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  imports: [
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  visiblePages: number[] = [];

  constructor(private rickAndMortyService: RickAndMortyService,
              private router: Router) { }

  ngOnInit(): void {
    this.loadCharacters(this.currentPage);
  }

  loadCharacters(page: number): void {
    this.rickAndMortyService.getCharacters(page).subscribe((data: any) => {
      this.characters = data.results;
      this.totalPages = data.info.pages;
      this.updateVisiblePages();
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCharacters(page);
    }
  }

  updateVisiblePages(): void {
    const range = 2;
    const start = Math.max(1, this.currentPage - range);
    const end = Math.min(this.totalPages, this.currentPage + range);

    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }

  viewCharacterDetails(id: number): void {
    this.router.navigate(['/character', id]);
  }

}
