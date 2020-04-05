import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ns-please-verify-your-email',
  templateUrl: './pleaseVerifyYourEmail.component.html',
  styleUrls: ['./pleaseVerifyYourEmail.component.css']
})
export class PleaseVerifyYourEmailComponent {
    @Output() public onCreateNewAccountTap = new EventEmitter();
    @Output() public onBackToLoginTap = new EventEmitter();

    public onCreateNewAccountTapped(): void {
        this.onCreateNewAccountTap.emit();
    }

    public onBackToLoginTapped(): void {
        this.onBackToLoginTap.emit();
    }
}
