export function getRandomNumber(min, max) {
    let randomNumber = Math.random() * (max - min) + min;
    if(min < 0)
        randomNumber *= Math.round(Math.random()) < 0.5 ? -1 : 1;
    return randomNumber;
}