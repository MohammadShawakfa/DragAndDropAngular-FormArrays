import { Component, OnInit } from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {FormArray,FormBuilder,FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CdkDragSortEvent} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {



  constructor( private formBuilder:FormBuilder,
    private http: HttpClient) { }

    usersGroup:FormGroup;
    usersform:FormArray;

    formArray:FormArray;
    List :any;
    bruh:number;

    ngOnInit(): void {

      this.usersGroup = this.formBuilder.group(
        {
          usersform:this.formBuilder.array([this.createUser()])
        });

          this.http.get('https://animechan.vercel.app/api/quotes').subscribe(
            {
              next:(data)=>
              {
                this.List=data;
              }
            })
    }

    add()
  {
    this.usersform = this.usersGroup?.get('usersform') as FormArray;
    this.usersform.push(this.createUser());
  }
  createUser() : FormGroup
  {
    return this.formBuilder.group(
      {
        name:'',
        job:'',
        Dynmaic_id:''
      })
  }

  get usersControls()
  {
    return this.usersGroup.get('usersform')['controls'];
  }
  drop(event: CdkDragDrop<string[]>) {
    this.formArray = this.usersGroup.get('usersform') as FormArray;
    const from = event.previousIndex;
    const to = event.currentIndex;
    this.moveItemInFormArray(this.formArray, from, to);
  }

  moveItemInFormArray(formArray: FormArray, fromIndex: number, toIndex: number): void {
    const from = this.clamp(fromIndex, formArray.length - 1);
    const to = this.clamp(toIndex, formArray.length - 1);

    if (from === to) {
      return;
    }

    const previous = formArray.at(from);
    const current = formArray.at(to);
    formArray.setControl(to, previous);
    formArray.setControl(from, current);
  }

  /** Clamps a number between zero and a maximum. */
  clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
  }


  dragDrop(event:CdkDragSortEvent)
  {
    this.formArray = this.usersGroup.get('stepsArray') as FormArray;
    const from = event.previousIndex;
    const to = event.currentIndex;
    this.moveItemInFormArray(this.formArray, from, to);
  }

  deleteUser(i)
  {
    this.usersform.removeAt(i);
  }


}
