import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { NavComponent } from './components/template/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModules } from './angular-material-imports';
import { ProdutoComponent } from './components/views/produto/produto.component';
import { VendaComponent } from './components/views/venda/venda.component';
import { ProdutoReadComponent } from './components/produto/produto-read/produto-read.component';
import { VendaReadComponent } from './components/venda/venda-read/venda-read.component';
import { ConfirmationDialogComponent } from './components/template/confirmation-dialog/confirmation-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoCriarComponent } from './components/produto/produto-criar/produto-criar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VendaCriarComponent } from './components/venda/venda-criar/venda-criar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    ProdutoComponent,
    VendaComponent,
    ProdutoReadComponent,
    VendaReadComponent,
    ConfirmationDialogComponent,
    ProdutoCriarComponent,
    VendaCriarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModules,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
