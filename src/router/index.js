import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import { findAll } from '@/utils/array-util';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes,
});

const guardPermission = (route, redirect, next) => {
  const pagePermissions = route.meta.permission || [];
  if (pagePermissions.length > 0) {
    const permissions = store.getters && store.getters['auth/getPermissions'];
    // const hasPermission = permissions.filter((p) => pagePermissions.includes(p.permission)).some((p) => p);
    const hasPermission = findAll(permissions, pagePermissions);
    if (!hasPermission) {
      next({ name: 'Forbidden' });
    } else {
      next();
    }
  } else {
    next();
  }
};

const guardRoute = (route, redirect, next) => {
  const { token, user } = store.state.auth;
  if (token) {
    if (user === null) {
      store.dispatch('auth/verify', { token: token.access_token }).then((response) => {
        if (response && response.status === 200) {
          guardPermission(route, redirect, next);
          return response;
        }
        return Promise.reject(response);
      }).catch(() => {
        store.dispatch('auth/logout');
        next({ path: '/auth/login/' });
      });
    } else {
      guardPermission(route, redirect, next);
    }
  } else {
    const redirectTo = { redirectTo: route.path };
    next({ name: 'Login', query: redirectTo });
  }
};

const guardRedirect = (route, redirect, next) => {
  if (route.matched.some((record) => record.meta.authPage)) {
    const { token } = store.state.auth;
    if (token) {
      next({ name: 'DocumentList' });
      return;
    }
  }
  next();
};

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    guardRoute(to, from, next);
  } else {
    guardRedirect(to, from, next);
  }
});

router.afterEach((to) => {
  document.title = `${to.meta.title} | ${process.env.VUE_APP_NAME}`;
});

export default router;
