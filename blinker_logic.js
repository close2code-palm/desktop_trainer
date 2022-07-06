// let element = HTMLElement

element = document.getElementsByClassName('great')

let show_once = function(dyn_element, content, time) {
    (setTimeout(function() {
        dyn_element.textContent = ""
    }, time))()
    dyn_element.textContent= content
    
}

//better realization in prepared pool  forEach method
// let blink = function(words_req_pool, show_time, element) {
//     setInterval( 
        
//     }, show_time)
// } 


let blinking_int = function(element, words_req_pool){
element.innerText = random_word(words_req_pool)
}

let words_req_pool = [] // from backend, somehow

//I highly recommend to optimaze it 
//considering monitor frequency
//if you really know how rendering works ^^ 
let frequency_per_minute = 3000
let show_tick_time = 60 / frequency_per_minute
let time_to_blink_msecs = 4000

let random_word = function(words_req_pool) {
    return words_req_pool[Math.floor(Math.random() * words_req_pool.length)]
}

let randint = Math.floor(Math.random() * Number) 

function checkin(area_partitions) {
    
    check_pool[randint] = last
    check_pool.forEach(element => {
        let h3 = document.createElement('h3')
        h3.textContent = element
        document.body.appendChild(h3)
    });
}



fetch('http://127.0.0.1:8000')
.then((response) => {
    console.debug(response)
    return response.json()
})
.then((l_t_json) => {
    console.debug(l_t_json)
    arg_json = l_t_json ? JSON.parse(l_t_json):{}
    let bl_el = document.getElementsByClassName('great')[0]
    let blink = setInterval(blinking_int, show_tick_time, bl_el,arg_json)
    
    const fill_answers = function() {
        clearInterval(blink)
        document.getElementsByClassName('great')[0].style.display = 'none'
        fields = document.getElementsByClassName('choice')
        let check_pool = [bl_el.textContent]
        while (check_pool.length < fields.length) {
            new_text_el = random_word(arg_json)
            if (!check_pool.includes(new_text_el)) {
            check_pool.push(new_text_el)
            }}

        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
            }
        shuffle(check_pool)
        console.log(check_pool);
        [...fields].forEach(f => {f.innerHTML = check_pool.pop()})
    }
    setTimeout(fill_answers, time_to_blink_msecs)
    // fill_answers()
    // setTimeout(clearInterval, time_to_blink_msecs, blink)
})
.catch((error) => {
    console.error(error)
})


