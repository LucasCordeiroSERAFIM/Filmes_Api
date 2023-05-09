import { Component, PipeTransform } from '@angular/core';
import { Filmes } from './filme';
import { MovieService } from './servico/movie.service';
import { FilmeDetailComponent } from '../filme-detail/filme-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent {
  upcomingMovies: Filmes = {} as Filmes;
  topRatede: Filmes = {} as Filmes;
  genreMovies: Filmes = {} as Filmes;
  currentPage = 1;
  itemsPerPage = 10;
  searchQuery = '';
  
  constructor(
    private movieService: MovieService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getMoviesList();
    this.getMovieTopRated();
    this.getMovieGenre();
  }

  getMoviesList(){
    this.movieService.getUpcomingMovies().subscribe(data => {
      this.upcomingMovies = data;
    });
  }

  getMovieTopRated(){
    this.movieService.getTopRatedMovie().subscribe(data => {
      this.topRatede = data;
    });
  }
  getMovieGenre(){
    this.movieService.getMoviebygenre().subscribe((data: any) => {
     this.genreMovies = data;
    });
  }


  
  nextPage() {
    this.currentPage++;
  }

  prevPage() {
    this.currentPage--;
  }
/// itens de busca das páginas
  get filteredUpcomingMovies() {
      return this.upcomingMovies.results.filter(movie => {
        if (!this.upcomingMovies) {
          return [];
        }
        else{
      return movie.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        }
    });
  }

  get filteredMoviesTopRated() {
    return this.topRatede.results.filter(movie => {
      if (!this.topRatede.results) {
        return [];
      }
      else{
    return movie.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      }
  });
  
}

get filteredMoviesGenre() {
  return this.genreMovies.results.filter(movie => {
if(!this.genreMovies.results){
  return [];
}
else{
  return movie.genre_ids.includes(parseInt(this.searchQuery));
}
});

}
  openModal(id: number): void {
    const modalRef = this.modalService.open(FilmeDetailComponent);
    modalRef.componentInstance.movieId = id;
  }

  
}

