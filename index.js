import characterData from "./data.js"
// import {getDiceRollArray} from "./utils.js"
import Character from "./Character.js"

let monstersArray = ["orc", "demon", "goblin"]

function getNewMonster() {
   const nextMonsterData = characterData[monstersArray.shift()]
}

function render() {
   document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
   document.getElementById('monster').innerHTML = orc.getCharacterHtml()
}

function endGame() {
   const endMessage = wizard.health === 0 && orc.health === 0 ? 'Both players are dead'
      : orc.health === 0 ? 'Orc is dead, the Wizard wins!'
      : 'Wizard is dead, the Orc wins!'
   const endEmoji = wizard.health > 0 ? '🔮' : '☠️'
   document.body.innerHTML = `
   <div class="end-game">
      <h2>Game Over</h2>
      <h3>${endMessage}</h3>
      <p class="end-emoji">${endEmoji}</p>
   </div>
   `
}

function attack() {
   wizard.getDiceHtml()
   orc.getDiceHtml()
   wizard.takeDamage(orc.currentDiceScore)
   orc.takeDamage(wizard.currentDiceScore)
   render()

   if (wizard.dead || orc.dead) {
      endGame()
   }
}

const wizard = new Character(characterData.hero)
const orc = new Character(characterData.monster)

render()


document.getElementById("attack-button").addEventListener("click", attack)
