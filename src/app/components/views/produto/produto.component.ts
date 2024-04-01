import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.scss'
})
export class ProdutoComponent {

  constructor(private router: Router) { }

  adicionarNovoProduto(): void {
    this.router.navigate(['/produto/criar']);
  }

}
