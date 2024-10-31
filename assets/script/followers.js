document.addEventListener('DOMContentLoaded', function() {
    const followersList = document.querySelector('.followers-list');
    const notFollowedBack = JSON.parse(localStorage.getItem('notFollowedBack'));

    if (notFollowedBack && notFollowedBack.length > 0) {
        notFollowedBack.sort((a, b) => a.login.localeCompare(b.login));

        notFollowedBack.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = formatUsername(user.login);
            followersList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = "all users follow you back!";
        followersList.appendChild(listItem);
    }

   
    const backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', () => {
        window.history.back(); 
    });

    function formatUsername(username) {
        return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
    }
});
