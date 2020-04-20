import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { SharedModule } from '../shared.module';
import { StoresTabService } from './storesTab.service';
import { CreateStoreComponent } from './createStore/createStore.component';
import { EditStoreComponent } from './editStore/editStore.component';
import { StoreDetailComponent } from './editStore/storeDetail/storeDetail.component';
import { StoreUsersComponent } from './editStore/storeUsers/storeUsers.component';

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
        StoreUsersComponent
    ],
    providers: [
        StoresTabService
    ]
})
export class StoreModule { }
