import { LivrosResultado } from './../../models/interfaces';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { Item } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();
  mensagemErro = '';
  livrosResultado: LivrosResultado;

  constructor(private service: LivroService) {}

  // totalDeLivros$ = this.campoBusca.valueChanges.pipe(
  //   debounceTime(PAUSA),
  //   filter((valorDigitado: string) => valorDigitado.length > 3),
  //   distinctUntilChanged(), //This operator will emit values only when the current value is different from the last value.
  //   switchMap((valorDigitado: string) => this.service.buscar(valorDigitado)),
  //   map((result) => (this.livrosResultado = result)),
  //   catchError((erro) => {
  //     console.log(erro);
  //     return of();
  //   })
  // );

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado: string) => valorDigitado.length > 3),
    distinctUntilChanged(), //This operator will emit values only when the current value is different from the last value.
    switchMap((valorDigitado: string) => this.service.buscar(valorDigitado)),
    map((result) => (this.livrosResultado = result)),
    map((resp) => resp.items ?? []),
    map((items: Item[]) => this.livrosResultadoParaLivros(items)),
    catchError((erro) => {
      // this.mensagemErro = 'Ops, ocorreu um erro, recarregue a aplicação';
      // return EMPTY; // é utilizado para retornar um observable vazio, ou seja, um observable que não emite nenhum valor e nem termina.
      return throwError(
        () =>
          new Error(
            (this.mensagemErro = 'Ops, ocorreu um erro, recarregue a aplicação')
          )
      );
    })
  );

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }
  // buscarLivros() {
  //   this.subscription = this.service.buscar(this.campoBusca).subscribe({
  //     next: (items) => this.listaLivros = this.livrosResultadoParaLivros(items),
  //     error: (erro) => console.log(erro),
  //     complete: () => console.log('Observable completo'),
  //   });
  // }
}
