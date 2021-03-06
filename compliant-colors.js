let compliantColors = {
// First row of each section is the name of the platform/brand
    // For the rows that follow, the first column is the foreground color, and the columns that follow are compliant
    // background colors to match each foreground color

    // ENTER ONLY UPPERCASE CHARACTERS

    /* EXAMPLE FORMAT:

    "BRAND": {
        "#<FOREGROUNDCOLOR1>": ["#<BACKGROUNDCOLOR>", "#<BACKGROUNDCOLOR>", "#<BACKGROUNDCOLOR>"],
        "#<FOREGROUNDCOLOR2>": ["#<BACKGROUNDCOLOR>", "#<BACKGROUNDCOLOR>"],
        "#<FOREGROUNDCOLOR3>": ["#<BACKGROUNDCOLOR>", "#<BACKGROUNDCOLOR>"],
        "#<FOREGROUNDCOLOR4>": ["#<BACKGROUNDCOLOR>", "#<BACKGROUNDCOLOR>"],
    },

    */

    "MBUSA": {
        "#FFFFFF": ["#717171", "#393939", "#000000"],
        "#F1F1F1": ["#393939", "#000000"],
        "#E3E3E3": ["#393939", "#000000"],
        "#C6C6C6": ["#393939", "#000000"],
        "#999999": ["#FFFFFF", "#000000"],
        "#717171": ["#FFFFFF"],
        "#393939": ["#FFFFFF", "#F1F1F1", "#E3E3E3", "#C6C6C6", "#7EAED7", "#B2CEE7", "#E5EFF7"],
        "#000000": ["#FFFFFF", "#F1F1F1", "#E3E3E3", "#C6C6C6", "#2978BD", "#4B8DC7", "#7EAED7", "#B2CEE7", "#E5EFF7"],
        "#2978BD": ["#000000"],
        "#4B8DC7": ["#000000"],
        "#7EAED7": ["#393939", "#000000"],
        "#B2CEE7": ["#393939", "#000000"],
        "#E5EFF7": ["#393939", "#000000"],
    },

    "AMG RED": {
        "#FFFFFF": ["#717171", "#393939", "#000000", "#EB0000"],
        "#F1F1F1": ["#393939", "#000000"],
        "#E3E3E3": ["#393939", "#000000"],
        "#C6C6C6": ["#393939", "#000000"],
        "#999999": ["#FFFFFF", "#000000"],
        "#717171": ["#FFFFFF"],
        "#393939": ["#FFFFFF", "#F1F1F1", "#E3E3E3", "#C6C6C6", "#F8AAAA", "#FDE3E3"],
        "#000000": ["#FFFFFF", "#F1F1F1", "#E3E3E3", "#C6C6C6", "#EB0000", "#EF3939", "#F47171", "#F8AAAA", "#FDE3E3"],
        "#EB0000": ["#000000", "#FFFFFF"],
        "#EF3939": ["#000000"],
        "#F47171": ["#000000"],
        "#F8AAAA": ["#393939", "#000000"],
        "#FDE3E3": ["#393939", "#000000"],
    },

    "MAYBACH": {
        "#FFFFFF": ["#717171", "#393939", "#000000", "#986F32", "#2E2E4D"],
        "#F1F1F1": ["#393939", "#000000", "#2E2E4D"],
        "#E3E3E3": ["#393939", "#000000", "#2E2E4D"],
        "#C6C6C6": ["#393939", "#000000", "#2E2E4D"],
        "#999999": ["#FFFFFF", "#000000", "#2E2E4D"],
        "#717171": ["#FFFFFF"],
        "#393939": ["#FFFFFF", "#F1F1F1", "#E3E3E3", "#C6C6C6", "#C1A880", "#D6C5AB", "#EAE2D5", "#F5F0E9"],
        "#000000": ["#FFFFFF", "#F1F1F1", "#E3E3E3", "#C6C6C6", "#986F32", "#AC8B56", "#C1A880", "#D6C5AB", "#EAE2D5", "#F5F0E9"],
        "#986F32": ["#FFFFFF", "#000000"],
        "#2E2E4D": ["#FFFFFF", "#F1F1F1", "#E3E3E3", "#C6C6C6", "#999999"],
        "#AC8B56": ["#000000"],
        "#C1A880": ["#393939", "#000000"],
        "#D6C5AB": ["#393939", "#000000"],
        "#EAE2D5": ["#393939", "#000000"],
        "#F5F0E9": ["#393939", "#000000"],
    },
};
compliantColors["MB VANS"] = compliantColors["MBUSA"];    // MB VANS uses same colors as MBUSA
