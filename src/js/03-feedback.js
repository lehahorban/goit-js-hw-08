import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector("form"),
    input: document.querySelector("input"),
    textarea: document.querySelector("textarea"),
    button: document.querySelector("button"),
}
const {form, input, textarea, button} = refs
const STORAGE_KEY = "feedback-form-state"
const formData = {}

form.addEventListener("submit", onFormSubmit)
form.addEventListener("input", throttle(textAreaInput, 500))
form.addEventListener("input", outputForm)
populateTextArea()

function outputForm(evt) {
    formData[evt.target.name] = evt.target.value
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    // console.log(formData);
}

function onFormSubmit(evt) {
    evt.preventDefault()
      console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    evt.currentTarget.reset()
    localStorage.removeItem(STORAGE_KEY)
}

function textAreaInput(evt) {
    const localObject = {
        email: input.value,
        message: textarea.value
    } 
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localObject) )
}
function populateTextArea() {
   try {
        const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || ""
       if (savedMessage) {
        
        const getEmail = savedMessage.email
        const getMessage = savedMessage.message        
        input.value = getEmail
        textarea.value = getMessage
        
    }
   } catch (error) {
       console.log('error');
   }
}

