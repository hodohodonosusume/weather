'use client';

import { useState } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import MemoForm from '@/components/MemoForm';
import MemoList from '@/components/MemoList';
import FavoriteHorseManager from '@/components/FavoriteHorseManager';

function MemoPage({ signOut, user }: WithAuthenticatorProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleMemoAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          ようこそ、{user?.username} さん
        </h1>
        <button
          onClick={signOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          サインアウト
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <MemoForm onMemoAdded={handleMemoAdded} />
          <FavoriteHorseManager />
        </div>
        <div className="lg:col-span-8">
          <MemoList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </main>
  );
}

export default withAuthenticator(MemoPage);
