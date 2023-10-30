var pymChild = new pym.Child();

//set variables
const crosswordContainer = document.querySelector('.crossword-container');

const crosswordGrid = [
    ["B", "A", "R", "T", "", "A", "P", "T", "", "I", "S", "M", "", "", ""],
    ["A", "D", "O", "R", "A", "B", "L", "E", "", "S", "T", "A", "B", "S", ""],
    ["T", "U", "T", "O", "R", "I", "A", "L", "", "L", "Y", "R", "I", "C", ""],
    ["", "", "", "P", "U", "T", "T", "", "T", "A", "X", "I", "C", "A", "B"],
    ["D", "E", "N", "I", "M", "", "", "S", "U", "M", "", "T", "U", "N", "A"],
    ["O", "P", "E", "C", "", "L", "A", "M", "B", "", "M", "A", "L", "T", "Y"],
    ["P", "E", "W", "S", "", "I", "I", "I", "", "S", "A", "L", "T", "", ""],
    ["Y", "E", "S", "", "R", "E", "D", "T", "A", "P", "E", "", "U", "S", "A"],
    ["", "", "D", "E", "A", "N", "", "T", "I", "E", "", "G", "R", "O", "G"],
    ["T", "R", "E", "A", "T", "", "H", "E", "L", "D", "", "R", "A", "R", "E"],
    ["N", "E", "A", "R", "", "Z", "E", "N", "", "", "T", "A", "L", "E", "S"],
    ["T", "A", "L", "L", "I", "E", "D", "", "P", "L", "A", "N", "", "", ""],
    ["", "V", "E", "I", "N", "S", "", "C", "A", "U", "L", "D", "R", "O", "N"],
    ["", "E", "R", "E", "C", "T", "", "F", "I", "L", "L", "M", "O", "R", "E"],
    ["", "", "", "R", "A", "Y", "", "C", "R", "U", "", "A", "B", "E", "T"],
];

const wordStarts = [{
        row: 0,
        col: 0,
        number: 1
    },
    {
        row: 0,
        col: 1,
        number: 2
    },
    {
        row: 0,
        col: 2,
        number: 3
    },
    {
        row: 0,
        col: 3,
        number: 4
    },
    {
        row: 0,
        col: 5,
        number: 5
    },
    {
        row: 0,
        col: 6,
        number: 6
    },
    {
        row: 0,
        col: 7,
        number: 7
    },
    {
        row: 0,
        col: 9,
        number: 8
    },
    {
        row: 0,
        col: 10,
        number: 9
    },
    {
        row: 0,
        col: 11,
        number: 10
    },
    {
        row: 1,
        col: 0,
        number: 11
    },
    {
        row: 1,
        col: 4,
        number: 12
    },
    {
        row: 1,
        col: 9,
        number: 13
    },
    {
        row: 1,
        col: 12,
        number: 14
    },
    {
        row: 1,
        col: 13,
        number: 15
    },
    {
        row: 2,
        col: 0,
        number: 16
    },
    {
        row: 2,
        col: 9,
        number: 17
    },
    {
        row: 3,
        col: 3,
        number: 18
    },
    {
        row: 3,
        col: 8,
        number: 19
    },
    {
        row: 3,
        col: 14,
        number: 20
    },
    {
        row: 4,
        col: 0,
        number: 21
    },
    {
        row: 4,
        col: 1,
        number: 22
    },
    {
        row: 4,
        col: 2,
        number: 23
    },
    {
        row: 4,
        col: 7,
        number: 24
    },
    {
        row: 4,
        col: 11,
        number: 25
    },
    {
        row: 5,
        col: 0,
        number: 26
    },
    {
        row: 5,
        col: 5,
        number: 27
    },
    {
        row: 5,
        col: 6,
        number: 28
    },
    {
        row: 5,
        col: 10,
        number: 29
    },
    {
        row: 6,
        col: 0,
        number: 30
    },
    {
        row: 6,
        col: 5,
        number: 31
    },
    {
        row: 6,
        col: 9,
        number: 32
    },
    {
        row: 7,
        col: 0,
        number: 33
    },
    {
        row: 7,
        col: 4,
        number: 34
    },
    {
        row: 7,
        col: 8,
        number: 35
    },
    {
        row: 7,
        col: 12,
        number: 36
    },
    {
        row: 7,
        col: 13,
        number: 37
    },
    {
        row: 7,
        col: 14,
        number: 38
    },
    {
        row: 8,
        col: 2,
        number: 39
    },
    {
        row: 8,
        col: 3,
        number: 40
    },
    {
        row: 8,
        col: 7,
        number: 41
    },
    {
        row: 8,
        col: 11,
        number: 42
    },
    {
        row: 9,
        col: 0,
        number: 43
    },
    {
        row: 9,
        col: 1,
        number: 44
    },
    {
        row: 9,
        col: 6,
        number: 45
    },
    {
        row: 9,
        col: 11,
        number: 46
    },
    {
        row: 10,
        col: 0,
        number: 47
    },
    {
        row: 10,
        col: 5,
        number: 48
    },
    {
        row: 10,
        col: 10,
        number: 49
    },
    {
        row: 11,
        col: 0,
        number: 50
    },
    {
        row: 11,
        col: 4,
        number: 51
    },
    {
        row: 11,
        col: 8,
        number: 52
    },
    {
        row: 11,
        col: 9,
        number: 53
    },
    {
        row: 12,
        col: 1,
        number: 54
    },
    {
        row: 12,
        col: 7,
        number: 55
    },
    {
        row: 12,
        col: 12,
        number: 56
    },
    {
        row: 12,
        col: 13,
        number: 57
    },
    {
        row: 12,
        col: 14,
        number: 58
    },
    {
        row: 13,
        col: 1,
        number: 59
    },
    {
        row: 13,
        col: 7,
        number: 60
    },
    {
        row: 14,
        col: 3,
        number: 61
    },
    {
        row: 14,
        col: 7,
        number: 62
    },
    {
        row: 14,
        col: 11,
        number: 63
    },
];

var answers = [
    //across
    {
        "index": 0,
        "number": "1",
        "direction": "across",
        "word": "BART",
        "cells": ["0-0", "0-1", "0-2", "0-3"],
        'clue': "Makes the trains run on time"
    },
    {
        "index": 1,
        "number": "5",
        "direction": "across",
        "word": "APT",
        "cells": ["0-5", "0-6", "0-7"],
        'clue': "Abbreviation of common SF dwelling"
    },
    {
        "index": 2,
        "number": "8",
        "direction": "across",
        "word": "SCI",
        "cells": ["0-9", "0-10", "0-11"],
        'clue': "An ideology or theory"
    },
    {
        "index": 3,
        "number": "11",
        "direction": "across",
        "word": "ADORABLE",
        "cells": ["1-0", "1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7"],
        'clue': "Cute"
    },
    {
        "index": 4,
        "number": "13",
        "direction": "across",
        "word": "STABS",
        "cells": ["1-9", "1-10", "1-11", "1-12", "1-13"],
        'clue': "Miss Scarlet with the letter opener"
    },
    {
        "index": 5,
        "number": "16",
        "direction": "across",
        "word": "TUTORIAL",
        "cells": ["2-0", "2-1", "2-2", "2-3", "2-4", "2-5", "2-6", "2-7"],
        'clue': "Lesson"
    },
    {
        "index": 7,
        "number": "17",
        "direction": "across",
        "word": "Lyric",
        "cells": ["2-9", "2-10", "2-11", "2-12", "2-13"],
        'clue': "'If you're going to San Francisco / Be sure to wear some flowers in your hair'"
    },
    {
        "index": 8,
        "number": "18",
        "direction": "across",
        "word": "PUTT",
        "cells": ["3-3", "3-4", "3-5", "3-6"],
        'clue': "Finish the round with a short shot"
    },
    {
        "index": 9,
        "number": "19",
        "direction": "across",
        "word": "TAXICAB",
        "cells": ["3-8", "3-9", "3-10", "3-11", "3-12", "3-13", "3-14"],
        'clue': "Fewer of these since Uber and Lyft came along"
    },
    {
        "index": 10,
        "number": "21",
        "direction": "across",
        "word": "DENIM",
        "cells": ["4-0", "4-1", "4-2", "4-3", "4-4"],
        'clue': "Levi's favorite fabric"
    },
    {
        "index": 11,
        "number": "24",
        "direction": "across",
        "word": "SUM",
        "cells": ["4-7", "4-8", "4-9"],
        'clue': "Result of addition"
    },
    {
        "index": 12,
        "number": "25",
        "direction": "across",
        "word": "TUNA",
        "cells": ["4-11", "4-12", "4-13", "4-14"],
        'clue': "Musical fish"
    },
    {
        "index": 13,
        "number": "26",
        "direction": "across",
        "word": "OPEC",
        "cells": ["5-0", "5-1", "5-2", "5-3"],
        'clue': "Consortium of oil nations"
    },
    {
        "index": 14,
        "number": "27",
        "direction": "across",
        "word": "LAMB",
        "cells": ["5-5", "5-6", "5-7", "5-8", "5-9"],
        'clue': "Of God, good with mint sauce"
    },
    {
        "index": 15,
        "number": "29",
        "direction": "across",
        "word": "MALTY",
        "cells": ["5-10", "5-11", "5-12", "5-13", "5-14"],
        'clue': "Taste of Anchor Brewing's Porter"
    },
    {
        "index": 16,
        "number": "30",
        "direction": "across",
        "word": "PEWS",
        "cells": ["6-0", "6-1", "6-2", "6-3"],
        'clue': "Vampires can't sit on these chairs"
    },
    {
        "index": 17,
        "number": "31",
        "direction": "across",
        "word": "III",
        "cells": ["6-5", "6-6", "6-7"],
        'clue': "Roman three"
    },
    {
        "index": 18,
        "number": "32",
        "direction": "across",
        "word": "SALT",
        "cells": ["6-9", "6-10", "6-11", "6-12"],
        'clue': "Flavoring, best in moderation"
    },
    {
        "index": 19,
        "number": "33",
        "direction": "across",
        "word": "YES",
        "cells": ["7-0", "7-1", "7-2"],
        'clue': "Affirmative"
    },
    {
        "index": 20,
        "number": "34",
        "direction": "across",
        "word": "REDTAPE",
        "cells": ["7-4", "7-5", "7-6", "7-7", "7-8", "7-9", "7-10"],
        'clue': "Stops SF housing, according to some"
    },
    {
        "index": 21,
        "number": "36",
        "direction": "across",
        "word": "USA",
        "cells": ["7-12", "7-13", "7-14"],
        'clue': "Country that loves Halloween the most"
    },
    {
        "index": 22,
        "number": "39",
        "direction": "across",
        "word": "DEAN",
        "cells": ["8-2", "8-3", "8-4", "8-5"],
        'clue': "Head of a college"
    },
    {
        "index": 23,
        "number": "41",
        "direction": "across",
        "word": "TIE",
        "cells": ["8-7", "8-8", "8-9"],
        'clue': "Neck adornment"
    },
    {
        "index": 24,
        "number": "42",
        "direction": "across",
        "word": "GROG",
        "cells": ["8-11", "8-12", "8-13", "8-14"],
        'clue': "Drink of pirates, sailors, and scallywags"
    },
    {
        "index": 25,
        "number": "43",
        "direction": "across",
        "word": "TREAT",
        "cells": ["9-0", "9-1", "9-2", "9-3", "9-4"],
        'clue': "Not a trick"
    },
    {
        "index": 26,
        "number": "45",
        "direction": "across",
        "word": "HELD",
        "cells": ["9-6", "9-7", "9-8", "9-9"],
        'clue': "Grasped"
    },
    {
        "index": 27,
        "number": "46",
        "direction": "across",
        "word": "RARE",
        "cells": ["9-11", "9-12", "9-13", "9-14"],
        'clue': "Seldom seen steak prep"
    },
    {
        "index": 28,
        "number": "47",
        "direction": "across",
        "word": "NEAR",
        "cells": ["10-0", "10-1", "10-2", "10-3"],
        'clue': "Approach"
    },
    {
        "index": 29,
        "number": "48",
        "direction": "across",
        "word": "ZEN",
        "cells": ["10-5", "10-6", "10-7"],
        'clue': "California state of mind"
    },
    {
        "index": 30,
        "number": "49",
        "direction": "across",
        "word": "TALES",
        "cells": ["10-10", "10-11", "10-12", "10-13", "10-14"],
        'clue': "With <em>49 Down</em>, entertaining exaggerations"
    },
    {
        "index": 31,
        "number": "50",
        "direction": "across",
        "word": "TALLIED",
        "cells": ["11-0", "11-1", "11-2", "11-3", "11-4", "11-5", "11-6"],
        'clue': "Counted up"
    },
    {
        "index": 32,
        "number": "52",
        "direction": "across",
        "word": "PLAN",
        "cells": ["11-8", "11-9", "11-10", "11-11"],
        'clue': "Blueprint"
    },
    {
        "index": 33,
        "number": "54",
        "direction": "across",
        "word": "VEINS",
        "cells": ["12-1", "12-2", "12-3", "12-4", "12-5", "12-6"],
        'clue': "Vampires and miners love them"
    },
    {
        "index": 34,
        "number": "55",
        "direction": "across",
        "word": "CAULDRON",
        "cells": ["12-7", "12-8", "12-9", "12-10", "12-11", "12-12", "12-13", "12-14"],
        'clue': "Witch's pot"
    },
    {
        "index": 35,
        "number": "59",
        "direction": "across",
        "word": "ERECT",
        "cells": ["13-1", "13-2", "13-3", "13-4", "13-5"],
        'clue': "Build"
    },
    {
        "index": 36,
        "number": "60",
        "direction": "across",
        "word": "FILLMORE",
        "cells": ["13-7", "13-8", "13-9", "13-10", "13-11", "13-12", "13-13", "13-14"],
        'clue': "SF neighborhood, Harlem of the West"
    },
    {
        "index": 37,
        "number": "61",
        "direction": "across",
        "word": "RAY",
        "cells": ["14-3", "14-4", "14-5"],
        'clue': "Underwater creature with wings"
    },
    {
        "index": 38,
        "number": "62",
        "direction": "across",
        "word": "CRU",
        "cells": ["14-7", "14-8", "14-9"],
        'clue': "Group of vineyards, French"
    },
    {
        "index": 38,
        "number": "63",
        "direction": "across",
        "word": "ABET",
        "cells": ["14-11", "14-12", "14-13", "14-14"],
        'clue': "Help, criminally"
    },
    //down
    {
        "index": 39,
        "number": "1",
        "direction": "down",
        "word": "BAT",
        "cells": ["0-0", "1-0", "2-0"],
        'clue': "Spooky flying animal"
    },
    {
        "index": 40,
        "number": "2",
        "direction": "down",
        "word": "ADU",
        "cells": ["0-1", "1-1", "2-1"],
        'clue': "Stand-alone residence on same lot as a larger home, abbr."
    },
    {
        "index": 41,
        "number": "3",
        "direction": "down",
        "word": "ROT",
        "cells": ["0-2", "1-2", "2-2"],
        'clue': "Zombies do this"
    },
    {
        "index": 42,
        "number": "4",
        "direction": "down",
        "word": "TROPICS",
        "cells": ["0-3", "1-3", "2-3", "3-3", "4-3", "5-3", "6-3"],
        'clue': "Warm and wet place"
    },
    {
        "index": 43,
        "number": "5",
        "direction": "down",
        "word": "ABIT",
        "cells": ["0-5", "1-5", "2-5", "3-5"],
        'clue': "Smallest unit of electronic information"
    },
    {
        "index": 44,
        "number": "6",
        "direction": "down",
        "word": "PLAT",
        "cells": ["0-6", "1-6", "2-6", "3-6"],
        'clue': "Area of land"
    },
    {
        "index": 45,
        "number": "7",
        "direction": "down",
        "word": "TEL",
        "cells": ["0-7", "1-7", "2-7"],
        'clue': "Contact, abbr."
    },
    {
        "index": 46,
        "number": "8",
        "direction": "down",
        "word": "ISLAM",
        "cells": ["0-9", "1-9", "2-9", "3-9", "4-9"],
        'clue': "Abrahamic religion"
    },
    {
        "index": 47,
        "number": "9",
        "direction": "down",
        "word": "STYX",
        "cells": ["0-10", "1-10", "2-10", "3-10"],
        'clue': "Spooky ferryman's domain"
    },
    {
        "index": 48,
        "number": "10",
        "direction": "down",
        "word": "MARITAL",
        "cells": ["0-11", "1-11", "2-11", "3-11", "4-11", "5-11", "6-11"],
        'clue': "Of being wed"
    },
    {
        "index": 49,
        "number": "12",
        "direction": "down",
        "word": "ARUM",
        "cells": ["1-4", "2-4", "3-4", "4-4"],
        'clue': "Glass of pirate-y drink"
    },
    {
        "index": 50,
        "number": "14",
        "direction": "down",
        "word": "BICULTURAL",
        "cells": ["1-12", "2-12", "3-12", "4-12", "5-12", "6-12", "7-12", "8-12", "9-12", "10-12"],
        'clue': "Combined backgrounds"
    },
    {
        "index": 51,
        "number": "15",
        "direction": "down",
        "word": "SCANT",
        "cells": ["1-13", "2-13", "3-13", "4-13", "5-13"],
        'clue': "Almost none"
    },
    {
        "index": 52,
        "number": "19",
        "direction": "down",
        "word": "TUB",
        "cells": ["3-8", "4-8", "5-8"],
        'clue': "Politicians thump this"
    },
    {
        "index": 53,
        "number": "20",
        "direction": "down",
        "word": "BAY",
        "cells": ["3-14", "4-14", "5-14"],
        'clue': "Howling at the sea"
    },
    {
        "index": 54,
        "number": "21",
        "direction": "down",
        "word": "DOPY",
        "cells": ["4-0", "5-0", "6-0", "7-0"],
        'clue': "Howling at the sea"
    },
    {
        "index": 55,
        "number": "22",
        "direction": "down",
        "word": "EPEE",
        "cells": ["4-1", "5-1", "6-1", "7-1"],
        'clue': "Fencing sword"
    },
    {
        "index": 56,
        "number": "23",
        "direction": "down",
        "word": "NEWSDEALER",
        "cells": ["4-2", "5-2", "6-2", "7-2", "8-2", "9-2", "10-2", "11-2", "12-2", "13-2"],
        'clue': "Distributors of current affairs, archaic"
    },
    {
        "index": 57,
        "number": "24",
        "direction": "down",
        "word": "SMITTEN",
        "cells": ["4-7", "5-7", "6-7", "7-7", "8-7", "9-7", "10-7"],
        'clue': "Fallen for SF ice-cream"
    },
    {
        "index": 58,
        "number": "27",
        "direction": "down",
        "word": "LIEN",
        "cells": ["5-5", "6-5", "7-5", "8-5"],
        'clue': "Property held to secure a debt"
    },
    {
        "index": 59,
        "number": "28",
        "direction": "down",
        "word": "AID",
        "cells": ["5-6", "6-6", "7-6"],
        'clue': "Assist"
    },
    {
        "index": 60,
        "number": "29",
        "direction": "down",
        "word": "MAE",
        "cells": ["5-10", "6-10", "7-10"],
        'clue': "First name of San Franciscan, fourth woman to serve in Congress"
    },
    {
        "index": 61,
        "number": "32",
        "direction": "down",
        "word": "SPED",
        "cells": ["6-9", "7-9", "8-9", "9-9"],
        'clue': "What Steve McQueen did in <em>Bullitt</em>"
    },
    {
        "index": 62,
        "number": "34",
        "direction": "down",
        "word": "RAT",
        "cells": ["7-4", "8-4", "9-4"],
        'clue': "Plague bearer"
    },
    {
        "index": 63,
        "number": "35",
        "direction": "down",
        "word": "AIL",
        "cells": ["7-8", "8-8", "9-8"],
        'clue': "Afflict"
    },
    {
        "index": 64,
        "number": "37",
        "direction": "down",
        "word": "SORE",
        "cells": ["7-13", "8-13", "9-13", "10-13"],
        'clue': "Ticked off"
    },
    {
        "index": 65,
        "number": "38",
        "direction": "down",
        "word": "AGES",
        "cells": ["7-14", "8-14", "9-14", "10-14"],
        'clue': "Epochs"
    },
    {
        "index": 66,
        "number": "40",
        "direction": "down",
        "word": "EARLIER",
        "cells": ["8-3", "9-3", "10-3", "11-3", "12-3", "13-3", "14-3"],
        'clue': "When conservatives think the USA was better"
    },
    {
        "index": 67,
        "number": "42",
        "direction": "down",
        "word": "GRANDMA",
        "cells": ["8-11", "9-11", "10-11", "11-11", "12-11", "13-11", "14-11"],
        'clue': "Elderly female relative"
    },
    {
        "index": 68,
        "number": "43",
        "direction": "down",
        "word": "TNT",
        "cells": ["9-0", "10-0", "11-0"],
        'clue': "Explosive"
    },
    {
        "index": 69,
        "number": "44",
        "direction": "down",
        "word": "REAVE",
        "cells": ["9-1", "10-1", "11-1", "12-1", "13-1"],
        'clue': "Viking pastime"
    },
    {
        "index": 70,
        "number": "45",
        "direction": "down",
        "word": "HED",
        "cells": ["9-6", "10-6", "11-6"],
        'clue': "Journalist jargon for headline"
    },
    {
        "index": 71,
        "number": "48",
        "direction": "down",
        "word": "ZESTY",
        "cells": ["10-5", "11-5", "12-5", "13-5", "14-5"],
        'clue': "Lemon flavor"
    },
    {
        "index": 72,
        "number": "49",
        "direction": "down",
        "word": "TALL",
        "cells": ["10-10", "11-10", "12-10", "13-10"],
        'clue': "See <em>49 Across</em>"
    },
    {
        "index": 73,
        "number": "51",
        "direction": "down",
        "word": "INCA",
        "cells": ["11-4", "12-4", "13-4", "14-4"],
        'clue': "Indigenous South American culture"
    },
    {
        "index": 73,
        "number": "52",
        "direction": "down",
        "word": "PAIR",
        "cells": ["11-8", "12-8", "13-8", "14-8"],
        'clue': "Couple"
    },
    {
        "index": 74,
        "number": "53",
        "direction": "down",
        "word": "LULU",
        "cells": ["11-9", "12-9", "13-9", "14-9"],
        'clue': "With lemon, a clothing brand"
    },
    {
        "index": 75,
        "number": "55",
        "direction": "down",
        "word": "CFC",
        "cells": ["12-7", "13-7", "14-7"],
        'clue': "Damaged the ozone layer"
    },
    {
        "index": 76,
        "number": "56",
        "direction": "down",
        "word": "ROB",
        "cells": ["12-12", "13-12", "14-12"],
        'clue': "Take aggressively"
    },
    {
        "index": 77,
        "number": "57",
        "direction": "down",
        "word": "ORE",
        "cells": ["12-13", "13-13", "14-13"],
        'clue': "Rock and metal"
    },
    {
        "index": 78,
        "number": "58",
        "direction": "down",
        "word": "NET",
        "cells": ["12-14", "13-14", "14-14"],
        'clue': "Bottom line"
    }
]

let selectedCell = null;
let currentRow = 0;
let currentCol = 0;
let focusDirection = "across";
let cluesColumnHighlight = "";

//create crossword
for (let row = 0; row < crosswordGrid.length; row++) {
    const rowElement = document.createElement('div');
    rowElement.className = 'crossword-row';

    for (let col = 0; col < crosswordGrid[row].length; col++) {
        var letter = crosswordGrid[row][col];

        const cellElement = document.createElement('input');
        cellElement.className = 'crossword-cell';
        cellElement.inputMode = 'search';
        cellElement.id = 'cell-' + row + '-' + col;
        cellElement.tabIndex = 0;

        //make black squares
        if (letter == "") {
            cellElement.classList.add('empty');
            cellElement.classList.remove('crossword-cell');
        }

        //select squares
        if (letter != "") {
            cellElement.addEventListener('click', () => {
                //figure out if clicking already selected square
                previousSelection = document.getElementsByClassName('selected')[0];
                if (previousSelection != null) {
                    if (previousSelection.id == cellElement.id) {
                        focusDirection = (focusDirection == "across") ? "down" : "across";
                    }
                }
                currentRow = cellElement.id.split('-')[1];
                currentCol = cellElement.id.split('-')[2];
                updateSelected(row, col);
            });
        }

        //add in letters on keydown
        cellElement.addEventListener('input', handleInput);
        cellElement.addEventListener('keydown', handleInput);
        cellElement.addEventListener('paste', (event) => {
            event.preventDefault();
        });

        function handleInput(event) {
            //figure out cells next door
            cellToTheLeft = parseInt(currentCol) - 1
            cellToTheRight = parseInt(currentCol) + 1
            cellBelow = parseInt(currentRow) + 1
            cellAbove = parseInt(currentRow) - 1

            //LETTERS
            if (event.inputType === 'insertText') {
                const input = event.data.toUpperCase();
                if (/^[A-Z]$/.test(input)) {
                    selectedCell.value = "";
                    selectedCell.value = input;

                    if (focusDirection == "across" && currentCol < crosswordGrid[currentCol].length - 1 && crosswordGrid[currentRow][cellToTheRight] != "") {
                        //selectedCell.blur();
                        currentCol++;
                    }

                    if (focusDirection == "down" && currentRow < crosswordGrid[currentRow].length - 1 && crosswordGrid[cellBelow][currentCol] != "") {
                        //selectedCell.blur();
                        currentRow++;
                    }
                    updateSelected(currentRow, currentCol);
                } else {
                  selectedCell.value = "";
                }
                
            }

            //BACKSPACE
            else if (event.key === 'Backspace') {
                if (selectedCell.value == "") {
                    if (focusDirection == "across" && currentCol > 0 && crosswordGrid[currentRow][cellToTheLeft] != "") {
                        selectedCell.blur();
                        currentCol--;
                        updateSelected(currentRow, currentCol);
                    }
                    if (focusDirection == "down" && currentRow > 0 && crosswordGrid[cellAbove][currentCol] != "") {
                        selectedCell.blur();
                        currentRow--;
                        updateSelected(currentRow, currentCol);
                    }
                }
                selectedCell.value = "";
                answerValidation();
            }

            //ARROWS
            else if (event.key === 'ArrowUp' && currentRow > 0 && crosswordGrid[cellAbove][currentCol] != "") {
                event.preventDefault();
                currentRow--;
                updateSelected(currentRow, currentCol);
            } else if ((event.key === 'ArrowDown' && currentRow < crosswordGrid.length - 1 && crosswordGrid[cellBelow][currentCol] != "")) {
                event.preventDefault();
                currentRow++;
                updateSelected(currentRow, currentCol);
            } else if (event.key === 'ArrowLeft' && currentCol > 0 && crosswordGrid[currentRow][cellToTheLeft] != "") {
                event.preventDefault();
                currentCol--;
                updateSelected(currentRow, currentCol);
            } else if ((event.key === 'ArrowRight' && currentCol < crosswordGrid[currentRow].length - 1 && crosswordGrid[currentRow][cellToTheRight] != "")) {
                event.preventDefault();
                currentCol++;
                updateSelected(currentRow, currentCol);
            }

            //ENTER
            else if (event.key === 'Enter' && currentRow < crosswordGrid.length) {
                event.preventDefault();
                focusDirection = (focusDirection == "across") ? "down" : "across";
                updateSelected(currentRow, currentCol);
            }

            //TAB
            else if (event.key === 'Tab' || event.key === 'Next') {
                event.preventDefault();

                // Find the current index of the selected answer
                let currentIndex = -1;
                for (let i = 0; i < answers.length; i++) {
                    const answer = answers[i];
                    for (const cell of answer.cells) {
                        const cellElement = document.getElementById("cell-" + cell);
                        if (cellElement === selectedCell && answer.direction === focusDirection) {
                            currentIndex = i;
                            break;
                        }
                    }
                    if (currentIndex !== -1) {
                        break;
                    }
                }

                // Calculate the index of the next answer
                let nextIndex = currentIndex + 1;
                if (nextIndex >= answers.length) {
                    nextIndex = 0; // Loop back to the first index
                }

                // Update currentRow, currentCol, and focusDirection based on the next answer
                currentRow = answers[nextIndex].cells[0].split('-')[0];
                currentCol = answers[nextIndex].cells[0].split('-')[1];
                focusDirection = answers[nextIndex].direction;

                // Call updateSelected to update the UI
                updateSelected(currentRow, currentCol);
            }
            
        }
        rowElement.appendChild(cellElement);
    }
    crosswordContainer.appendChild(rowElement);
}

//update selected cell
function updateSelected(row, col) {
    if (selectedCell) {
        selectedCell.classList.remove('selected');
    }
    const cellElement = document.getElementById('cell-' + row + '-' + col);
    selectedCell = cellElement;
    selectedCell.classList.add('selected');
    selectedCell.focus();
    highlightAnswerCells();
    pymChild.sendHeight();
}

function highlightAnswerCells() {
    document.getElementById('highlight-clue-text').innerHTML = "";

    //highlight answer cells
    let selectedWords = []
    for (var answer of answers) {
        for (var cell of answer.cells) {
            let cellElement = document.getElementById("cell-" + cell);
            if (cellElement === selectedCell) {
                selectedWords.push(answer.word)
            }
            cellElement.classList.remove('blue_highlight');
        }
    }

    for (var answer of answers) {
        if (selectedWords.includes(answer.word)) {
            for (var cell of answer.cells) {
                if (answer.direction == focusDirection) {
                    let cellElement = document.getElementById("cell-" + cell);
                    cellElement.classList.add('blue_highlight');
                }
            }
        }
    }

    //put current clues at the top of the page
    for (var answer of answers) {
        if (selectedWords.includes(answer.word)) {
            if (answer.direction == 'across' && focusDirection == 'across') {
                var clueLabel = "<strong>" + answer.number + " Across</strong> "
                var clue = answer.clue;
                var currentAnswer = answer;
            }
            if (answer.direction == 'down' && focusDirection == 'down') {
                var clueLabel = "<strong>" + answer.number + " Down</strong> "
                var clue = answer.clue;
                var currentAnswer = answer;
            }
            document.getElementById('highlight-clue-label').innerHTML = clueLabel;
            document.getElementById('highlight-clue-text').innerHTML = clue;
        }
    }

    //highlight clue in clues column
    if (cluesColumnHighlight) {
      cluesColumnHighlight.classList.remove('clues-list-highlight') 
    }

    cluesColumnHighlight = document.getElementById(currentAnswer.number + "-" + currentAnswer.direction)
    cluesColumnHighlight.classList.add('clues-list-highlight');

    setGridElementSize();
}

//change size depending on screen size
const container = document.querySelector('.container');
const gridElements = document.querySelectorAll('.crossword-cell, .empty');
var clueHighlight = document.querySelector('.clue-highlight');

function setGridElementSize() {
    const containerWidth = container.offsetWidth;
    const gridSize = 15;
    const newSize = containerWidth / gridSize;

    gridElements.forEach((element) => {
        if (newSize < 35) {
            element.style.width = newSize + 'px';
            element.style.height = newSize + 'px';
        } else {
            element.style.width = '35px';
            element.style.height = '35px';
        }
    });

    //add superscript numbers over the top of the grid container
    const superscriptContainer = document.querySelector('.superscript-container');
    superscriptContainer.innerHTML = '';

    const containerRect = container.getBoundingClientRect();
    var clueBoxRect = clueHighlight.getBoundingClientRect();

    for (const word of wordStarts) {
        const supElement = document.createElement('sup');
        supElement.textContent = word.number;

        //calculate the left and top positions relative to the container
        if (newSize < 35) {
            supElement.style.left = (word.col * newSize + 4 + containerRect.left + clueBoxRect.left) + 'px';
            supElement.style.top = (word.row * newSize + 6 + clueBoxRect.height) + 'px';
        } else {
            supElement.style.left = (word.col * 35 + 4 + containerRect.left + clueBoxRect.left) + 'px';
            supElement.style.top = (word.row * 35 + 6 + clueBoxRect.height) + 'px';
        }

        supElement.classList.add('superscript');
        superscriptContainer.appendChild(supElement);
    }
}

function answerValidation() {
    //remove correct if not correct
    crosswordCells = document.getElementsByClassName('crossword-cell');
    for (var i = 0; i < crosswordCells.length; i++) {
        var cell = crosswordCells[i];
        if (cell.classList.contains('correct')) {
            cell.classList.remove('correct');
        }
    }

    //see if the user values grid matches the answer grid
    newGrid = [];
    for (let row = 0; row < crosswordGrid.length; row++) {
        newRow = [];
        for (let col = 0; col < crosswordGrid[row].length; col++) {
            const cellElement = document.getElementById('cell-' + row + '-' + col);
            newRow.push(cellElement.value)
        }
        newGrid.push(newRow)
    }
    var flattenedNewGrid = [].concat(...newGrid).join('-');
    var flattenedCrosswordGrid = [].concat(...crosswordGrid).join('-');

    if (flattenedNewGrid == flattenedCrosswordGrid) {
        for (var i = 0; i < crosswordCells.length; i++) {
            var cell = crosswordCells[i];
            cell.classList.add('correct');
        }
    }
}

//create clue list
var allAcrossClues = [];
var allDownClues = [];
acrossClues = document.getElementById('across-clues');
downClues = document.getElementById('down-clues');

allAcrossClues.push("<ol class='custom-list'>")
allDownClues.push("<ol class='custom-list'>")

for (var answer of answers) {
    if (answer.direction == 'across') {
        allAcrossClues.push("<li class='clue-list' id='" + answer.number + "-" + answer.direction + "'><span class='clue-label'>" + answer.number + "</span><span class='clue-text'>" + answer.clue + "</span></li>");
    }
    if (answer.direction == 'down') {
        allDownClues.push("<li class='clue-list' id='" + answer.number + "-" + answer.direction + "'><span class='clue-label'>" + answer.number + "</span><span class='clue-text'>" + answer.clue + "</span></li>");
    }
}

allAcrossClues.push("</ol>")
allDownClues.push("</ol>")

acrossClues.innerHTML = allAcrossClues.join('');
downClues.innerHTML = allDownClues.join('');

//call answerValidation whenever user inputs change
gridElements.forEach((element) => {
    element.addEventListener('input', answerValidation);
});

//create everything
setGridElementSize();
window.addEventListener('resize', setGridElementSize);
pymChild.sendHeight();