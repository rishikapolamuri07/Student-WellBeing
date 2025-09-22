import React, { useState } from 'react'
import axios from 'axios'


export default function Chatbot() {
const [input, setInput] = useState('')
const [messages, setMessages] = useState([])


async function send() {
if (!input) return
const userMsg = { role: 'user', text: input }
setMessages(prev => [...prev, userMsg])
setInput('')
try {
const res = await axios.post('/api/chat', { message: input })
setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }])
} catch (e) {
setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, something went wrong.' }])
}
}


return (
<div className="p-4 bg-white rounded-xl shadow">
<h2 className="font-semibold">Support Chat</h2>
<div className="mt-3 h-48 overflow-auto border rounded p-2 bg-gray-50">
{messages.length === 0 && <div className="text-sm text-gray-400">Say hi — this bot provides coping tips and can escalate if needed.</div>}
{messages.map((m, i) => (
<div key={i} className={`my-1 text-sm ${m.role === 'user' ? 'text-right' : 'text-left'}`}><strong>{m.role === 'user' ? 'You' : 'Bot'}:</strong> {m.text}</div>
))}
</div>


<div className="mt-3 flex gap-2">
<input value={input} onChange={e => setInput(e.target.value)} className="flex-1 p-2 rounded border" placeholder="Type how you're feeling" />
<button onClick={send} className="px-3 py-1 rounded bg-indigo-600 text-white">Send</button>
</div>
</div>
)
}