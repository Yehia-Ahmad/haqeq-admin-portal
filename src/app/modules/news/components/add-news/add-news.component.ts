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
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-add-news',
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, TextareaModule, InputTextModule, DatePickerModule, FileUploadModule, ToastModule, EditorModule],
  templateUrl: './add-news.component.html',
  styleUrl: './add-news.component.scss',
  providers: [MessageService]
})
export class AddNewsComponent {
  formData: FormData = new FormData();
  newsForm: FormGroup;
  newsInfo: any;
  uploadedFiles: any[] = [];
  imgUrl: any;

  constructor(private fb: FormBuilder, private _newsService: NewsService, private _activatedRoute: ActivatedRoute, private _router: Router, private _messageService: MessageService) {
    this.initnewsForm();
    this._activatedRoute.params.subscribe((params) => {
      if(params['id']){
        this.getSingleNews(params['id']);
      }
    });
  }

  
  getSingleNews(id) {
    this._newsService.getSingleNews(id).subscribe((res: any) => {
      this.newsForm.patchValue(res.items);
      this.newsInfo = res.items;
    })
  }

  initnewsForm() {
    this.newsForm = this.fb.group({
      title: [''],
      description: [''],
      axes: [''],
      conclusion: [''],
      image: [''],
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
    Object.keys(this.newsForm.controls).map((key) => {
      this.formData.append(key, this.newsForm.get(key).value)
    })
    if (this.newsInfo.id) {
      this.formData.append('id', this.newsInfo.id);
    }
    this._newsService.addNews(this.formData).subscribe((res) => {
      if (this.newsInfo.id) {
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
