
const crosswordGrid = [
    ["M", "A", "I", "M", "", "", "", "P", "E", "T", "", "", "S", "C", "I"],
    ["A", "L", "O", "A", "D", "", "B", "L", "A", "H", "", "L", "E", "O", "S"],
    ["N", "E", "W", "C", "O", "L", "L", "E", "G", "E", "", "A", "T", "V", "S"],
    ["", "C", "A", "R", "N", "A", "V", "A", "L", "", "A", "D", "I", "E", "U"],
    ["", "", "", "A", "N", "O", "D", "", "E", "L", "M", "O", "N", "T", "E"],
    ["B", "L", "A", "M", "E", "S", "", "", "", "I", "A", "N", "", "", ""],
    ["D", "A", "T", "E", "R", "", "C", "H", "A", "C", "H", "A", "C", "H", "A"],
    ["R", "I", "O", "", "", "S", "A", "U", "C", "E", "", "", "O", "A", "R"],
    ["M", "R", "P", "I", "C", "K", "L", "E", "S", "", "S", "T", "I", "L", "T"],
    ["", "", "", "F", "Y", "I", "", "", "", "C", "A", "R", "L", "O", "S"],
    ["S", "A", "N", "T", "A", "N", "A", "", "R", "O", "T", "I", "", "", ""],
    ["A", "D", "O", "R", "N", "", "G", "R", "I", "M", "I", "E", "S", "T", ""],
    ["L", "I", "E", "U", "", "R", "E", "A", "S", "O", "N", "S", "W", "H", "Y"],
    ["S", "O", "L", "E", "", "I", "N", "R", "E", "", "S", "T", "A", "R", "E"],
    ["A", "S", "S", "", "", "A", "T", "E", "", "", "", "O", "N", "U", "S"],
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
        col: 7,
        number: 5
    },
    {
        row: 0,
        col: 8,
        number: 6
    },
    {
        row: 0,
        col: 9,
        number: 7
    },
    {
        row: 0,
        col: 12,
        number: 8
    },
    {
        row: 0,
        col: 13,
        number: 9
    },
    {
        row: 0,
        col: 14,
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
        col: 6,
        number: 13
    },
    {
        row: 1,
        col: 11,
        number: 14
    },
    {
        row: 2,
        col: 0,
        number: 15
    },
    {
        row: 2,
        col: 5,
        number: 16
    },
    {
        row: 2,
        col: 11,
        number: 17
    },
    {
        row: 3,
        col: 1,
        number: 18
    },
    {
        row: 3,
        col: 10,
        number: 19
    },
    {
        row: 4,
        col: 3,
        number: 20
    },
    {
        row: 4,
        col: 8,
        number: 21
    },
    {
        row: 4,
        col: 9,
        number: 22
    },
    {
        row: 5,
        col: 0,
        number: 23
    },
    {
        row: 5,
        col: 1,
        number: 24
    },
    {
        row: 5,
        col: 2,
        number: 25
    },
    {
        row: 5,
        col: 9,
        number: 26
    },
    {
        row: 6,
        col: 0,
        number: 27
    },
    {
        row: 6,
        col: 6,
        number: 28
    },
    {
        row: 6,
        col: 7,
        number: 29
    },
    {
        row: 6,
        col: 8,
        number: 30
    },
    {
        row: 6,
        col: 12,
        number: 31
    },
    {
        row: 6,
        col: 13,
        number: 32
    },
    {
        row: 6,
        col: 14,
        number: 33
    },
    {
        row: 7,
        col: 0,
        number: 34
    },
    {
        row: 7,
        col: 5,
        number: 35
    },
    {
        row: 7,
        col: 12,
        number: 36
    },
    {
        row: 8,
        col: 0,
        number: 37
    },
    {
        row: 8,
        col: 3,
        number: 38
    },
    {
        row: 8,
        col: 4,
        number: 39
    },
    {
        row: 8,
        col: 10,
        number: 40
    },
    {
        row: 8,
        col: 11,
        number: 41
    },
    {
        row: 9,
        col: 3,
        number: 42
    },
    {
        row: 9,
        col: 9,
        number: 43
    },
    {
        row: 10,
        col: 0,
        number: 44
    },
    {
        row: 10,
        col: 1,
        number: 45
    },
    {
        row: 10,
        col: 2,
        number: 46
    },
    {
        row: 10,
        col: 6,
        number: 47
    },
    {
        row: 10,
        col: 8,
        number: 48
    },
    {
        row: 11,
        col: 0,
        number: 49
    },
    {
        row: 11,
        col: 6,
        number: 50
    },
    {
        row: 11,
        col: 7,
        number: 51
    },
    {
        row: 11,
        col: 12,
        number: 52
    },
    {
        row: 11,
        col: 13,
        number: 53
    },
    {
        row: 12,
        col: 0,
        number: 54
    },
    {
        row: 12,
        col: 5,
        number: 55
    },
    {
        row: 12,
        col: 14,
        number: 56
    },
    {
        row: 13,
        col: 0,
        number: 57
    },
    {
        row: 13,
        col: 5,
        number: 58
    },
    {
        row: 13,
        col: 10,
        number: 59
    },
    {
        row: 14,
        col: 0,
        number: 60
    },
    {
        row: 14,
        col: 5,
        number: 61
    },
    {
        row: 14,
        col: 11,
        number: 62
    },
];

var answers = [
    //across
    {
        "index": 0,
        "number": "1",
        "direction": "across",
        "word": "MAIM",
        "cells": ["0-0", "0-1", "0-2", "0-3"],
        'clue': "Hurt badly"
    },
    {
        "index": 1,
        "number": "5",
        "direction": "across",
        "word": "PET",
        "cells": ["0-7", "0-8", "0-9"],
        'clue': "What SF's young people often have instead of a child"
    },
    {
        "index": 2,
        "number": "8",
        "direction": "across",
        "word": "SCI",
        "cells": ["0-12", "0-13", "0-14"],
        'clue': "___-fi"
    },
    {
        "index": 3,
        "number": "11",
        "direction": "across",
        "word": "ALOAD",
        "cells": ["1-0", "1-1", "1-2", "1-3", "1-4"],
        'clue': "Tons (of)"
    },
    {
        "index": 4,
        "number": "13",
        "direction": "across",
        "word": "BLAH",
        "cells": ["1-6", "1-7", "1-8", "1-9"],
        'clue': "So-so"
    },
    {
        "index": 5,
        "number": "14",
        "direction": "across",
        "word": "LEOS",
        "cells": ["1-11", "1-12", "1-13", "1-14"],
        'clue': "Some August babies"
    },
    {
        "index": 6,
        "number": "15",
        "direction": "across",
        "word": "NEWCOLLEGE",
        "cells": ["2-0", "2-1", "2-2", "2-3", "2-4", "2-5", "2-6", "2-7", "2-8", "2-9"],
        'clue': "Valencia St institution that lost accreditation in 2008"
    },
    {
        "index": 7,
        "number": "17",
        "direction": "across",
        "word": "ATVS",
        "cells": ["2-11", "2-12", "2-13", "2-14"],
        'clue': "Rugged rides, for short"
    },
    {
        "index": 8,
        "number": "18",
        "direction": "across",
        "word": "CARNAVAL",
        "cells": ["3-1", "3-2", "3-3", "3-4", "3-5", "3-6", "3-7", "3-8"],
        'clue': "Mission <a target='_blank' href='https://missionlocal.org/2023/05/carnaval-turns-45-aztec-dancing-lowriders-dress-blues/'>parade and festival</a> turning 45 this year"
    },
    {
        "index": 9,
        "number": "19",
        "direction": "across",
        "word": "ADIEU",
        "cells": ["3-10", "3-11", "3-12", "3-13", "3-14"],
        'clue': "It can be bid"
    },
    {
        "index": 10,
        "number": "20",
        "direction": "across",
        "word": "ANOD",
        "cells": ["4-3", "4-4", "4-5", "4-6"],
        'clue': "Give ___ to (approve)"
    },
    {
        "index": 11,
        "number": "21",
        "direction": "across",
        "word": "ELMONTE",
        "cells": ["4-8", "4-9", "4-10", "4-11", "4-12", "4-13", "4-14"],
        'clue': "City in Los Angeles County, literally 'the mountain'"
    },
    {
        "index": 12,
        "number": "23",
        "direction": "across",
        "word": "BLAMES",
        "cells": ["5-0", "5-1", "5-2", "5-3", "5-4", "5-5"],
        'clue': "Points a finger at"
    },
    {
        "index": 13,
        "number": "26",
        "direction": "across",
        "word": "IAN",
        "cells": ["5-9", "5-10", "5-11"],
        'clue': "Sir McKellen, to friends"
    },
    {
        "index": 14,
        "number": "27",
        "direction": "across",
        "word": "DATER",
        "cells": ["6-0", "6-1", "6-2", "6-3", "6-4"],
        'clue': "Someone on apps, maybe"
    },
    {
        "index": 15,
        "number": "28",
        "direction": "across",
        "word": "CHACHACHA",
        "cells": ["6-6", "6-7", "6-8", "6-9", "6-10", "6-11", "6-12", "6-13", "6-14"],
        'clue': "Longstanding Caribbean spot <a target='_blank' href='https://missionlocal.org/2023/08/cha-cha-cha-returns-to-mission/'>now reopening</a>"
    },
    {
        "index": 16,
        "number": "34",
        "direction": "across",
        "word": "RIO",
        "cells": ["7-0", "7-1", "7-2"],
        'clue': "With 'El,' <a target='_blank' href='https://missionlocal.org/2019/10/cheers-el-rio-patrons-drink-to-its-survival-after-nonprofit-buys-mission-street-building/'>Queer dive</a> supported by MEDA since 2019"
    },
    {
        "index": 17,
        "number": "35",
        "direction": "across",
        "word": "SAUCE",
        "cells": ["7-5", "7-6", "7-7", "7-8", "7-9"],
        'clue': "Booze"
    },
    {
        "index": 18,
        "number": "36",
        "direction": "across",
        "word": "OAR",
        "cells": ["7-12", "7-13", "7-14"],
        'clue': "Paddle"
    },
    {
        "index": 19,
        "number": "37",
        "direction": "across",
        "word": "MRPICKLES",
        "cells": ["8-0", "8-1", "8-2", "8-3", "8-4", "8-5", "8-6", "8-7", "8-8"],
        'clue': "<a target='_blank' href='https://missionlocal.org/2009/03/9412/'>Sandwich store</a> mascot stolen and returned in 2009"
    },
    {
        "index": 20,
        "number": "40",
        "direction": "across",
        "word": "STILT",
        "cells": ["8-10", "8-11", "8-12", "8-13", "8-14"],
        'clue': "Support for the circus?"
    },
    {
        "index": 21,
        "number": "42",
        "direction": "across",
        "word": "FYI",
        "cells": ["9-3", "9-4", "9-5"],
        'clue': "'Heads up...'"
    },
    {
        "index": 22,
        "number": "43",
        "direction": "across",
        "word": "CARLOS",
        "cells": ["9-9", "9-10", "9-11", "9-12", "9-13", "9-14"],
        'clue': "With <em>44 Across</em>, local rock legend whose face was <a target='_blank' href='https://missionlocal.org/2022/06/new-familia-santana-mural-to-be-restored/'>scraped off</a> a BART Plaza mural in 2022"
    },
    {
        "index": 23,
        "number": "44",
        "direction": "across",
        "word": "SANTANA",
        "cells": ["10-0", "10-1", "10-2", "10-3", "10-4", "10-5", "10-6"],
        'clue': "See <em>43 Across</em>"
    },
    {
        "index": 24,
        "number": "48",
        "direction": "across",
        "word": "ROTI",
        "cells": ["10-8", "10-9", "10-10", "10-11"],
        'clue': "Menu item at Pakwan"
    },
    {
        "index": 25,
        "number": "49",
        "direction": "across",
        "word": "ADORN",
        "cells": ["11-0", "11-1", "11-2", "11-3", "11-4"],
        'clue': "Deck out"
    },
    {
        "index": 26,
        "number": "50",
        "direction": "across",
        "word": "GRIMIEST",
        "cells": ["11-6", "11-7", "11-8", "11-9", "11-10", "11-11", "11-12", "11-13"],
        'clue': "Superlative for San Francisco, to doom-loopers"
    },
    {
        "index": 27,
        "number": "54",
        "direction": "across",
        "word": "LIEU",
        "cells": ["12-0", "12-1", "12-2", "12-3"],
        'clue': "In ___ of"
    },
    {
        "index": 28,
        "number": "55",
        "direction": "across",
        "word": "REASONSWHY",
        "cells": ["12-5", "12-6", "12-7", "12-8", "12-9", "12-10", "12-11", "12-12", "12-13", "12-14"],
        'clue': "17 ___: an <a target='_blank' href='https://missionlocal.org/2016/11/17-reasons-remembered/'>iconic sign removed</a> from Mission and 17th"
    },
    {
        "index": 29,
        "number": "57",
        "direction": "across",
        "word": "SOLE",
        "cells": ["13-0", "13-1", "13-2", "13-3"],
        'clue': "Lone"
    },
    {
        "index": 30,
        "number": "58",
        "direction": "across",
        "word": "INRE",
        "cells": ["13-5", "13-6", "13-7", "13-8"],
        'clue': "About, on a memo"
    },
    {
        "index": 31,
        "number": "59",
        "direction": "across",
        "word": "STARE",
        "cells": ["13-10", "13-11", "13-12", "13-13", "13-14"],
        'clue': "Rubberneck"
    },
    {
        "index": 32,
        "number": "60",
        "direction": "across",
        "word": "ASS",
        "cells": ["14-0", "14-1", "14-2"],
        'clue': "Fool"
    },
    {
        "index": 33,
        "number": "61",
        "direction": "across",
        "word": "ATE",
        "cells": ["14-5", "14-6", "14-7"],
        'clue': "Put away"
    },
    {
        "index": 34,
        "number": "62",
        "direction": "across",
        "word": "ONUS",
        "cells": ["14-11", "14-12", "14-13", "14-14"],
        'clue': "Burden"
    },
    //down
    {
        "index": 35,
        "number": "1",
        "direction": "down",
        "word": "MAN",
        "cells": ["0-0", "1-0", "2-0"],
        'clue': "'Oh, brother!'"
    },
    {
        "index": 36,
        "number": "2",
        "direction": "down",
        "word": "ALEC",
        "cells": ["0-1", "1-1", "2-1", "3-1"],
        'clue': "Actor Baldwin"
    },
    {
        "index": 37,
        "number": "3",
        "direction": "down",
        "word": "IOWA",
        "cells": ["0-2", "1-2", "2-2", "3-2"],
        'clue': "Midwestern state whose GDP is about $100 billion less than SF's"
    },
    {
        "index": 38,
        "number": "4",
        "direction": "down",
        "word": "MACRAME",
        "cells": ["0-3", "1-3", "2-3", "3-3", "4-3", "5-3", "6-3"],
        'clue': "Knotty stuff"
    },
    {
        "index": 39,
        "number": "5",
        "direction": "down",
        "word": "PLEA",
        "cells": ["0-7", "1-7", "2-7", "3-7"],
        'clue': "Nima Momeni's was <a target='_blank' href='https://missionlocal.org/2023/08/nima-momeni-not-guilty-seized-bmw/'>'not guilty'</a>"
    },
    {
        "index": 40,
        "number": "6",
        "direction": "down",
        "word": "EAGLE",
        "cells": ["0-8", "1-8", "2-8", "3-8", "4-8"],
        'clue': "Avian namesake of classic SoMa leather bar"
    },
    {
        "index": 41,
        "number": "7",
        "direction": "down",
        "word": "THE",
        "cells": ["0-9", "1-9", "2-9"],
        'clue': "Oft-eulogized scene in the city, with <em>33 Down</em>"
    },
    {
        "index": 42,
        "number": "8",
        "direction": "down",
        "word": "SETIN",
        "cells": ["0-12", "1-12", "2-12", "3-12", "4-12"],
        'clue': "Dawn on"
    },
    {
        "index": 43,
        "number": "9",
        "direction": "down",
        "word": "COVET",
        "cells": ["0-13", "1-13", "2-13", "3-13", "4-13"],
        'clue': "Bad thing to do to a neighbor's wife"
    },
    {
        "index": 44,
        "number": "10",
        "direction": "down",
        "word": "ISSUE",
        "cells": ["0-14", "1-14", "2-14", "3-14", "4-14"],
        'clue': "Voter's concern"
    },
    {
        "index": 45,
        "number": "12",
        "direction": "down",
        "word": "DONNER",
        "cells": ["1-4", "2-4", "3-4", "4-4", "5-4", "6-4"],
        'clue': "'Party' you wouldn't've wanted an invitation to"
    },
    {
        "index": 46,
        "number": "13",
        "direction": "down",
        "word": "BLVD",
        "cells": ["1-6", "2-6", "3-6", "4-6"],
        'clue': "Geary or Octavia abbr."
    },
    {
        "index": 47,
        "number": "14",
        "direction": "down",
        "word": "LADONA",
        "cells": ["1-11", "2-11", "3-11", "4-11", "5-11", "6-11"],
        'clue': "Local reggaeton icon <a target='_blank' href='https://missionlocal.org/2021/06/neighborhood-notes-a-mural-of-la-dona-an-art-crawl-pride-party-and-more/'>muralized</a> at 26th and Mission"
    },
    {
        "index": 48,
        "number": "16",
        "direction": "down",
        "word": "LAOS",
        "cells": ["2-5", "3-5", "4-5", "5-5"],
        'clue': "Vietnam neighbor"
    },
    {
        "index": 49,
        "number": "19",
        "direction": "down",
        "word": "AMAH",
        "cells": ["3-10", "4-10", "5-10", "6-10"],
        'clue': "Chinese term for nursemaid"
    },
    {
        "index": 50,
        "number": "22",
        "direction": "down",
        "word": "LICE",
        "cells": ["4-9", "5-9", "6-9", "7-9"],
        'clue': "Head case?"
    },
    {
        "index": 51,
        "number": "23",
        "direction": "down",
        "word": "BDRM",
        "cells": ["5-0", "6-0", "7-0", "8-0"],
        'clue': "Rental listing abbr."
    },
    {
        "index": 52,
        "number": "24",
        "direction": "down",
        "word": "LAIR",
        "cells": ["5-1", "6-1", "7-1", "8-1"],
        'clue': "Hideout"
    },
    {
        "index": 53,
        "number": "25",
        "direction": "down",
        "word": "ATOP",
        "cells": ["5-2", "6-2", "7-2", "8-2"],
        'clue': "On"
    },
    {
        "index": 54,
        "number": "28",
        "direction": "down",
        "word": "CAL",
        "cells": ["6-6", "7-6", "8-6"],
        'clue': "East Bay school, familiarly"
    },
    {
        "index": 55,
        "number": "29",
        "direction": "down",
        "word": "HUE",
        "cells": ["6-7", "7-7", "8-7"],
        'clue': "Plum or peach"
    },
    {
        "index": 56,
        "number": "30",
        "direction": "down",
        "word": "ACS",
        "cells": ["6-8", "7-8", "8-8"],
        'clue': "Cooling units, for short"
    },
    {
        "index": 57,
        "number": "31",
        "direction": "down",
        "word": "COIL",
        "cells": ["6-12", "7-12", "8-12", "9-12"],
        'clue': "Slinky shape"
    },
    {
        "index": 58,
        "number": "32",
        "direction": "down",
        "word": "HALO",
        "cells": ["6-13", "7-13", "8-13", "9-13"],
        'clue': "Saintly glow"
    },
    {
        "index": 59,
        "number": "33",
        "direction": "down",
        "word": "ARTS",
        "cells": ["6-14", "7-14", "8-14", "9-14"],
        'clue': "See <em>7 Down</em>"
    },
    {
        "index": 60,
        "number": "35",
        "direction": "down",
        "word": "SKIN",
        "cells": ["7-5", "8-5", "9-5", "10-5"],
        'clue': "Scrape"
    },
    {
        "index": 61,
        "number": "38",
        "direction": "down",
        "word": "IFTRUE",
        "cells": ["8-3", "9-3", "10-3", "11-3", "12-3", "13-3"],
        'clue': "'In that case...'"
    },
    {
        "index": 62,
        "number": "39",
        "direction": "down",
        "word": "CYAN",
        "cells": ["8-4", "9-4", "10-4", "11-4"],
        'clue': "Printer's blue"
    },
    {
        "index": 63,
        "number": "40",
        "direction": "down",
        "word": "SATINS",
        "cells": ["8-10", "9-10", "10-10", "11-10", "12-10", "13-10"],
        'clue': "Quinceañera fabrics, maybe"
    },
    {
        "index": 64,
        "number": "41",
        "direction": "down",
        "word": "TRIESTO",
        "cells": ["8-11", "9-11", "10-11", "11-11", "12-11", "13-11", "14-11"],
        'clue': "Sees if one can"
    },
    {
        "index": 65,
        "number": "43",
        "direction": "down",
        "word": "COMO",
        "cells": ["9-9", "10-9", "11-9", "12-9"],
        'clue': "'___ estas?'"
    },
    {
        "index": 66,
        "number": "44",
        "direction": "down",
        "word": "SALSA",
        "cells": ["10-0", "11-0", "12-0", "13-0", "14-0"],
        'clue': "Roja o verde"
    },
    {
        "index": 67,
        "number": "45",
        "direction": "down",
        "word": "ADIOS",
        "cells": ["10-1", "11-1", "12-1", "13-1", "14-1"],
        'clue': "<em>19 Across</em> en español"
    },
    {
        "index": 68,
        "number": "46",
        "direction": "down",
        "word": "NOELS",
        "cells": ["10-2", "11-2", "12-2", "13-2", "14-2"],
        'clue': "Carols"
    },
    {
        "index": 69,
        "number": "47",
        "direction": "down",
        "word": "AGENT",
        "cells": ["10-6", "11-6", "12-6", "13-6", "14-6"],
        'clue': "Plant, maybe"
    },
    {
        "index": 70,
        "number": "48",
        "direction": "down",
        "word": "RISE",
        "cells": ["10-8", "11-8", "12-8", "13-8"],
        'clue': "Get out of bed"
    },
    {
        "index": 71,
        "number": "51",
        "direction": "down",
        "word": "RARE",
        "cells": ["11-7", "12-7", "13-7", "14-7"],
        'clue': "Red in the middle"
    },
    {
        "index": 72,
        "number": "52",
        "direction": "down",
        "word": "SWAN",
        "cells": ["11-12", "12-12", "13-12", "14-12"],
        'clue': "Late local icon <a target='_blank' href='https://missionlocal.org/2017/02/the-swan-who-feeds-and-cares-for-sfs-pigeons/'>Lone Star</a>, known for stewarding pigeons"
    },
    {
        "index": 73,
        "number": "53",
        "direction": "down",
        "word": "THRU",
        "cells": ["11-13", "12-13", "13-13", "14-13"],
        'clue': "By way of, briefly"
    },
    {
        "index": 74,
        "number": "55",
        "direction": "down",
        "word": "RIA",
        "cells": ["12-5", "13-5", "14-5"],
        'clue': "Money transfer chain dotting the Mission"
    },
    {
        "index": 75,
        "number": "56",
        "direction": "down",
        "word": "YES",
        "cells": ["12-14", "13-14", "14-14"],
        'clue': "Joyce's famous last word?"
    },
]
