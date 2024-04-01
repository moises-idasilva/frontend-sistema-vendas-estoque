import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { };

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  read(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.baseUrl}/produto`);
  }

  readById(id: any): Observable<Produto> {
    return this.http.get<Produto>(`${this.baseUrl}/produto/${id}`);
  }

  create(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.baseUrl}/produto`, produto);
  }

  update(produto: Produto): Observable<Produto> {
    const id = produto.id;
    return this.http.put<Produto>(`${this.baseUrl}/produto/${id}`, produto);
  }

  delete(id: number): Observable<Produto> {
    return this.http.delete<Produto>(`${this.baseUrl}/produto/${id}`);
  }


}
