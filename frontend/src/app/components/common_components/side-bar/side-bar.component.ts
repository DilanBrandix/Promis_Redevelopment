import { Component,ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(
    //private loginService: LoginServiceService,
    private router: Router
  ) {}

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

    sidebarVisible: boolean = false;

    coHeader(){
      this.router.navigate(['user']);
    }

}
