import { Routes } from '@angular/router';
import { ScheduleAssignment } from './features/schedule-assignment/schedule-assignment';
import { ContentWrapper } from './layout/content-wrapper/content-wrapper';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'infra-manager',
    pathMatch: 'full',
  },
  {
    path: 'infra-manager',
    component: ContentWrapper,
    children: [
      {
        path: '',
        redirectTo: 'schedule-assignment',
        pathMatch: 'full',
      },
      {
        path: 'schedule-assignment',
        component: ScheduleAssignment,
      },
    ],
  },
];
