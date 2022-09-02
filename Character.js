import {getDiceRollArray, getDicePlaceholderHtml, getPercentage} from "./utils.js"

// const getPercentage = (remainingHealth, maximumHealth) => (100 * remainingHealth) / maximumHealth

function Character(data) {
    Object.assign(this, data)

    this.getCharacterHtml = function() {
    const {elementID, name, avatar, health, diceCount} = this
    const healthBar = this.getHealthBarHtml()

    return `
        <div class="character-card">
            <h4 class="name"> ${name} </h4>
            <img class="avatar" src="${avatar}"/>
            <p class="health">health: <b> ${health} </b></p>
            ${healthBar}
            <div class="dice-container">
            ${this.diceArray}
            </div>
        </div>
    ` 
    }    

    this.getDiceHtml = function() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map(num => `<div class="dice">${num}</div>`).join('')
    }

    this.diceArray = getDicePlaceholderHtml(this.diceCount)
    this.takeDamage = function(attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, currentElement) => total + currentElement)
        this.health -= totalAttackScore

        
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
        }
    }
    this.maxHealth = this.health

    this.getHealthBarHtml = function() {
        const percent = getPercentage(this.health, this.maxHealth)
        return `
        <div class="health-bar-outer">
            <div class="health-bar-inner ${percent < 26 ? "Danger" : ""} " 
                style="width: ${percent}%;">
            </div>
        </div>
        `
        // document.getElementById("tester").textContent = getPercentage(this.health, this.maxHealth)
    }
}

export default Character