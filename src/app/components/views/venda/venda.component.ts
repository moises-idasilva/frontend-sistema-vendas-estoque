import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.scss'
})
export class VendaComponent {

  constructor(private router: Router) { }

  adicionarNovaVenda() {
    this.router.navigate(['/venda/criar']);
  }

}
