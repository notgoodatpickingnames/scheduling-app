import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { SharedModule } from '../shared.module';
import { StoresTabService } from './storesTab.service';
import { CreateStoreComponent } from './createStore/createStore.component';
import { EditStoreComponent } from './editStore/editStore.component';
import { StoreDetailComponent } from './editStore/storeDetail/storeDetail.component';
import { StoreUsersComponent } from './editStore/storeUsers/storeUsers.component';
import { StoreShiftsComponent } from './editStore/storeShifts/storeShifts.component';
import { EditShiftComponent } from './editStore/storeShifts/editShift/editShift.component';
import { CreateShiftComponent } from './editStore/storeShifts/createShift/createShift.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        StoreComponent,
        CreateStoreComponent,
        EditStoreComponent,
        StoreDetailComponent,
        StoreUsersComponent,
        StoreShiftsComponent,
        CreateShiftComponent,
        EditShiftComponent
    ],
    providers: [
        StoresTabService
    ]
})
export class StoreModule { }
