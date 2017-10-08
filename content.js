var frame = false; // Переменная для хранения фрейма

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) { // Ловим сообщения
    if (msg.action == "stop") { // Если сказали остановить видео
        frame.outerHTML = frame = ""; // то удаляем фрейм
    } else if (msg.action == "start") { // если запустить
        frame = document.createElement("iframe"); // Создаем фрейм
        frame.src = chrome.runtime.getURL("videoFrame.html#" + msg.streamSrc); // передаем ссылку после #
        Object.assign(frame.style, { // стили
            position: "fixed",
            bottom: "32px",
            left: "32px",
            width: msg.width + "px",
            height: msg.height + "px",
            background: "#000",
            border: "0px",
            zIndex: 200000,
            boxShadow: "1px 2px 5px 0px rgba(0,0,0,.2)"
        });
        document.body.appendChild(frame); // добавляем в тело страницы
    }
    sendResponse(1); // Отправляем ответ
});
