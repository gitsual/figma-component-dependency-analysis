module.exports = {
  mySidebar: [
    {
      type: 'doc',
      id: 'introduction',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'API',
      items: ['api/figma-service'],
    },
    {
      type: 'category',
      label: 'Components',
      items: [
        'components/analyze-components',
        'components/component-appearance-analyzer',
        'components/component-hierarchy-analyzer',
        'components/component-report-generator',
      ],
    },
  ],
};