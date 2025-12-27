let previewBox = document.createElement('div');
previewBox.id = 'wiki-preview-overlay';
document.body.appendChild(previewBox);

document.addEventListener('mouseover', async (e) => {
    const link = e.target.closest('a');
    if (!link || !link.href.includes('eldenring.wiki.fextralife.com')) return;

    previewBox.style.display = 'block';
    previewBox.innerHTML = 'Loading preview...';

    // Request the page content from background.js
    chrome.runtime.sendMessage({action: "fetchPage", url: link.href}, (response) => {
        if (response && response.html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(response.html, 'text/html');
            const infobox = doc.querySelector('#infobox');
            
            if (infobox) {
                previewBox.innerHTML = infobox.innerHTML;
            } else {
                previewBox.innerHTML = 'No infobox found.';
            }
        }
    });
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a')) {
        previewBox.style.display = 'none';
    }
});