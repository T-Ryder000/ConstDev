const modal = () => {
  const modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // Get the link inside the modal
  const link = document.getElementById("goWebSite");

  // Open the modal and set the link href
  document.querySelectorAll('.movie_carousel_link').forEach(linkElement => {
    linkElement.addEventListener('click', (event) => {
      // Prevent default link behavior
      event.preventDefault();

      // Get href from the clicked link
      const linkHref = linkElement.getAttribute('href');

      // Update the modal link href
      link.href = linkHref;

      // Show the modal
      modal.classList.add('show');
    });
  });

  // Close the modal when <span> (x) is clicked
  span.onclick = function() {
    modal.classList.remove('show');
  }

  // Close the modal when clicking anywhere outside of the modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.classList.remove('show');
    }
  }
};

export default modal;
