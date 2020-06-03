var icon = document.getElementById('settings-icon');
var settings = document.getElementById('settings');

icon.addEventListener('click', function(){
  if (settings.classList.contains('show')) {
    settings.classList.remove('show')
  } else {
    settings.classList.add('show')
  }
})
