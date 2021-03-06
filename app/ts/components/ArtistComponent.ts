import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {SpotifyService} from 'services/SpotifyService';

@Component({
    selector: 'artist',
    directives: [CORE_DIRECTIVES],
    template: `
      <div *ngIf="artist">
        <h1>{{ artist.name }}</h1>
    
        <p>
          <img src="{{ artist.images[0].url }}">
        </p>
    
        <p><a href (click)="back()">Back</a></p>
      </div>
  `
})
export class ArtistComponent implements OnInit {
    id: string;
    artist: Object;

    constructor(public route: ActivatedRoute, public spotify: SpotifyService,
                public location: Location) {
        route.params.subscribe(params => { this.id = params['id']; });
    }

    ngOnInit(): void {
        this.spotify
            .getArtist(this.id)
            .subscribe((res: any) => this.renderArtist(res));
    }

    back(): void {
        this.location.back();
    }

    renderArtist(res: any): void {
        this.artist = res;
    }
}
