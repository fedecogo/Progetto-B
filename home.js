
document.getElementById('btn-start').addEventListener('click',function(){
    avviaGioco()
})

function avviaGioco(){
    let difficulty = document.getElementById('difficulty').value;
    console.log(difficulty)
    if (difficulty === 'facile') {
        window.location.href = 'index.html'
    }else if (difficulty === 'medio'){
        window.location.href = ''
    } else if  (difficulty === 'difficile'){
        window.location.href = ''
    } else {
        console.log("scegli un livello")
    }
}