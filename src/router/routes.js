
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/chart',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', name: "chart", component: () => import('pages/chart.vue') },
    ]
  },
  {
    path: '/experiment/:experiment',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', name: "experiment", component: () => import('pages/Experiment.vue') },
    ]
  },
  {
    path: '/add-new-experiment',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', name: "add-new-experiment", component: () => import('pages/AddNewExperiment.vue') },
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
