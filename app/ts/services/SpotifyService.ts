import {Injectable, provide} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class SpotifyService {
    private static QUERY_URL_PREFIX: string = "https://api.spotify.com/v1";

    constructor(public http: Http) {}

    query(url: string, params?: string[]): Observable<any[]> {
        let queryUrl: string = `${SpotifyService.QUERY_URL_PREFIX}${url}`;

        if (params) {
            queryUrl = `${queryUrl}?${params.join("&")}`;
        }

        return this.http.request(queryUrl).map(res => res.json());
    }

    search(query: string, type: string): Observable<any[]> {
        return this.query("/search", [
            `q=${query}`,
            `type=${type}`
        ]);
    }

    searchByTrack(query: string): Observable<any[]> {
        return this.search(query, "track");
    }

    getTrack(id: string): Observable<any[]> {
        return this.query(`/tracks/${id}`);
    }

    getArtist(id: string): Observable<any[]> {
        return this.query(`/artists/${id}`);
    }

    getAlbum(id: string): Observable<any[]> {
        return this.query(`/albums/${id}`);
    }
}


export var SPOTIFY_PROVIDERS: Array<any> = [
    provide(SpotifyService, {useClass: SpotifyService})
];