import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

export default {
  install(app) {
    app.use(ToastPlugin, {
      position: 'top-right',
      duration: 5000,
    });
  },
};
