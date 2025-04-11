import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TruncatePipe } from '../../../../core/pipes/truncate.pipe';
import { ArabicNumeralsPipe } from '../../../../core/pipes/arabic-numerals.pipe';
import { DateToArabicPipe } from '../../../../core/pipes/date-to-arabic-pipe.pipe';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LibService } from '../../services/lib.service';

@Component({
  selector: 'app-all-lib',
  imports: [
    CommonModule,
    RouterLink,
    TableModule,
    MultiSelectModule,
    SelectModule,
    InputIconModule,
    TagModule,
    InputTextModule,
    SliderModule,
    ProgressBarModule,
    ToggleButtonModule,
    ToastModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    RatingModule,
    RippleModule,
    IconFieldModule,
    ConfirmDialogModule,
    TruncatePipe,
    ArabicNumeralsPipe,
    DateToArabicPipe
  ],
  templateUrl: './all-lib.component.html',
  styleUrl: './all-lib.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class AllLibComponent implements OnInit {
  @ViewChild('filter') filter!: ElementRef;
  statuses: any[] = [];
  loading: boolean = true;
  librariesLength: number = 0;
  libraries: any[] = [];
  LibraryMeta: any = {
    first_page_url: null,
    last_page_url: null,
    from: null,
    to: null,
    last_page: null,
    total: 0,
    links: null,
    next_page_url: null,
    path: null,
    per_page: null,
    prev_page_url: null,
  };
  params: any = {
    page: 1,
    count: 10
  };

  first: number = 0;

  constructor(
    private _libService: LibService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.loadInitialData()
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  getSeverity(status: string) {
    switch (status) {
      case 'qualified':
      case 'instock':
      case 'INSTOCK':
      case 'DELIVERED':
      case 'delivered':
        return 'success';

      case 'negotiation':
      case 'lowstock':
      case 'LOWSTOCK':
      case 'PENDING':
      case 'pending':
        return 'warn';

      case 'unqualified':
      case 'outofstock':
      case 'OUTOFSTOCK':
      case 'CANCELLED':
      case 'cancelled':
        return 'danger';

      default:
        return 'info';
    }
  }


  loadInitialData() {
    this._libService.getAllLibraries({ page: 1, count: 10 }).subscribe({
      next: (res) => {
        this.handleResponse(res);
      },
      error: (err) => {
        console.log(err);
        console.log(err);
        this.loading = false;
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
          life: 3000
        });
      }
    });
  }

  private handleResponse(res: any) {
    this.libraries = res.items?.data || [];
    this.librariesLength = res.items?.total || 0;
    this.LibraryMeta = { ...res.items };
    this.loading = false;
  }

  onPageChange(event: any) {
    if (this.loading) return; // Prevent duplicate calls

    // Check if rows per page changed
    const rowsChanged = event.rows !== this.params.count;

    // Always reset to first page if rows per page changed
    const page = rowsChanged ? 1 : Math.floor(event.first / event.rows) + 1;

    // Update params
    this.params = {
      page: page,
      count: event.rows
    };

    // Reset first position if rows changed
    if (rowsChanged) {
      this.first = 0;
    }

    this.loadData();
  }

  private loadData() {
    this.loading = true;
    this._libService.getAllLibraries(this.params).subscribe({
      next: (res) => {
        this.handleResponse(res);
        // Ensure first position matches the current page
        this.first = (this.params.page - 1) * this.params.count;
        window.scrollTo(0, 0);
      },
      error: (err) => {
        this.loading = false;
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
          life: 3000
        });
      }
    });
  }

  get isFirstPage(): boolean {
    return this.params.page === 1;
  }

  get isLastPage(): boolean {
    return this.params.page === this.LibraryMeta.last_page;
  }

  deleteLibrary(blog: any) {
    this._confirmationService.confirm({
      message: 'هل أنت متأكد أنك تريد حذف؟ ' + blog.title,
      header: 'تاكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'نعم',
      rejectLabel: 'لا',
      accept: () => {
        this._libService.deleteLibrary(blog.id).subscribe({
          next: (response) => {
            this.loadInitialData();
            this._messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: response.message,
              life: 3000
            });
          }
        });
      }
    });
    console.log(blog);
  }

  editLibrary(blog: any) {
    this._router.navigate([`/lib/add-lib/${blog.id}`]);
  }

  onImportFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this._libService.importLibraries(formData).subscribe({
        next: (response) => {
          swal.fire('Success', response.message, 'success').then(() => {
            event.target.value = '';
            event.target.files = [];
          });
        },
        error: (err) => {
          swal.fire('Error', err.error.message, 'error');
        }
      });
    }
  }

  onExportData(): void {
    this._libService.exportLibrariesData().subscribe({
      next: (response: any) => {
        if (response.code === 200 && response.items?.url) {
          const fileUrl = response.items.url;
          const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
          const a = document.createElement('a');
          a.href = fileUrl;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      },
      error: (err) => {
        swal.fire('Error', err.error.message, 'error');
      }
    });
  }
}
