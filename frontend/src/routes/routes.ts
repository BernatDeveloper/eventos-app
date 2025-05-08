export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  profile: "/profile",

  admin: {
    dashboard: "/admin/dashboard",
    users: "/admin/users",
    events: "/admin/events",
    categories: "/admin/categories"
  },

  event: "/event/:id",
  notification: "/notification",
  participant: "/event/:eventId/participants",
  createEvent: "/create-event",

  notFound: "*"
};
