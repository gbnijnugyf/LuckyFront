export function formatTime(time) {
    if (!time) return ""
    time = time.slice(0, 10) + " " + time.slice(11, 16)
    return time
}
