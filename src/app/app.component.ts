import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  StylesManager,
  Model,
  SurveyNG,
  SurveyModel,
  Page,
} from 'survey-angular';
import { surveyJson } from './../survey';







@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  color: string | undefined;
  fehlsichtigkeit: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

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

    });

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
          const randomColor = Math.floor(Math.random()*16777215).toString(16);
          test2.style.fill = '#'+randomColor as string;
          console.log(randomColor);
        }
        const test3 = this.document.getElementById('Form_90');
        if (test3) {
          const randomColor = Math.floor(Math.random()*16777215).toString(16);
          test3.style.fill = '#'+randomColor as string;
          console.log(randomColor);
        }
        const test4 = this.document.getElementById('Form_69');
        if (test4) {
          const randomColor = Math.floor(Math.random()*16777215).toString(16);
          test4.style.fill = '#'+randomColor as string;
          console.log(randomColor);
        }
        const test5 = this.document.getElementById('Form_51');
        if (test5) {
          const randomColor = Math.floor(Math.random()*16777215).toString(16);
          test5.style.fill = '#'+randomColor as string;
          console.log(randomColor);
        }
      }
    });
  }
}
