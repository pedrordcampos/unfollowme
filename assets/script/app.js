document.addEventListener('DOMContentLoaded', function() {
    const listAllButton = document.querySelector('.listAll');
    const usernameInput = document.getElementById('username');
    const tokenInput = document.getElementById('token');
    const errorMessage = document.getElementById('error-message');

    listAllButton.addEventListener('click', async function() {
        const username = usernameInput.value.trim();
        const token = tokenInput.value.trim();

        // Check if username is provided
        if (!username) {
            alert("Please enter a valid username.");
            return;
        }

        // If token is required, check if it is provided
        if (!token) {
            errorMessage.textContent = "Please enter your GitHub token for full access.";
            errorMessage.style.color = 'red';
            return;
        }

        try {
            // Fetching the users you are following
            const followingResponse = await fetch(`https://api.github.com/users/${username}/following`, {
                headers: {
                    Authorization: `token ${token}`  // Add token to the request header
                }
            });
            if (!followingResponse.ok) {
                throw new Error("Error fetching following list.");
            }
            const following = await followingResponse.json();

            // Fetching the users who follow you
            const followersResponse = await fetch(`https://api.github.com/users/${username}/followers`, {
                headers: {
                    Authorization: `token ${token}`  // Add token to the request header
                }
            });
            if (!followersResponse.ok) {
                throw new Error("Error fetching followers list.");
            }
            const followers = await followersResponse.json();

            // Filter the list to get users who don't follow back
            const notFollowedBack = following.filter(user => 
                !followers.some(follower => follower.login === user.login)
            );

            // Store the list in localStorage
            localStorage.setItem('notFollowedBack', JSON.stringify(notFollowedBack));

            // Redirect to the new page
            window.location.href = 'followers.html';
        } catch (error) {
            console.error("Error:", error);
            errorMessage.textContent = "Could not fetch the data. Please check the token or try again later.";
            errorMessage.style.color = 'red';
        }
    });
});
