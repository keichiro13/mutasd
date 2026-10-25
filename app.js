'use strict';
const animals = [
  ['Kutya','1f436'],['Macska','1f431'],['Nyúl','1f407'],['Elefánt','1f418'],['Oroszlán','1f981'],['Béka','1f438'],['Majom','1f412'],['Ló','1f40e'],['Malac','1f437'],['Tehén','1f42e'],['Tyúk','1f414'],['Kacsa','1f986'],['Pingvin','1f427'],['Hal','1f41f'],['Kígyó','1f40d'],['Teknős','1f422'],['Pillangó','1f98b'],['Méhecske','1f41d'],['Rák','1f980'],['Zsiráf','1f992'],['Medve','1f43b'],['Süni','1f994'],['Csiga','1f40c'],['Sas','1f985']
].map(([name,image]) => ({name,image,category:'Állat'}));
const objects = [
  ['Labda','26bd'],['Dob','1f941'],['Gitár','1f3b8'],['Telefon','260e'],['Fényképezőgép','1f4f7'],['Könyv','1f4d6'],['Ecset','1f58c'],['Seprű','1f9f9'],['Esernyő','1f302'],['Lufi','1f388'],['Óra','1f550'],['Kulcs','1f511'],['Horgászbot','1f3a3'],['Fogkefe','1faa5'],['Olló','2702'],['Kanál','1f944'],['Szék','1fa91'],['Szemüveg','1f453'],['Cipő','1f45f'],['Táska','1f392']
].map(([name,image]) => ({name,image,category:'Hétköznapi tárgy'}));
const vehicles = [
  ['Autó','1f697'],['Repülő','2708'],['Vonat','1f682'],['Bicikli','1f6b2'],['Rakéta','1f680'],['Roller','1f6f4'],['Busz','1f68c'],['Mentőautó','1f691'],['Tűzoltóautó','1f692'],['Rendőrautó','1f693'],['Traktor','1f69c'],['Helikopter','1f681'],['Vitorlás','26f5'],['Motor','1f3cd']
].map(([name,image]) => ({name,image,category:'Jármű'}));
const jobs = [
  ['Tűzoltó','1f9d1-200d-1f692'],['Szakács','1f9d1-200d-1f373'],['Orvos','1f9d1-200d-2695-fe0f'],['Tanár','1f9d1-200d-1f3eb'],['Rendőr','1f46e'],['Építőmunkás','1f477'],['Kertész','1f9d1-200d-1f33e'],['Festő','1f9d1-200d-1f3a8'],['Énekes','1f9d1-200d-1f3a4'],['Szerelő','1f9d1-200d-1f527'],['Űrhajós','1f9d1-200d-1f680'],['Pilóta','1f9d1-200d-2708-fe0f']
].map(([name,image]) => ({name,image,category:'Foglalkozás'}));
const packs = { animals, jobs, vehicles, objects, all: [...animals, ...jobs, ...vehicles, ...objects] };
let theme = 'all';
let deck = [];
let current = null;
let drawn = 0;
const $ = id => document.getElementById(id);
function refill() {
  deck = [...packs[theme]];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  // A new shuffled pack must not repeat the very last card immediately.
  if (current && deck.at(-1).name === current.name) [deck[0], deck[deck.length - 1]] = [deck.at(-1), deck[0]];
  drawn = 0;
}
function draw() {
  if (!deck.length) refill();
  current = deck.pop();
  drawn++;
  $('picture').src = `assets/${current.image}.svg`;
  $('picture').alt = current.name;
  $('category').textContent = current.category.toLocaleUpperCase('hu-HU');
  $('name').textContent = current.name;
  $('hint').textContent = 'Vajon kitalálják a többiek?';
  $('draw').firstElementChild.textContent = 'Jöhet a következő!';
  $('progress').textContent = `${drawn} / ${packs[theme].length} kártya a pakliból`;
  $('announcement').textContent = `${current.category}: ${current.name}. Mutogasd el!`;
  $('card').classList.remove('pop');
  void $('card').offsetWidth;
  $('card').classList.add('pop');
}
document.querySelectorAll('[data-theme]').forEach(button => button.addEventListener('click', () => {
  if (theme === button.dataset.theme) return;
  theme = button.dataset.theme;
  document.querySelectorAll('[data-theme]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  refill();
  draw();
}));
$('draw').addEventListener('click', draw);
$('card').addEventListener('click', draw);
$('progress').textContent = `${packs.all.length} felfedezésre váró kép`;
document.addEventListener('keydown', event => {
  if (event.code === 'Space' && !event.repeat && (event.target === document.body || event.target === document.documentElement)) {
    event.preventDefault();
    draw();
  }
});
