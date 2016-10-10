(function () {
  hljs.initHighlightingOnLoad();

  // setup code blocks

  function exampleClickHandler (toggle, block) {
    return function () {
      var isHidden = block.style.display === 'none';
      var nextDisplay = isHidden ? null : 'none';
      var nextMessage = isHidden ? 'Hide Example' : 'Show Example';

      block.style.display = nextDisplay;
      toggle.innerHTML = nextMessage;
    };
  }

  var toggleButtons = document.getElementsByClassName('Button--exampleToggle');

  for (var i = 0, len = toggleButtons.length; i < len; i += 1) {
    var element = toggleButtons[i]
    var block = element.nextElementSibling;
    var handler = exampleClickHandler(element, block);

    block.style.display = 'none';

    element.onclick = handler;
  }

})();
