const musicList = [
    { title: 'Bruno Mars: Don\'t Give Up', artist: 'Sesame Street', type: 'lyric', id: 'pWp6kkz-pnQ', time: '1:58', year: 2011 },
    { title: 'Janelle Monae - Power of Yet', artist: 'Sesame Street', type: 'pop', id: 'XLeUvZvuvAs', time: '2:42', year: 2014 },
    { title: 'Usher\'s ABC Song', artist: 'Sesame Street', type: 'lyric', id: 'SWvBAQf7v8g', time: '1:55', year: 2013 },
    { title: 'If You\'re Happy and You Know It | Elmo\'s Sing-Along', artist: 'Sesame Street', type: 'lyric', id: '5015skRvqs8', time: '3:18', year: 2017 },
    { title: 'Elmo\'s Song', artist: 'Sesame Street', type: 'pop', id: 'vSYadh2xmcI', time: '3:17', year: 1999 },
    { title: 'R is for Routine', artist: 'Sesame Street', type: 'lyric', id: 'CkDwF8RQ2Ow', time: '2:19', year: 1980 },
    { title: 'OK Go - Three Primary Colors', artist: 'Sesame Street', type: 'rock', id: 'yu44JRTIxSQ', time: '1:31', year: 2012 },
    { title: 'Feist sings 1,2,3,4', artist: 'Sesame Street', type: 'lyric', id: 'fZ9WiuJPnNA', time: '2:21', year: 1988 },
    { title: 'Shake Shake The Mango Tree', artist: 'Sesame Street', type: 'lyric', id: 'h4war7sLnuQ', time: '0:38', year: 2012 },
    { title: 'Brushy Brush PSA', artist: 'Sesame Street', type: 'pop', id: 'wxMrtK-kYnE', time: '1:31', year: 2012 },
    { title: 'The Alphabet With Elmo and India Arie', artist: 'Sesame Street', type: 'rock', id: 'ML8IL77gQ3k', time: '2:12', year: 2010 },
    { title: 'Sing the Alphabet Song!', artist: 'Sesame Street', type: 'lyric', id: '783EsrHchXA', time: '2:52', year: 2013 }
];

const buttons = document.querySelectorAll('.btn');
const items = document.querySelector('.items');
const item = document.querySelectorAll('.item');
const display = document.querySelector('iframe');
const playList = [];

buttons.forEach(btn => btn.addEventListener('click', buttonClicked));
item.forEach(item => item.addEventListener('click', itemAdded));

ready();

function ready() {
    for (let i = 0; i < musicList.length; i++) {
        let itemRow = document.createElement('div');
        itemRow.classList.add('item');
        itemRow.classList.add('option');
        itemRow.id = musicList[i].id;
        itemRow.innerHTML = `${musicList[i].title}<br>${musicList[i].artist}<span>${musicList[i].time}</span>`;
        itemRow.addEventListener('click', itemAdded);
        items.appendChild(itemRow);
        for (let l = 0; l < playList.length; l++) {
            if (playList[l] == musicList[i].id) {
                itemRow.classList.remove('option');
                itemRow.removeEventListener('click', itemAdded);
            }
        }
    }
}

function buttonClicked(e) {
    items.innerHTML = '';
    const key = e.target.id;
    let option = '';
    if (key == '80s') {
        option = musicList.filter(music => music.year >= 1980 && music.year < 1990);
    }
    if (key == '90s') {
        option = musicList.filter(music => music.year >= 1990 && music.year < 2000);
    }
    if (key == 'lyric') {
        option = musicList.filter(music => music.type == 'lyric');
    }
    if (key == 'pop') {
        option = musicList.filter(music => music.type == 'pop');
    }
    if (key == 'rock') {
        option = musicList.filter(music => music.type == 'rock');
    }
    if (key == 'index') {
        ready();
    }
    for (let i = 0; i < option.length; i++) {
        let title = option[i].title;
        let artist = option[i].artist;
        let type = option[i].type;
        let id = option[i].id;
        let time = option[i].time;
        let year = option[i].year;
        
        itemLists(title, artist, type, id, time, year);
    }
}

function itemAdded(e) {
    const id = e.target.id;
    if (!id) return;
    playList.push(id);
    if (playList.length < 2) {
        display.src = `https://www.youtube.com/embed/${playList[0]}?controls=1&autoplay=1`;
        e.target.removeEventListener('click', itemAdded);
        e.target.classList.remove('option');
    } else {
        let playListAdd = playList.slice(1);
        display.src = `https://www.youtube.com/embed/${playList[0]}?playlist=${playListAdd}&controls=1&autoplay=1`;
        e.target.removeEventListener('click', itemAdded);
        e.target.classList.remove('option');
    }
}

function itemLists(title, artist, type, id, time, year) {
    let itemRow = document.createElement('div')
    itemRow.classList.add('item')
    itemRow.classList.add('option')
    itemRow.id = id
    itemRow.innerHTML = `${title}<br>${artist}<span>${time}</span>`
    itemRow.addEventListener('click', itemAdded)
    items.appendChild(itemRow)
    for (let i = 0; i < playList.length; i++) {
        if (playList[i] == id) {
            itemRow.classList.remove('option')
            itemRow.removeEventListener('click', itemAdded)
        }
    }
}