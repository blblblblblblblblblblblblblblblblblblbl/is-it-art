document.getElementById("image-upload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    
    // Check file size (in bytes), limit to 5MB (5 * 1024 * 1024 bytes)
    const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit
    if (file.size > fileSizeLimit) {
        alert("File is too large! Please upload an image smaller than 5MB.");
        return; // Stop further processing if file is too big
    }

    // Clear previous results, loading bar, and buttons when a new image is uploaded
    document.getElementById("result-text").style.display = "none";
    document.getElementById("loading-bar").style.display = "none";

    // Continue with normal processing if file size is okay
    const reader = new FileReader();
    reader.onload = function(e) {
        const uploadedImage = document.getElementById("uploaded-image");
        uploadedImage.src = e.target.result;
        uploadedImage.style.display = "block";
        
        // Show the "Judge" button after the image is uploaded
        const judgeBtn = document.getElementById("judge-btn");
        judgeBtn.style.display = "block";
    };
    reader.readAsDataURL(file);
});

// Judge button click event to start the judging process
document.getElementById("judge-btn").addEventListener("click", function() {
    const uploadedImage = document.getElementById("uploaded-image");

    // Set loading bar width to the width of the uploaded image
    const loadingBar = document.getElementById("loading-bar");
    loadingBar.style.width = `${uploadedImage.width}px`;  // Set loading bar width relative to image width
    loadingBar.style.display = "block";  // Show loading bar

    let loadingProgress = 0;
    const interval = setInterval(function() {
        loadingProgress += 10;
        loadingBar.firstElementChild.style.width = loadingProgress + "%";
        if (loadingProgress >= 100) {
            clearInterval(interval);
            loadingBar.style.display = "none";  // Hide loading bar after completion
            generateArtJudgment();  // Call the function to generate judgment
        }
    }, 200);
});

function generateArtJudgment() {
    // Generate a random percentage
    const percentage = Math.floor(Math.random() * 100);

    // Define negative and positive comments
    const negativeComments = [
        "Looks like a half-million-dollar screensaver",
        "Your work has the essence of cheapness",
        "The sense of this art piece has not revealed itself to me.",
        "I strongly feel that this is an insult to life itself",
        "This is the opposite of art."
    ];

    const positiveComments = [
        "Oh my, what a spectacle to behold.",
        "The complexity and depth of this go far beyond visual aesthetics",
        "This is the best screensaver I've ever seen",
        "I wish I could art like you.",
        "it’s so cheery and modern-looking what’s not to enjoy?"
    ];

    // Select the comment based on the percentage
    let randomComment;
    if (percentage < 50) {
        randomComment = negativeComments[Math.floor(Math.random() * negativeComments.length)];
    } else {
        randomComment = positiveComments[Math.floor(Math.random() * positiveComments.length)];
    }
    
    // Update the result text with the percentage and comment
    const resultText = document.getElementById("result-text");
    resultText.textContent = `${percentage}% art: ${randomComment}`;
    resultText.style.display = "block";
    
    // Set the width of the result text to match the width of the uploaded image
    resultText.style.width = `${document.getElementById("uploaded-image").width}px`;

    // Show judgment result after it is generated
    const judgeBtn = document.getElementById("judge-btn");
    judgeBtn.style.display = "block";
}
