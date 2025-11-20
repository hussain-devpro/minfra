import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IRebootRequest } from '../interfaces/reboot-request.interface';
import { IServer } from '../interfaces/server.interface';

@Injectable({
  providedIn: 'root',
})
export class Server {
  http = inject(HttpClient);

  getAll() {
    const url = 'assets/api-data/server-list.json';
    return this.http.get<IServer[]>(url);
  }

  reboot(rebootData: IRebootRequest) {
    console.log(rebootData);
    return of({ Status: 'Success' });
  }
}
