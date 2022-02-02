import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  StylesManager,
  Model,
  SurveyNG,
  SurveyModel,
  Page,
  DragDropRankingChoices,
} from 'survey-angular';
import { surveyJson } from './../survey';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/testing';
import { take } from 'rxjs';







@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})


export class AppComponent implements OnInit {
  
  
  //Lieblingfarbe
  color: string | undefined;

  //Geburtstag
  birthdate: string | undefined

  //Fehlsichtigkeit
  fehlsichtigkeit: boolean = false;

  //Random Farben
  randomColorF90: string | undefined ;
  randomColorF51: string | undefined ;
  randomColorF69: string | undefined ;
  randomColorF1: string | undefined ;

  //Rankings
  survey_1: DragDropRankingChoices | undefined;
  survey_2: DragDropRankingChoices | undefined;

 

  //constructor(private.document:.document) {}
  constructor(@Inject(DOCUMENT) private document: Document,private httpClient: HttpClient) {}

  //@Inject(DOCUMENT) private httpClient: HttpClient




  ngOnInit() {
    StylesManager.applyTheme('modern');
    const survey = new Model(surveyJson);
    SurveyNG.render('surveyContainer', { model: survey });

    
    // Abspeichern der Eingabefelder-Werte sobald sie geändert werden
    survey.onValueChanged.add((survey: any, options: any) => {
      if (options.name == 'color') {
        this.color = options.value;
      }
      if (options.name == 'farbfehlsichtigkeit') {
        this.fehlsichtigkeit = options.value;
      }
      if(options.name == 'birthdate') {
        this.birthdate = options.value;
      }
      if(options.name == 'survey_1') {
        this.survey_1 == options.value;
      }
      if(options.name == 'survey_2') {
        this.survey_2 == options.value;
      }
    });

    // Navigation manipulieren sobald die aktuelle Seite geändert wurde
    survey.onCurrentPageChanged.add((survey: SurveyModel, options: any) => {
      const page = options.oldCurrentPage as Page;
      const nextPage = options.newCurrentPage as Page;

      // weiterleiten auf "exit"-page falls fehlsichtigkeit ausgewählt
      if (
        page &&
        page.name === 'page2' &&
        nextPage &&
        nextPage.name === 'page3' &&
        this.fehlsichtigkeit
      ) {
        survey.currentPage = 'exit';
      }

      // Zurück auf Anfang wenn zurück auf "exit"-page gedrückt wird
      if (
        page &&
        page.name === 'exit' &&
        nextPage &&
        nextPage.name === 'page4'
      ) {
        survey.currentPage = 'page2';
      }
      

      if(page.name == 'page3')
      {
        const Lieblingsfarbe = this.document.getElementById('question.inputID');
      }

    }

   
    

    );

    // sobald seite gerendert wurde, svg anhand von id suchen und einfärben
    survey.onAfterRenderPage.add((survey: SurveyModel, options: any) => {
      const page = options.page as Page;
      if (page.name === 'page5') {
        const test = this.document.getElementById('Form_10');
        if (test) {
          test.style.fill = this.color as string;
        }
        const test2 = this.document.getElementById('Form1');
        if (test2) {
          const randomColorF1 = Math.floor(Math.random()*16777215).toString(16);
          test2.style.fill = '#'+randomColorF1 as string;
          console.log(randomColorF1);
        }
        const test3 = this.document.getElementById('Form_90');
        if (test3) {
          const randomColorF90 = Math.floor(Math.random()*16777215).toString(16);
          test3.style.fill = '#'+randomColorF90 as string;
          console.log(randomColorF90);
        }
        const test4 = this.document.getElementById('Form_69');
        if (test4) {
          const randomColorF69 = Math.floor(Math.random()*16777215).toString(16);
          test4.style.fill = '#'+randomColorF69 as string;
          console.log(randomColorF69);
        }
        const test5 = this.document.getElementById('Form_51');
        if (test5) {
          const randomColorF51 = Math.floor(Math.random()*16777215).toString(16);
          test5.style.fill = '#'+randomColorF51 as string;
          console.log(randomColorF51);
        }
        
      }
     
 
        //this.document.post("https://umfrage-technische-visualistik-default-rtdb.europe-west1.firebasedatabase.app/",this.document.getElementById('question.inputID'));


    });

    survey.onComplete.add(this.onSubmit);

    

  }

  onSubmit(){
    
    this.httpClient.post(
      'https://umfrage-technische-visualistik-default-rtdb.europe-west1.firebasedatabase.app/users.json',
      this.color).pipe(take(1))
      .subscribe(response => console.log(response));
    
  }
  }



 

  

