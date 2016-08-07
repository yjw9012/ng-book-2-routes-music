import {Injectable, provide} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class SpotifyService {
    private static QUERY_URL_PREFIX: string = "https://api.spotify.com/v1/search?";

    constructor(public http: Http) {}

    searchByTrack(query: string) {
        const params: string = [
            `q=${query}`,
            `type=track`
        ].join("&");

        const queryUrl: string = `${SpotifyService.QUERY_URL_PREFIX}${params}`;

        return this.http.request(queryUrl).map(res => res.json());
    }

}


export var SPOTIFY_PROVIDERS: Array<any> = [
    provide(SpotifyService, {useClass: SpotifyService})
];