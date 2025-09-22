import React from 'react'
import MoodCheck from './components/MoodCheck'
import Chatbot from './components/Chatbot'
import Dashboard from './components/Dashboard'


export default function App() {
return (
<div className="min-h-screen bg-gray-50 p-6">
<div className="max-w-4xl mx-auto space-y-6">
<header className="text-center">
<h1 className="text-3xl font-bold">StudentWellbeing</h1>
<p className="text-sm text-gray-600">Digital mental health & support for students</p>
</header>


<main className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-4">
<MoodCheck />
<Chatbot />
</div>
<div>
<Dashboard />
</div>
</main>


<footer className="text-center text-xs text-gray-500">
For demo only — not a replacement for professional support.
</footer>
</div>
</div>
)
}