'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { accountService } from '@/features/accounts/services/accountService';
import { Wallet, CreditCard, Building2, PiggyBank, X } from 'lucide-react';

interface NewAccountFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const ICONS = [
    { id: 'wallet', icon: <Wallet />, label: 'Efectivo' },
    { id: 'bank', icon: <Building2 />, label: 'Banco' },
    { id: 'card', icon: <CreditCard />, label: 'Tarjeta' },
    { id: 'piggy', icon: <PiggyBank />, label: 'Ahorro' },
];

const COLORS = [
    'bg-blue-500', 'bg-indigo-600', 'bg-purple-600', 'bg-pink-500',
    'bg-red-500', 'bg-orange-500', 'bg-green-500', 'bg-teal-500'
];

export function NewAccountForm({ onSuccess, onCancel }: NewAccountFormProps) {
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('wallet');
    const [selectedColor, setSelectedColor] = useState('bg-indigo-600');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await accountService.createAccount({
                name,
                balance: parseFloat(balance) || 0,
                icon: selectedIcon,
                color: selectedColor,
                type: 'personal', // Fixed: Constraint accounts_type_check only allows 'personal' or 'business'
            } as any);
            onSuccess();
        } catch (error) {
            console.error('Error creating account:', error);
            alert('Error al crear la cuenta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">

                <button
                    onClick={onCancel}
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Nueva Cuenta</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Nombre"
                        placeholder="Ej. Billetera Personal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoFocus
                    />

                    <Input
                        label="Saldo Inicial (S/)"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        required
                        className="font-mono text-2xl font-bold text-indigo-600"
                    />

                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Icono</label>
                        <div className="flex gap-4 justify-between">
                            {ICONS.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setSelectedIcon(item.id)}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl w-full border-2 transition-all ${selectedIcon === item.id
                                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                                        : 'border-transparent bg-gray-50 text-gray-400 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.icon}
                                    <span className="text-xs font-medium">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Color</label>
                        <div className="flex flex-wrap gap-3">
                            {COLORS.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full ${color} transition-transform ${selectedColor === color ? 'ring-4 ring-offset-2 ring-indigo-200 scale-110' : 'hover:scale-110'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <Button type="button" variant="ghost" className="w-full" onClick={onCancel}>
                            Cancelar
                        </Button>
                        <Button type="submit" isLoading={loading} className="w-full shadow-lg shadow-indigo-200">
                            Crear Cuenta
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
