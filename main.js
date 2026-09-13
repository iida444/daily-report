import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

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
const fetchHistoryData = async () => {
    let tags = '';

    // reportsコレクションのデータを取得
    const querySnapshot = await getDocs(collection(db, 'reports'));

    // データをテーブル表の形式に合わせてHTMLに挿入
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tags += `<tr><td>${doc.data().date}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`;
    });
    document.getElementById('js-history').innerHTML = tags;
};

// Cloud Firestoreから取得したデータを表示する
if (document.getElementById('js-history')) {
    fetchHistoryData();
}

// Cloud Firestoreにデータを送信する
const submitData = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
        const docRef = await addDoc(collection(db, 'reports'), {
            date: new Date(),
            name: formData.get('name'),
            work: formData.get('work'),
            comment: formData.get('comment'),
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
};

// Cloud Firestoreにデータを送信する
if (document.getElementById('js-form')) {
    document
        .getElementById('js-form')
        .addEventListener('submit', (e) => submitData(e));
}
