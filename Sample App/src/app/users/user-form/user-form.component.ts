import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../shared/user';
import { UsersService } from '../shared/users.service';
import { BasicValidators } from '../../shared/basic-validators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  form: FormGroup;
  title: string;
  user: User = new User();

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.form = formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        BasicValidators.email
      ]],
      phone: [],
      address: formBuilder.group({
        street: ['', Validators.minLength(3)],
        city: ['', Validators.maxLength(30)]
      })
    });
  }

  ngOnInit() {
    let id = this.route.params.subscribe(params => {
      id = params['id'];
      this.title = id ? 'Edit User' : 'New User';
      if (!id) {
        return;
      }
      this.usersService.getUser(id)
        .subscribe(
        user => this.user = user,
        response => {
          if (response.status === 404) {
            this.router.navigate(['NotFound']);
          }
        });
    });
  }

  save() {
    let result;
    const userValue = this.form.value;
    if (userValue.id) {
      result = this.usersService.updateUser(userValue);
    } else {
      result = this.usersService.addUser(userValue);
    }
    result.subscribe(data => this.router.navigate(['users']));
  }
}
