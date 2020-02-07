export default {
  items: [
    {
      name: 'Dashboard',
      url: '/main',
      id: 'Drinks',
      icon: 'icon-cup',
      value: 'Drksz',
    },
    {
      name: 'Inputs',
      id: 'Inputs',
      url: '/inputs',
      icon: 'icon-rocket',
      value: 'inputs',
      children: [
        {
          name: 'Manage Inputs',
          url: '/inputs/list',
          icon: 'icon-list',
        },
        {
          name: 'Growing Media',
          url: '/inputs/media',
          icon: 'icon-list',
        },
        {
          name: 'Fertilizer',
          url: '/inputs/fertilizer',
          icon: 'icon-list',
        },
        {
          name: 'Seeds',
          url: '/inputs/seeds',
          icon: 'icon-list',
        }
      ],
    },

    {
      name: 'Crops',
      id: 'Tr2',
      url: '/drinks',
      icon: 'icon-cursor',
      value: 'drinks',
    },
    {
      name: 'Finance',
      id: 'activities',
      url: '/activities',
      icon: 'icon-camrecorder',
      value: 'activities',
    },
    {
      name: 'Reports',
      id: 'reports',
      url: '/reports',
      icon: 'icon-paper-clip',
      value: 'reports',
      children: [
        {
          name: 'Income Summary',
          url: '/reports/income',
          icon: 'fa fa-money',
        },
        {
          name: 'Expense Summary',
          url: '/reports/expense',
          icon: 'fa fa-shopping-cart',
        }
      ],
    },
  ]
};
