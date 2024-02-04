function saveBookmark(tab) {
// 	browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
// 		let tab = tabs[0];
// 		let url = tab.url;
// 
// 		browser.tabs.create({
// 			url: "https://micro.blog/bookmarks?go=" + encodeURIComponent(url)
// 		});
// 	});
	
	let url= tab.url;
	chrome.tabs.create({
		url: "https://micro.blog/bookmarks?go=" + encodeURIComponent(url)
	});	
}

// browser.browserAction.onClicked.addListener(saveBookmark);

chrome.action.onClicked.addListener((tab) => {
	saveBookmark(tab);
});
