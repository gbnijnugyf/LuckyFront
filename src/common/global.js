export function formatTime(time) {
    if (!time) return ""
    time = time.slice(0, time.length - 9)
    time = time.replace("T", " ")
    return time
}