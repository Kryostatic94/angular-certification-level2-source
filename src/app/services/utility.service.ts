import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { Team } from '../models/team.model';
import { Result } from '../models/result.model';
import { MatchResult } from '../models/match-result.model';
import { TeamResponse } from '../models/team-response.model';
import { GameResponse } from '../models/game-response.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

    constructor() { }


    setGameResult(response : GameResponse, id: number) : Game{
        if(response['home_team'].id === id){
            return this.setHomeAndVisitors(response,true);
        }else{
            return this.setHomeAndVisitors(response,false);
        }
    }

    

    setHomeAndVisitors(response:GameResponse,isHomeGame: boolean): Game{
        let result;
        let match;
        if(isHomeGame){
            result = this.setResult(response['home_team_score'],response['visitor_team_score']);
            match = {
                result: result,
                pointsMade: response['home_team_score'],
                pointsConceded: response['visitor_team_score']
            }
        }else{
            result = this.setResult(response['visitor_team_score'],response['home_team_score']);
            match = {
                result: result,
                pointsMade: response['visitor_team_score'],
                pointsConceded: response['home_team_score']
            }
        }
        return {
            id:response.id,
            homeTeam: response['home_team'],
            visitorTeam: response['visitor_team'],
            matchResult: match,
            homeScoredPoints: response['home_team_score'],
            visitorScoredPoints: response['visitor_team_score']
        }
    }

    mapTeam(data:TeamResponse): Team{
        const team: Team  = {
            'fullName': data['full_name'],
            ...data,
        }
        

        return team;
    }

   

    getDays(): string{
        let index = 12;
        const days: string[] = [];
        while(index >= 0){
            let dateToPut = this.subtractDays(index);
            days.push("&dates[]=" + dateToPut);
            index--;
        }
        return days.join();
    }

    private subtractDays(daysToSubtract : number):string{
        const date = new Date();
        date.setDate(date.getDate() - daysToSubtract);
        return date.toISOString().slice(0,10);
    }

    private setResult(pointsMade: number,pointsConceded:number): Result{
        return pointsMade > pointsConceded ? 'W' : 'L'
    }
}
