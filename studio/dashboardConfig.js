export default {
  widgets: [
    // {
    //   name: 'sanity-tutorials',
    //   options: {
    //     templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
    //   }
    // },
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '626c19ebaedea03e3a8e91d7',
                  title: 'Sanity Studio',
                  name: '3-iq-frontend-studio',
                  apiId: '8438e4e4-2a93-4890-aa4f-3d72867d2d72'
                },
                {
                  buildHookId: '626c19ebb19f293c5050de46',
                  title: 'Landing pages Website',
                  name: '3-iq-frontend',
                  apiId: '7427063c-e3ca-44ca-85a5-9e642ecb20e1'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/mkhraisha/3IQ-Frontend',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://3-iq-frontend.netlify.app', category: 'apps' }
        ]
      }
    },
    {
      name: 'document-list',
      options: { title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page'] },
      layout: { width: 'medium' }
    },
    { name: 'project-users', layout: { height: 'auto' } }
  ]
}
