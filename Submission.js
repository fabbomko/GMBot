/*class Submission {
  constructor() {
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
    this.addSubmission();
  }
  addSubmission() {
    console.log("Sucessfully made a submission");
  }
  increase(number) {
    this.sum = 0;
    this.reaction_counts[number]++;
    this.total_counts++;
  }
  decrease(number) {
    this.sum = 0;
    this.reaction_counts[number]--;
    this.total_counts--;
  }
  getSum() {
  
    let sum = 0; //temporary
    for (let j = 0; j < 11; j++) {
      sum += j * this.reaction_counts[j];
    }
    return sum;
  }

  getAverage() {
    return this.getSum() / this.total_counts;

      //return `${this.getSum() / this.total_counts} Total :${this.total_counts} Sum: ${this.getSum()}`;
  }
}

module.exports = Submission;*/

//ChatGPT
class Submission {
  constructor() {
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
    console.log("Successfully made a submission");
  }

 increase(number) {
    if (number < 0 || number > 10) return;
    this.reaction_counts[number]++;
    this.total_counts++;
    
    console.log(`[DEBUG] Increased index ${number}: ${this.reaction_counts[number]}, Total: ${this.total_counts}`);
 }

 decrease(number) {
    if (number < 0 || number > 10 || this.reaction_counts[number] <= 0) return;
    this.reaction_counts[number]--;
    this.total_counts--;

    console.log(`[DEBUG] Decreased index ${number}: ${this.reaction_counts[number]}, Total: ${this.total_counts}`);
 }

  getSum() {
    let sum = 0;
    for (let j = 0; j < 11; j++) {
      sum += j * this.reaction_counts[j];
    }
    return sum;
  }

  getAverage() {
    if (this.total_counts === 0) {
        console.log("[DEBUG] No reactions yet. Returning 0.");
        return 0; // Prevent division by zero
    }

    const sum = this.getSum();
    console.log(`[DEBUG] Calculating average: Sum = ${sum}, Total counts = ${this.total_counts}`);
    
    console.log(`[DEBUG] Reaction counts: ${this.reaction_counts}`);
    return sum / this.total_counts;
 }

 
}

module.exports = Submission;