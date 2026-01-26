import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Building2, Plus, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
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
            className="md:col-span-1 shadow-xl shadow-indigo-200"
          >
            <div className="mt-2">
              <div className="text-4xl font-extrabold text-white tracking-tight">S/ 0.00</div>

              <div className="mt-4 flex items-center gap-2">
                <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/20 text-white text-xs font-medium backdrop-blur-sm">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% mes
                </div>
              </div>
            </div>
          </Card>

          {/* Add Account Placeholder (Dashed) */}
          <button className="h-full min-h-[180px] rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all group flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-indigo-600">
            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
              <Plus className="w-6 h-6" />
            </div>
            <span className="font-semibold">Nueva Cuenta</span>
          </button>

        </div>
      </div>
    </main>
  );
}
