import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Venda, VendaData } from '../model/venda.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { };

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  read(): Observable<Venda[]> {
    return this.http.get<Venda[]>(`${this.baseUrl}/venda`);
  }

  readById(id: any): Observable<Venda> {
    return this.http.get<Venda>(`${this.baseUrl}/venda/${id}`);
  }

  create(vendaData: VendaData): Observable<VendaData> {
    // console.log("Enviando VendaData para o servidor: " + vendaData);
    return this.http.post<VendaData>(`${this.baseUrl}/venda`, vendaData);
  }

  update(venda: Venda): Observable<Venda> {
    const id = venda.id;
    return this.http.put<Venda>(`${this.baseUrl}/venda/${id}`, venda);
  }

  delete(id: number): Observable<Venda> {
    return this.http.delete<Venda>(`${this.baseUrl}/venda/${id}`);
  }

}
