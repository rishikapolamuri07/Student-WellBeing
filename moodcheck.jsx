import React, { useState } from 'react'
import axios from 'axios'


const EMOJIS = [
{ label: 'Terrible', emoji: '😢', value: 1 },
{ label: 'Bad', emoji: '😟', value: 2 },
{ label: 'Okay', emoji: '😐', value: 3 },
{ label: 'Good', emoji: '🙂', value: 4 },
{ label: 'Great', emoji: '😄', value: 5 }
]


export default function MoodCheck() {
const [selected, setSelected] = useState(null)
const [note, setNote] = useState('')
const [status, setStatus] = useState('')


async function submit() {
if (!selected) return setStatus('Please select a mood')
setStatus('Saving...')
try {
await axios.post('/api/checkin', { mood: selected, note })
setStatus('Saved ✓')
setSelected(null)
setNote('')
} catch (e) {
setStatus('Error saving')
}
}


return (
<div className="p-4 bg-white rounded-xl shadow">
<h2 className="font-semibold">Mood check-in</h2>
<div className="mt-3 flex gap-2">
{EMOJIS.map(e => (
<button
key={e.value}
onClick={() => setSelected(e.value)}
className={`p-3 rounded-lg text-xl border ${selected === e.value ? 'border-indigo-500' : 'border-transparent'}`}>
<div>{e.emoji}</div>
<div className="text-xs">{e.label}</div>
</button>
))}
</div>
<textarea
placeholder="Add a short note (optional)"
value={note}
onChange={e => setNote(e.target.value)}
className="w-full mt-3 p-2 rounded border"
/>


<div className="mt-3 flex items-center justify-between">
<div className="text-sm text-gray-500">{status}</div>
<div className="flex gap-2">
<a href={process.env.REACT_APP_ESCALATE_URL || '#'} target="_blank" rel="noreferrer" className="px-3 py-1 rounded bg-red-100 text-red-700 text-sm">Escalate</a>
<button onClick={submit} className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Submit</button>
</div>
</div>
</div>
)
}