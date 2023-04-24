import { OnDestroy } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { Team } from 'src/app/models/team';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit,OnDestroy{
  @Input() team!: Team;
  @Output() deleteTeam = new EventEmitter<number>();
  games: Game[] = [];
  loading: boolean = false;
  avgPointsScored: number = 0;
  avgPointsConceded: number = 0;
  private subscription = new Subject<void>();

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.loading = true;
    this.dataService.getLastResults(this.team.id)
    .pipe(takeUntil(this.subscription))
    .subscribe(
      response =>{
        this.games = response
        if(this.games){
          const totalPointScored = this.games.reduce( ( sum , cur ) => sum + cur['matchResult'].pointsMade, 0);
          const totalPointConceded =  this.games.reduce( ( sum , cur ) => sum + cur['matchResult'].pointsConceded, 0);
          this.avgPointsScored = Math.round(totalPointScored / this.games.length);
          this.avgPointsConceded = Math.round(totalPointConceded / this.games.length);
        }
        this.loading = false;
      });
  }

  removeTeam() {
    this.deleteTeam.emit(this.team.id);
  }

  ngOnDestroy(){
    this.subscription.next();
    this.subscription.complete();
  }

}
