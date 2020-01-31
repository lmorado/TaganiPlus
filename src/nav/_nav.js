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
      value: 'Drksz',
    },

    {
      name: 'Crops',
      id: 'Tr2',
      url: '/drinks',
      icon: 'icon-cursor',
      value: 'tr-2',
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
    },
  ]
};
