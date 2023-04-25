import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Team } from 'src/app/models/team';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-team-picker',
  templateUrl: './team-picker.component.html',
  styleUrls: ['./team-picker.component.css']
})
export class TeamPickerComponent implements OnInit,OnDestroy,DoCheck{
  private subscription = new Subject<void>();
  trackedTeams: Team[] = [];
  teams: Team[] = [];
  
  constructor(public dataService: DataService){}
  


  ngOnInit(): void {
    this.dataService.getTeams()
    .pipe(takeUntil(this.subscription))
    .subscribe(res => this.teams = res)
    this.trackedTeams = this.dataService.getTrackedTeams();
  }


  deleteTeam($event: number):void {
    this.dataService.removeTrackTeam($event);
  }

  onSubmit(form: NgForm):void {
    const team: Team = form.value.team;
    this.dataService.addTrackTeam(team);
  }

  ngDoCheck(): void {
    this.dataService.changes
    .pipe(takeUntil(this.subscription))
    .subscribe(response => this.trackedTeams = response);
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }

}
