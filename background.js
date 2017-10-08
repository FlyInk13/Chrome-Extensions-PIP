var activeStream = false, // Стрим
    inTab = false, // Конечная вкладка
    sourceTab = false; // Вкладка источника

chrome.browserAction.onClicked.addListener(function(tab) { // Ловим клик на иконку расширения
    if (inTab) { // Если конечная вкладка назначена
        activeStream.getTracks().map(function(track) { // Получаем все треки стрима
            track.stop(); // останавливаем
        });
        chrome.tabs.sendMessage(inTab.id, { // Конечной вкладке посылаем сообщение
            action: "stop" // для выключения видео
        }, function() {
            inTab = false; // стераем данные о вкладках
            activeStream = false;
            sourceTab = false;
            chrome.browserAction.setIcon({path: "icon.png"}); // меняем иконку
        });
    } else if (activeStream) { // Если вкладка источника назначена
        return chrome.tabs.sendMessage(tab.id, { // Текущей вкладке посылаем сообщение
            action: "start", // для включения видео
            streamSrc: URL.createObjectURL(activeStream), // Отдаем ссылку на стрим
            width: 480, // ширина
            height: ~~(sourceTab.height / sourceTab.width * 480) // высота
        }, function() {
            inTab = tab; // Запоминаем конечную вкладка
            chrome.browserAction.setIcon({path: "iconInTab.png"}); // меняем иконку
        });
    } else {
        chrome.tabCapture.capture({ // Захватываем вкладку
            audio: false, // аудио не трогаем
            video: true, // видео трогаем
            videoConstraints: { // Параметры видео
                mandatory: {
                    minWidth: 480,
                    maxWidth: 480
                }
            }
        }, function(stream) { // callback с захватом
            activeStream = stream; // Запоминаем стрим
            sourceTab = tab; // Запоминаем вкладку источника
            chrome.browserAction.setIcon({path: "icon2tab.png"}); // меняем иконку
        });
    }
});
