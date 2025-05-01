// Expand textarea as user types
function expandTextarea() {
  const textarea = document.getElementById("post-content");
  if (textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }
}

// Toggle edit form visibility
function showEditForm(postId) {
  document.getElementById("edit-form-" + postId).classList.toggle("hidden");
  document.getElementById("post-content-" + postId).classList.toggle("hidden");
  document.getElementById("post-actions-" + postId).classList.toggle("hidden");
}

// Handle liking posts via AJAX
function handleLike(postId, likeButton) {
  // Prevent default link behavior
  event.preventDefault();
  likeButton.classList.add("like-button-animate");
  // Send AJAX request
  fetch(`/like/${postId}`, {
    method: "GET",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Update like count
        const likeCountElement = likeButton.querySelector("span");
        likeCountElement.textContent = data.likeCount;

        // Toggle heart icon and color
        const heartIcon = likeButton.querySelector("i");
        if (data.liked) {
          heartIcon.classList.remove("far");
          heartIcon.classList.add("fas");
          heartIcon.classList.remove("text-zinc-400");
          heartIcon.classList.add("text-red-500");
          likeButton.classList.add("text-red-500");
        } else {
          heartIcon.classList.remove("fas");
          heartIcon.classList.add("far");
          heartIcon.classList.remove("text-red-500");
          heartIcon.classList.add("text-zinc-400");
          likeButton.classList.remove("text-red-500");
        }
      }

      // Remove animation class after animation completes
      setTimeout(() => {
        likeButton.classList.remove("like-button-animate");
      }, 500);
    })
    .catch((error) => {
      console.error("Error:", error);
      likeButton.classList.remove("like-button-animate");
    });
}

// Initialize event listeners when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Setup textarea auto-expand
  const textarea = document.getElementById("post-content");
  if (textarea) {
    textarea.addEventListener("input", expandTextarea);
  }

  // Setup like buttons
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const postId = this.getAttribute("data-post-id");
      handleLike(postId, this);
    });
  });
});
