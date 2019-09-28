import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {ListPage} from './list.page';
import {ActivityCardComponent} from './activity-card/activity-card.component';
import {DetailViewPage} from './detail-view/detail-view.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ListPage
            },
            {
                path: ':id',
                component: DetailViewPage
            }
        ])
    ],
    declarations: [ListPage, ActivityCardComponent, DetailViewPage]
})
export class ListPageModule {
}
