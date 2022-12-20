import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'w7ow2x7s',
  dataset: 'develop',
  apiVersion: '2022-01-31',
})

client.delete({ query: '*[!("92b5a3a9-030c-4456-aa0a-074b8b0fa509" in countries[]._ref)][0...999]' })
  .then(console.log)
  .catch(console.error)
