import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UtilityService } from './utility.service';
import { Game } from '../models/game.model';
import { TeamResponse } from '../models/team-response.model';
import { GameResponse } from '../models/game-response.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private HEADERS = {
    "X-RapidAPI-Key": "2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX",
    "X-RapidAPI-Host": "free-nba.p.rapidapi.com",
  };
  private API_URL = "https://free-nba.p.rapidapi.com";
  trackedTeams: Team[] = [];
  changes = new Subject<Team[]>();

  constructor(private http: HttpClient,
              private utility: UtilityService) { }

  getTrackedTeams(): Team[]{
    return this.trackedTeams;
  }

  addTrackTeam(team: Team): void {
    const alreadyIn = this.trackedTeams.find(el => el.id === team.id);
    if(!alreadyIn){
      this.trackedTeams.push(team);
      this.changes.next(this.trackedTeams);
    }
  }
  removeTrackTeam(id :number): void{
    this.trackedTeams = this.trackedTeams.filter(el => el.id !== id);
    this.changes.next(this.trackedTeams);
  }
  
  getTeams(): Observable<Team[]> {
    return this.http
      .get<{data : TeamResponse[]}>(`${this.API_URL}/teams?page=0`, { headers: this.HEADERS })
      .pipe(
        map((response) => {
          const teams: Team[] = [];
          response.data.forEach(team => {
            teams.push(this.utility.mapTeam(team));
          });
          return teams;
        })
      );
  }

  getLastResults(id: number): Observable<Game[]> {
    return this.http
      .get<{data: GameResponse[]}>(`${this.API_URL}/games?page=0${this.utility.getDays()}`, {
        headers: this.HEADERS,
        params: { 
          per_page: 12, 
          "team_ids[]": "" + id },
      })
      .pipe(
        map((response) => {
          const games: Game[] = [];
          response.data.forEach(game => {
            games.push(this.utility.setGameResult(game,id))
          });
          return games;
        })
      );
  }

  getTeam(id: number): Observable<Team>{
    return this.http
      .get<TeamResponse>(`${this.API_URL}/teams/${id}`, { 
        headers: this.HEADERS
      })
      .pipe(
        map((response) => {
          return this.utility.mapTeam(response);
        })
      );
  }
}
