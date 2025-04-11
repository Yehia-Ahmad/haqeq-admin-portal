import { Routes } from '@angular/router';
import { authGuard } from './app/core/guards/auth.guard';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'blogs/all-blogs' },
    {
        path: 'login',
        loadComponent: () => import('./app/modules/auth/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'blogs/all-blogs',
        canActivate: [authGuard],
        loadComponent: () => import('./app/modules/blog/components/all-blog/all-blog.component').then((m) => m.AllBlogComponent),
    },
    {
        path: 'blogs/add-blog',
        canActivate: [authGuard],
        loadComponent: () => import('./app/modules/blog/components/add-blog/add-blog.component').then((m) => m.AddBlogComponent),
    },
    {
        path: 'blogs/add-blog/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./app/modules/blog/components/add-blog/add-blog.component').then((m) => m.AddBlogComponent),
    },
    {
        path: 'initiatives/all-initiatives',
        canActivate: [authGuard],
        loadComponent: () => import('./app/modules/initiatives/components/all-initiatives/all-initiatives.component').then((m) => m.AllInitiativesComponent),
    },
    {
        path: 'initiatives/add-initiative',
        canActivate: [authGuard],
        loadComponent: () => import('./app/modules/initiatives/components/add-initiatives/add-initiatives.component').then((m) => m.AddInitiativesComponent),
    },
    {
        path: 'initiatives/add-initiative/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./app/modules/initiatives/components/add-initiatives/add-initiatives.component').then((m) => m.AddInitiativesComponent),
    },
    {
        path: '**',
        loadComponent: () => import('./app/modules/auth/login/login.component').then((m) => m.LoginComponent),
    }
];

// export const appRoutes: Routes = [
//     {
//         path: '',
//         component: AppLayout,
//         children: [
//             { path: '', component: Dashboard },
//             { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
//             { path: 'documentation', component: Documentation },
//             { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
//         ]
//     },
//     { path: 'landing', component: Landing },
//     { path: 'notfound', component: Notfound },
//     { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
//     { path: '**', redirectTo: '/notfound' }
// ];
