import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Team } from '../models/team';
import { Result } from '../models/result';
import { MatchResult } from '../models/match-result';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

    constructor() { }


    setGameResult(response : any, id: number) : Game{
        if(response['home_team'].id === id){
            return this.setHomeAndVisitors(response,'home_team_score','visitor_team_score');
        }else{
            return this.setHomeAndVisitors(response,'visitor_team_score','home_team_score');
        }
    }

    

    setHomeAndVisitors(response:any,pointsMade:string,pointsConceded:string): Game{
        const result = this.setResult(response[pointsMade],response[pointsConceded])
        const match : MatchResult = {
            result: result,
            pointsMade: response[pointsMade],
            pointsConceded: response[pointsConceded]
        }
        return {
            id:response.id,
            homeTeam: response['home_team']['abbreviation'],
            visitorTeam: response['visitor_team']['abbreviation'],
            matchResult: match,
            homeScoredPoints: response['home_team_score'],
            visitorScoredPoints: response['visitor_team_score']
        }
    }

    mapTeam(data:any): Team{
        const team: Team | any = {}
        for (const property in data) {
            if(property === 'full_name'){
                team['fullName'] = data[property]
            }else{
                team[property] = data[property]
            }
        }
        return team;
    }

   

    getDays(){
        let index = 12;
        const days = [];
        while(index >= 0){
            let dateToPut = this.subtractDays(index);
            days.push("&dates[]=" + dateToPut);
            index--;
        }
        return days.join();
    }

    private subtractDays(daysToSubtract : number){
        const date = new Date();
        date.setDate(date.getDate() - daysToSubtract);
        return date.toISOString().slice(0,10);
    }

    private setResult(pointsMade: number,pointsConceded:number): Result{
        return pointsMade > pointsConceded ? 'W' : 'L'
    }
}
