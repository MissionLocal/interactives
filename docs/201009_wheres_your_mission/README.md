# Where Is Your Mission? — Interactive Map

A modern, faithful HTML5/SVG recreation of the archival interactive map originally published by [Mission Local](https://missionlocal.org) in September 2010:  
**[Where Is Your Mission? (Mission Local, September 2010)](https://missionlocal.org/2010/09/where-is-your-mission/)**

---

## Background & Motivation

In September 2010, community newsroom *Mission Local* asked 10 diverse residents of San Francisco’s Mission District to draw their own perception of the neighborhood's boundaries. Each resident described what the Mission meant to them, with several recording audio interviews sharing memories of local spots and neighborhood history.

The original piece was published as an interactive Adobe Flash (`.swf`) widget. When major web browsers permanently deprecated Flash Player at the end of 2020, this valuable piece of local community journalism became unplayable on the web.

This project reconstructs the interactive experience using pure, dependency-free web standards (**HTML5**, **CSS3**, **SVG**, and **Vanilla JavaScript**). All vector outlines, color palettes, stage coordinates, photo portraits, text records, and audio tracks were extracted directly from the authentic bytecode of [`missionmap.swf`](./missionmap.swf) to ensure a 1:1 historical reproduction.

---

## Features

- **10 Resident Boundary Outlines**: Hovering over any portrait displays that resident's hand-drawn boundary overlay on the map, along with their bio, time living in the Mission, and notable memories.
- **Audio Interview Playback**: Three residents (**Te'Devan**, **Gregg**, and **Tori**) have archival audio interview clips extracted from the SWF.
  - *Browser Autoplay Compliance*: Modern browsers restrict audio from playing automatically on mouse hover until the user has interacted with the document. When hovering over an interviewee with audio prior to the first click, a brief `"Click to play audio"` prompt appears with an auto-dismiss timeout. Once the user clicks anywhere, the audio is unlocked and plays seamlessly on hover.
  - *Visual Feedback*: A pulsing audio indicator highlights the portrait while audio is playing.
- **"All Maps" Multi-Color Composite**: Hovering or clicking the "All Maps" button reveals all 10 resident boundaries simultaneously, each rendered in its authentic vector edge layer and individual RGBA color palette (extracted from SWF Shape 6).
- **Responsive & Accessible**: Uses scalable SVG vector paths with `viewBox="0 0 620 800"`, keyboard focus support, and ARIA labels.

---

## The Residents

| # | Resident | Profession | Residence Time | Audio | Special Inset Memory |
|---|---|---|---|---|---|
| 1 | **Rasul** | Musician | 21 yrs in SF | — | — |
| 2 | **Carmen Ausserer** | Teacher | 3.5 yrs in Mission | — | Valencia & 23rd bay window memory |
| 3 | **Nina** | Paralegal | 18 months in Mission | — | El Ritmo Latino record store *(Now Closed)* |
| 4 | **Te'Devan** | Nomadic | — | 🔊 Yes | — |
| 5 | **Gregg** | Self-employed | 10 yrs in Mission | 🔊 Yes | — |
| 6 | **Santos** | Mechanic | 25 yrs in Mission | — | — |
| 7 | **Natasha** | Dancer/Student | 4 yrs in Mission | — | Parque Niños Unidos gathering |
| 8 | **Clarence** | PG&E employee | 40 yrs in Mission | — | — |
| 9 | **Tomas** | Food service | 5 yrs in Mission | — | — |
| 10 | **Tori** | Producer | 10 yrs in SF | 🔊 Yes | Andalu dinner with 4 dude roommates |

---

## Project Structure

```text
mission_map/
├── index.html                        # Application markup and SVG overlay layer
├── style.css                         # Layout, typography, transitions, and button styling
├── app.js                            # Application controller, audio manager, and interaction handling
├── locals.js                         # Extracted resident data, coordinates, and SVG path strings
├── mission_map.jpg                   # Base aerial street map of the Mission District
├── missionmap.swf                    # Original archival Adobe Flash source file
├── all_maps_composite_verified.png   # Verification render comparing SVG composite to SWF Shape 6
├── swfextract                        # Compiled utility used to extract media assets from SWF
├── *.jpg                             # 10 resident photo portraits
├── *.mp3                             # 3 resident audio interview recordings
└── README.md                         # Project documentation and attribution
```

---

## Running Locally

Because the project loads audio assets and external media, run it using a local HTTP server rather than opening `index.html` directly via the `file://` protocol (which can trigger strict browser CORS/media restrictions):

```bash
# Python 3
python3 -m http.server 8080

# Or Node.js
npx serve .
```

Then open `http://localhost:8080` in your web browser.

---

## Credits & Attribution

- **Original Reporting & Interactive**: [Mission Local](https://missionlocal.org) (published September 2010).
- **Original Article**: [Where Is Your Mission?](https://missionlocal.org/2010/09/where-is-your-mission/)
- **Recreation**: Reconstructed in HTML5/SVG/JavaScript for archival preservation.
