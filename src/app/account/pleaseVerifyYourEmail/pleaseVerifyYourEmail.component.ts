import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { AuthenticationService } from '~/app/core/services/authentication/authentication.service';
import { setInterval, clearInterval } from '@nativescript/core/timer';

@Component({
  selector: 'ns-please-verify-your-email',
  templateUrl: './pleaseVerifyYourEmail.component.html',
  styleUrls: ['./pleaseVerifyYourEmail.component.css']
})
export class PleaseVerifyYourEmailComponent {
    @Output() public onCreateNewAccountTap = new EventEmitter();
    @Output() public onBackToLoginTap = new EventEmitter();

    private static pollIntervalId: number;

    constructor(private page: Page,
        private authenticationService: AuthenticationService) {

        this.page.on(Page.unloadedEvent, event => {
            clearInterval(PleaseVerifyYourEmailComponent.pollIntervalId);
        });

        this.pollForVerification();
    }

    public onCreateNewAccountTapped(): void {
        this.onCreateNewAccountTap.emit();
    }

    public onBackToLoginTapped(): void {
        this.authenticationService.logout();
        this.onBackToLoginTap.emit();
    }

    private pollForVerification() {
        PleaseVerifyYourEmailComponent.pollIntervalId = setInterval(() => {
            console.log('polling for verification of email');
            this.authenticationService.relog()
                .then(user => {
                    if (user && user.emailVerified) {
                        this.authenticationService.setUser(user);

                        clearInterval(PleaseVerifyYourEmailComponent.pollIntervalId);
                    }
                });
        }, 1000);
    }
}
