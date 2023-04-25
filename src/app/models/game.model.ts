import { MatchResult } from "./match-result.model";
import { Team } from "./team.model";

export interface Game{
    id?: number,
    homeTeam: Team,
    visitorTeam: Team,
    matchResult: MatchResult
    homeScoredPoints: number,
    visitorScoredPoints: number
}