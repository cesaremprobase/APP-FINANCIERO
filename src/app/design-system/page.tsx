import { Button } from '@/shared/components/ui/Button';
import { Card } from '@/shared/components/ui/Card';
import { Input } from '@/shared/components/ui/Input';
import { Plus, Trash2, Home, DollarSign, Wallet } from 'lucide-react';

export default function DesignSystemPage() {
    return (
        <main className="min-h-screen bg-gray-50 p-8 space-y-12 pb-32">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">🎨 UI Kit: Modo Niña</h1>
                <p className="text-xl text-gray-600 mb-12">Componentes diseñados para ser amigables, grandes y claros.</p>

                {/* BUTTONS */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold border-b pb-2">1. Botones (Buttons)</h2>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-500">Variantes</h3>
                        <div className="flex flex-wrap gap-4 items-center">
                            <Button>Primary Action</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="danger">Danger Zone</Button>
                            <Button variant="ghost">Minimal Ghost</Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-500">Tamaños (Sizes) - ¡Importante!</h3>
                        <div className="flex flex-wrap gap-4 items-end">
                            <Button size="sm">Small</Button>
                            <Button size="md">Medium (Default)</Button>
                            <Button size="lg">Large (Touch Friendly)</Button>
                            <Button size="xl" leftIcon={<Plus />}>Giant Action</Button>
                        </div>
                    </div>
                </section>

                {/* INPUTS */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold border-b pb-2">2. Inputs (Entrada)</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <Input label="Nombre de la cuenta" placeholder="Ej. Billetera" />
                        <Input
                            label="Monto Inicial"
                            type="number"
                            placeholder="0.00"
                            leftIcon={<DollarSign className="w-5 h-5" />}
                        />
                        <Input
                            label="Con Error"
                            defaultValue="Dato inválido"
                            error="Este campo es requerido"
                        />
                        <Input
                            placeholder="Sin etiqueta, solo input..."
                        />
                    </div>
                </section>

                {/* CARDS */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold border-b pb-2">3. Tarjetas (Cards)</h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card title="Saldo Total">
                            <div className="text-4xl font-extrabold text-indigo-600">S/ 1,250.00</div>
                            <p className="text-gray-400 mt-2">Actualizado hoy</p>
                        </Card>

                        <Card
                            title="Cuentas"
                            action={<Button size="sm" variant="secondary" leftIcon={<Plus className="w-4 h-4" />}>Nueva</Button>}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl">
                                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                                        <Wallet className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-bold">Efectivo</div>
                                        <div className="text-gray-500 text-sm">S/ 200.00</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>
            </div>
        </main>
    );
}
