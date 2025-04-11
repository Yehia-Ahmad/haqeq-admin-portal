import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
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

@Component({
  selector: 'hakek-add-blog',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, ButtonModule, TextareaModule, InputTextModule, DatePickerModule, FileUploadModule, ToastModule, EditorModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss',
  providers: [MessageService]
})
export class AddBlogComponent {
  formData: FormData = new FormData();
  blogForm: FormGroup;
  blogInfo: any;
  uploadedFiles: any[] = [];
  imgUrl: any;

  constructor(private fb: FormBuilder, private _blogService: BlogService, private _activatedRoute: ActivatedRoute, private _router: Router, private _messageService: MessageService) {
    this.initBlogForm();
    this._activatedRoute.params.subscribe((params) => {
      if(params['id']){
        this.getBlog(params['id']);
      }
    });
  }

  
  getBlog(id) {
    this._blogService.getBlog(id).subscribe((res: any) => {
      this.blogForm.patchValue(res.items);
      this.blogInfo = res.items;
    })
  }

  initBlogForm() {
    this.blogForm = this.fb.group({
      title: [''],
      description: [''],
      conclusion: [''],
      axes: [''],
      author: [''],
      publish_date: [''],
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
    Object.keys(this.blogForm.controls).map((key) => {
      this.formData.append(key, this.blogForm.get(key).value)
    })
    if (this.blogInfo.id) {
      this.formData.append('id', this.blogInfo.id);
    }
    this._blogService.addBlogs(this.formData).subscribe((res) => {
      if (this.blogInfo.id) {
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