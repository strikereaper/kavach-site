/** Build a link that works both on GitHub Pages (/repo-name/...) and on a custom domain (/...). */
export const u = (path = '') => import.meta.env.BASE_URL.replace(/\/?$/, '/') + path.replace(/^\//, '');
