import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function Dashboard() {
const [history, setHistory] = useState([])


useEffect(() => { fetchStats() }, [])


async function fetchStats() {
try {
const res = await axios.get('/api/stats')
setHistory(res.data.history || [])
} catch (e) { console.error(e) }
}


return (
<div className="p-4 bg-white rounded-xl shadow">
<h2 className="font-semibold">Dashboard</h2>
<p className="text-xs text-gray-500">Recent mood check-ins</p>
<ul className="mt-3 space-y-2 max-h-64 overflow-auto">
{history.length === 0 && <li className="text-sm text-gray-400">No data yet</li>}
{history.map((h, i) => (
<li key={i} className="flex justify-between items-center border p-2 rounded">
<div><strong>{h.mood}/5</strong><div className="text-xs text-gray-500">{new Date(h.time).toLocaleString()}</div></div>
<div className="text-sm text-gray-600">{h.note || '-'}</div>
</li>
))}
</ul>
</div>
)
}