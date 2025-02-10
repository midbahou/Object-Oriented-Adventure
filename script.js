// ========================== Part 1: Humble Beginnings=========================

// Let’s model a simple adventurer with basic properties such as health and an inventory. 
const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion:{
            name: "Frank",
            type: "Flea",
            belongings: ["small hat", "sunglasses"]
        }
    },
    
    roll (mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`)
    }
};

// As an additional practice exercise, create a loop that logs each item in Robin’s inventory.

for (let i = 0; i < adventurer.inventory.length; i++) {
    const adventurerItems = adventurer.inventory[i];
    console.log(adventurerItems);
}

adventurer.roll();




// ========================== Part 2: Class Fantasy =================================

// creating a Character class
class Character {
    constructor (name) {
        this.name = name;
        this. health = 100;
        this.inventory = [];
    }
    roll (mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
    }
};

const Robin = new Character("Robin");
Robin.inventory = ["sword", "potion", "artifact"];
Robin.companion = new Character("Leo");
Robin.companion.type = "Cat";
Robin.companion.companion = new Character("Frank");
Robin.companion.companion.type = "Flea";
Robin.companion.companion.belongings = ["small hat", "sunglasses"];

// let the companions roll as well
const Leo = Robin.companion;
Leo.roll();

const Frank = Leo.companion;
Frank.roll();



// ========================== Part 3: Class Features =================================

class Adventurer extends Character {
    constructor(name, role, isFlying){
        super(name);
        // Adventurer have specialized roles
        this.role = role;
        // Every adventurer starts with a bed and 50 gold coins.
        this.inventory.push("bedroll", "50 gold coins");
        // Adding a new property to the character
        this.isFlying = isFlying;
    }
    // Adventurers have the ability to scout ahead of them.
    scout(){
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
    }
}
const Robin1 = new Adventurer("Robin", "Adventurer", true);
console.log(Robin1);

