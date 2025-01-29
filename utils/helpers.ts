
export function formated(num: number | undefined | null): string {
    if (!num) {
        return '';
    }
    if (num < 1000) {
        return num.toString();
    } else if (num < 1000000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' ' + 'K';
    } else {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' ' + 'M';
    }
}