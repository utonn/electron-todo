var keyMirror = require('fbjs/lib/keyMirror');

// とりあえずイベントはdispatcherとstoreで使うので定数化
// store→component感も同じようにしちゃダメなんだろうか・・・　
module.exports = keyMirror({
  ADD_TODO:null,
  REMOVE_TODO:null,
  REORDER_TODO:null,
  ADD_CATEGORY:null,
  REMOVE_CATEGORY:null,
  REORDER_CATEGORY:null
})
