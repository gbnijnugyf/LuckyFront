"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = void 0;
function formatTime(time) {
    if (!time)
        return "";
    time = time.slice(0, 10) + " " + time.slice(11, 16);
    return time;
}
exports.formatTime = formatTime;
