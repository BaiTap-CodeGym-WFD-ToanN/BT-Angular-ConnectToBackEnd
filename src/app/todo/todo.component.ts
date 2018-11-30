import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  allTodoList: Page<Todo> = new Page<Todo>([]);
  currentPage = 0;

  constructor(private httpClient: HttpClient,
              @Inject('TODO_API_URL') private API_URL: string) {
  }

  ngOnInit() {
    this.httpClient.get<Todo[]>(this.API_URL).pipe(map((data) => data.map((todo) => {
      {
        return {id: todo.id, title: todo.title, completed: todo.completed} as Todo;
      }
    }))).subscribe(data => {
      this.allTodoList = new Page<Todo>(data, 10);
    });
  }

  next() {
    if (this.currentPage < this.allTodoList.maxPage) {
      this.currentPage++;
    } else {
      this.currentPage = 0;
    }
  }

  previous() {
    if (this.currentPage > this.allTodoList.maxPage) {
      this.currentPage--;
    } else {
      this.currentPage = this.allTodoList.maxPage;
    }
  }
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

class Page<T> {
  pages: T[][] = [];
  maxPage: number;
  pagingSize: number;

  constructor(array: T[], pagingSize?: number) {
    this.pagingSize = pagingSize || 20;
    this.maxPage = Math.ceil(array.length / pagingSize);
    let page: T[] = [];
    let count = 0;
    for (let i = 0; i < array.length; i++) {
      count++;
      page.push(array[i]);
      if (count === pagingSize || i === array.length - 1) {
        this.pages.push(page);
        page = [];
        count = 0;
      }
    }
  }

  getPage(page: number): T[] {
    if (page >= 0 && page < this.pages.length) {
      return this.pages[page];
    }
    return [];
  }

  getPageSize(page: number): number {
    if (page >= 0 && page < this.pages.length) {
      return this.pages[page].length;
    }
    return 0;
  }
}


