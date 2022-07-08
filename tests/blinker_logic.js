// TODO add function to increment and decrement 
// for gamification
// or some kind of speed panel

// TODO add nine parts for blinking, also use 
// words of different length


let data = JSON.parse(data_f)[0].flashes // data_f in nearby .json



//I highly recommend to optimaze it 
//considering monitor frequency
//if you really know how rendering works ^^ 
let frequency_per_minute = 100
let show_tick_time = 60000 / frequency_per_minute
let time_to_blink_msecs = 4000

let random_word = function(words_req_pool) {
    return words_req_pool[Math.floor(Math.random() * words_req_pool.length)]
}

let blinking_int = function(elements, words_req_pool){
    // let jump_to = [...elements].filter(element => element.innerText == "")
    function is_texted(element, index, array){
        if (element.innerText != ""){
            return true
        }
        return false
    }
    not_to_jump = [...elements].find(is_texted);
    let not_jump_to_ind = [...elements].indexOf(not_to_jump);
    elements[not_jump_to_ind].innerText = ""
    el_ind = not_jump_to_ind
    while (el_ind == not_jump_to_ind) {
        el_ind = Math.floor(Math.random() * elements.length)
    }
    element = elements[el_ind]
    element.innerText = random_word(words_req_pool)
}


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

let bl_el = document.getElementsByClassName('blink-area')

fields = document.getElementsByClassName('choice')

// Maybe for later use with global loop
const create_answer_areas = () => {
    answers_container = document.createElement('div.answers-container')
    body = document.getElementsByTagName('body')[0]
    body.appendChild(answers_container)
    for (let i = 0; i < 8; ++i) {
        field = document.createElement('div.choice')
        answers_container.appendChild(field)
    }
}

const fill_answers = function() {
    clearInterval(this.blink)
    for (el of bl_el){
        el.style.display = 'none'
    }
    let check_pool_el = [...bl_el].filter(el => el.innerText.length != "")
    check_pool = [check_pool_el[0].innerText]
    globalThis.answer = [...bl_el].filter(el => el.innerText.length != "")[0].innerText
    remove_blinkers()
    while (check_pool.length < fields.length) {
        new_text_el = random_word(data)
        if (!check_pool.includes(new_text_el)) {
        check_pool.push(new_text_el)
        }}
    
    shuffle(check_pool);
    [...fields].forEach(f => {
        f.innerHTML = check_pool.pop()
        f.style.visibility = 'visible'
    })
}

const hide_answers = () => {
    [...fields].forEach(f => f.style.display = 'none')
}

const remove_blinkers = () => {
    blincontainer = document.getElementsByClassName('blink-container')[0];
    [...bl_el].forEach(el => el.remove)
    blincontainer.remove()
}

const remove_answers = () => {
    [...fields].forEach(f => f.remove())
    ancontainer = document.getElementsByClassName('answers-container')[0]
    ancontainer.remove()
}

const check_last = function(event) {
    hide_answers()
    result = document.createElement('h4')
    if (globalThis.answer==event.target.textContent){
        remove_answers()
        result.innerText = 'Верно!'
    } else {
        remove_answers()
        result.innerText = "Неверно..."
    }
    blink_area = document.getElementsByTagName('h2')[0]
    document.body.insertBefore(result, blink_area)
}

for (const el of fields){
    el.onclick = check_last
}


let stage = function() {
    
    let blink = setInterval(blinking_int, show_tick_time, bl_el,data)
    
    let stage_decide = fill_answers.bind(blink)

    setTimeout(stage_decide, time_to_blink_msecs)
}

stage()