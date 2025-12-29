let estadoJogo = "setup"
let vidaMaxAtacante = 0
let vidaMaxDefensor = 0

const btnAcao = document.getElementById("btnAcao")
const resultado = document.getElementById("resultado")

btnAcao.addEventListener("click", () => {
  if (estadoJogo === "setup") iniciarBatalha()
  else if (estadoJogo === "battle") calcularDano()
  else reiniciarJogo()
})

function iniciarBatalha() {
  const vidaA = Number(document.getElementById("vidaAtacante").value)
  const vidaD = Number(document.getElementById("vidaDefensor").value)

  if (vidaA <= 0 || vidaD <= 0) {
    alert("Defina a vida dos dois personagens!")
    return
  }

  vidaMaxAtacante = vidaA
  vidaMaxDefensor = vidaD

  estadoJogo = "battle"
  btnAcao.innerText = "⚔️ Atacar"
  resultado.innerText = "🔥 A batalha começou!"
}

function calcularDano() {
  const ataqueA = Number(document.getElementById("ataque").value)
  const poderA = Number(document.getElementById("poderAtacante").value) || 0
  const defesaD = Number(document.getElementById("defesa").value)
  const poderD = Number(document.getElementById("poderDefensor").value) || 0

  const vidaAInput = document.getElementById("vidaAtacante")
  const vidaDInput = document.getElementById("vidaDefensor")

  const escudoA = document.getElementById("escudoAtacante").checked
  const escudoD = document.getElementById("escudoDefensor").checked

  const barraA = document.getElementById("vidaAtacanteBar")
  const barraD = document.getElementById("vidaDefensorBar")

  let vidaA = Number(vidaAInput.value)
  let vidaD = Number(vidaDInput.value)

  let danoAtacante = ataqueA + poderA - (defesaD + poderD)
  if (danoAtacante < 0) danoAtacante = 0
  if (escudoD) danoAtacante *= 0.5

  const criticoA = Math.random() < 0.25
  if (criticoA) {
    danoAtacante *= 2
    efeitoCritico()
  }

  vidaD -= danoAtacante
  if (vidaD < 0) vidaD = 0

  let danoDefensor = Math.floor(Math.random() * 12) + 8
  if (escudoA) danoDefensor *= 0.6

  const criticoD = Math.random() < 0.15
  if (criticoD) {
    danoDefensor *= 2
    criarSangue()
  }

  vidaA -= danoDefensor
  if (vidaA < 0) vidaA =

vidaAInput.value = Math.round(vidaA)
  vidaDInput.value = Math.round(vidaD)

  barraA.style.width = (vidaA / vidaMaxAtacante) * 100 + "%"
  barraD.style.width = (vidaD / vidaMaxDefensor) * 100 + "%"

  resultado.innerHTML = `
    🗡️ Atacante causou ${Math.round(danoAtacante)} ${criticoA ? "💥 CRÍTICO!" : ""}<br>
    🛡️ Defensor contra-atacou com ${Math.round(danoDefensor)} ${criticoD ? "💥 CRÍTICO!" : ""}`

  if (vidaA <= 0 || vidaD <= 0) {
    estadoJogo = "end"
    btnAcao.innerText = "🔁 Jogar Novamente"

    if (vidaA <= 0 && vidaD <= 0) {
      resultado.innerHTML += "<br>⚖️ EMPATE!"
    } else if (vidaD <= 0) {
      resultado.innerHTML += "<br>🏆 ATACANTE VENCEU!"
    } else {
      resultado.innerHTML += "<br>💀 DEFENSOR VENCEU!"
    }
  }
}

function reiniciarJogo() {
  estadoJogo = "setup"
  vidaMaxAtacante = 0
  vidaMaxDefensor = 0

  resultado.innerText = ""
  btnAcao.innerText = "Começar Batalha"
}

function efeitoCritico() {
  const container = document.querySelector(".container")
  const explosao = document.getElementById("explosao")

  container.classList.add("flash", "critico")
  explosao.classList.add("ativa")
  criarSangue()

  setTimeout(() => {
    container.classList.remove("flash", "critico")
    explosao.classList.remove("ativa")
  }, 600)
}

function criarSangue() {
  const container = document.getElementById("sangueContainer")

  for (let i = 0; i < 30; i++) {
    const gota = document.createElement("div")
    gota.classList.add("sangue")

    gota.style.left = "50%"
    gota.style.top = "50%"
    gota.style.setProperty("--x", `${Math.random() * 400 - 200}px`)
    gota.style.setProperty("--y", `${Math.random() * 400 - 200}px`)

    container.appendChild(gota)
    setTimeout(() => gota.remove(), 800)
  }
}

document.getElementById("poderAtacante").addEventListener("change", function () {
  if (this.value) document.getElementById("ataque").value = this.value
})

document.getElementById("poderDefensor").addEventListener("change", function () {
  if (this.value) document.getElementById("defesa").value = this.value
})

document.getElementById("poderAtacante").addEventListener("change", function () {
  const valorPoder = Number(this.value)
  const inputAtaque = document.getElementById("ataque")

  if (valorPoder > 0) {
    inputAtaque.value = valorPoder
  }
})

document.getElementById("poderDefensor").addEventListener("change", function () {
  const valorPoder = Number(this.value)
  const inputDefesa = document.getElementById("defesa")

  if (valorPoder > 0) {
    inputDefesa.value = valorPoder
  }
})



