import { Team } from "./team.model";

export interface TeamResponse extends Team{
    full_name: string;
}