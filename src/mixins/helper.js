import { format, getYear, parseISO } from 'date-fns';
import { currentYear } from '@/utils/date';

const mixin = {
  computed: {
    pathDocs() {
      return `${process.env.VUE_APP_API_DOCS_URI}`;
    },
    defaultAvatar() {
      return '/images/default-avatar.png';
    },
  },
  methods: {
    imgPath(img) {
      if (img) return `${this.pathDocs}${img}`;
      return this.defaultAvatar;
    },
    formatDate(date) {
      if (date) {
        const dateParsed = parseISO(date);
        const year = getYear(dateParsed);
        if (year === currentYear()) {
          return format(dateParsed, 'dd MMMM');
        }
        return format(dateParsed, 'dd MMMM yyyy');
      }
      return null;
    },
  },
  formatDatetime(datetime) {
    if (datetime) {
      const dateParsed = parseISO(datetime);
      const year = getYear(dateParsed);
      if (year === currentYear()) {
        return format(dateParsed, 'dd MMMM HH:mm');
      }
      return format(dateParsed, 'dd MMMM yyyy HH:mm');
    }
    return null;
  },
};

export default mixin;
