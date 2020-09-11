import * as sapper from '@sapper/app';
import * as firebase from 'firebase/app';

import 'firebase/auth';

var firebaseConfig = {
	apiKey: 'AIzaSyAj_zz7fn4Djc5ka3UfgvXMO6f23Acmdyc',
	authDomain: 'a-single-song-review.firebaseapp.com',
	databaseURL: 'https://a-single-song-review.firebaseio.com',
	projectld: 'a-single-song-review',
	storageBucket: 'a-single-song-review.appspot.com',
	messagingSenderld: '199855635504',
	appld: '1:199855635504:web:bc229b8f973ed8722741f5',
	measurementld: 'G-VBX61TZGCX',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

sapper.start({
	target: document.querySelector('#sapper'),
});
