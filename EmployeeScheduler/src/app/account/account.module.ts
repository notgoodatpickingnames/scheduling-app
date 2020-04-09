import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account.component';
import { SharedModule } from '../shared.module';
import { SignUpComponent } from './signUp/signUp.component';
import { LoginComponent } from './login/login.component';
import { PleaseVerifyYourEmailComponent } from './pleaseVerifyYourEmail/pleaseVerifyYourEmail.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
       AccountSettingsComponent,
       SignUpComponent,
       LoginComponent,
       PleaseVerifyYourEmailComponent
    ]
})
export class AccountSettingsModule { }
