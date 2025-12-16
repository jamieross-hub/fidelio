// Function to add the ordinal suffix
export function getOrdinalSuffix(day: number): "th" | "st" | "nd" | "rd" {
    if (day > 3 && day < 21) return "th"; // Deal with teens (11th, 12th, 13th, etc.)
    switch (day % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}
