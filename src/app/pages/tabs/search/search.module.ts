import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { LoadingRestaurantComponent } from 'src/app/components/loading-restaurant/loading-restaurant.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
