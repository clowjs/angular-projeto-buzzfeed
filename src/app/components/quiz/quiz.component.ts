import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { quizz_questions } from '../../../assets/data/quizz_questions'

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {

  title: string = 'Quiz';

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: any;

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() { }

  playerChoose(value: string): void {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex >= this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((prev, curr, i, arr) => {
      if (arr.filter(item => item === prev).length > arr.filter(item => item === curr).length) {
        return prev;
      } else {
        return curr;
      }
    });

    return result;
  }

  ngOnInit() {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length - 1;

    }
  }

}
