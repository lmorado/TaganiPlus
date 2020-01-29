export default {
  items: [
    {
      name: 'Dashboard',
      url: '/drinks',
      id: 'Drinks',
      icon: 'icon-cup',
      children: [
        {
          name: 'Create',
          url: '/drinks/create',
          icon: 'icon-pencil',
        },
        {
          name: 'Drinks',
          url: '/drinks/list',
          icon: 'icon-list',
        },
      ],
      value: 'Drksz',
    },

    {
      name: 'Inputs',
      id: 'Equipments',
      url: '/equipments',
      icon: 'icon-rocket',
      children: [
        {
          name: 'Basic Equipments',
          url: '/equipments/basic',
          icon: 'icon-cup',
        },
        {
          name: 'Manage Equipments',
          url: '/equipments/manage',
          icon: 'icon-list',
        },
      ],
      value: 'Drksz',
    },

    {
      name: 'Crops',
      id: 'Tr2',
      url: '/tr-2',
      icon: 'icon-cursor',
      value: 'tr-2',
      children: [
        {
          name: 'Test Route 2 Ch1',
          url: '/tr-2/a',
          icon: 'icon-puzzle',
        },
        {
          name: 'Test Route 2 Ch2',
          url: '/tr-2/b',
          icon: 'icon-puzzle',
        },
        {
          name: 'Test Route 2 Ch3',
          url: '/tr-2/c',
          icon: 'icon-puzzle',
        }
      ]
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
