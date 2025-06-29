// ファイルの場所: src/components/MemoList.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import { generateClient } from 'aws-amplify/api';
// ★★★ 編集と削除のための命令書を読み込むわよ！ ★★★
import { listMemos, getMemo } from '@/graphql/queries';
import { updateMemo, deleteMemo } from '@/graphql/mutations';
import { Memo } from '@/API';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput';

const client = generateClient();

// ★★★ 編集用のモーダル（ポップアップ画面）を、新しい部品として作っちゃう！ ★★★
function EditModal({ memo, onClose, onUpdate }: { memo: Memo, onClose: () => void, onUpdate: () => void }) {
  const [horseName, setHorseName] = useState(memo.horseName);
  const [date, setDate] = useState<Date | null>(new Date(memo.date));
  const [tags, setTags] = useState<string[]>(memo.tags || []);
  const [content, setContent] = useState(memo.content);

  const handleUpdate = async () => {
    try {
      await client.graphql({
        query: updateMemo,
        variables: {
          input: {
            id: memo.id,
            horseName,
            date: date?.toISOString().split('T')[0],
            tags,
            content,
          }
        }
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('メモの更新に失敗:', error);
      alert('更新に失敗しました');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg space-y-4">
        <h3 className="text-xl font-bold">メモを編集</h3>
        {/* ここはMemoFormとほぼ同じね！ */}
        <div><label>馬の名前 *</label><input type="text" value={horseName} onChange={e => setHorseName(e.target.value)} className="w-full p-2 border rounded" /></div>
        <div><label>日付 *</label><DatePicker selected={date} onChange={d => setDate(d)} className="w-full p-2 border rounded" /></div>
        <div><label>タグ</label><TagsInput value={tags} onChange={setTags} /></div>
        <div><label>自由メモ欄</label><textarea value={content} onChange={e => setContent(e.target.value)} rows={4} className="w-full p-2 border rounded" /></div>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">キャンセル</button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-indigo-600 text-white rounded">更新</button>
        </div>
      </div>
    </div>
  );
}


export default function MemoList({ refreshTrigger }: { refreshTrigger: number }) {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  // ★★★ モーダル管理用の状態を追加 ★★★
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);

  const fetchMemos = useCallback(async () => {
    // ... (fetchMemosの中身は変更なし)
    setIsLoading(true);
    try {
      const filter = searchTerm ? { or: [ { horseName: { contains: searchTerm } }, { tags: { contains: searchTerm } }, { content: { contains: searchTerm } } ] } : {};
      const result: any = await client.graphql({ query: listMemos, variables: { filter } });
      const sortedMemos = result.data.listMemos.items.sort((a: Memo, b: Memo) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setMemos(sortedMemos);
    } catch (error) { console.error('メモの取得に失敗:', error); } finally { setIsLoading(false); }
  }, [searchTerm]);

  useEffect(() => { fetchMemos(); }, [fetchMemos, refreshTrigger]);

  // ★★★ 削除機能を追加！ ★★★
  const handleDeleteMemo = async (id: string) => {
    if (window.confirm('本当にこのメモを削除しますか？')) {
      try {
        await client.graphql({ query: deleteMemo, variables: { input: { id } } });
        fetchMemos(); // 削除したらリストを再読み込み
      } catch (error) {
        console.error('メモの削除に失敗:', error);
        alert('削除に失敗しました');
      }
    }
  };

  // ★★★ 編集モーダルを開く機能を追加！ ★★★
  const handleOpenModal = (memo: Memo) => {
    setEditingMemo(memo);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4 mt-8">
        {/* ★★★ モーダルはここから呼び出すのよ ★★★ */}
        {isModalOpen && editingMemo && (
            <EditModal 
                memo={editingMemo} 
                onClose={() => setIsModalOpen(false)} 
                onUpdate={fetchMemos} 
            />
        )}
      <h2 className="text-xl font-bold">メモ一覧・検索</h2>
      <input type="text" placeholder="馬の名前、タグ、内容で検索..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      {isLoading ? ( <p>読み込み中...</p> ) : (
        <div className="space-y-4">
          {memos.length > 0 ? (
            memos.map((memo) => (
              <div key={memo.id} className="p-4 border rounded-lg bg-white shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-indigo-700">{memo.horseName}</h3>
                    <span className="text-sm text-gray-500">{memo.date}</span>
                  </div>
                  {/* ★★★ 編集と削除のボタンを追加！ ★★★ */}
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(memo)} className="text-sm text-blue-500 hover:underline">編集</button>
                    <button onClick={() => handleDeleteMemo(memo.id)} className="text-sm text-red-500 hover:underline">削除</button>
                  </div>
                </div>
                {memo.tags && memo.tags.length > 0 && (<div className="flex flex-wrap gap-2 mt-2"> {memo.tags.map((tag, index) => ( <span key={index} className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{tag}</span> ))}</div> )}
                <p className="mt-2 text-gray-800 whitespace-pre-wrap">{memo.content}</p>
              </div>
            ))
          ) : ( <p>まだメモがありません。</p> )}
        </div>
      )}
    </div>
  );
}
