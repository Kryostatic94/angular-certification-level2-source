import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class TeamPickerComponent implements OnInit,OnDestroy{
  private subscription = new Subject<void>();
  pickedTeams: Team[] = [];
  teams: Team[] = [];
  constructor(private dataService: DataService){}


  ngOnInit(): void {
    this.dataService.getTeams()
    .pipe(takeUntil(this.subscription))
    .subscribe(res => this.teams = res)
  }


  deleteTeam($event: number) {
    this.pickedTeams = this.pickedTeams.filter(el => el.id !== $event);
  }

  onSubmit(form: NgForm) {
    const team: Team = form.value.team;
    const alreadyIn = this.pickedTeams.find(el => el.id === team.id);
    if(!alreadyIn){
      this.pickedTeams.push(team);
    }
  }

  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }

}
