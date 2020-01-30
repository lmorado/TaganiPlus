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
          name: 'Basic Equipments',
          url: '/equipments/list',
          icon: 'icon-list',
        },
        {
          name: 'Manage Equipments',
          url: '/equipments/manage',
          icon: 'icon-puzzle',
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
