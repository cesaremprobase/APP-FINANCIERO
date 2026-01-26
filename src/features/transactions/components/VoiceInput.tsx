'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';

interface VoiceInputProps {
    onResult: (text: string) => void;
    isListening?: boolean;
    onToggle?: (listening: boolean) => void;
}

export function VoiceInput({ onResult, isListening: externalIsListening, onToggle }: VoiceInputProps) {
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(true);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // @ts-ignore
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.lang = 'es-PE'; // Peruvian Spanish
                recognition.interimResults = false;

                recognition.onstart = () => {
                    handleStateChange(true);
                };

                recognition.onend = () => {
                    handleStateChange(false);
                };

                recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    console.log('Voice result:', transcript);
                    onResult(transcript);
                };

                recognitionRef.current = recognition;
            } else {
                setIsSupported(false);
            }
        }
    }, []);

    const handleStateChange = (listening: boolean) => {
        setIsListening(listening);
        if (onToggle) onToggle(listening);
    };

    const toggleListening = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            try {
                recognitionRef.current.start();
            } catch (error) {
                console.error('Speech recognition error:', error);
                // Sometimes it throws if already started, just ignore
            }
        }
    };

    if (!isSupported) {
        return null; // Don't show if not supported
    }

    return (
        <button
            type="button"
            onClick={toggleListening}
            className={`
                relative p-4 rounded-full transition-all duration-300
                ${isListening
                    ? 'bg-red-500 text-white shadow-lg scale-110 animate-pulse'
                    : 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:scale-105'
                }
            `}
            title="Presiona para hablar"
        >
            {isListening ? (
                <MicOff className="w-6 h-6" />
            ) : (
                <Mic className="w-6 h-6" />
            )}

            {/* Ripple Effect when listening */}
            {isListening && (
                <span className="absolute inset-0 rounded-full border-4 border-red-400 opacity-50 animate-ping"></span>
            )}
        </button>
    );
}
