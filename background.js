// on toolbar click, inject content‐script into the active tab
chrome.action.onClicked.addListener(tab => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ['content-script.js']
	});
});

// listen for messages from content‐script
chrome.runtime.onMessage.addListener((msg, sender, completion_handler) => {
	if (msg.type == 'SAVE_BOOKMARK') {
		// store data in chrome.storage.local with a unique key
		const bookmark_key = 'bookmark_' + Date.now();
		chrome.storage.local.set({ [bookmark_key]: msg.data }, () => {
			const url = chrome.runtime.getURL('prompt.html') + '?key=' + bookmark_key;
			chrome.tabs.create({ url: url });
		});
		return;
	}
	else if (msg.type == 'CONFIRM_BOOKMARK') {
		const form = new FormData();
		form.append('bookmark-of', msg.data.url);
		form.append('bookmark-name', msg.data.title);
		form.append('bookmark-content', msg.data.html);

		// POST to Micro.blog
		fetch('https://micro.blog/micropub', {
			method: 'POST',
			body: form
		})
		.then(response => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			completion_handler({ success: true });
		})
		.catch(err => {
			console.error('Error saving bookmark:', err);
			completion_handler({ success: false, error: err.message });
		});
		
		// keep the channel open for the async handler
		return true;
	}
});