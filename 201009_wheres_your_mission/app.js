/**
 * Where Is Your Mission? — Interactive Map Controller
 * Connects resident data, SVG overlays, and audio playback.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof MISSION_MAP_DATA === 'undefined') {
    console.error('MISSION_MAP_DATA not found. Ensure locals.js is loaded.');
    return;
  }

  const { locals, allMaps, allMapsPath } = MISSION_MAP_DATA;

  // DOM Elements
  const facesGrid = document.getElementById('faces-grid');
  const allMapsBtn = document.getElementById('all-maps-btn');
  const activeOutline = document.getElementById('active-outline');
  const activeArrow = document.getElementById('active-arrow');
  const activeCircle = document.getElementById('active-circle');
  const allMapsGroup = document.getElementById('all-maps-group');
  const audioPromptPopup = document.getElementById('audio-prompt-popup');
  const mapStage = document.querySelector('.map-stage');

  // Map Text Layer Elements
  const residentBio = document.getElementById('resident-bio');
  const bioName = document.getElementById('bio-name');
  const bioAge = document.getElementById('bio-age');
  const bioProfession = document.getElementById('bio-profession');
  const bioTime = document.getElementById('bio-time');

  const residentQuote = document.getElementById('resident-quote');
  const quoteBody = document.getElementById('quote-body');
  const residentNote = document.getElementById('resident-note');

  // Populate All Maps Multi-Color Group
  if (allMaps && Array.isArray(allMaps) && allMapsGroup) {
    allMaps.forEach(item => {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', item.d);
      p.setAttribute('fill', item.color);
      p.setAttribute('stroke', item.color);
      p.setAttribute('stroke-width', '0.5');
      p.setAttribute('fill-rule', 'evenodd');
      allMapsGroup.appendChild(p);
    });
  }

  // Audio Playback & Interaction Manager
  let currentAudio = null;
  let currentActiveCard = null;
  let pinnedLocalId = null;

  // Track if user has clicked anywhere on the page (satisfying browser autoplay policy)
  let hasUserClicked = false;
  let audioPopupTimeout = null;
  let activeAudioLocal = null;
  let activeAudioCard = null;

  function markUserClicked() {
    if (!hasUserClicked) {
      hasUserClicked = true;
      hideAudioPopup();
    }
  }

  // Any user click or key press permanently records interaction and hides the prompt
  window.addEventListener('click', markUserClicked, true);
  window.addEventListener('keydown', markUserClicked, true);

  function showAudioPopup(local, cardEl) {
    if (hasUserClicked) return;
    if (!local.audio || !audioPromptPopup) return;

    activeAudioLocal = local;
    activeAudioCard = cardEl;

    clearTimeout(audioPopupTimeout);

    audioPromptPopup.classList.remove('arrow-left', 'arrow-right');

    const cardX = local.stagePos.x;
    const cardY = local.stagePos.y;

    if (cardX > 300) {
      audioPromptPopup.classList.add('arrow-right');
      audioPromptPopup.style.left = 'auto';
      audioPromptPopup.style.right = '8px';
    } else {
      audioPromptPopup.classList.add('arrow-left');
      audioPromptPopup.style.left = '8px';
      audioPromptPopup.style.right = 'auto';
    }

    // Position immediately below the card (card height: 70px)
    const topPos = cardY + 70 + 3;
    audioPromptPopup.style.top = `${topPos}px`;

    audioPromptPopup.classList.add('visible');
    audioPromptPopup.setAttribute('aria-hidden', 'false');

    // Auto-hide popup after 3 seconds (timeout requirement)
    audioPopupTimeout = setTimeout(() => {
      hideAudioPopup();
    }, 3000);
  }

  function hideAudioPopup() {
    clearTimeout(audioPopupTimeout);
    if (audioPromptPopup) {
      audioPromptPopup.classList.remove('visible');
      audioPromptPopup.setAttribute('aria-hidden', 'true');
    }
  }

  if (audioPromptPopup) {
    audioPromptPopup.addEventListener('click', (e) => {
      e.stopPropagation();
      markUserClicked();
      if (activeAudioLocal && activeAudioCard) {
        activateLocal(activeAudioLocal, activeAudioCard, true);
      }
    });

    audioPromptPopup.addEventListener('mouseleave', (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest('.face-card')) {
        hideAudioPopup();
      }
    });
  }

  const audioCache = {};
  locals.forEach(local => {
    if (local.audio) {
      const audio = new Audio(local.audio);
      audio.preload = 'auto';
      audioCache[local.id] = audio;
    }
  });

  function stopAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    document.querySelectorAll('.face-card.playing-audio').forEach(card => {
      card.classList.remove('playing-audio');
    });
  }

  function playAudioFor(local, cardEl, isUserGesture = false) {
    stopAudio();
    if (!local.audio || !audioCache[local.id]) return;

    const audio = audioCache[local.id];
    currentAudio = audio;
    audio.currentTime = 0;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          cardEl.classList.add('playing-audio');
        })
        .catch(err => {
          // Blocked by browser autoplay policy if user has not interacted with the document
          cardEl.classList.remove('playing-audio');
        });
    }

    audio.onended = () => {
      cardEl.classList.remove('playing-audio');
      currentAudio = null;
    };
  }

  // Display a Resident's Map, Bio & Audio
  function activateLocal(local, cardEl, isClick = false) {
    deactivateAllMaps();

    // Set SVG outline
    activeOutline.setAttribute('d', local.outlinePath || '');
    activeOutline.style.fill = local.color || '#e61919';
    activeOutline.style.stroke = local.color || '#e61919';
    activeOutline.classList.add('visible');

    // Set SVG arrow if available
    const arrowD = local.arrowPath || local.extraPath;
    if (arrowD) {
      activeArrow.setAttribute('d', arrowD);
      activeArrow.style.fill = local.arrowColor || local.extraColor || '#e61919';
      activeArrow.classList.add('visible');
    } else {
      activeArrow.setAttribute('d', '');
      activeArrow.classList.remove('visible');
    }

    // Set SVG circle if available
    if (local.circlePath) {
      activeCircle.setAttribute('d', local.circlePath);
      activeCircle.style.stroke = local.circleColor || '#e61919';
      activeCircle.style.fill = 'none';
      activeCircle.classList.add('visible');
    } else {
      activeCircle.setAttribute('d', '');
      activeCircle.classList.remove('visible');
    }

    // Update face card active state
    if (currentActiveCard && currentActiveCard !== cardEl) {
      currentActiveCard.classList.remove('active');
    }
    cardEl.classList.add('active');
    currentActiveCard = cardEl;

    // Position & populate Bio on the map (y is offset by 158px header)
    if (local.textPos) {
      residentBio.style.left = `${local.textPos.x}px`;
      residentBio.style.top = `${Math.max(0, local.textPos.y - 158)}px`;

      bioName.textContent = local.name;
      bioAge.textContent = local.age ? `${local.age}` : '';
      bioAge.hidden = !local.age;

      bioProfession.textContent = local.profession || '';
      bioProfession.hidden = !local.profession;

      bioTime.textContent = local.residenceTime || '';
      bioTime.hidden = !local.residenceTime;

      residentBio.hidden = false;
    } else {
      residentBio.hidden = true;
    }

    // Position & populate Quote if available
    if (local.quote && local.quotePos) {
      residentQuote.style.left = `${local.quotePos.x}px`;
      residentQuote.style.top = `${Math.max(0, local.quotePos.y - 158)}px`;
      if (local.quoteWidth) {
        residentQuote.style.width = `${local.quoteWidth}px`;
      } else {
        residentQuote.style.width = '';
      }
      quoteBody.textContent = local.quote.startsWith('"') ? local.quote : `"${local.quote}"`;
      const qHeader = residentQuote.querySelector('.quote-header');
      if (qHeader) qHeader.style.color = '#e61919';
      residentQuote.hidden = false;
    } else {
      residentQuote.hidden = true;
    }

    // Position & populate extra note (e.g. "(Now Closed)")
    if (local.extraNote && local.notePos) {
      residentNote.style.left = `${local.notePos.x}px`;
      residentNote.style.top = `${Math.max(0, local.notePos.y - 158)}px`;
      residentNote.textContent = local.extraNote;
      residentNote.hidden = false;
    } else {
      residentNote.hidden = true;
    }

    // Play recorded interview
    playAudioFor(local, cardEl, isClick);

    if (isClick) {
      pinnedLocalId = local.id;
    }
  }

  // Deactivate current resident
  function deactivateLocal() {
    if (pinnedLocalId) return;

    activeOutline.classList.remove('visible');
    activeArrow.classList.remove('visible');
    activeCircle.classList.remove('visible');
    activeArrow.setAttribute('d', '');
    activeCircle.setAttribute('d', '');
    residentBio.hidden = true;
    residentQuote.hidden = true;
    residentNote.hidden = true;
    stopAudio();

    if (currentActiveCard) {
      currentActiveCard.classList.remove('active');
      currentActiveCard = null;
    }
  }

  // Activate "All Maps" view
  function activateAllMaps() {
    pinnedLocalId = null;
    deactivateLocal();

    if (allMapsGroup) {
      allMapsGroup.classList.add('visible');
    }
    allMapsBtn.classList.add('active');
  }

  // Deactivate "All Maps" view
  function deactivateAllMaps() {
    if (allMapsGroup) {
      allMapsGroup.classList.remove('visible');
    }
    allMapsBtn.classList.remove('active');
  }

  // Render Resident Face Cards
  locals.forEach(local => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'face-card';
    btn.dataset.id = local.id;
    btn.style.left = `${local.stagePos.x}px`;
    btn.style.top = `${local.stagePos.y}px`;
    btn.setAttribute('aria-label', `${local.name}, ${local.profession || 'resident'}`);

    const img = document.createElement('img');
    img.src = local.image;
    img.alt = local.name;
    img.className = 'face-img';
    btn.appendChild(img);

    if (local.audio) {
      const badge = document.createElement('span');
      badge.className = 'audio-badge';
      badge.setAttribute('title', 'Click to play interview audio');
      badge.textContent = '🔊';
      
      // Allow clicking directly on the speaker badge to toggle audio
      badge.addEventListener('click', (e) => {
        e.stopPropagation();
        markUserClicked();
        activateLocal(local, btn, true);
        if (audioCache[local.id]) {
          const audio = audioCache[local.id];
          if (currentAudio === audio && !audio.paused) {
            stopAudio();
          } else {
            audio.currentTime = 0;
            audio.play().then(() => {
              btn.classList.add('playing-audio');
            }).catch(err => console.error(err));
          }
        }
      });
      btn.appendChild(badge);
    }

    // Desktop Hover
    btn.addEventListener('mouseenter', () => {
      activateLocal(local, btn, false);
      if (local.audio) {
        showAudioPopup(local, btn);
      }
    });

    btn.addEventListener('mouseleave', (e) => {
      if (e.relatedTarget !== audioPromptPopup) {
        deactivateLocal();
        hideAudioPopup();
      }
    });

    // Keyboard Accessibility
    btn.addEventListener('focus', () => {
      activateLocal(local, btn, false);
      if (local.audio) {
        showAudioPopup(local, btn);
      }
    });

    btn.addEventListener('blur', () => {
      deactivateLocal();
      hideAudioPopup();
    });

    // Click / Mobile Touch
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      markUserClicked();
      if (pinnedLocalId === local.id) {
        pinnedLocalId = null;
        deactivateLocal();
      } else {
        activateLocal(local, btn, true);
      }
    });

    facesGrid.appendChild(btn);
  });

  // "All Maps" Button Interactions (Hover only)
  allMapsBtn.addEventListener('mouseenter', () => {
    activateAllMaps();
  });

  allMapsBtn.addEventListener('mouseleave', () => {
    deactivateAllMaps();
  });

  allMapsBtn.addEventListener('focus', () => {
    activateAllMaps();
  });

  allMapsBtn.addEventListener('blur', () => {
    deactivateAllMaps();
  });

  // Clicking on map clears selection
  mapStage.addEventListener('click', () => {
    markUserClicked();
    pinnedLocalId = null;
    deactivateLocal();
    deactivateAllMaps();
  });
});
