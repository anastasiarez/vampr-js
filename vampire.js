class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire

  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {

    let numberOfVampires = 0;
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no creator is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;


  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)

  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {

    if (this.name === name) {
      return this;
    }

    for (const offspring of this.offspring) {
      const vampire = offspring.vampireWithName(name);
      if (vampire) {
        return vampire;
      }
    }

    return null;

  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
      
      let totalDescendents = 0;
  
      for (const offspring of this.offspring) {
        totalDescendents += offspring.totalDescendents + 1;
      }
  
      return totalDescendents;
  

  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
      
      let millennialVampires = [];
  
      if (this.yearConverted > 1980) {
        millennialVampires.push(this);
      }
  
      for (const offspring of this.offspring) {
        const millennialOffspring = offspring.allMillennialVampires;
        millennialVampires = millennialVampires.concat(millennialOffspring);
      }
  
      return millennialVampires;

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

    if (this === vampire) {
      return this;
    }

    if (this.creator === null) {
      return this;
    }

    if (vampire.creator === null) {
      return vampire;
    }

    if (this.creator === vampire.creator) {
      return this.creator;
    }

    if (this.creator === vampire) {
      return vampire;
    }

    if (vampire.creator === this) {
      return this;
    }

    if (this.isMoreSeniorThan(vampire)) {
      return this.creator.closestCommonAncestor(vampire);
    } else {
      return vampire.creator.closestCommonAncestor(this);
    }

  }
}

module.exports = Vampire;

