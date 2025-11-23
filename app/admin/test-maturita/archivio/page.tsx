'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ArchivioTestPage() {
    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await fetch('/api/admin/test-maturita/list');
                if (response.ok) {
                    const data = await response.json();
                    setTests(data);
                }
            } catch (error) {
                console.error('Error fetching tests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, []);

    const filteredTests = tests.filter(test =>
        test.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.cognome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.azienda?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Archivio Test Digitalizzazione</h1>
                    <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                        ← Torna alla Dashboard
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex gap-4">
                        <input
                            type="text"
                            placeholder="Cerca per nome, azienda o email..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Caricamento...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-100 text-gray-700 uppercase font-semibold">
                                    <tr>
                                        <th className="px-6 py-3">Data</th>
                                        <th className="px-6 py-3">Contatto</th>
                                        <th className="px-6 py-3">Azienda</th>
                                        <th className="px-6 py-3">Score</th>
                                        <th className="px-6 py-3">Livello</th>
                                        <th className="px-6 py-3 text-right">Azioni</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredTests.map((test) => (
                                        <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(test.created_at).toLocaleDateString('it-IT', {
                                                    day: '2-digit', month: '2-digit', year: 'numeric',
                                                    hour: '2-digit', minute: '2-digit'
                                                })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{test.nome} {test.cognome}</div>
                                                <div className="text-xs text-gray-500">{test.email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {test.azienda || '-'}
                                                {test.profilazione?.settore && (
                                                    <div className="text-xs text-gray-500">{test.profilazione.settore}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${test.percentage >= 80 ? 'bg-green-100 text-green-800' :
                                                        test.percentage >= 60 ? 'bg-blue-100 text-blue-800' :
                                                            test.percentage >= 40 ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                    }`}>
                                                    {test.percentage ? test.percentage.toFixed(0) : 0}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {test.livello_maturita}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/admin/test-maturita/archivio/${test.id}`}
                                                    className="text-purple-600 hover:text-purple-900 font-medium hover:underline"
                                                >
                                                    Vedi Report →
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredTests.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                                Nessun test trovato.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
