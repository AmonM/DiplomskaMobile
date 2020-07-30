
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'temperature', component: () => import('pages/Temperature.vue') },
      { path: 'humidity', component: () => import('pages/Humidity.vue') }
    ]
  },
  {
    path: '/experiment/:experiment',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', name: "experiment", component: () => import('pages/Experiment.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
