function toggleMobileMenu() {
    var x = document.getElementById("mobileMenu");
    if (x.style.display === "flex") {
      x.style.display = "none";
    } else {
      x.style.display = "flex";
    }
  }