export function formatTime(time) {
    time = time.slice(0, time.length - 4)
    time = time.replace("T", " ")
    return time
}