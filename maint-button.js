// Close maintenance notice box with persistence
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('#maint-notice .close-btn');
    
    // Restore hidden state from localStorage on page load
    if (localStorage.getItem('maintNoticeHidden') === 'true') {
        const maintNotice = document.getElementById('maint-notice');
        if (maintNotice) {
            maintNotice.classList.add('hidden');
        }
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            // Hide the maint-notice section when close button is clicked
            const maintNotice = document.getElementById('maint-notice');
            if (maintNotice) {
                maintNotice.classList.add('hidden');
                localStorage.setItem('maintNoticeHidden', 'true');
                console.log("Box closed");
            }
        });
    }
});

function restoreMessage() {
    localStorage.clear();
    setTimeout(function() { window.location.reload(); }, 250);
    window.scrollTo(0,0);
}