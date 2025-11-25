const routes = {
  auth: '/auth',
  dashboard: '/dashboard',
  quiz: {
    new: '/quiz/new',
    view: (slug: string) => `/quiz/${slug}`,
    edit: (slug: string) => `/quiz/${slug}/edit`,
    answer: (slug: string) => `/quiz/${slug}/answer`,
  },
};

const publicRoutes = ['/quiz/[slug]/answer'];

export { publicRoutes };
export default routes;
