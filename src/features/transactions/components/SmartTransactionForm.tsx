'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Card } from '@/shared/components/ui/Card';
import { VoiceInput } from './VoiceInput';
import { smartParser } from '../utils/smartParser';
import { financeService } from '@/features/finance/services/financeService';
import { ArrowRight, Wallet, TrendingUp, TrendingDown, Wand2, Calculator } from 'lucide-react';
import { Account } from '@/features/finance/types';

interface SmartTransactionFormProps {
    onSuccess: () => void;
    onCancel: () => void;
    accounts: Account[]; // Need accounts to select where money goes
}

export function SmartTransactionForm({ onSuccess, onCancel, accounts }: SmartTransactionFormProps) {
    const [textInput, setTextInput] = useState('');
    const [parsedData, setParsedData] = useState<any>(null);
    const [selectedAccount, setSelectedAccount] = useState<string>(accounts[0]?.id || '');
    const [loading, setLoading] = useState(false);

    // Auto-parse effects
    useEffect(() => {
        if (textInput.length > 3) {
            const result = smartParser(textInput);
            setParsedData(result);
        } else {
            setParsedData(null);
        }
    }, [textInput]);

    const handleVoiceResult = (text: string) => {
        setTextInput(text);
        // The effect will handle parsing
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!parsedData || !selectedAccount) return;

        setLoading(true);
        try {
            await financeService.createTransaction({
                account_id: selectedAccount,
                category_id: undefined, // We'll need to fetch categories properly later, for now we let backend/service handle or default
                amount: parsedData.amount,
                description: parsedData.description,
                type: parsedData.type,
                date: new Date().toISOString()
            });
            onSuccess();
        } catch (error) {
            console.error('Transaction fail:', error);
            alert('Error al registrar. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto p-6 bg-white shadow-2xl rounded-3xl relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none" />

            <div className="relative z-10">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-black text-gray-900 flex items-center justify-center gap-2">
                        <Wand2 className="w-6 h-6 text-indigo-500" />
                        Registro Mágico
                    </h2>
                    <p className="text-gray-500 text-sm">Habla o escribe, yo me encargo del resto.</p>
                </div>

                <div className="flex flex-col items-center gap-6 mb-8">
                    {/* Voice Input Button Centered */}
                    <div className="scale-125">
                        <VoiceInput onResult={handleVoiceResult} />
                    </div>

                    <div className="w-full relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                            <Calculator className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            placeholder='"Almuerzo 15 soles"'
                            className="w-full pl-10 pr-4 py-4 bg-gray-50 border-0 rounded-xl text-lg font-medium text-center text-gray-800 focus:ring-2 focus:ring-indigo-100 placeholder-gray-300 transition-all"
                            autoFocus
                        />
                    </div>
                </div>

                {/* Live Preview Card */}
                {parsedData && parsedData.amount > 0 && (
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl text-white shadow-lg mb-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Vista Previa</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${parsedData.type === 'income' ? 'bg-green-400/20 text-green-100' : 'bg-red-400/20 text-red-100'}`}>
                                {parsedData.type === 'income' ? 'Ingreso' : 'Gasto'}
                            </span>
                        </div>

                        <div className="flex items-baseline gap-1 mb-2">
                            <span className="text-lg opacity-80">S/</span>
                            <span className="text-4xl font-extrabold tracking-tight">{parsedData.amount}</span>
                        </div>

                        <div className="flex items-center gap-2 text-indigo-100 font-medium">
                            <span className="bg-white/20 px-2 py-1 rounded-md text-sm">{parsedData.categoryGuess}</span>
                            <ArrowRight className="w-4 h-4 opacity-50" />
                            <span className="truncate">{parsedData.description}</span>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Account Selector */}
                    <div>
                        <label className="block text-xs font-bold text-gray-400 mb-1 ml-1 uppercase">Cuenta</label>
                        <select
                            value={selectedAccount}
                            onChange={(e) => setSelectedAccount(e.target.value)}
                            className="w-full p-3 bg-gray-50 border-gray-100 rounded-xl font-medium text-gray-700 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        >
                            {accounts.map(acc => (
                                <option key={acc.id} value={acc.id}>{acc.name} (S/ {acc.balance})</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button type="button" variant="ghost" onClick={onCancel} className="h-12 rounded-xl">
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            isLoading={loading}
                            disabled={!parsedData || parsedData.amount <= 0}
                            className={`h-12 rounded-xl shadow-lg border-0 bg-gray-900 text-white hover:bg-black transition-all ${(!parsedData || parsedData.amount <= 0) ? 'opacity-50 grayscale' : 'shadow-indigo-200'}`}
                        >
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}
