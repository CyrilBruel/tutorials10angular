import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {
  tutorials: any;
  currentTutorial = {
    id: null,
    title: null,
    description: null,
    published: null
  };
  currentIndex = -1;
  title = '';
  constructor(private tutorialService: TutorialService) {
    this.retrieveTutorials();
  }

  ngOnInit(): void {
  }
  retrieveTutorials(): void {
    /* */
    const success = (res: any) => {
      if(res.status === 'SUCCESS'){
        this.tutorials = res.data;
      } else{
        console.log(res.message);
      }
    }
    const error = (err: any) => {
      console.log(err)
    }
    this.tutorialService.getAll().subscribe(success, error);
    /* */
    /*
    this.tutorialService.getAll()
      .subscribe(
        response => {
          this.tutorials = response.data;
          console.log(response);
        },
        error => {
          console.log(error);
        });
    */
  }
  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {
      id: null,
      title: null,
      description: null,
      published: null
    };
    this.currentIndex = -1;
  }
  setActiveTutorial(tutorial: any, index: any): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }
  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTutorials();
        },
        error => {
          console.log(error);
        });
  }
  searchTitle(): void {
    this.tutorialService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
