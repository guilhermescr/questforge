const routes = {
  auth: '/auth',
  dashboard: '/dashboard',
  quiz: {
    new: '/quiz/new',
    view: (slug: string) => `/quiz/${slug}`,
    edit: (slug: string) => `/quiz/${slug}/edit`,
  },
};

export default routes;
