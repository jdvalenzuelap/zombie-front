import fetchBase from './util/fetch'

export const getPersons = async () => {
    try {
      return await fetchBase({
        url: `/`,
      })
    } catch (err) {
      console.error(err)
      throw err
    }
  }
