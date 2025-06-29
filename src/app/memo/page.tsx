// ファイルの場所: src/app/memo/page.tsx

'use client';

import { useState } from 'react';
import { Amplify } from 'aws-amplify';
import awsExports from '../../aws-exports';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import MemoForm from '@/components/MemoForm';
import MemoList from '@/components/MemoList';
// ★★★ お気に入り馬の部品を読み込むわよ！ ★★★
import FavoriteHorseManager from '@/components/FavoriteHorseManager';

Amplify.configure({ ...awsExports, ssr: true });

function MemoPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const handleMemoAdded = () => { setRefreshTrigger(prev => prev + 1); };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main className="container mx-auto p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">ようこそ、{user?.attributes?.email || user?.username} さん</h1>
            <button onClick={signOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">サインアウト</button>
          </div>
          
          {/* ★★★ レイアウトを少し変えて、3カラムにするわよ！ ★★★ */}
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
      )}
    </Authenticator>
  );
}

export default MemoPage;
