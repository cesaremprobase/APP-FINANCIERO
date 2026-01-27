'use client';

import { useEffect, useState } from 'react';
import { financeService } from '../services/financeService';
import { Account } from '../types';
import { Wallet, Building2, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export function AccountList() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = async () => {
        try {
            const data = await financeService.getAccounts();
            setAccounts(data);
        } catch (error) {
            console.error('Error loading accounts:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(amount);
    };

    if (loading) return <div className="p-4 text-center text-gray-500">Cargando tus finanzas...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Tarjeta de Resumen Total */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl p-6 shadow-xl transform transition hover:scale-[1.02]">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-indigo-200 text-sm font-medium">Patrimonio Total</p>
                        <h2 className="text-3xl font-bold mt-1">
                            {formatCurrency(accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0))}
                        </h2>
                    </div>
                    <div className="p-2 bg-white/20 rounded-lg">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                </div>
                <div className="mt-6 flex gap-3 text-sm">
                    <span className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded">
                        <ArrowUpRight className="w-3 h-3" /> +12% mes
                    </span>
                </div>
            </div>

            {/* Lista de Cuentas Individuales */}
            {accounts.map((account) => (
                <div key={account.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-xl ${account.type === 'business' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                                {account.type === 'business' ? <Building2 className="w-6 h-6" /> : <Wallet className="w-6 h-6" />}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{account.name}</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">{account.type === 'business' ? 'Negocio' : 'Personal'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className={`text-2xl font-bold ${(account.balance || 0) < 0 ? 'text-red-500' : 'text-gray-900'}`}>
                            {formatCurrency(account.balance || 0)}
                        </span>
                    </div>
                </div>
            ))}

            {/* Botón Agregar Cuenta (Futuro) */}
            <button className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition group">
                <div className="p-3 bg-gray-50 rounded-full group-hover:bg-indigo-50 mb-2">
                    <Plus className="w-6 h-6" />
                </div>
                <span className="font-medium">Nueva Cuenta</span>
            </button>
        </div>
    );
}
