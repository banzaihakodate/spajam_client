export function calcDistance360(n, m) {
    const half = 180
    const all = 360
    const dist = Math.abs(m-n)
    if (dist > half) {
        return all-dist
    }
    return dist
}