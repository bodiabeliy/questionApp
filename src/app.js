import './styles.css'
// импорт ф-й 
import { isValid, createModal } from './validation'
import { Question } from './question'
import { getAuthForm, authEmailAndPassword } from './auth'
console.log('Server is worked!')


const form = document.getElementById('form')
const submitBtn = form.querySelector('#submitBtn')
const inputField = form.querySelector('#questionInput')
const modal_btn = document.getElementById('modal_btn')
form.addEventListener('submit', submitHandler)
modal_btn.addEventListener('click', Modal)
inputField.addEventListener('input', () => {
 submitBtn.disabled = !isValid(inputField.value)
})
//отправка сообщения с проверкой
function submitHandler(event) {
 const authBtn = event.target.querySelector('#submitBtn')
 event.preventDefault()
 if (isValid(inputField.value)) {
  const question = {
   text: inputField.value.trim(),
   date: new Date().toJSON()
  }
  submitBtn.disabled = true
  //Async
  //обработка входящего запроса от сервера
  Question.create(question).then(() => {
   inputField.value = ''
   inputField.className =''
   submitBtn.disabled = false
   authBtn.disabled = true
  })
 }
}
// обработка открытия модального окна
function Modal() {
 createModal('REGISTRATION', getAuthForm())
 document.getElementById('auth_form')
 .addEventListener('submit', authNotRefresh)

}

// модальное окно авторизации
function authNotRefresh(event) {
 event.preventDefault()

 const email = event.target.querySelector('#email').value
 const password = event.target.querySelector('#password').value
 authEmailAndPassword(email, password)
 .then (Question.Fetch)
 .then(rederModalAfterAuth)
 .catch(() => authBtn.disabled =false)

}
// рендеринг списка вопросов
function rederModalAfterAuth(content) {
 if (typeof(content) === 'string') {
createModal('Error! ', content )
 } else {
  createModal('List of questions: ', Question.toHTML(content))
 }
}