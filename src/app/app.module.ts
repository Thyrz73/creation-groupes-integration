import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/admin/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ConfigGrpesComponent } from './components/admin/config-grpes/config-grpes.component';

import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFireDatabaseModule} from '@angular/fire/compat/database'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { FormsModule } from '@angular/forms'

import { DatabaseService } from './services/database.service';
import { OverviewComponent } from './components/admin/overview/overview.component';

const appRoutes: Routes = [
  {path: 'config', component: ConfigGrpesComponent},
  {path: 'overview', component: OverviewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ConfigGrpesComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
