'use client';

import { AccountList } from './AccountList';

export function FinanceDashboard() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Panel Financiero</h1>
                <p className="text-gray-500">Resumen de tu Imperio (Soles S/)</p>
            </header>

            <section>
                <AccountList />
            </section>

            {/* Aquí irá el TransactionList y TransactionForm pronto */}
        </div>
    );
}
