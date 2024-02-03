function saveBookmark() {
	browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		let tab = tabs[0];
		let url = tab.url;

		browser.tabs.create({
			url: "https://micro.blog/bookmarks?go=" + encodeURIComponent(url)
		});
	});		
}

browser.browserAction.onClicked.addListener(saveBookmark);
