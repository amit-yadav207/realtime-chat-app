
const emojiArr = [
    "😀",
    "😺",
    "🐶",
    "🐱",
    "🐭",
    "🐰",
    "🦊",
    "🦝",
    "🐻",
    "🐼",
    "🦄",
    "🐴",
    "🦓",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐗",
    "🦛",
    "🐵",
    "🐒",
    "🦍",
    "🐔",
    "🐧",
    "🦉",
    "🦚",
    "🦜",
    "🐦",
    "🐤",
    "🐣",
    "🐥",
    "🦆",
    "🦢",
    "🦔",
    "🐍",
    "🐢",
    "🦕",
    "🦖",
    "🐙",
    "🦑",
    "🦐",
    "🐚",
    "🐠",
    "🐟",
    "🐡",
    "🐬",
    "🦈",
    "🐳",
    "🐋",
    "🦓",
    "🐅",
    "🐆",
    "🦓",
    "🦌",
    "🐘",
    "🦏",
    "🦛",
    "🐪",
    "🐫",
    "🦒",
    "🦔",
    "🦘",
    "🦙",
    "🐂",
    "🐃",
    "🐄",
    "🐎",
    "🐖",
    "🐏",
    "🐑",
    "🦌",
    "🐐",
    "🐓",
    "🦃",
    "🦚",
    "🦜",
    "🦢",
    "🦩",
    "🦎",
    "🐊",
    "🐢",
    "🦕",
    "🦖",
    "🦦",
    "🦤",
    "🐇",
    "🦢",
    "🦜",
    "🦩",
    "🦧",
    "🐿️",
    "🦔",
    "🦦",
    "🦤",
    "🦢",
    "🦜",
    "🦩",
    "🦔",
    "🐿️",
    "🦝"
]

const getRandEmoji = () => {
    return emojiArr[Math.floor(Math.random() * emojiArr.length)]
}

export default getRandEmoji