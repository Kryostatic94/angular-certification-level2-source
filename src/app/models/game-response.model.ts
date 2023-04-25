import { Game } from "./game.model";
import { Team } from "./team.model";

export interface GameResponse extends Game{
    home_team: Team;
    visitor_team : Team;
    home_team_score : number;
    visitor_team_score: number;
}