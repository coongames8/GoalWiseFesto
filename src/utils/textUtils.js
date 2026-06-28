export function truncateTitle(input, value) {
    if (input.length > value) {
        return input.substring(0, value) + '...';
    }
    return input;
}
