export function formatTime(time:string) {
    if (!time) return ""
    time = time.slice(0, 10) + " " + time.slice(11, 16)
    return time
}
