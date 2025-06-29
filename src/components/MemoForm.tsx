// ファイルの場所: src/components/MemoForm.tsx
'use client';

import { useState } from 'react';
// 変更点①：'API'と'graphqlOperation'はもう使わないから削除！
// 変更点②：代わりに'generateClient'を呼び出すわ
import { generateClient } from 'aws-amplify/api';
import { createMemo } from '@/graphql/mutations';
import DatePicker from 'react-datepicker';
import TagsInput from 'react-tagsinput';

// 変更点③：新しい'client'を作って、これからは彼に全部お任せするの
const client = generateClient();

interface MemoFormProps {
  onMemoAdded: () => void;
}

export default function MemoForm({ onMemoAdded }: MemoFormProps) {
  const [horseName, setHorseName] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!horseName || !date || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // 変更点④：API呼び出しの書き方が、こんなにシンプルになるのよ！
      await client.graphql({
        query: createMemo,
        variables: {
          input: {
            horseName,
            date: date.toISOString().split('T')[0],
            tags,
            content,
          },
        }
      });
      
      setHorseName('');
      setDate(new Date());
      setTags([]);
      setContent('');
      onMemoAdded();
    } catch (error) {
      console.error('メモの作成に失敗しました:', error);
      alert('エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold">新しい馬のメモを追加</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">馬の名前 *</label>
        <input
          type="text"
          value={horseName}
          onChange={(e) => setHorseName(e.target.value)}
          placeholder="例：キタサンブラック"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">日付 *</label>
        <DatePicker
          selected={date}
          onChange={(d: Date | null) => setDate(d)}
          dateFormat="yyyy/MM/dd"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">タグ（入力後Enter）</label>
        <TagsInput value={tags} onChange={setTags} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">自由メモ欄</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="パドックでの様子、レース内容など"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
      >
        {isSubmitting ? '保存中...' : 'メモを保存'}
      </button>
    </form>
  );
}
