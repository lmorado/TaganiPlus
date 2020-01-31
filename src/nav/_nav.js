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
      id: 'Equipments',
      url: '/equipments',
      icon: 'icon-rocket',
      children: [
        {
          name: 'Manage Equipments',
          url: '/equipments/list',
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
      children: [
        {
          name: 'Test Route 2 Ch1',
          url: '/drinks/create',
          icon: 'icon-puzzle',
        },
        {
          name: 'Test Route 2 Ch2',
          url: '/drinks/list',
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
