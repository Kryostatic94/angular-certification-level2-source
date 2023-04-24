import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesHistoryComponent } from './components/games-history/games-history.component';
import { TeamPickerComponent } from './components/team-picker/team-picker.component';

const routes: Routes = [
  {
    path: "results/:teamCode",
    component: GamesHistoryComponent,
  },
  {
    path: "**",
    component: TeamPickerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
