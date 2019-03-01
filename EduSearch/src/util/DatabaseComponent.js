import firebase from "react-native-firebase";
import {Platform} from 'react-native';

const  iosConfig ={
        clientId: "366718999209-nie5km9u8u3nd81ria1955kd21710rhi.apps.googleusercontent.com",
        appId:"1:366718999209:ios:42598d8569f22ef9",
        apiKey: "AIzaSyD1EP-BwTkmQfP1QMG_SohTl7xP0Tbt_js",
        storageBucket: "edusearch-32e40.appspot.com",
        messagingSenderId: "366718999209",  
        projectId:"edusearch-32e40",
        databaseURL:"https://edusearch-32e40.firebaseio.com" ,
        persistence: true

};

const androidConfig = {
    client_id: "366718999209-o18t0q93rklqjjn2fuv41fdkrmqlj9s8.apps.googleusercontent.com",
    appId: "1:366718999209:android:ffcd6043f45bb7c7",
    apiKey:  "AIzaSyBbY-cJa7NdMg9Ln1oqP0Xeu95Eua4au8s",
    storage_bucket: "edusearch-32e40.appspot.com",
    messagingSenderId: "366718999209", 
    projectId: "edusearch-32e40",
    persistence: true
};

const eduSearch = firebase.initializeApp(

    Platform.OS === 'ios' ? iosConfig : androidConfig,

    'EduSearch'
)

const rootRef = firebase.database().ref();
