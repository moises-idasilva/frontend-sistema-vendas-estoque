import { Produto } from "./produto.model";

export interface Venda {
  id?: number;
  cliente: string;
  quantidade: number;
  valorTotal?: number;
}

export interface VendaData {
  venda: Venda;
  produtos: Produto[];
}
