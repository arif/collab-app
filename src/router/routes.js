export default [
  {
    path: '/',
    redirect: { name: 'DocumentList' },
  },
  {
    path: '/test',
    component: () => import('@/layouts/default'),
    children: [
      {
        path: '',
        name: 'TestPage',
        component: () => import('@/pages/test'),
        meta: { title: 'Test Page' },
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('@/layouts/auth'),
    redirect: { name: 'Login' },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/auth/login'),
        meta: { title: 'Login', authPage: true },
      },
      {
        path: 'logout',
        name: 'Logout',
        component: () => import('@/pages/auth/logout'),
        meta: { title: 'Logout' },
      },
    ],
  },
  {
    path: '/documents',
    component: () => import('@/layouts/default'),
    redirect: { name: 'DocumentList' },
    children: [
      {
        path: '',
        name: 'DocumentList',
        component: () => import('@/pages/documents/list'),
        meta: { title: 'Document List', requiresAuth: true },
      },
      {
        path: 'edit/:documentId',
        name: 'DocumentEdit',
        component: () => import('@/pages/documents/edit'),
        meta: { title: 'Document Edit', requiresAuth: true },
      },
    ],
  },
];
