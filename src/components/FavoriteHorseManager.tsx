// ファイルの場所: src/components/FavoriteHorseManager.tsx

'use client';

import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createFavoriteHorse, deleteFavoriteHorse } from '@/graphql/mutations';
import { listFavoriteHorses } from '@/graphql/queries';
import { FavoriteHorse } from '@/API';

const client = generateClient();

export default function FavoriteHorseManager() {
  const [favorites, setFavorites] = useState<FavoriteHorse[]>([]);
  const [newHorse, setNewHorse] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const result: any = await client.graphql({ query: listFavoriteHorses });
      
      // ★★★ ここに魔法の呪文を追加！ これでお返事の中身が見えるわ！ ★★★
      console.log('APIからのお返事:', result); 
      
      setFavorites(result.data.listFavoriteHorses.items);
    } catch (error) {
      console.error('お気に入り馬の取得に失敗:', error);
    }
  };

  const addFavorite = async () => {
    if (!newHorse.trim()) return;
    try {
      await client.graphql({
        query: createFavoriteHorse,
        variables: { input: { horseName: newHorse } }
      });
      setNewHorse('');
      fetchFavorites();
    } catch (error) {
      console.error('お気に入り馬の追加に失敗:', error);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      await client.graphql({
        query: deleteFavoriteHorse,
        variables: { input: { id } }
      });
      fetchFavorites();
    } catch (error) {
      console.error('お気に入り馬の削除に失敗:', error);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">お気に入り馬</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={newHorse}
          onChange={(e) => setNewHorse(e.target.value)}
          placeholder="馬の名前を入力"
          className="flex-grow rounded-md border-gray-300 shadow-sm sm:text-sm"
        />
        <button onClick={addFavorite} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">追加</button>
      </div>
      <ul className="space-y-2">
        {favorites.map(fav => (
          <li key={fav.id} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
            <span>{fav.horseName}</span>
            <button onClick={() => removeFavorite(fav.id)} className="text-xs text-red-500">x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
