//simple javascript function for the serchbar uin the vizualization page
function init() {
    var input = document.getElementById("search-input");
    var link = document.getElementById("search-link");
  
    input.addEventListener("change", function() {
      link.href = "/vizualization?item=" + input.value;
    });
  }