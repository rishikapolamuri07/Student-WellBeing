const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { addCheckin, getHistory } = require('./dataStore')


const app = express()
app.use(cors())
app.use(bodyParser.json())


// record a mood check-in
app.post('/api/checkin', (req, res) => {
const { mood, note } = req.body
if (!mood) return res.status(400).send({ error: 'mood required' })
const rec = { mood, note: note || '', time: new Date().toISOString() }
addCheckin(rec)
// simple triage rule: if mood <=2, respond with escalation suggestion
if (mood <= 2) {
return res.send({ status: 'ok', escalate: true, message: 'We recommend contacting support.' })
}
res.send({ status: 'ok' })
})


// simple chat endpoint — replace with call to an LLM or rule engine if you want
app.post('/api/chat', (req, res) => {
const { message } = req.body
if (!message) return res.status(400).send({ error: 'message required' })


// quick, safe rule-based responses for demo
const lowKeywords = ['sad', 'depressed', 'hopeless', 'suicidal']
const found = lowKeywords.find(k => message.toLowerCase().includes(k))
if (found) return res.send({ reply: "I'm sorry you're feeling that way. If you're in immediate danger, please contact local emergency services. Would you like resources or to connect to a counselor?" })


// otherwise echo + simple coping tip
const tips = [
'Try a 5-minute breathing exercise: inhale 4s, hold 4s, exhale 6s.',
'A short walk or stretching can reset your mood.',
'Talk to a trusted friend — sharing helps.'
]
const reply = `I hear you. ${tips[Math.floor(Math.random()*tips.length)]}`
res.send({ reply })
})


// stats endpoint
app.get('/api/stats', (req, res) => {
const history = getHistory()
res.send({ history })
})


const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Backend running on ${port}`))