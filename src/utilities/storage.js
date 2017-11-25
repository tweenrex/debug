export function load(prefix, key) {
    var data = localStorage.getItem(prefix + '.' + key)
    if (data) {
        try {
            return JSON.parse(data)
        } catch (err) {
            console.error(err + ' while deserializing position of ' + key)
        }
    }
    return undefined
}

export function save(prefix, key, value) {
    localStorage.setItem(prefix + '.' + key, JSON.stringify(value))
}
