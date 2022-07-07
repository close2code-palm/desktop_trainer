// TODO add function to increment and decrement 
// for gamification
// or some kind of speed panel

// TODO add nine parts for blinking, also use 
// words of different length


let data = JSON.parse(data_f)[0].flashes // data_f in nearby .json

let blinking_int = function(elements, words_req_pool){
    // let jump_to = [...elements].filter(element => element.innerText == "")
    function is_texted(element, index, array){
        if (element.innerText != ""){
            return true
        }
        return false
    }
    not_to_jump = [...elements].find(is_texted);
    let not_jump_to_ind = [...elements].indexOf(not_to_jump)
    elements[not_jump_to_ind].innerText = ""
    el_ind = not_jump_to_ind
    while (el_ind == not_jump_to_ind) {
        el_ind = Math.floor(Math.random() * elements.length)
    }
    element = elements[el_ind]
    element.innerText = random_word(words_req_pool)
}


//I highly recommend to optimaze it 
//considering monitor frequency
//if you really know how rendering works ^^ 
let frequency_per_minute = 300
let show_tick_time = 60000 / frequency_per_minute
let time_to_blink_msecs = 4000

let random_word = function(words_req_pool) {
    return words_req_pool[Math.floor(Math.random() * words_req_pool.length)]
}

let bl_el = document.getElementsByClassName('blink-area')
let blink = setInterval(blinking_int, show_tick_time, bl_el,data)

fields = document.getElementsByClassName('choice')
const fill_answers = function() {
    clearInterval(blink)
    for (el of bl_el){
        el.style.display = 'none'
    }
    let check_pool_el = [...bl_el].filter(el => el.innerText.length != "")
    check_pool = [check_pool_el[0].innerText]
    remove_blinkers()
    while (check_pool.length < fields.length) {
        new_text_el = random_word(data)
        if (!check_pool.includes(new_text_el)) {
        check_pool.push(new_text_el)
        }}
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    shuffle(check_pool);
    [...fields].forEach(f => {f.innerHTML = check_pool.pop()})
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
    text_carrier = [...bl_el].filter(el => el.innerText.length != "")
    result = document.createElement('h4')
    if (text_carrier.textContent==event.target.textContent){
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
setTimeout(fill_answers, time_to_blink_msecs)