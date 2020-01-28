export default {
  items: [
    {
      name: 'Drinks',
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
      name: 'Test Route 2',
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
      name: 'Basic Equipments',
      id: 'equipments',
      url: '/equipments',
      icon: 'icon-puzzle',
      value: 'equipments',
    },
    {
      name: 'Activities',
      id: 'activities',
      url: '/activities',
      icon: 'icon-puzzle',
      value: 'activities',
    },
    {
      name: 'Financial Reports',
      id: 'reports',
      url: '/reports',
      icon: 'icon-puzzle',
      value: 'reports',
    },
  ]
};
