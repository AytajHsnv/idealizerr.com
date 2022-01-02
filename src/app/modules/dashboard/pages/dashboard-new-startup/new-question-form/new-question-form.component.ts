import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  ValidatorFn
} from "@angular/forms";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { NotifyService } from "src/app/modules/shared/services/notify.service";
import { Router } from "@angular/router";

@Component({
  selector: "new-question-form",
  templateUrl: "new-question-form.component.html",
  styleUrls: ["./new-question-form.component.scss"]
})
export class NewQuestionFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private CORE: CoreService,
    private NOTIFY: NotifyService,
    private ROUTER: Router
  ) {}
  questionForm: FormGroup;
  questions: any[];
  @Input()
  new: boolean;

  @Input()
  detail: any;

  @Output() startupNameChange = new EventEmitter<any>();
  _logo: any;
  _image: any;

  countries;

  ngOnDestroy() {
    if (this._logo) {
      this._logo.unsubscribe();
    }
    if (this._image) {
      this._image.unsubscribe();
    }
  }
  answer1Disabled;

  ngOnInit() {
    this.CORE.logo.subscribe(data => {
      if (data && this.questionForm) {
        this.questionForm.patchValue({
          logo: data.file
        });
      }
    });

    this.CORE.countries.subscribe(data => {
      if (data) {
        this.countries = data;
      }
    });

    this.CORE.image.subscribe(data => {
      if (data && this.questionForm) {
        this.questionForm.patchValue({
          image: data.file
        });
      }
    });
    this.CORE.getQuestions().subscribe(({ all_questions }) => {
      const newQuestions = {};
      for (let key in all_questions) {
        if (all_questions.hasOwnProperty(key)) {
          let [question, ...rest] = all_questions[key];
          rest = rest.map(opt => {
            for (let optKey in opt) {
              if (key === '9' && this.new && this.detail) {
                return { id: optKey, value: opt[optKey].trim() };
              } else {
                return { id: optKey, value: opt[optKey] };
              }
            }
          });

          newQuestions["answer" + key] = {
            question: question.question,
            options: rest
          };
          if (key === "2" || key === "12") {
            newQuestions["answer" + key].checkbox = true;
          }
        }
      }
      this.questions = newQuestions as any[];
      const formKeys = {};

      if (!this.new) {
        let newQuestions = {};
        this.detail.questions_and_answers.forEach((qs, idx) => {
          if (idx + 1 === 1) return;
          newQuestions["answer" + (idx + 1)] = {
            question: qs.question,
            options: [{ id: qs.id, value: qs.answer }]
          };
        });
        this.questions = newQuestions as any[];

        Object.keys(this.questions).forEach(ky => {
          return (formKeys[ky] = ["", Validators.required]);
        });
        this.answer1Disabled = true;
        this.questionForm = this.fb.group({
          title: [this.detail.startup.title, Validators.required],
          website: [this.detail.startup.website],
          twitter: [this.detail.startup.twitter],
          facebook: [this.detail.startup.facebook],
          team: [this.detail.startup.team, Validators.required],
          idea: [this.detail.startup.idea, Validators.required],
          description: [this.detail.startup.description, Validators.required],
          image: ["", Validators.required],
          logo: ["", Validators.required],
          ...formKeys,
          answer1: [this.detail.startup.country.code, Validators.required]
        });
        this.questionForm.disable();
      } else if (this.new && this.detail) {
        let answer2, answer12;


        Object.keys(this.questions).forEach(
          ky => {
            let value;
            this.detail.questions_and_answers.forEach((qs, idx) => {

              if (qs.question.trim() === this.questions[ky].question.trim()) {
                if (ky === 'answer2') answer2 = qs;
                if (ky === 'answer12') answer12 = qs;
                value = qs.answer;
              }
            });
            return (formKeys[ky] = [value, Validators.required]);
          }
          );
        answer2 = answer2.answer.split(',').map(a => a.trim());
        answer12 = answer12.answer.split(',').map(a => a.trim());



        this.questionForm = this.fb.group({
          title: [this.detail.startup.title, Validators.required],
          website: [this.detail.startup.website],
          twitter: [this.detail.startup.twitter],
          facebook: [this.detail.startup.facebook],
          team: [this.detail.startup.team, Validators.required],
          idea: [this.detail.startup.idea, Validators.required],
          description: [this.detail.startup.description, Validators.required],
          image: [this.detail.startup.image, Validators.required],
          logo: [this.detail.startup.logo, Validators.required],
          ...formKeys,
          answer1: [this.detail.startup.country.code, Validators.required],
          answer2: this.fb.array(
            this.questions["answer2"].options.map(s => {
              if (answer2.indexOf(s.value.trim()) !== -1) {
                return this.fb.control(true);
              }
              return this.fb.control(false);
            }),
            this.atLeastOneCheckboxCheckedValidator()
          ),
          answer12: this.fb.array(
            this.questions["answer12"].options.map(s => {
              if (answer12.indexOf(s.value.trim()) !== -1) {
                return this.fb.control(true);
              }
              return this.fb.control(false);
            }),
            this.atLeastOneCheckboxCheckedValidator()
          )
        });
      } else {
        Object.keys(this.questions).forEach(
          ky => (formKeys[ky] = ["", Validators.required])
        );
        this.questionForm = this.fb.group({
          title: ["", Validators.required],
          website: [""],
          twitter: [""],
          facebook: [""],
          team: ["", Validators.required],
          idea: ["", Validators.required],
          description: ["", Validators.required],
          image: ["", Validators.required],
          logo: ["", Validators.required],
          answer1: ["", Validators.required],
          ...formKeys,
          answer2: this.fb.array(
            this.questions["answer2"].options.map(s => {
              return this.fb.control(false);
            }),
            this.atLeastOneCheckboxCheckedValidator()
          ),
          answer12: this.fb.array(
            this.questions["answer12"].options.map(s => this.fb.control(false)),
            this.atLeastOneCheckboxCheckedValidator()
          )
        });
      }
    });
  }
  mobileNumberInputChange($event) {
    this.questionForm.get('answer1').setValue($event.country_code);
  }
  throttleSubmit = false;
  allTouched = false;
  submitForm() {
    for (let key in this.questionForm.controls) {
      this.questionForm.controls[key].markAsTouched();
    }
    this.allTouched = true;
    if (!this.questionForm.valid) return;
    if (this.throttleSubmit) return;

    this.throttleSubmit = true;

    if (this.new && this.detail) {
      const answer12 = [],
        answer2 = [];
      this.questionForm.value.answer12.forEach((a, aIdx) => {
        if (a) {
          answer12.push(this.questions["answer12"].options[aIdx].value);
        }
      });
      this.questionForm.value.answer2.forEach((a, aIdx) => {
        if (a) {
          answer2.push(this.questions["answer2"].options[aIdx].value);
        }
      });
      const completeData = {
        ...this.questionForm.value,
        answer12: answer12.toString(),
        answer2: answer2.toString()
      };

      if (!(completeData.image instanceof File)) {
        delete completeData.image
      }
      if (!(completeData.logo instanceof File)) {
        delete completeData.logo
      }


      const formData = new FormData();
      for (let key in completeData) {
        formData.append(key, completeData[key]);
      }
      this.CORE.startupQuestionEdit(formData, this.detail.startup.id).subscribe(data => {
        this.throttleSubmit = false;
        const body = data.body;
        if (body.errors) {
          this.NOTIFY.setNotification({
            status: "danger",
            text: body.errors
          });
        } else {
          this.ROUTER.navigate([`/dashboard/startups`]);
        }
      }, error => {
        this.throttleSubmit = false;
        if (error.error) {
          if (error.error.errors) {
            if (error.error.errors.logo) {
              this.NOTIFY.setNotification({
                status: "danger",
                text: error.error.errors.logo
              });
            }
          }
        }
      });
    } else {
    const answer12 = [],
      answer2 = [];
    this.questionForm.value.answer12.forEach((a, aIdx) => {
      if (a) {
        answer12.push(this.questions["answer12"].options[aIdx].value);
      }
    });
    this.questionForm.value.answer2.forEach((a, aIdx) => {
      if (a) {
        answer2.push(this.questions["answer2"].options[aIdx].value);
      }
    });
    const completeData = {
      ...this.questionForm.value,
      answer12: answer12.toString(),
      answer2: answer2.toString()
    };

    const formData = new FormData();
    for (let key in completeData) {

      formData.append(key, completeData[key]);
    }
    this.CORE.startupQuestion(formData).subscribe(data => {
      this.throttleSubmit = false;
      const body = data.body;
      if (body.errors) {
        this.NOTIFY.setNotification({
          status: "danger",
          text: body.errors
        });
      } else {
        this.ROUTER.navigate([`/dashboard/startups`]);
      }
    }, error => {
      this.throttleSubmit = false;
      if (error.error) {
        if (error.error.errors) {
          if (error.error.errors.logo) {
            this.NOTIFY.setNotification({
              status: "danger",
              text: error.error.errors.logo
            });
          }
        }
      }
    });
    }
  }
  atLeastOneCheckboxCheckedValidator(minRequired = 1): ValidatorFn {
    return function validate(formGroup: FormGroup) {
      let checked = 0;
      Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.controls[key];
        if (control.value === true) {
          checked++;
        }
      });
      if (checked < minRequired) {
        return {
          requireCheckboxToBeChecked: true
        };
      }
      return null;
    };
  }
}
