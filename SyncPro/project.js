'use strict';

const $ = id => document.getElementById(id);
const DATA = window.SYNCPRO_REVIEW;
const player = $('player');
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clock = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
const media = path => `${path}?v=${DATA.version}`;
const caseLabels = {
  80: ['Wait for the target score', 'trigger'],
  316: ['Count each tear', 'counting'],
  353: ['Count completed lifts', 'counting'],
  656: ['Follow three baking steps', 'process'],
  923: ['Track what is being poured', 'process'],
  298: ['Follow the next action', 'understanding'],
  1171: ['Update the answer with new details', 'understanding'],
  1286: ['Notice smoke, then an explosion', 'alert'],
};
const categories = {all:'All examples',trigger:'Condition triggers',counting:'Event counting',process:'Process tracking',understanding:'Scene understanding',alert:'Alerts'};
let selected = 'music';
let category = 'all';
let selectionToken = 0;

function renderCards() {
  $('cards').innerHTML = DATA.cases.filter(c => c.role === 'main' && (category === 'all' || caseLabels[c.number][1] === category)).map(c => {
    const [title, group] = caseLabels[c.number];
    return `<button type="button" class="case-card${selected === c.number ? ' active' : ''}" data-case="${c.number}" aria-pressed="${selected === c.number}"><span class="case-image"><img loading="lazy" src="${media(`posters/case_${String(c.number).padStart(4,'0')}.jpg`)}" width="1920" height="1080" alt=""><span class="case-duration">${clock(c.duration)}</span></span><span class="case-copy"><small>${categories[group]}</small><strong>${title}</strong></span></button>`;
  }).join('');
  $('cards').querySelectorAll('[data-case]').forEach(button => {
    button.addEventListener('click', () => {
      select(Number(button.dataset.case));
      document.querySelector('.demo-toolbar').scrollIntoView({block:'start'});
    });
  });
}

function setEditionButtons(value) {
  for (const [id, edition] of [['musicButton','music'],['silentButton','silent']]) {
    $(id).classList.toggle('active', value === edition);
    $(id).setAttribute('aria-pressed', String(value === edition));
  }
}

function select(value, seek = null) {
  const token = ++selectionToken;
  selected = value;
  player.pause();
  let url, poster, title, note, detail;
  if (typeof value === 'number') {
    const c = DATA.cases.find(item => item.number === value);
    const stem = `case_${String(c.number).padStart(4,'0')}`;
    url = `videos/${stem}.mp4`;
    poster = `posters/${stem}.jpg`;
    title = caseLabels[c.number][0];
    note = `${c.benchmark} · Silent clip · Source ${clock(c.start)}–${clock(c.end)}`;
    detail = `<p class="trace-query"><strong>User request</strong><br>${esc(c.query)}</p><p class="trace-meta">Timestamps refer to the source video.</p>` + c.events.map(event => `<div class="trace"><time>${clock(event.time_s)}</time><div>${event.thinking ? `<p class="inner"><strong>Inner</strong> · ${esc(event.thinking)}</p>` : ''}${event.response ? `<p class="response"><strong>Response</strong> · ${esc(event.response)}</p>` : ''}</div></div>`).join('');
  } else {
    url = value === 'music' ? 'SyncPro_showcase_music.mp4' : 'SyncPro_showcase.mp4';
    poster = 'posters/case_0923.jpg';
    title = `SyncPro in action · ${value === 'music' ? 'With music' : 'Silent'}`;
    note = 'Synchronized source video, Inner, and Response.';
    detail = '<p>Select an example above to see its request and original outputs.</p>';
  }
  $('mediaError').hidden = true;
  $('playingTitle').textContent = title;
  $('playingNote').textContent = note;
  $('downloadLink').href = media(url);
  $('mediaError').querySelector('a').href = media(url);
  $('detailContent').innerHTML = detail;
  $('outputDetails').open = false;
  player.poster = media(poster);
  if (seek !== null) {
    player.addEventListener('loadedmetadata', () => {
      if (token !== selectionToken) return;
      player.currentTime = Math.min(seek, player.duration);
      player.play().catch(() => {});
    }, {once:true});
  }
  player.src = media(url);
  player.load();
  setEditionButtons(value);
  renderCards();
}

if (DATA) {
  $('musicButton').textContent = `With music · ${clock(Math.round(DATA.music_duration_s))}`;
  $('silentButton').textContent = `Silent · ${clock(Math.round(DATA.duration_s))}`;
  $('musicButton').addEventListener('click', () => select('music'));
  $('silentButton').addEventListener('click', () => select('silent'));
  $('caseFilters').innerHTML = Object.entries(categories).map(([key,label]) => `<button type="button" data-category="${key}" class="${key === 'all' ? 'active' : ''}" aria-pressed="${key === 'all'}">${label}</button>`).join('');
  $('caseFilters').querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category;
    $('caseFilters').querySelectorAll('button').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    renderCards();
  }));
  for (const chapter of DATA.chapters) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = `${clock(chapter.start_s)} · ${caseLabels[chapter.case_number][0]}`;
    button.addEventListener('click', () => select(selected === 'silent' ? 'silent' : 'music', chapter.start_s));
    $('chapters').appendChild(button);
  }
  player.addEventListener('error', () => { $('mediaError').hidden = false; });
  select('music');
}

const benchmarks = {
  streaming: {
    caption:'StreamingBench · Proactive Output',
    columns:['Acc@2s ↑'],
    note:'Responses are evaluated with a two-second tolerance. A dash indicates a result not reported in Table 1.',
    rows:[['SyncPro-RL',41.20],['SyncPro-SFT',38.80],['Em-Garde',38.00],['MMDuet2',34.60],['MMDuet',29.44],['ThinkStream',27.20],['VST',19.60],['VideoLLM-online',4.00],['VideoChat3',null],['Interleaved',34.00],['Response-only',22.80]],
  },
  ovo: {
    caption:'OVO-Bench · Forward Active Responding',
    columns:['CRR F1 ↑','SSR F1 ↑','REC F1 ↑','Average F1 ↑'],
    note:'F1 uses a two-second tolerance. Average F1 is the task mean; MMDuet2’s reported mean covers its two available tasks. Full precision and recall are in Table 2.',
    rows:[['SyncPro-RL',26.91,25.67,50.00,34.19],['SyncPro-SFT',28.06,21.36,47.69,32.37],['Em-Garde',26.40,23.40,43.16,30.99],['MMDuet2',14.40,null,26.62,20.51],['StreamForest',2.08,10.11,29.67,13.95],['ThinkStream',5.30,6.80,26.58,12.89],['VST',7.46,3.26,17.48,9.40],['VideoLLM-online',2.08,8.49,10.24,6.93],['Flash-VStream',5.68,3.91,4.73,4.77],['Interleaved',29.86,1.90,.83,10.87],['Response-only',31.26,8.61,4.11,14.66]],
  },
  pvqa: {
    caption:'ProactiveVideoQA · Timing and content',
    columns:['WEB PAUC ↑','EGO PAUC ↑','VAD PAUC ↑'],
    note:'PAUC uses ω = 0.5. SyncPro-RL leads VAD, ranks second on WEB, and obtains 33.74 on EGO. Table 1 gives the complete comparison protocol.',
    rows:[['SyncPro-RL',48.28,33.74,32.43],['SyncPro-SFT',47.83,33.89,32.14],['Em-Garde',44.30,52.30,27.40],['MMDuet2',53.30,33.60,28.90],['MMDuet',38.90,46.00,27.40],['ThinkStream',30.19,24.47,18.17],['VST',21.11,24.97,25.08],['VideoLLM-online',25.90,25.00,25.00],['VideoChat3',28.40,28.10,25.10],['Interleaved',29.89,25.00,25.91],['Response-only',27.98,27.98,31.17]],
  },
};
function showBenchmark(key) {
  const benchmark = benchmarks[key];
  const maxima = benchmark.columns.map((_,index) => Math.max(...benchmark.rows.map(row => row[index+1] ?? -Infinity)));
  $('resultsTable').innerHTML = `<caption>${benchmark.caption}</caption><thead><tr><th scope="col">Method</th>${benchmark.columns.map(label => `<th scope="col">${label}</th>`).join('')}</tr></thead><tbody>${benchmark.rows.map(row => `<tr class="${row[0].startsWith('SyncPro') ? 'ours' : ['Interleaved','Response-only'].includes(row[0]) ? 'comparison' : ''}"><td>${row[0]}</td>${row.slice(1).map((value,index) => `<td class="${value === maxima[index] ? 'best' : ''}">${value === null ? '–' : value.toFixed(2)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  $('resultNote').textContent = benchmark.note;
  $('resultPanel').setAttribute('aria-labelledby', `tab-${key}`);
  document.querySelectorAll('[data-benchmark]').forEach(button => {
    const active = button.dataset.benchmark === key;
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
  });
}
const tabs = [...document.querySelectorAll('[data-benchmark]')];
tabs.forEach((button,index) => {
  button.addEventListener('click', () => showBenchmark(button.dataset.benchmark));
  button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    tabs[next].focus();
    showBenchmark(tabs[next].dataset.benchmark);
  });
});
showBenchmark('streaming');

$('copyCitation').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText($('bibtex').textContent);
    $('copyStatus').textContent = 'BibTeX copied.';
  } catch {
    const range = document.createRange();
    range.selectNodeContents($('bibtex'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    $('copyStatus').textContent = 'BibTeX selected. Copy it, or download the .bib file below.';
  }
});
const navLinks = [...document.querySelectorAll('.nav-links a')];
const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach(link => {
    const active = link.hash === `#${visible.target.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
}, {rootMargin:'-10% 0px -55% 0px',threshold:[0,.1,.3]});
navLinks.forEach(link => observer.observe(document.querySelector(link.hash)));
