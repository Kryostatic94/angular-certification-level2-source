import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Game } from 'src/app/models/game.model';
import { Team } from 'src/app/models/team.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-games-history',
  templateUrl: './games-history.component.html',
  styleUrls: ['./games-history.component.css']
})
export class GamesHistoryComponent implements OnInit, OnDestroy {
  team!: Team;
  games!: Game[];
  private subscription = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private dataService: DataService){}

  ngOnInit(): void {
    const teamId = this.route.snapshot.queryParams["teamId"];
    combineLatest([this.dataService.getTeam(teamId),this.dataService.getLastResults(teamId)])
    .pipe(takeUntil(this.subscription))
    .subscribe(([team, games]) =>{
      this.team = team;
      this.games = games
    })
    
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
