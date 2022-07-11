// TODO add function to increment and decrement 
// for gamification
// or some kind of speed panel

// TODO add nine parts for blinking, also use 
// words of different length


let data = JSON.parse(data_f)[0].flashes // data_f in nearby .json



//I highly recommend to optimaze it 
//considering monitor frequency
//if you really know how rendering works ^^ 
// let frequency_per_minute = 100


let random_word = function(words_req_pool) {
    return words_req_pool[Math.floor(Math.random() * words_req_pool.length)]
}

let blinking_int = function(elements, words_req_pool){
    function is_texted(element, index, array){
        if (element.innerText != ""){
            return true
        }
        return false
    }
    not_to_jump = [...elements].find(is_texted);
    let not_jump_to_ind = [...elements].indexOf(not_to_jump);
    [...elements][not_jump_to_ind].innerText = ""
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



const create_answer_areas = () => {
    answers_container = document.createElement('div')
    answers_container.className = 'answers-container'
    body = document.getElementsByTagName('body')[0]
    body.appendChild(answers_container)
    for (let i = 0; i < 8; ++i) {
        field = document.createElement('div')
        field.className = 'choice'
        field.style.visibility = 'hidden'
        answers_container.appendChild(field)
    }
}

const create_blink_areas = () => {
    blink_container = document.createElement('div')
    blink_container.className = 'blink-container'
    body = document.getElementsByTagName('body')[0]
    body.appendChild(blink_container)
    const blinker = document.createElement('div');
    blinker.className = 'blink-area'
    blinker.innerText = 'Загрузка...'
    blink_container.appendChild(blinker)
    for (let i = 0; i < 3; ++i) {
        const blinker = document.createElement('div');
        blinker.className = 'blink-area'
        blink_container.appendChild(blinker)
    }
}

const fill_answers = function() {
    clearInterval(this)
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

const reset = () => {
    localStorage.removeItem('user_freq')
    clear_input()
    get_level()
}

const check_last = function(event) {
    hide_answers()
    result = document.createElement('h4')
    reset_btn = document.createElement('button')
    continue_button = document.createElement('button')
    buttons_legend_cont = document.createElement('div')
    buttons_legend_cont.className = 'b-l-cont'
    continue_button.innerHTML = 'Играем'
    continue_button.onclick = stage
    reset_btn.onclick = reset
    reset_btn.innerText = 'Сброс настроек'
    current_speed = document.createElement('p')
    if (globalThis.answer==event.target.textContent){
        remove_answers()
        result.innerText = 'Верно!'
        globalThis.frequency_per_minute += 25
        localStorage.setItem('user_freq', globalThis.frequency_per_minute)
    } else {
        remove_answers()
        result.innerText = "Неверно..."
        globalThis.frequency_per_minute -= 25
        localStorage.setItem('user_freq', globalThis.frequency_per_minute)
    }
    freq_after_stage = globalThis.frequency_per_minute
    current_speed.innerText = `Текущая частота - ${freq_after_stage}
        обновлений в минуту`
    document.body.appendChild(result)
    document.body.appendChild(buttons_legend_cont)
    buttons_legend_cont.appendChild(reset_btn)
    buttons_legend_cont.appendChild(continue_button)
    buttons_legend_cont.appendChild(current_speed)
}


let stage = function() {
    clear_input()
    create_blink_areas()

    freq_prep = globalThis.frequency_per_minute
    if (freq_prep < 1) {
        globalThis.frequency_per_minute = 30;
        freq_prep = 25;
    }
    let show_tick_time = 60000 / freq_prep
    bl_el = document.getElementsByClassName('blink-area')
    let blink = setInterval(blinking_int, show_tick_time, bl_el,data)
    
    let stage_decide = fill_answers.bind(blink)
    create_answer_areas()

    fields = document.getElementsByClassName('choice')

    for (const el of fields){
        el.onclick = check_last
    }
    
    setTimeout(stage_decide, time_to_blink_msecs)
}


const get_level = () => {
    label = document.createElement('label')
    label.innerText = "Введите начальную скорость:"
    text_input = document.createElement('input')
    text_input.type = 'text'
    text_input.className = 'freq'
    submit_btn = document.createElement('button')
    submit_btn.className = 'input-button'
    submit_btn.type = 'submit'
    submit_btn.onclick = accept_input
    submit_btn.innerText = 'Введено'
    document.body.appendChild(label)
    document.body.appendChild(text_input)
    document.body.appendChild(submit_btn)
}

const clear_input = () => {
    document.body.replaceChildren()
}

const accept_input = function() {
    input_val = document.getElementsByClassName('freq')[0].value
    if (isNaN(input_val) || Number(input_val) < 1) {
        alert("Натуральным числом!")
    } else {
        window.localStorage.setItem('user_freq', input_val)
        this.frequency_per_minute = Number(input_val)
        // clear_input()
        stage()
    }
}

let time_to_blink_msecs = 4000

if (localStorage.getItem('user_freq')===null){
    get_level()
} else {
    freq = localStorage.getItem('user_freq')
    this.frequency_per_minute = Number(freq)
    stage()
}


// stage()