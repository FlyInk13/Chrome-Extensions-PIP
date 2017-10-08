var frame = false;

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == "stop") {
        frame.outerHTML = frame = "";
    } else if (msg.action == "start") {
        frame = document.createElement("iframe");
        frame.src = chrome.runtime.getURL("videoFrame.html" + "#" + msg.streamSrc);
        Object.assign(frame.style, {
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
        document.body.appendChild(frame);
    }
    sendResponse(1);
});
