import { Component } from '@angular/core';
import { Produto } from '../../../model/produto.model';
import { Router } from '@angular/router';
import { ProdutoService } from '../../../service/produto.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../template/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html',
  styleUrl: './produto-read.component.scss'
})
export class ProdutoReadComponent {

  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService, private router: Router, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.read().subscribe(
      (produtos: Produto[]) => {
        console.log('Produtos recebidos:', produtos);
        this.produtos = produtos;
      },
      (error) => {
        console.error('Error loading produtos:', error);
        this.produtoService.showMessage('Falha ao carregar produtos. Por favor, tente novamente mais tarde.');
      }
    );
  }

  adicionarNovoProduto(): void {
    this.router.navigate(['/produto/criar']);
  }

  excluirProduto(id: number): void {
    this.produtoService.readById(id).subscribe(produto => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Excluir Produto',
          message: 'Você tem certeza que deseja excluir o produto ' + produto.nome + '?',
        },
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.produtoService.delete(id).subscribe(() => {
            this.produtoService.showMessage('Produto Excluído com Sucesso!');
            this.router.navigate(['/produto']);
            location.reload();
          }, error => {
            if (error && error.error && error.error.debugMessage) {
              alert(error.error.debugMessage);
            } else {
              alert('Erro ao excluir o produto. Por favor, tente novamente.');
            }
          });
        }
      });
    }, error => {
      console.error('Erro ao buscar produtos:', error);
      alert('Erro ao carregar detalhes do produto. Por favor, tente novamente.');
    });
  }


  editarProduto(id: number): void {
    this.router.navigate(['/produto/editar', id]);
  }

}
