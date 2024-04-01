import { Component } from '@angular/core';
import { Venda } from '../../../model/venda.model';
import { VendaService } from '../../../service/venda.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../template/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-venda-read',
  templateUrl: './venda-read.component.html',
  styleUrl: './venda-read.component.scss'
})
export class VendaReadComponent {

  vendas: Venda[] = [];

  constructor(private vendaService: VendaService, private router: Router, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.carregarVendas();
  }

  carregarVendas(): void {
    this.vendaService.read().subscribe(
      (vendas: Venda[]) => {
        // console.log('Vendas recebidas:', vendas);
        this.vendas = vendas;
      },
      (error) => {
        this.vendaService.showMessage('Falha ao carregar vendas. Por favor, tente novamente mais tarde.');
      }
    );
  }


  editarVenda(id: number) {
    this.router.navigate(['/venda/editar', id]);
  }

  excluirVenda(id: number): void {
    this.vendaService.readById(id).subscribe(venda => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Excluir Venda',
          message: 'Você tem certeza que deseja excluir a venda do(a) cliente ' + venda.cliente + ' no valor de R$' + venda.valorTotal + '?',
        },
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.vendaService.delete(id).subscribe(() => {
            this.vendaService.showMessage('Venda Excluída com Sucesso!');
            this.router.navigate(['/venda']);
            location.reload();
          }, error => {
            if (error && error.error && error.error.debugMessage) {
              alert(error.error.debugMessage);
            } else {
              alert('Erro ao excluir a venda. Por favor, tente novamente.');
            }
          });
        }
      });
    }, error => {
      console.error('Erro ao buscar vendas: ', error);
      alert('Erro ao carregar detalhes da venda. Por favor, tente novamente.');
    });
  }

}
