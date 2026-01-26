'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Building2, Plus, TrendingUp, Wallet, ArrowRight } from 'lucide-react';
import { NewAccountForm } from '@/features/accounts/components/NewAccountForm';
import { accountService } from '@/features/accounts/services/accountService';
import { Database } from '@/types/database.types';

type Account = Database['public']['Tables']['accounts']['Row'];

export default function DashboardPage() {
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      // NOTE: In a real app we might want to use React Query here for caching
      const accs = await accountService.getAccounts();
      setAccounts(accs);
      setTotalBalance(accs.reduce((sum, a) => sum + (a.balance || 0), 0));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans pb-32">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Panel Financiero</h1>
          <p className="text-gray-500 mt-1">Resumen de tu Imperio (Soles S/)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Main Balance Card (Purple) */}
          <Card
            gradient
            title="Patrimonio Total"
            action={<Building2 className="text-indigo-200 w-6 h-6" />}
            className="md:col-span-1 shadow-xl shadow-indigo-200 relative overflow-hidden group"
          >
            <div className="mt-2 relative z-10">
              <div className="text-4xl font-extrabold text-white tracking-tight">
                S/ {totalBalance.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% mes
                </div>
              </div>
            </div>

            {/* Decoration */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
          </Card>

          {/* Account Lists */}
          {accounts.map((account) => (
            <div
              key={account.id}
              className="border-l-4"
              style={{ borderLeftColor: account.color?.replace('bg-', '') || '#4f46e5' }}
            >
              <Card className="hover:scale-[1.02] transition-transform cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${account.color || 'bg-gray-100'} text-white`}>
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{account.name}</div>
                      <div className="text-xs text-gray-400">Cuenta Personal</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-gray-900">
                      S/ {account.balance?.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}

          {/* Add Account Button */}
          <button
            onClick={() => setShowNewAccountModal(true)}
            className="h-full min-h-[160px] rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-white hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-100 transition-all group flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-indigo-600"
          >
            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-semibold">Nueva Cuenta</span>
          </button>

        </div>
      </div>

      {/* Modal */}
      {showNewAccountModal && (
        <NewAccountForm
          onSuccess={() => {
            setShowNewAccountModal(false);
            fetchData(); // Refresh list
          }}
          onCancel={() => setShowNewAccountModal(false)}
        />
      )}
    </main>
  );
}
