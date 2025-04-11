import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TextareaModule } from 'primeng/textarea';
import { InitiativesService } from '../../services/initiatives.service';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-add-initiatives',
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, TextareaModule, Select, InputTextModule, DatePickerModule, FileUploadModule, ToastModule, EditorModule],
  templateUrl: './add-initiatives.component.html',
  styleUrl: './add-initiatives.component.scss',
  providers: [MessageService]
})
export class AddInitiativesComponent {
  formData: FormData = new FormData();
  initiativeForm: FormGroup;
  initiativeInfo: any;
  uploadedFiles: any[] = [];
  types: any[] = [
    {
      label: 'تعليمى',
      value: 'education'
    },
    {
      label: 'بيئى',
      value: 'environment'
    },
    {
      label: 'صحى',
      value: 'health'
    }
  ];
  status: any[] = [
    {
      label: 'حالية',
      value: 'current'
    },
    {
      label: 'سابقة',
      value: 'previous'
    },
  ];
  imgUrl: any;

  constructor(
    private fb: FormBuilder,
    private _initiativeService: InitiativesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService
  ) {
    this.initInitiativeForm();
    this._activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getInitiative(params['id']);
      }
    });
  }

  getInitiative(id) {
    this._initiativeService.getSingleInitiatives(id).subscribe((res: any) => {
      this.initiativeForm.patchValue(res.items);
      this.initiativeInfo = res.items;
    });
  }

  initInitiativeForm() {
    this.initiativeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
      pdf: [''],
      image: ['', Validators.required]
    });
  }

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this._messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  }

  onSVGLogo(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgUrl = reader.result;
      };
    }
    const file: File = event.target.files[0];
    if (file) {
      this.formData.append('image', file, file.name);
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.formData.append('file', file, file.name);
    }
  }

  onSubmit() {
    Object.keys(this.initiativeForm.controls).map((key) => {
      this.formData.append(key, this.initiativeForm.get(key).value);
    });
    if (this.initiativeInfo.id) {
      this.formData.append('id', this.initiativeInfo.id);
    }
    this._initiativeService.addInitiatives(this.formData).subscribe((res) => {
      if (this.initiativeInfo.id) {
        // Swal.fire("Success", "Blog Updated Successfully", "success").then(() => {
        //   this._router.navigate(['all-blogs']);
        // });
      } else {
        // Swal.fire("Success", "Blog Added Successfully", "success").then(() => {
        //   this._router.navigate(['all-blogs']);
        // });
      }
    });
  }
}
