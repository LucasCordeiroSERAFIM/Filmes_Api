import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Filmes } from '../pagina/filme';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieService } from '../pagina/servico/movie.service';

@Component({
  selector: 'app-filme-detail',
  templateUrl: './filme-detail.component.html',
  styleUrls: ['./filme-detail.component.css']
})
export class FilmeDetailComponent {
  @Input() movieId: number = 0;
  movie: Filmes = {} as Filmes;
  /**dados */
  id:number = 0;
  title:string = ''
  poster_path:string = ''
  overview:any;
  release_date:any
  vote_average:any
  original_language:any;
  original_title:any;

  constructor(
    public activeModal: NgbActiveModal,
    private movieService: MovieService,
    private modalService: NgbModal
    
  ) { }

  ngOnInit(): void {
    this.movieService.getMovieDetails(this.movieId).subscribe((data: any) => {
      this.id = data.id;
      this.title = data.title
      this.poster_path = data.poster_path
      this.overview = data.overview
      this.release_date = data.release_date
      this.vote_average = data.vote_average
      this.original_language = data.original_language
      this.original_title = data.original_title
    });
  }
  closeModal(): void {
    const modalRef = this.modalService.dismissAll();
  }
}