
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
  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
          document.getElementById("info").classList.add("fade-in");
    }, 300);
  });

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
          document.getElementById("titolo").classList.add("fade-in");
    }, 700);
  });

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
        document.getElementById("difficulty-row").classList.add("fade-in");
        document.getElementById("start-button-row").classList.add("fade-in");
    }, 1000);
});
