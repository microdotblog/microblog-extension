(() => {
	const message = {
		type: 'SAVE_BOOKMARK',
		data: {
			url: location.href,
			title: document.title,
			html: document.documentElement.outerHTML
		}
	};
	
	chrome.runtime.sendMessage(message, response => {
		if (response && response.success) {
			console.log('Bookmark saved successfully');
		}
		else {
			console.error('Failed to save bookmark', response && response.error);
		}
	});
})();