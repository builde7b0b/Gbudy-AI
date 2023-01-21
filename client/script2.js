import React, { useState } from 'react';

const Chatbot = () => {
    const [text, setText] = useState('');
    const [voiceInput, setVoiceInput] = useState('');

    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window)) {
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            let result = event.results[event.resultIndex];
            if (result.isFinal) {
                setVoiceInput(result[0].transcript);
            }
        }
        recognition.start();
    }

    const handleTextInput = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = () => {
        // Send the text input to the chatbot server-side logic
        // ...
    }

    const handleVoiceOutput = (text) => {
        if (!('speechSynthesis' in window)) {
            return;
        }
        const msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
    }

    return (
        <div>
            <div>
                <button onClick={handleVoiceInput}>Voice Input</button>
                <input type="text" value={text} onChange={handleTextInput} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div>
                <button onClick={() => handleVoiceOutput(voiceInput)}>Voice Output</button>
            </div>
        </div>
    );
};

export default Chatbot;