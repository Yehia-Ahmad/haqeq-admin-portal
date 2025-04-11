import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, AngularSvgIconModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <svg-icon src="icons/svgs/haqaq.svg" [svgStyle]="{ 'width.px':80 }"></svg-icon>
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
                                اهلا بك في منصة حقق
                            </div>
                            <span class="text-muted-color font-medium">
                                سجل دخولك للمتابعة
                            </span>
                        </div>

                        <div dir="rtl">
                            <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">البريد الالكتروني</label>
                            <input pInputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" [(ngModel)]="email" />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">كلمة المرور</label>
                            <p-password id="password1" [(ngModel)]="password" placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>
                            <p-button label="Sign In" styleClass="w-full" (click)="outputCredentialsLogin()"></p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login {
    email: string = '';

    password: string = '';

    checked: boolean = false;
    @Output() loginClicked: EventEmitter<any> = new EventEmitter<any>();

    outputCredentialsLogin() {
        this.loginClicked.emit({
            email: this.email,
            password: this.password
        });
    }
}
