function updateClock() {
  var today = new Date();
  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();

  // Saat formatını düzenle
  var ampm = (hr < 12) ? "AM" : "PM";
  hr = (hr % 12 === 0) ? 12 : hr % 12;
  hr = (hr < 10) ? "0" + hr : hr;
  min = (min < 10) ? "0" + min : min;
  sec = (sec < 10) ? "0" + sec : sec;

  // Saati ve tarihi HTML'e ekle
  document.getElementById("clock").innerHTML = hr + ":" + min + ":" + sec + " " + ampm;

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var curWeekDay = days[today.getDay()];
  var curDay = today.getDate();
  var curMonth = months[today.getMonth()];
  var curYear = today.getFullYear();
  var date = curWeekDay + ", " + curDay + " " + curMonth + " " + curYear;
  document.getElementById("date").innerHTML = date;
}

// Zamanı güncelle ve her 1 saniyede bir tekrarla
setInterval(updateClock, 1000);
// Sayfa yüklendiğinde zamanı bir kez göster
window.onload = updateClock;