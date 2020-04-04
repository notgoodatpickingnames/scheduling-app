import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './accountSettings.component';
import { SharedModule } from '../shared.module';
import { SignUpComponent } from './signUp/signUp.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
       AccountSettingsComponent,
       SignUpComponent,
       LoginComponent
    ]
})
export class AccountSettingsModule { }
