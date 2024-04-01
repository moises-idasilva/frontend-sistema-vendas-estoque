import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../../service/produto.service';
import { Produto } from '../../../model/produto.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto-criar',
  templateUrl: './produto-criar.component.html',
  styleUrl: './produto-criar.component.scss',
})
export class ProdutoCriarComponent implements OnInit {
  productForm!: FormGroup;
  produto: Produto = {
    id: 0,
    nome: '',
    descricao: '',
    quantidadeDisponivel: 0,
    valorUnitario: 0,
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.createForm();

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.readProdutoById(id);
      }
    });

  }

  private createForm(): void {
    this.productForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      quantidadeDisponivel: ['', [Validators.required, Validators.min(0)]],
      valorUnitario: ['', [Validators.required, Validators.min(0)]],
    });

    this.productForm.patchValue({
      nome: this.produto.nome,
      descricao: this.produto.descricao,
      quantidadeDisponivel: this.produto.quantidadeDisponivel,
      valorUnitario: this.produto.valorUnitario,
    });

  }

  private readProdutoById(id: number): void {
    this.produtoService.readById(id).subscribe(
      produto => {
        this.produto = produto;
        console.log(produto);
        // Update form values after fetching data
        this.productForm.patchValue({
          nome: this.produto.nome,
          descricao: this.produto.descricao,
          quantidadeDisponivel: this.produto.quantidadeDisponivel,
          valorUnitario: this.produto.valorUnitario,
        });
      },
      error => {
        console.error('Error fetching product details:', error);
        // Handle error from fetching product details
        this.snackBar.open('Erro ao carregar detalhes do produto. Por favor, tente novamente.', 'Fechar', {
          duration: 5000, // milliseconds
        });
      }
    );
  }

  criarProduto(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;

      this.produto.nome = formData.nome;
      this.produto.descricao = formData.descricao;
      this.produto.quantidadeDisponivel = formData.quantidadeDisponivel;
      this.produto.valorUnitario = formData.valorUnitario;

      this.produtoService.create(this.produto).subscribe(
        (produtoCriado) => {
          console.log('Produto criado:', produtoCriado);
          this.produtoService.showMessage('Produto criado com sucesso!');
          this.router.navigate(['/produto']);
        },
      );
    }
    else {
      const errorMessage = 'Apenas o campo descrição é opcional';
      this.snackBar.open(errorMessage, 'X', {
        duration: 5000, // milliseconds
      });
    }
  }

  updateProduto(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      const updatedProduct: Produto = {
        ...this.produto,
        nome: formData.nome,
        descricao: formData.descricao,
        quantidadeDisponivel: formData.quantidadeDisponivel,
        valorUnitario: formData.valorUnitario,
      };

      this.produtoService.update(updatedProduct).subscribe(
        (produtoAtualizado) => {
          console.log('Produto atualizado:', produtoAtualizado);
          this.produtoService.showMessage('Produto atualizado com sucesso!');
          this.router.navigate(['/produto']);
        },
        (error) => {
          this.handleError(error);
        }
      );
    } else {
      this.snackBar.open(
        'Preencha corretamente todos os campos obrigatórios.',
        'Fechar',
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

  onCancel() {
    this.router.navigate(['/produto']);
  }

  isCreatingNew(): boolean {
    return this.produto.id === 0;
  }

}
