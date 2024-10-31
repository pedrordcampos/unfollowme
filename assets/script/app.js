document.addEventListener('DOMContentLoaded', function() {
    const listAllButton = document.querySelector('.listAll');
    const usernameInput = document.getElementById('username');

    listAllButton.addEventListener('click', async function() {
        const username = usernameInput.value.trim(); 
        if (!username) {
            alert("Please enter a valid username.");
            return;
        }

        try {
            // Get the users you are following
            const followingResponse = await fetch(`https://api.github.com/users/${username}/following`);
            if (!followingResponse.ok) {
                throw new Error("Error fetching following list.");
            }
            const following = await followingResponse.json();

            // Get the users who follow you
            const followersResponse = await fetch(`https://api.github.com/users/${username}/followers`);
            if (!followersResponse.ok) {
                throw new Error("Error fetching followers list.");
            }
            const followers = await followersResponse.json();

            // Filter the following list to find users that do not follow you back
            const notFollowedBack = following.filter(user => 
                !followers.some(follower => follower.login === user.login)
            );

            // Store the list in localStorage
            localStorage.setItem('notFollowedBack', JSON.stringify(notFollowedBack));

            // Redirect to the new page
            window.location.href = 'followers.html';
        } catch (error) {
            console.error("Error:", error);
            alert("Could not fetch the data.");
        }
    });
});
