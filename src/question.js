export class Question {
 static create(question) {
  return fetch('https://questionapp-c6253-default-rtdb.firebaseio.com/questions.json', {
   method: 'POST',
   body: JSON.stringify(question),
   headers: {
    'Content-Type': 'application/json'
   }
  })
  // преобразование полученых данных в формате json
  .then(response => response.json())
  // 
  .then(response => {
   console.log(response)
   question.id = response.name
   return question
  })

  // чейн функции локального сохранения (localStore)
  .then(AddLocalStorage)
  .then(Question.RenderList)
 }
 // метод получения сообщений для зарегистрированых пользователей
 static Fetch(token) {
  
   return fetch(`https://questionapp-c6253-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
  .then(response => response.json())
  .then(questions => {
   // обработка ошибки (пользователь не найден)
   if (questions && questions.error) {
    return `<p class="error">user exist already!</p>`
   }
  // коректная работа запроса
   return questions ? Object.keys(questions).map(key =>({
    ...questions[key],
    id: key
   })) : []
  })
 }

 // к статическим методам нельзя обратится через this
 static RenderList()  {
  const questions = GetingQuestion()
  // проверка наличия вопросов
  const html = questions.length 
  ? questions.map(CardQuestion).join('')
  : `<div class="mui--text-headline">You  have not written yet</div>`
  const list = document.getElementById('list')

  list.innerHTML = html
 }

 static toHTML(questions) {
   return questions.length ? 
   `<ol>
    ${questions.map(questionItem =>
      `<li>${questionItem.text}</li>`). join('')}
   </ol>`
   :`<p>Questions not exist</p>`
 }
}




function AddLocalStorage(question) {

 // создание массива для хранения вопросов
 const all = GetingQuestion()
 all.push(question)
 localStorage.setItem('questions', JSON.stringify(all))
}
// ф-я создвния массива вопросов
function GetingQuestion() {
 return JSON.parse(localStorage.getItem('questions') || '[]')
}
// ф-я рендеренга карточки вопроса (генерация HTML)
function CardQuestion(question) {
 return `
 <div class="mui--text-black-54">
  ${new Date(question.date).toLocaleDateString()}
  ${new Date(question.date).toLocaleTimeString()}

 </div>
 <div>${question.text}</div>
 `
}