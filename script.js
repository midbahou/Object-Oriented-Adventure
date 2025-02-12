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

    //* Add a static MAX_HEALTH property to the Character class, equal to 100.
    static MAX_HEALTH = 100; // static property

    constructor (name) {
        this.name = name;
        this.health = Character.MAX_HEALTH; // using the static property
        this.inventory = [];
    }
    roll (mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
        return result;
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

    //* Add a static ROLES array to the Adventurer class, with the values “Fighter,” “Healer,” and “Wizard.” Feel free to add other roles, if you desire!
    static ROLES = ["Fighter", "Healer", "Wizard", "Warrior", "Adventurer"];

    constructor(name, role, isFlying){
        super(name); 

        // validate the role
        if(!Adventurer.ROLES.includes(role)){
            throw new Error (`Invalid role: ${role}. Choose from ${Adventurer.ROLES.join(", ")}`);
        }

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

    //* Create an additional method, duel(), for the Adventurer class with the following functionality:
    duel(opponent){
        // Accept an Adventurer as a parameter.
        if (!(opponent instanceof Adventurer)){
            throw new Error("Opponent is not an Adventurer!");
        }

        console.log(`${this.name} (Health: ${this.health}) is dueling ${opponent.name} (Health: ${opponent.health})!`);
        // Repeat this process until one of the two adventurers reaches 50 health.
        while(this.health > 50 && opponent.health > 50){
        // Use the roll() functionality to create opposing rolls for each adventurer.
        const advRoll = this.roll();  // this adventurer rolls
        const opponentRoll = opponent.roll(); // the opponent rolls

        // Subtract 1 from the adventurer with the lower roll.
        if (advRoll > opponentRoll) {
            opponent.health -= 1; // Reduce opponent health by 1
            console.log(`${this.name} wins this round! ${opponent.name} loses 1 health! Results are ${this.name} (Health: ${this.health}) VS ${opponent.name} (Health: ${opponent.health})`);
            
        } else if (advRoll < opponentRoll) {
            this.health -= 1; // Reduce this adventurer's health by 1
            console.log(`${opponent.name} wins this round! ${this.name} loses 1 health! Results are ${this.name} (Health: ${this.health}) VS ${opponent.name} (Health: ${opponent.health})`);

        } else {
            // if both rolls are the same it's a tie
            console.log(`It's a tie! No damage this round!`);  
        }
    }

    //  Log the winner of the duel: the adventurer still above 50 health.
    if (this.health > 50) {
        console.log(`${this.name} is the Winner! ${opponent.name} falls bellow 50 health`);
    } else {
        console.log(`${opponent.name} is the Winner! ${this.name} falls bellow 50 health`);
    }
    }
}

// let's try and catch our error
try {
    const Robin = new Adventurer("Robin", "Fighter", false); // Valid
    console.log(Robin);

    const Adam = new Adventurer("Knight", "Knight", true); // invalid role
    console.log(Adam);
    
} catch (error) {
    console.error(error.message);
}

const Robin1 = new Adventurer("Robin", "Fighter", true);
console.log(Robin1);


// ========================== Companion Class =================================

//* Next, create a Companion class with properties and methods specific to the companions.
class companion extends Character {
    constructor(name, type, belongings = []){
        super(name);
        // companion have a unique type
        this.type = type;
        this.belongings = belongings;
    }

    // a unique method for companion
    play(){
        console.log(`${this.name} the ${this.type} is playing.`);
    }
}

// let's create a companion instance
const Leo1 = new companion("Leo", "Cat");
Leo1.belongings.push("small collar");
// Leo1.play();

const Frank1 = new companion("Frank", "Flea", ["small hat", "sunglasses"]);
Frank1.play()


//* Finally, change the declaration of Robin and the companions to use the new Adventurer and Companion classes.
// we gonna create Robin as an Adventurer
const Robin2 = new Adventurer("Robin", "Fighter", false);
Robin.inventory.push("sword", "potion", "artifact");

// create Leo as a companion
const Leo2 = new companion("Leo", "Cat", ["small hat"]);

// create Frank as a companion
const Frank2 =  new companion("Frank", "Flea", ["sunglasses"]);
Frank2.belongings.push("tiny sword");

// Assigning companion
Robin2.companion = Leo2;
Leo2.companion = Frank2;

// let everyone roll
Robin2.roll();
Leo2.roll();
Frank2.roll();

// let companion play
Leo2.play();
Frank2.play();


// ============================== Part 4: Class Uniforms ==================================
//* Add a static MAX_HEALTH property to the Character class, equal to 100.
console.log(Character.MAX_HEALTH);




// ============================== Part 5: Gather your Party ==================================

class AdventurerFactory {  
  constructor (role) {
    this.role = role;
    this.adventurers = [];
  }
  generate (name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
  }
  findByIndex (index) {
    return this.adventurers[index];
  }
  findByName (name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

const healers = new AdventurerFactory("Healer");
const robin = healers.generate("Robin");


// ========================== Testing Duel =================================
const warrior1 = new Adventurer("Thor", "Warrior", false);
const warrior2 = new Adventurer("Superman", "Warrior", true);

// Example Battle Simulation
warrior1.duel(warrior2);