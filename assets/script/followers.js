document.addEventListener('DOMContentLoaded', function() {
    const followersList = document.querySelector('.followers-list');
    const notFollowedBack = JSON.parse(localStorage.getItem('notFollowedBack'));
    const errorMessage = document.getElementById('error-message');

    // If no one doesn't follow back
    if (!notFollowedBack || notFollowedBack.length === 0) {
        errorMessage.textContent = "All of your followers follow you back!";
        errorMessage.style.color = 'green'; // Optional: Change the color of the message
        return;
    }

    // Sort users alphabetically by their username
    notFollowedBack.sort((a, b) => a.login.localeCompare(b.login));

    // Fetch user details (including avatar) for each user who doesn't follow back
    notFollowedBack.forEach(async (user) => {
        try {
            const userResponse = await fetch(`https://api.github.com/users/${user.login}`);
            if (!userResponse.ok) {
                throw new Error("Error fetching user data.");
            }
            const userData = await userResponse.json();

            // Create list item with avatar and username
            const listItem = document.createElement('li');
            listItem.classList.add('follower-item');

            const avatar = document.createElement('img');
            avatar.src = userData.avatar_url; // Avatar URL
            avatar.alt = `${userData.login}'s avatar`;
            avatar.classList.add('avatar');

            const userName = document.createElement('span');
            userName.textContent = userData.login;

            listItem.appendChild(avatar);
            listItem.appendChild(userName);

            followersList.appendChild(listItem);
        } catch (error) {
            console.error("Error:", error);
        }
    });

    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', () => {
        window.history.back(); 
    });
});
