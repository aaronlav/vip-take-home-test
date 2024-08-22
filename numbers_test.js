const prompt = require('prompt-sync')({sigint: true}); // Import the prompt-sync module

function findPairs(arr, sum) {
    let allPairs = [];
    let uniquePairs = new Set();
    let seenPairs = new Set();

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i !== j && arr[i] + arr[j] === sum) {
                allPairs.push([arr[i], arr[j]]); // All pairs including duplicates

                let pair = [arr[i], arr[j]];
                let reversedPair = [arr[j], arr[i]];
                
                // Add unique pairs including reversed
                uniquePairs.add(JSON.stringify(pair));

                // Add the pair if not seen in any order
                if (!seenPairs.has(JSON.stringify(pair)) && !seenPairs.has(JSON.stringify(reversedPair))) {
                    seenPairs.add(JSON.stringify(pair));
                }
            }
        }
    }

    // Convert unique pairs Set back to array format
    let uniquePairsArray = Array.from(uniquePairs).map(JSON.parse);

    // Convert seen pairs Set back to array format
    let seenPairsArray = Array.from(seenPairs).map(JSON.parse);

    return {
        allPairs,
        uniquePairsArray,
        seenPairsArray
    };
}

// Get user input
const input = prompt("Enter an array of integers separated by commas (e.g., 1,2,3,4,5): ");
const sum = parseInt(prompt("Enter the sum value to find pairs for (e.g., 10): "));

// Convert the input string to an array of integers
let arr = input.split(',').map(Number);

let result = findPairs(arr, sum);

console.log("1) Output all pairs:", result.allPairs);
console.log("2) Output unique pairs only once:", result.uniquePairsArray);
console.log("3) Output the same combo pair only once:", result.seenPairsArray);
