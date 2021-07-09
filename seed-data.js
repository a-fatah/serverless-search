import { MeiliSearch } from 'meilisearch'

export const seedSearchIndex = async (response) => {
  const data = response.results.map(({ id, login, ...rest }) => ({
    ...rest,
    objectID: Math.random().toString(36).replace('0.','person_'),
  }))

  console.log(data);

  try {
    // Create a search client
    console.log('host', process.env.NEXT_PUBLIC_SEARCH_URL);
    const client = new MeiliSearch({
      host: String(process.env.NEXT_PUBLIC_SEARCH_URL),
    })

    // An index is where the documents are stored.
    const index = await client.getOrCreateIndex('people')

    const settings = await index.getSettings()

    await index.updateSettings({
      ...settings,
      // New blogs first
      rankingRules: [
        ...settings.rankingRules,
      ],
      // Synonyms are great when items have a shared meaning
      // We will filter on the tags I use in my blogs
      attributesForFaceting: ['tags']
    })

    // Add the posts to the blogs index
    console.log('indexing....', data.length);
    const response = await index.addDocuments(data)

    
    console.info('Completed indexing', response)
  } catch(e) {
    console.warn('No connection found to build index', e);
  }
}