import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { fetchHistoryData } from './my-modules/fetch-history-data.js';
import { submitData } from './my-modules/submit-data.js';

// 設定情報
const firebaseConfig = {
    apiKey: 'AIzaSyD8hsdWBPmQcZfeohDLU2q19bC8NudTvzY',
    authDomain: 'daily-report-20939.firebaseapp.com',
    projectId: 'daily-report-20939',
    storageBucket: 'daily-report-20939.firebasestorage.app',
    messagingSenderId: '203671776711',
    appId: '1:203671776711:web:f1c7d491ed1f32712e7de2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud Firestoreの初期化
const db = getFirestore(app);

// Cloud Firestoreから取得したデータを表示する
if (document.getElementById('js-history')) {
    fetchHistoryData(getDocs, collection, db);
}

// Cloud Firestoreにデータを送信する
if (document.getElementById('js-form')) {
    document
        .getElementById('js-form')
        .addEventListener('submit', (e) =>
            submitData(e, addDoc, collection, db),
        );
}
