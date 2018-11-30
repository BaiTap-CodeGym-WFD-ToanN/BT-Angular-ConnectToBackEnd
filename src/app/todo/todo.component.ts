import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  allTodoList: Page<Todo> = new Page<Todo>([]);
  currentPage = 0;
  inputControl = new FormControl('New Todo');

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

  deleteTodo(i: number) {
    this.allTodoList.getElementByOriginIndex(i - 1).completed = true;
    this.httpClient.delete(this.API_URL + '/' + i,
      {observe: 'response'}).subscribe((resp) => {
      console.log(resp.status);
    });
  }

  newTodo() {
    this.httpClient.post(this.API_URL,
      {
        title: this.inputControl.value,
        completed: false
      },
      {observe: 'response'}).subscribe((resp) => {
     console.log(resp.status);
    });
  }

  next() {
    if (this.currentPage < this.allTodoList.maxPage - 1) {
      this.currentPage++;
    } else {
      this.currentPage = 0;
    }
  }

  previous() {
    if (this.currentPage < this.allTodoList.maxPage - 1) {
      this.currentPage--;
    } else {
      this.currentPage = this.allTodoList.maxPage - 1;
    }
  }

  moveTo(page: number) {
    if (this.currentPage >= 0 && this.currentPage < this.allTodoList.maxPage) {
      this.currentPage = page;
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

  getElementByOriginIndex(i: number): T {
    return this.pages[Math.floor(i / this.pagingSize)][(i % this.pagingSize)];
  }
}


