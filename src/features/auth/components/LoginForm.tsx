'use client';

import { useState } from 'react';
import { supabase } from '@/shared/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Card } from '@/shared/components/ui/Card';
import { Lock, Mail } from 'lucide-react';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push('/');
            router.refresh(); // Refresh middleware/server components
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = async () => {
        setLoading(true);
        setError(null);
        console.log('Attempting signup with:', { email, password }); // Debug

        if (!email || !password) {
            setError("Por favor ingresa email y contraseña");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;

            if (data.session) {
                // Auto logged in (Email confirmation disabled)
                router.push('/');
                router.refresh();
            } else {
                // Email confirmation enabled
                alert('¡Cuenta creada! Por favor REVISA TU EMAIL para confirmar tu cuenta antes de iniciar sesión.');
            }
        } catch (err: any) {
            console.error('Signup error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto p-8 shadow-2xl border-0 bg-white/90 backdrop-blur-xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-indigo-900 mb-2">Bienvenido</h1>
                <p className="text-indigo-600 font-medium">Finanzas personales, modo fácil.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <Input
                    label="Email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail className="w-5 h-5" />}
                    required
                />

                <Input
                    label="Contraseña"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    leftIcon={<Lock className="w-5 h-5" />}
                    required
                />

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-4 pt-2">
                    <Button type="submit" isLoading={loading} className="w-full shadow-lg shadow-indigo-200">
                        Iniciar Sesión
                    </Button>

                    <div className="text-center text-sm text-gray-500 font-medium">
                        ¿No tienes cuenta?{' '}
                        <button type="button" onClick={handleSignUp} className="text-indigo-600 hover:underline font-bold">
                            Regístrate aquí
                        </button>
                    </div>
                </div>
            </form>
        </Card>
    );
}
