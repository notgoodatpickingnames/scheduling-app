import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
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
        AccountComponent,
        SignUpComponent,
        LoginComponent,
        PleaseVerifyYourEmailComponent
    ]
})
export class AccountModule { }
