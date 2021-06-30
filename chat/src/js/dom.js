function scrollToBottom() {
    setTimeout(() => {
        const bottomPos = document.getElementById('content').clientHeight;

        window.scrollTo({
            top: bottomPos,
            behavior: 'smooth'
        });
    }, 0);
}

export {
    scrollToBottom
};