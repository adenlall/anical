
export const isMobile = () => {
    let userAgent = "";
    try {
        const { headers } = require("next/headers");
        userAgent = headers().get("user-agent") || "";
    } catch (error) {
        userAgent = window?.navigator?.userAgent;
    }
    return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);
};
export interface Theme {
    name: string,
    theme: string | object
}
export const currentTheme: string = "valentine"
export const themes: Theme[] = [
    {
        name: "hoodark",
        theme: {
            hoodark: {
                "primary": "#f1d396",
                "secondary": "#d7ca6b",
                "accent": "#fde047",
                "neutral": "#202017",
                "base-100": "#131709",
                "info": "#86efac",
                "success": "#10b981",
                "warning": "#fde68a",
                "error": "#fed7aa",
            },
        },
    },
    {
        name: "material",

        theme: {
            material: {
                'primary': '#6750A4',
                'primary-focus': '#4E4375',
                'primary-content': '#FFFFFF',
                'secondary': '#625B71',
                'secondary-focus': '#4B445A',
                'secondary-content': '#FFFFFF',
                'accent': '#7E46BB',
                'accent-focus': '#66379B',
                'accent-content': '#FFFFFF',
                'neutral': '#1C1B1F',
                'neutral-focus': '#313033',
                'neutral-content': '#FFFFFF',
                'base-100': '#FFFBFE',
                'base-200': '#E7E0EC',
                'base-300': '#D0BCFF',
                'base-content': '#1C1B1F',
                'info': '#5B6FBD',
                'success': '#4CAF50',
                'warning': '#FFA000',
                'error': '#B00020',
            },
        },

    },
    {
        name: "dim",
        theme: "dim"
    },
    {
        name: "cupcake",
        theme: "cupcake"
    },
    {
        name: "bumblebee",
        theme: "bumblebee"
    },
    {
        name: "emerald",
        theme: "emerald"
    },
    {
        name: "corporate",
        theme: "corporate"
    },
    {
        name: "synthwave",
        theme: "synthwave"
    },
    {
        name: "retro",
        theme: "retro"
    },
    {
        name: "valentine",
        theme: "valentine"
    },
    {
        name: "halloween",
        theme: "halloween"
    },
    {
        name: "garden",
        theme: "garden"
    },
    {
        name: "forest",
        theme: "forest"
    },
    {
        name: "lofi",
        theme: "lofi"
    },
    {
        name: "fantasy",
        theme: "fantasy"
    },
    {
        name: "dracula",
        theme: "dracula"
    },
    {
        name: "cmyk",
        theme: "cmyk"
    },
    {
        name: "autumn",
        theme: "autumn"
    },
    {
        name: "acid",
        theme: "acid"
    },
    {
        name: "lemonade",
        theme: "lemonade"
    },
    {
        name: "night",
        theme: "night"
    },
    {
        name: "coffee",
        theme: "coffee"
    },
    {
        name: "winter",
        theme: "winter"
    },
    {
        name: "nord",
        theme: "nord"
    },
    {
        name: "sunset",
        theme: "sunset"
    },
]
export async function fetchAnimeGIF(reaction: string) {
    const res = await fetch("https://api.otakugifs.xyz/gif?reaction=" + (reaction ?? reactions[Math.floor(Math.random() * reactions.length)]), { cache: 'force-cache' });
    const data = await res.json();
    return data
}
const reactions = ["airkiss", "angrystare", "bite", "bleh", "blush", "brofist", "celebrate", "cheers", "clap", "confused", "cool", "cry", "cuddle", "dance", "drool", "evillaugh", "facepalm", "handhold", "happy", "headbang", "hug", "laugh", "lick", "love", "mad", "nervous", "no", "nom", "nosebleed", "nuzzle", "nyah", "pat", "peek", "pinch", "poke", "pout", "punch", "roll", "run", "sad", "scared", "shout", "shrug", "shy", "sigh", "sip", "slap", "sleep", "slowclap", "smack", "smile", "smug", "sneeze", "sorry", "stare", "stop", "surprised", "sweat", "thumbsup", "tickle", "tired", "wave", "wink", "woah", "yawn", "yay", "yes"]