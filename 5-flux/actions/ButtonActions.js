var AppDispatcher = require('../dispatcher/AppDispatcher');

var ButtonActions = {

  addNewItem: function (text) {
    AppDispatcher.dispatch({
      actionType: 'ADD_NEW_ITEM',
      text: text
    });
  },
  deleItem: function(){
    AppDispatcher.dispatch({
      actionType: 'DeleItem'
    });
  }

};

module.exports = ButtonActions;
