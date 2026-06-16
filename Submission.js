class Submission {
  constructor(associatedMessage, playerId, index) {
    this.reactions = [
      "0️⃣",
      "1️⃣",
      "2️⃣",
      "3️⃣",
      "4️⃣",
      "5️⃣",
      "6️⃣",
      "7️⃣",
      "8️⃣",
      "9️⃣",
      "🔟",
    ];
    this.reaction_counts = new Array(11).fill(0);
    this.total_counts = 0;
    this.average = 0;
    this.associatedMessage = associatedMessage;
    this.playerId = playerId;
    this.index = index;
  }

  increase(number) {
    this.reaction_counts[number]++;
    this.total_counts++;
    console.log(`Increased: New average is ${this.getAverage()}`);
  }
  decrease(number) {
    this.reaction_counts[number]--;
    this.total_counts--;
    console.log(`Decreased: New average is ${this.getAverage()}`);

  }
  getSum() {
    let sum = 0;
    for (let j = 0; j < 11; j++) {
      sum += j * this.reaction_counts[j];
    }
    return sum;
  }

  getTotalCount() {
    let total = 0;
    for (let j = 0; j < 11; j++) {
      total += this.reaction_counts[j];
    }
    return total
  }

  getAverage() {
    return this.getSum() / this.total_counts;
  }
}

module.exports = Submission;
