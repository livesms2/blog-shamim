  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getDatabase, get, ref } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCUPFmKzhGYAzB7-rN5XqUwjKXBOypeT18",
    authDomain: "my-blog-54a12.firebaseapp.com",
    projectId: "my-blog-54a12",
    storageBucket: "my-blog-54a12.appspot.com",
    messagingSenderId: "817305490767",
    appId: "1:817305490767:web:96f65eead3a455216c213a"
  };

  // Initialize Firebase

  const app = initializeApp(firebaseConfig);
 
  const db = getDatabase(app);

  function getPostData(){
    const user_ref = ref(db, 'post/')
    get(user_ref).then((snapshot)=>{
    const data = snapshot.val()
  
    let html = "";
    const table = document.querySelector('.main')
    for( const key in data){
      const {title,post_content} = data[key]

      console.log(post_content);
  
      html+= `
        <div class="post">
        <h2>${title}</h2>
        <p>
        ${post_content}
        </p>
        </div>
      `
      
    }
      table.innerHTML = html
  
    });
    
  }
  getPostData()
  