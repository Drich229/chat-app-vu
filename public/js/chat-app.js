
var modal = document.getElementById("contactAddModal");

var btns = document.querySelectorAll('.contact_list-item_add_icon');

var span = document.getElementsByClassName("close")[0];


btns.forEach(function(btn) {
  btn.onclick = function() {
    modal.style.display = "block";
  }
});


span.onclick = function() {
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById("confirmAdd").onclick = function() {
  modal.style.display = "none";
}

document.getElementById("cancelAdd").onclick = function() {
  modal.style.display = "none";
}
