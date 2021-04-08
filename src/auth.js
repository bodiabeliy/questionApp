export function getAuthForm() {
 return `
 <form class="mui-form" id="auth_form">
 <div class="mui-textfield mui-textfield--float-label">
   <input 
         type="email" 
         id="email"
         required
   <label for="email">Email</label>
 </div>
 <div class="mui-textfield mui-textfield--float-label">
   <input 
         type="password" 
         id="password"
         required
   <label for="email">Password</label>
 </div>
 <button 
         id="submitBtn"
         type="submit"
         class="mui-btn mui-btn--raised mui-btn--primary"
         >
         Sign Up
  </button>
</form>

 `
}
// вход в систему по зарегистрированому пользователю firebase
export function authEmailAndPassword(email, password) {
 const API = 'AIzaSyDcNEeoXLchiUOnFxf58XDuZocifuF0h8U'
 return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API}`, {
  method: 'POST',
  body: JSON.stringify( {
   email: email, password: password, 
   returnSecureToken: true
  }),
  headers: {
   'Content-Type':'application/json'
  }
 })
 .then(response => response.json())
 .then(data => data.idToken)
}