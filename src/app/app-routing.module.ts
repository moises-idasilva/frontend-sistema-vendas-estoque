import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoComponent } from './components/views/produto/produto.component';
import { VendaComponent } from './components/views/venda/venda.component';
import { ProdutoCriarComponent } from './components/produto/produto-criar/produto-criar.component';
import { VendaCriarComponent } from './components/venda/venda-criar/venda-criar.component';

const routes: Routes = [
  {
    path: "",
    component: VendaComponent
  },
  {
    path: "venda",
    component: VendaComponent
  },
  {
    path: "venda/criar",
    component: VendaCriarComponent
  },
  {
    path: "venda/editar/:id",
    component: VendaCriarComponent
  },
  {
    path: "produto",
    component: ProdutoComponent
  },
  {
    path: "produto/criar",
    component: ProdutoCriarComponent
  },
  {
    path: "produto/editar/:id",
    component: ProdutoCriarComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
