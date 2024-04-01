import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../../../model/produto.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from '../../../service/produto.service';
import { VendaService } from '../../../service/venda.service';
import { Venda, VendaData } from '../../../model/venda.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-venda-criar',
  templateUrl: './venda-criar.component.html',
  styleUrl: './venda-criar.component.scss'
})

export class VendaCriarComponent implements OnInit {

  vendaForm!: FormGroup;
  produtos!: Produto[];
  selectedProdutos: Produto[] = [];

  venda: Venda = {
    id: 0,
    cliente: '',
    quantidade: 0,
    valorTotal: 0
  };

  constructor(
    private formBuilder: FormBuilder,
    private vendaService: VendaService,
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.vendaForm = this.formBuilder.group({
      cliente: ['', Validators.required],
      quantidade: ['', Validators.required],
      produtos: [[]],
      selectedProdutos: [[]]
    });

    this.carregarProdutos();

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.readVendaById(id);
      }
    });

  }

  carregarProdutos(): void {
    this.produtoService.read().subscribe(
      (data: Produto[]) => {
        this.produtos = data;
        // console.log("Produtos carregados:", this.produtos);
      },
      (error) => {
        this.showSnackBar('Erro ao carregar produtos.', 'error');
      }
    );
  }

  private readVendaById(id: number): void {
    this.vendaService.readById(id).subscribe(
      venda => {
        this.venda = venda;
        console.log(venda);

        this.vendaForm.patchValue({
          cliente: venda.cliente,
          quantidade: venda.quantidade,
        });

      },
      error => {
        console.error('Erro ao buscar detalhes da venda:', error);
        this.snackBar.open('Erro ao carregar detalhes da venda. Por favor, tente novamente.', 'Fechar', {
          duration: 5000, // milissegundos
        });
      }
    );
  }

  criarVenda(): void {
    if (this.vendaForm.valid) {
      const cliente = this.vendaForm.get('cliente')!.value;
      const quantidade = this.vendaForm.get('quantidade')!.value;
      const produtos = this.selectedProdutos;

      const vendaData: VendaData = {
        venda: {
          cliente: cliente,
          quantidade: quantidade,
        },
        produtos: produtos
      };

      this.vendaService.create(vendaData).subscribe(
        () => {
          this.showSnackBar('Venda salva com sucesso.', 'success');
          this.router.navigate(['/venda']);
        },
        error => {
          console.log('Error object:', error);

          if (error && error.debugMessage) {
            alert(error.debugMessage);
          } else {
            alert(error.error.debugMessage);
            // this.showSnackBar('Erro ao salvar venda.', 'error');
          }

        }
      );
    }
  }


  updateVenda(): void {
    if (this.vendaForm.valid) {
      const formData = this.vendaForm.value;
      const updatedVenda: Venda = {
        ...this.venda,
        cliente: formData.cliente,
        quantidade: formData.quantidade,
      };

      this.vendaService.update(updatedVenda).subscribe(
        (vendaAtualizada) => {
          console.log('Venda atualizada:', vendaAtualizada);
          this.produtoService.showMessage('Venda atualizada com sucesso!');
          this.router.navigate(['/venda']);
        },
        (error) => {
          this.handleError(error);
        }
      );
    } else {
      this.snackBar.open(
        'Preencha corretamente todos os campos obrigatórios.',
        'X',
        { duration: 5000 }
      );
    }
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    let errorMessage = 'Ocorreu um erro ao processar sua solicitação.';
    if (error instanceof HttpErrorResponse && error.error.detail) {
      errorMessage = error.error.detail;
    }
    this.snackBar.open(errorMessage, 'X', { duration: 5000 });
  }

  onCancel(): void {
    this.router.navigate(['/venda']);
  }

  isCreatingNew(): boolean {
    return this.venda.id === 0;
  }

  showSnackBar(message: string, type: string): void {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [type === 'error' ? 'error-snackbar' : 'success-snackbar']
    });
  }

  onProductSelected(produto: Produto, event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && target.checked !== undefined) {
      const isChecked: boolean = target.checked;
      if (isChecked) {
        // Adiciona o produto aos produtos selecionados
        this.selectedProdutos.push(produto);
      } else {
        // Remove o produto dos produtos selecionados, se estiver presente
        const index = this.selectedProdutos.indexOf(produto);
        if (index !== -1) {
          this.selectedProdutos.splice(index, 1);
        }
      }
      // console.log('Selected products:', this.selectedProdutos);
    }
  }

  removeProduto(productId: any): void {

  }

}
