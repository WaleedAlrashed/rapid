import './index.styl'
import lodash from 'lodash'
import api from './api'

/* eslint-disable no-console */
console.log('Rapida UI')

api.book.getAll()
  .then(data => console.log(data))
  .catch(error => console.log(error))

// enable hot module replacement plugin
if(module.hot) {
  module.hot.accept()
  const hotEmitter = require('webpack/hot/emitter')
  const DEAD_CSS_TIMEOUT = 2000

  hotEmitter.on('webpackHotUpdate', function(currentHash) {
    document.querySelectorAll('link[href][rel=stylesheet]').forEach(function(link) {
      const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
      const newLink = link.cloneNode()
      newLink.href = nextStyleHref

      link.parentNode.appendChild(newLink)
      setTimeout(function() {
        link.parentNode.removeChild(link)
      }, DEAD_CSS_TIMEOUT)
    })
  })
}
