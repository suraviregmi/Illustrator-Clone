let dropdown = document.getElementsByClassName("dropdown-btn");
let i;
for (let j = 0; j < dropdown.length; j++) {
    dropdown[j].addEventListener("click", function() {
        for (i = 0; i < dropdown.length; i++) {
            this.classList.toggle("active");
            let dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        }
    });
}