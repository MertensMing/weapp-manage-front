function component() {
  var element = document.createElement('a');
  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  return element;
}

document.body.appendChild(component());
