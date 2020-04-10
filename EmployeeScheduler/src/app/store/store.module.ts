import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { SharedModule } from '../shared.module';
import { StoresTabService } from './storesTab.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        StoreComponent
    ],
    providers: [
        StoresTabService
    ]
})
export class StoreModule { }
