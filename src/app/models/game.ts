import { MatchResult } from "./match-result";
import { Team } from "./team";

export interface Game{
    id?: number,
    homeTeam: Team,
    visitorTeam: Team,
    matchResult: MatchResult
    homeScoredPoints: number,
    visitorScoredPoints: number
}