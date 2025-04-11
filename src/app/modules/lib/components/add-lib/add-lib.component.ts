import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorModule } from 'primeng/editor';
import Swal from 'sweetalert2';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TextareaModule } from 'primeng/textarea';
import { LibService } from '../../services/lib.service';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-add-lib',
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, TextareaModule, Select, InputTextModule, DatePickerModule, FileUploadModule, ToastModule, EditorModule],
  templateUrl: './add-lib.component.html',
  styleUrl: './add-lib.component.scss',
  providers: [MessageService]
})
export class AddLibComponent {
  formData: FormData = new FormData();
  libForm: FormGroup;
  libInfo: any;
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
  libTypes: any[] = [
    {
      label: 'كتاب',
      value: 'book'
    },
    {
      label: 'دراسة',
      value: 'study'
    },
    {
      label: 'اداة',
      value: 'tool'
    },
    {
      label: 'نظام',
      value: 'regulation'
    },
  ]
  imgUrl: any;

  constructor(private fb: FormBuilder, private _libService: LibService, private _activatedRoute: ActivatedRoute, private _router: Router, private _messageService: MessageService) {
    this.initlibForm();
    this._activatedRoute.params.subscribe((params) => {
      if(params['id']){
        this.getLibrary(params['id']);
      }
    });
  }

  
  getLibrary(id) {
    this._libService.getLibrary(id).subscribe((res: any) => {
      this.libForm.patchValue(res.items);
      this.libInfo = res.items;
    })
  }

  initlibForm() {
    this.libForm = this.fb.group({
      title: [''],
      description: [''],
      author: [''],
      publish_date: [''],
      type: [''],
      lib_type: [''],
      usage: [''],
      beneficiaries: [''],
      axes: [''],
      help: [''],
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
    Object.keys(this.libForm.controls).map((key) => {
      this.formData.append(key, this.libForm.get(key).value)
    })
    if (this.libInfo.id) {
      this.formData.append('id', this.libInfo.id);
    }
    this._libService.addLibraries(this.formData).subscribe((res) => {
      if (this.libInfo.id) {
        Swal.fire("Success", "Blog Updated Successfully", "success").then(() => {
          this._router.navigate(['all-blogs']);
        });
      } else {
        Swal.fire("Success", "Blog Added Successfully", "success").then(() => {
          this._router.navigate(['all-blogs']);
        });
      }
    })
  }

}
