import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/admin/login/login.component';
import { ConfigGrpesComponent } from './components/admin/config-grpes/config-grpes.component';

import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFireDatabaseModule} from '@angular/fire/compat/database'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { FormsModule } from '@angular/forms'

import { DatabaseService } from './services/database.service';
import { OverviewComponent } from './components/admin/overview/overview.component';
import { DashboardComponent } from './components/users/dashboard/dashboard.component';
import { MyGroupComponent } from './components/users/my-group/my-group.component';
import { HomeComponent } from './components/home/home.component';
import { UserLoginComponent } from './components/users/user-login/user-login.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { SharedService } from './services/shared.service';
import { CreateGrpComponent } from './components/users/create-grp/create-grp.component';
import { InfosComponent } from './components/infos/infos.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login-admin', component: LoginComponent},
  {path: 'user-login', component: UserLoginComponent},
  {path: 'config', component: ConfigGrpesComponent},
  {path: 'overview', component: OverviewComponent},
  {path: 'dashboard-user', component: DashboardComponent},
  {path: 'my-group', component: MyGroupComponent},
  {path: 'list-users', component: ListUsersComponent},
  {path: 'create-group', component: CreateGrpComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ConfigGrpesComponent,
    OverviewComponent,
    CreateGrpComponent,
    MyGroupComponent,
    HomeComponent,
    UserLoginComponent,
    ListUsersComponent,
    InfosComponent,
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
  providers: [DatabaseService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
