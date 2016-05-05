var keyMirror = require('fbjs/lib/keyMirror');

// とりあえずイベントはdispatcherとstoreで使うので定数化
// store→component感も同じようにしちゃダメなんだろうか・・・　
module.exports = keyMirror({
  ADD_TODO:null,
  REMOVE_TODO:null
})
