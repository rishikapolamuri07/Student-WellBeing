// super-simple in-memory store for demo only
const history = []
module.exports = {
addCheckin: (record) => { history.unshift(record); if (history.length > 200) history.pop() },
getHistory: () => history
}