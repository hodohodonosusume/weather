'use client';

import { useState, useEffect } from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Link from 'next/link';

function HomePage({ signOut, user }: WithAuthenticatorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">🏇 KEIBA Weather</h1>
          <div className="flex items-center gap-4">
            <span className="text-lg">ようこそ、{user?.username} さん</span>
            <button
              onClick={signOut}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              サインアウト
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto p-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">競馬予想支援システム</h2>
          <p className="text-lg text-gray-600">天気情報と馬メモで、より良い予想をサポートします</p>
        </div>

        {/* ナビゲーションカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 天気ページへのリンク */}
          <Link href="/weather" className="block">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-blue-200">
              <div className="text-center">
                <div className="text-6xl mb-4">🌤️</div>
                <h3 className="text-2xl font-bold text-blue-700 mb-2">競馬場天気</h3>
                <p className="text-blue-600">全国競馬場の詳細な天気情報と風向き分析</p>
              </div>
            </div>
          </Link>

          {/* メモページへのリンク */}
          <Link href="/memo" className="block">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-green-200">
              <div className="text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">馬メモ管理</h3>
                <p className="text-green-600">お気に入りの馬とレースメモの記録・管理</p>
              </div>
            </div>
          </Link>
        </div>

        {/* 統計情報（任意） */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <h4 className="text-lg font-bold text-gray-700 mb-2">今日の予想支援</h4>
            <p className="text-gray-600">天気とメモを活用して、的確な予想を立てましょう！</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuthenticator(HomePage);
