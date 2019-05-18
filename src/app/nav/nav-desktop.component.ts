import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { PatientService } from './../services/patient.service';

@Component({
  selector: 'app-nav-desktop',
  templateUrl: './nav-desktop.component.html'
})
export class NavDesktopComponent implements OnInit {
  public patients: Patient[];
  public patientName: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.patients = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john_doe@gmail.com',
        tel: '04829102',
        url: 'john-doe'
      },
      {
        firstName: 'Yvette',
        lastName: 'Van Lankveld',
        email: '',
        tel: '015584685',
        url: 'yvette-van-lankveld'
      }
    ];

    this.route.children[0].params.subscribe(params => {
      this.patients.forEach(patient => {
        if (patient.firstName === params.firstName) {
          this.changePatient(patient);
        }
      });
    });
  }

  changePatient(patient: Patient) {
    this.patientService.changePatient(patient);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
