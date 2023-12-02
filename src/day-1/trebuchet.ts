export const decodeKeyChain = (keyChain: string[]) => {
    return keyChain.map(decodeKey).reduce((a, b) => a + b, 0)
}

const decodeKey = (key:string): number => {
    const numericKey = key.replace(/[^0-9]+/g, "");
    if (!numericKey.length) {
        throw new Error('Received invalid key');
    }
    return Number(numericKey.charAt(0) + numericKey.charAt(numericKey.length-1))
}

