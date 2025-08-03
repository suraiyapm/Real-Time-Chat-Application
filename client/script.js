const socket = io('http://localhost:3000')
const containerNote = document.getElementById('container-note')
const formNote = document.getElementById('container-send')
const inputNote = document.getElementById('inputNote')

const nickname = prompt('Whas your name?')
appendNote('The Flock is Growing')
socket.emit('new-user', nickname)

socket.on('chat-message', data => {
    appendNote(`${data.nickname}: ${data.message}`)
})

socket.on('user-connected', nickname => {
    appendNote(`${nickname} has joined us.`)
})

socket.on('user-disconnected', nickname => {
    appendNote(`${nickname} has flown away.`)
})

formNote.addEventListener('submit', e => {
    e.preventDefault()
    const note = inputNote.value
    appendNote(`Me: ${note}`)
    socket.emit('send-chat-message', note)
    inputNote.value = ''
})

function appendNote(note) {
    const elementNote = document.createElement('div')
    elementNote.innerText=note
    containerNote.append(elementNote)
}