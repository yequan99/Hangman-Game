let words = ["HELLO", "WORLD", "TIKTOK", "YOUTH", "CAMP"]

function RandomWords(){
    return words[Math.floor(Math.random() * words.length)];
}

export { RandomWords };