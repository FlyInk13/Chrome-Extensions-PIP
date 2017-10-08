var activeStream = false, // Переменная для хранения трансляций с вкладок
    inTab = false,
    activeTab = false;

chrome.browserAction.onClicked.addListener(function(tab) {
    if (inTab) {
        activeStream.getTracks().map(function(track) {
            track.stop();
        });
        chrome.tabs.sendMessage(inTab.id, {
            action: "stop"
        }, function() {
            inTab = false;
            activeStream = false;
            chrome.browserAction.setIcon({path: "icon.png"});
        });
    } else if (activeStream) {
        return chrome.tabs.sendMessage(tab.id, {
            action: "start",
            streamSrc: URL.createObjectURL(activeStream),
            width: 480,
            height: ~~(activeTab.height / activeTab.width * 480)
        }, function() {
            inTab = tab;
            chrome.browserAction.setIcon({path: "iconInTab.png"});
        });
    } else {
        chrome.tabCapture.capture({ // Захватываем вкладку
            audio: false, // аудио трогаем
            video: true, // видео нет
            videoConstraints: {
                mandatory: {
                    minWidth: 480,
                    maxWidth: 480
                }
            }
        }, function(stream) { // callback с захватом
            activeStream = stream;
            activeTab = tab;
            chrome.browserAction.setIcon({path: "icon2tab.png"});
        });
    }
});
