const storageName = 'gameRecords'

export function loadRecords() {
  return JSON.parse(localStorage.getItem(storageName)) || []
}

export function addRecord(record) {
  const records = loadRecords()

  records.push(record)
  localStorage.setItem(storageName, JSON.stringify(records))
}

export function clearRecords() {
  localStorage.removeItem(storageName)
}
