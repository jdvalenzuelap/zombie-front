import config from '../config/keys'

const API_BASE_URL = config.apiUrl

const defaultHeaders = (url) => {
  let headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  let token
  if (getToken()) {
    token = getToken()
  }
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    }
  }
  return headers
}

const fetchBase = async ({
  url = '',
  type = 'GET',
  body = null,
  headers = {},
  isUpload = false,
}) => {
  try {
    const mergeHeaders = { ...defaultHeaders(url), ...headers }
    const args = { method: type, headers: mergeHeaders }

    if (body && !isUpload) {
      args.body = JSON.stringify(body)
    }

    if (body && isUpload) {
      // if uploading, do not send content-type header
      // https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
      delete args.headers['Content-Type']
      args.body = body
    }

    const res = await fetch(`${API_BASE_URL}/${url}`, args)
    const status = res.status
    const text = await res.text()
    const data = text ? JSON.parse(text) : {}

    if (![200, 201].includes(status)) {
      if (data.errors) {
        throw data.errors
      }
      throw data.error
    }

    return data
  } catch (e) {
    console.log(e)
    // throw parseRemoteError(e)
  }
}

export default fetchBase