export const navBarListItems = [
    {
        icon: 'mdi-view-dashboard',
        title: 'Dashboard',
        to: '/layout/dashboard'
      },
      {
        icon: 'mdi-alpha-p-box',
        group: 'group1',
        items: [
          { title: 'Item 1.1', items: [ { title: 'Item 1.1.1', to: '/layout/dashboard'}] },
          { title: 'Item 1.2'},
          { title: 'Item 1.3'}
        ],
        title: 'Item 1',
      },
      {
        icon: 'mdi-alpha-n-box',
        group: 'group2',
        items: [
            { title: 'Item 2.1'},
            { title: 'Item 2.2'},
            { title: 'Item 2.3'},
        ],
        title: 'Item 2',
    },  
    {
        icon: 'mdi-alpha-z-box',
        group: 'group3',
        items: [
            { title: 'Item 3.1' },
            { title: 'Item 3.2'},
        ],
        title: 'Item 3',
    },
    {
      title: 'Users',
      icon: 'mdi-account-group',
      group: 'users',
      items: [
        { title: 'User Table', to: '/layout/users/'},
        { title: 'User Create', to: '/layout/users/create'}
      ]

    },
    {
      title: 'About',
      icon: 'mdi-information',
      to: '/layout/about'
    }  
]