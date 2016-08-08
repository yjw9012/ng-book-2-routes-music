import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {CORE_DIRECTIVES, Location} from "@angular/common";


import {SpotifyService} from "services/SpotifyService";

@Component({
    selector: "theTrack",
    template: `
        <div *ngIf="track">
            <h1>{{track.name}}</h1>
            <p>
                <img src="{{track.album.images[1].url}}">
            </p>
            <p>
                <audio controls src="{{track.preview_url}}"></audio>
            </p>
            <p><a href (click)="back()">Back</a></p>
        </div>
    `,
    directives: [CORE_DIRECTIVES]
})

export class TrackComponent implements OnInit{
    id: string;
    track: Object;

    constructor(private spotify: SpotifyService, private route: ActivatedRoute,
                private location: Location) {
        route.params
            .subscribe(
                params => { this.id = params["id"] || ""; }
            );
    }

    ngOnInit(): void {
        this.spotify.getTrack(this.id)
            .subscribe((res: any) => this.renderTrack(res));
    }

    renderTrack(res: any): void {
        this.track = res;
    }

    back(): void {
        this.location.back();
    }
}