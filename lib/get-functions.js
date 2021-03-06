const fetch = require('./fetch')

// See: https://stackoverflow.com/questions/44295240/azure-arm-rest-api-for-manipulating-azure-functions

const apiVersion = '2016-08-01'

module.exports = ({ token, subscription, resourceGroup, functionSlot, functionApp }) => {

  const functionAppUrl = 'https://management.azure.com:443' +
    '/subscriptions/' + subscription +
    '/resourceGroups/' + resourceGroup +
    '/providers/Microsoft.Web/sites/' + functionApp

  const functionsUrl = !functionSlot
    ? functionAppUrl +
      '/functions'
    : functionAppUrl +
      '/slots/' + functionSlot +
      '/functions'

  const url = functionsUrl +
    '?api-version=' + apiVersion

  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(body => body.value)
}