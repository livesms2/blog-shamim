
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
  import { getDatabase, set, ref, get, remove, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
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
  const auth = getAuth(app);
  const db = getDatabase(app);
  auth.languageCode = 'en';
  const provider = new GoogleAuthProvider();

// login_page

  const my_blog = document.querySelector('.my_blog');
  const login_page = document.querySelector('.login');
  const googleLogin = document.getElementById("google-login-btn");
  

  onAuthStateChanged(auth, (user) =>{
    if(user){
        my_blog.classList.add('show')
        login_page.classList.add('hide')
    } else{
        my_blog.classList.remove('show')
        login_page.classList.remove('hide')
    }
  });


  function SignInUSer(){

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword (auth, email, password).then((userCredinals)=> {
        console.log(userCredinals.user.uid);
      });
    }

  const sign_btn = document.querySelector('#sign_in');
  sign_btn.addEventListener('click',SignInUSer);

// Sign Out Logout

const sign_out_btn = document.querySelector('#Logout');
  sign_out_btn.addEventListener('click',()=>{
  signOut(auth).then(()=>{
    
    }).catch((error) =>{
        console.log("error" + error);
    })
});


// Blog Section Code


const notify = document.querySelector('.notify')
const add_post_Btn = document.querySelector('#post_btn');

function Add_Post(){
    const title = document.querySelector('#title').value;
    const post_content = document.querySelector('#post_content').value;
    const id = Math.floor(Math.random()*100)
    set(ref(db,'post/'+ id),{
        title:title,
        post_content:post_content
    });
    notify.innerHTML = "data Added"
    document.querySelector('#title').value="";
    document.querySelector('#post_content').value="";


    getPostData()
}



add_post_Btn.addEventListener('click', Add_Post)
 
// Get Data From Firebase Db

function getPostData(){
  const user_ref = ref(db, 'post/')
  get(user_ref).then((snapshot)=>{
  const data = snapshot.val()

  let html = "";
  const table = document.querySelector('table')
  for( const key in data){
    const {title,post_content} = data[key]

    html+= `
    <tr>
      <td><span class="postNumber"></span></td>
      <td>${title}</td>
      <td><button class="delete" onclick="delete_data(${key})">Delete</button></td>
      <td><button class="update" onclick="update_data(${key})">Update</button></td>
    </tr>
    `
    
  }
    table.innerHTML = html;

  });
  


}
getPostData()

// delete_data

window.delete_data = function(key){

  remove(ref(db,`post/${key}`))
  notify.innerHTML ="Delete Data"
  getPostData()

}

// update_data

window.update_data = function(key){
    const user_ref = ref(db,`post/${key}`)

    get(user_ref).then((item)=>{
    document.querySelector('#title').value = item.val().title;  
    document.querySelector('#post_content').value = item.val().post_content;  
  })

    const update_btn = document.querySelector('.update_btn');
    update_btn.classList.add('show');
    document.querySelector('.post_btn').classList.add('hide');

    // Update

           
        function update_Form () {

            const title = document.querySelector('#title').value;
            const post_content = document.querySelector('#post_content').value;

            update(ref(db,`post/${key}`),{
                title:title,
                post_content:post_content

            })
            getPostData()
            }   
            
            update_btn.addEventListener('click',update_Form)
          
    }

// google


googleLogin.addEventListener("click" , function(){

signInWithPopup(auth, provider)
.then((result) => {
 
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const user = result.user;
  console.log(user);
  window.location.href ="../index.html";
 
}).catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
 
});


})


