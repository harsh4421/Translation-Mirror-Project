import type { TargetLanguage } from '../types';

export type DictionaryEntry = Partial<Record<TargetLanguage, string>>;
export type Dictionary = Record<string, DictionaryEntry>;

export const baseDictionary: Dictionary = {
  // Greetings
  hello: { hindi: 'नमस्ते', french: 'bonjour', spanish: 'hola', german: 'hallo', english: 'hello' },
  hi: { hindi: 'हाय', french: 'salut', spanish: 'hola', german: 'hallo', english: 'hi' },
  bye: { hindi: 'अलविदा', french: 'au revoir', spanish: 'adiós', german: 'auf wiedersehen', english: 'goodbye' },
  goodbye: { hindi: 'अलविदा', french: 'au revoir', spanish: 'adiós', german: 'auf wiedersehen', english: 'goodbye' },
  welcome: { hindi: 'स्वागत है', french: 'bienvenue', spanish: 'bienvenido', german: 'willkommen', english: 'welcome' },
  thanks: { hindi: 'धन्यवाद', french: 'merci', spanish: 'gracias', german: 'danke', english: 'thanks' },
  thank: { hindi: 'धन्यवाद', french: 'merci', spanish: 'gracias', german: 'danke', english: 'thank' },
  please: { hindi: 'कृपया', french: 's\'il vous plaît', spanish: 'por favor', german: 'bitte', english: 'please' },
  sorry: { hindi: 'माफ करें', french: 'désolé', spanish: 'lo siento', german: 'entschuldigung', english: 'sorry' },
  yes: { hindi: 'हाँ', french: 'oui', spanish: 'sí', german: 'ja', english: 'yes' },
  no: { hindi: 'नहीं', french: 'non', spanish: 'no', german: 'nein', english: 'no' },
  
  // Common words
  good: { hindi: 'अच्छा', french: 'bon', spanish: 'bueno', german: 'gut', english: 'good' },
  bad: { hindi: 'बुरा', french: 'mauvais', spanish: 'malo', german: 'schlecht', english: 'bad' },
  great: { hindi: 'बेहतरीन', french: 'génial', spanish: 'genial', german: 'großartig', english: 'great' },
  beautiful: { hindi: 'सुंदर', french: 'beau', spanish: 'hermoso', german: 'schön', english: 'beautiful' },
  big: { hindi: 'बड़ा', french: 'grand', spanish: 'grande', german: 'groß', english: 'big' },
  small: { hindi: 'छोटा', french: 'petit', spanish: 'pequeño', german: 'klein', english: 'small' },
  new: { hindi: 'नया', french: 'nouveau', spanish: 'nuevo', german: 'neu', english: 'new' },
  old: { hindi: 'पुराना', french: 'vieux', spanish: 'viejo', german: 'alt', english: 'old' },
  fast: { hindi: 'तेज', french: 'rapide', spanish: 'rápido', german: 'schnell', english: 'fast' },
  slow: { hindi: 'धीमा', french: 'lent', spanish: 'lento', german: 'langsam', english: 'slow' },
  hot: { hindi: 'गर्म', french: 'chaud', spanish: 'caliente', german: 'heiß', english: 'hot' },
  cold: { hindi: 'ठंडा', french: 'froid', spanish: 'frío', german: 'kalt', english: 'cold' },
  happy: { hindi: 'खुश', french: 'heureux', spanish: 'feliz', german: 'glücklich', english: 'happy' },
  sad: { hindi: 'दुखी', french: 'triste', spanish: 'triste', german: 'traurig', english: 'sad' },
  
  // People & pronouns
  i: { hindi: 'मैं', french: 'je', spanish: 'yo', german: 'ich', english: 'i' },
  you: { hindi: 'आप', french: 'vous', spanish: 'usted', german: 'Sie', english: 'you' },
  he: { hindi: 'वह', french: 'il', spanish: 'él', german: 'er', english: 'he' },
  she: { hindi: 'वह', french: 'elle', spanish: 'ella', german: 'sie', english: 'she' },
  we: { hindi: 'हम', french: 'nous', spanish: 'nosotros', german: 'wir', english: 'we' },
  they: { hindi: 'वे', french: 'ils', spanish: 'ellos', german: 'sie', english: 'they' },
  my: { hindi: 'मेरा', french: 'mon', spanish: 'mi', german: 'mein', english: 'my' },
  your: { hindi: 'आपका', french: 'votre', spanish: 'su', german: 'Ihr', english: 'your' },
  
  // Verbs
  is: { hindi: 'है', french: 'est', spanish: 'es', german: 'ist', english: 'is' },
  are: { hindi: 'हैं', french: 'sont', spanish: 'son', german: 'sind', english: 'are' },
  was: { hindi: 'था', french: 'était', spanish: 'era', german: 'war', english: 'was' },
  have: { hindi: 'पास है', french: 'avoir', spanish: 'tener', german: 'haben', english: 'have' },
  do: { hindi: 'करना', french: 'faire', spanish: 'hacer', german: 'tun', english: 'do' },
  go: { hindi: 'जाना', french: 'aller', spanish: 'ir', german: 'gehen', english: 'go' },
  come: { hindi: 'आना', french: 'venir', spanish: 'venir', german: 'kommen', english: 'come' },
  see: { hindi: 'देखना', french: 'voir', spanish: 'ver', german: 'sehen', english: 'see' },
  know: { hindi: 'जानना', french: 'savoir', spanish: 'saber', german: 'wissen', english: 'know' },
  think: { hindi: 'सोचना', french: 'penser', spanish: 'pensar', german: 'denken', english: 'think' },
  want: { hindi: 'चाहना', french: 'vouloir', spanish: 'querer', german: 'wollen', english: 'want' },
  need: { hindi: 'जरूरत', french: 'besoin', spanish: 'necesitar', german: 'brauchen', english: 'need' },
  like: { hindi: 'पसंद', french: 'aimer', spanish: 'gustar', german: 'mögen', english: 'like' },
  love: { hindi: 'प्यार', french: 'amour', spanish: 'amor', german: 'Liebe', english: 'love' },
  eat: { hindi: 'खाना', french: 'manger', spanish: 'comer', german: 'essen', english: 'eat' },
  drink: { hindi: 'पीना', french: 'boire', spanish: 'beber', german: 'trinken', english: 'drink' },
  sleep: { hindi: 'सोना', french: 'dormir', spanish: 'dormir', german: 'schlafen', english: 'sleep' },
  work: { hindi: 'काम', french: 'travail', spanish: 'trabajo', german: 'Arbeit', english: 'work' },
  play: { hindi: 'खेलना', french: 'jouer', spanish: 'jugar', german: 'spielen', english: 'play' },
  speak: { hindi: 'बोलना', french: 'parler', spanish: 'hablar', german: 'sprechen', english: 'speak' },
  say: { hindi: 'कहना', french: 'dire', spanish: 'decir', german: 'sagen', english: 'say' },
  read: { hindi: 'पढ़ना', french: 'lire', spanish: 'leer', german: 'lesen', english: 'read' },
  write: { hindi: 'लिखना', french: 'écrire', spanish: 'escribir', german: 'schreiben', english: 'write' },
  listen: { hindi: 'सुनना', french: 'écouter', spanish: 'escuchar', german: 'hören', english: 'listen' },
  
  // Numbers
  one: { hindi: 'एक', french: 'un', spanish: 'uno', german: 'ein', english: 'one' },
  two: { hindi: 'दो', french: 'deux', spanish: 'dos', german: 'zwei', english: 'two' },
  three: { hindi: 'तीन', french: 'trois', spanish: 'tres', german: 'drei', english: 'three' },
  four: { hindi: 'चार', french: 'quatre', spanish: 'cuatro', german: 'vier', english: 'four' },
  five: { hindi: 'पाँच', french: 'cinq', spanish: 'cinco', german: 'fünf', english: 'five' },
  ten: { hindi: 'दस', french: 'dix', spanish: 'diez', german: 'zehn', english: 'ten' },
  hundred: { hindi: 'सौ', french: 'cent', spanish: 'cien', german: 'hundert', english: 'hundred' },
  
  // Time
  today: { hindi: 'आज', french: 'aujourd\'hui', spanish: 'hoy', german: 'heute', english: 'today' },
  tomorrow: { hindi: 'कल', french: 'demain', spanish: 'mañana', german: 'morgen', english: 'tomorrow' },
  yesterday: { hindi: 'कल', french: 'hier', spanish: 'ayer', german: 'gestern', english: 'yesterday' },
  now: { hindi: 'अभी', french: 'maintenant', spanish: 'ahora', german: 'jetzt', english: 'now' },
  time: { hindi: 'समय', french: 'temps', spanish: 'tiempo', german: 'Zeit', english: 'time' },
  day: { hindi: 'दिन', french: 'jour', spanish: 'día', german: 'Tag', english: 'day' },
  night: { hindi: 'रात', french: 'nuit', spanish: 'noche', german: 'Nacht', english: 'night' },
  morning: { hindi: 'सुबह', french: 'matin', spanish: 'mañana', german: 'Morgen', english: 'morning' },
  evening: { hindi: 'शाम', french: 'soir', spanish: 'tarde', german: 'Abend', english: 'evening' },
  week: { hindi: 'सप्ताह', french: 'semaine', spanish: 'semana', german: 'Woche', english: 'week' },
  month: { hindi: 'महीना', french: 'mois', spanish: 'mes', german: 'Monat', english: 'month' },
  year: { hindi: 'साल', french: 'année', spanish: 'año', german: 'Jahr', english: 'year' },
  
  // Places
  home: { hindi: 'घर', french: 'maison', spanish: 'casa', german: 'Haus', english: 'home' },
  school: { hindi: 'स्कूल', french: 'école', spanish: 'escuela', german: 'Schule', english: 'school' },
  office: { hindi: 'कार्यालय', french: 'bureau', spanish: 'oficina', german: 'Büro', english: 'office' },
  hospital: { hindi: 'अस्पताल', french: 'hôpital', spanish: 'hospital', german: 'Krankenhaus', english: 'hospital' },
  market: { hindi: 'बाजार', french: 'marché', spanish: 'mercado', german: 'Markt', english: 'market' },
  city: { hindi: 'शहर', french: 'ville', spanish: 'ciudad', german: 'Stadt', english: 'city' },
  country: { hindi: 'देश', french: 'pays', spanish: 'país', german: 'Land', english: 'country' },
  world: { hindi: 'दुनिया', french: 'monde', spanish: 'mundo', german: 'Welt', english: 'world' },
  
  // Food
  water: { hindi: 'पानी', french: 'eau', spanish: 'agua', german: 'Wasser', english: 'water' },
  food: { hindi: 'खाना', french: 'nourriture', spanish: 'comida', german: 'Essen', english: 'food' },
  bread: { hindi: 'रोटी', french: 'pain', spanish: 'pan', german: 'Brot', english: 'bread' },
  rice: { hindi: 'चावल', french: 'riz', spanish: 'arroz', german: 'Reis', english: 'rice' },
  milk: { hindi: 'दूध', french: 'lait', spanish: 'leche', german: 'Milch', english: 'milk' },
  
  // Technology
  computer: { hindi: 'कंप्यूटर', french: 'ordinateur', spanish: 'computadora', german: 'Computer', english: 'computer' },
  phone: { hindi: 'फोन', french: 'téléphone', spanish: 'teléfono', german: 'Telefon', english: 'phone' },
  internet: { hindi: 'इंटरनेट', french: 'internet', spanish: 'internet', german: 'Internet', english: 'internet' },
  software: { hindi: 'सॉफ्टवेयर', french: 'logiciel', spanish: 'software', german: 'Software', english: 'software' },
  data: { hindi: 'डेटा', french: 'données', spanish: 'datos', german: 'Daten', english: 'data' },
  
  // Colors
  red: { hindi: 'लाल', french: 'rouge', spanish: 'rojo', german: 'rot', english: 'red' },
  blue: { hindi: 'नीला', french: 'bleu', spanish: 'azul', german: 'blau', english: 'blue' },
  green: { hindi: 'हरा', french: 'vert', spanish: 'verde', german: 'grün', english: 'green' },
  white: { hindi: 'सफेद', french: 'blanc', spanish: 'blanco', german: 'weiß', english: 'white' },
  black: { hindi: 'काला', french: 'noir', spanish: 'negro', german: 'schwarz', english: 'black' },
  yellow: { hindi: 'पीला', french: 'jaune', spanish: 'amarillo', german: 'gelb', english: 'yellow' },
  
  // Questions
  what: { hindi: 'क्या', french: 'quoi', spanish: 'qué', german: 'was', english: 'what' },
  where: { hindi: 'कहाँ', french: 'où', spanish: 'dónde', german: 'wo', english: 'where' },
  when: { hindi: 'कब', french: 'quand', spanish: 'cuándo', german: 'wann', english: 'when' },
  why: { hindi: 'क्यों', french: 'pourquoi', spanish: 'por qué', german: 'warum', english: 'why' },
  how: { hindi: 'कैसे', french: 'comment', spanish: 'cómo', german: 'wie', english: 'how' },
  who: { hindi: 'कौन', french: 'qui', spanish: 'quién', german: 'wer', english: 'who' },
  
  // Articles & prepositions
  the: { hindi: '', french: 'le', spanish: 'el', german: 'der', english: 'the' },
  a: { hindi: 'एक', french: 'un', spanish: 'un', german: 'ein', english: 'a' },
  an: { hindi: 'एक', french: 'un', spanish: 'un', german: 'ein', english: 'an' },
  in: { hindi: 'में', french: 'dans', spanish: 'en', german: 'in', english: 'in' },
  on: { hindi: 'पर', french: 'sur', spanish: 'en', german: 'auf', english: 'on' },
  at: { hindi: 'पर', french: 'à', spanish: 'en', german: 'bei', english: 'at' },
  to: { hindi: 'को', french: 'à', spanish: 'a', german: 'zu', english: 'to' },
  for: { hindi: 'के लिए', french: 'pour', spanish: 'para', german: 'für', english: 'for' },
  with: { hindi: 'के साथ', french: 'avec', spanish: 'con', german: 'mit', english: 'with' },
  from: { hindi: 'से', french: 'de', spanish: 'de', german: 'von', english: 'from' },
  of: { hindi: 'का', french: 'de', spanish: 'de', german: 'von', english: 'of' },
  this: { hindi: 'यह', french: 'ce', spanish: 'este', german: 'dies', english: 'this' },
  that: { hindi: 'वह', french: 'ce', spanish: 'ese', german: 'das', english: 'that' },
  and: { hindi: 'और', french: 'et', spanish: 'y', german: 'und', english: 'and' },
  or: { hindi: 'या', french: 'ou', spanish: 'o', german: 'oder', english: 'or' },
  but: { hindi: 'लेकिन', french: 'mais', spanish: 'pero', german: 'aber', english: 'but' },
  not: { hindi: 'नहीं', french: 'ne pas', spanish: 'no', german: 'nicht', english: 'not' },
  
  // Sentence patterns
  name: { hindi: 'नाम', french: 'nom', spanish: 'nombre', german: 'Name', english: 'name' },
  people: { hindi: 'लोग', french: 'personnes', spanish: 'personas', german: 'Menschen', english: 'people' },
  life: { hindi: 'जीवन', french: 'vie', spanish: 'vida', german: 'Leben', english: 'life' },
  help: { hindi: 'मदद', french: 'aide', spanish: 'ayuda', german: 'Hilfe', english: 'help' },
  problem: { hindi: 'समस्या', french: 'problème', spanish: 'problema', german: 'Problem', english: 'problem' },
  question: { hindi: 'सवाल', french: 'question', spanish: 'pregunta', german: 'Frage', english: 'question' },
  answer: { hindi: 'जवाब', french: 'réponse', spanish: 'respuesta', german: 'Antwort', english: 'answer' },
  language: { hindi: 'भाषा', french: 'langue', spanish: 'idioma', german: 'Sprache', english: 'language' },
  speech: { hindi: 'भाषण', french: 'discours', spanish: 'discurso', german: 'Rede', english: 'speech' },
  translation: { hindi: 'अनुवाद', french: 'traduction', spanish: 'traducción', german: 'Übersetzung', english: 'translation' },
  music: { hindi: 'संगीत', french: 'musique', spanish: 'música', german: 'Musik', english: 'music' },
  book: { hindi: 'किताब', french: 'livre', spanish: 'libro', german: 'Buch', english: 'book' },
  friend: { hindi: 'दोस्त', french: 'ami', spanish: 'amigo', german: 'Freund', english: 'friend' },
  family: { hindi: 'परिवार', french: 'famille', spanish: 'familia', german: 'Familie', english: 'family' },
  money: { hindi: 'पैसा', french: 'argent', spanish: 'dinero', german: 'Geld', english: 'money' },
  power: { hindi: 'शक्ति', french: 'pouvoir', spanish: 'poder', german: 'Macht', english: 'power' },
  light: { hindi: 'रोशनी', french: 'lumière', spanish: 'luz', german: 'Licht', english: 'light' },
  dark: { hindi: 'अंधेरा', french: 'sombre', spanish: 'oscuro', german: 'dunkel', english: 'dark' },
  sun: { hindi: 'सूरज', french: 'soleil', spanish: 'sol', german: 'Sonne', english: 'sun' },
  moon: { hindi: 'चाँद', french: 'lune', spanish: 'luna', german: 'Mond', english: 'moon' },
  star: { hindi: 'तारा', french: 'étoile', spanish: 'estrella', german: 'Stern', english: 'star' },
  sky: { hindi: 'आकाश', french: 'ciel', spanish: 'cielo', german: 'Himmel', english: 'sky' },
  sea: { hindi: 'समुद्र', french: 'mer', spanish: 'mar', german: 'Meer', english: 'sea' },
  mountain: { hindi: 'पहाड़', french: 'montagne', spanish: 'montaña', german: 'Berg', english: 'mountain' },
  tree: { hindi: 'पेड़', french: 'arbre', spanish: 'árbol', german: 'Baum', english: 'tree' },
  bird: { hindi: 'पक्षी', french: 'oiseau', spanish: 'pájaro', german: 'Vogel', english: 'bird' },
  dog: { hindi: 'कुत्ता', french: 'chien', spanish: 'perro', german: 'Hund', english: 'dog' },
  cat: { hindi: 'बिल्ली', french: 'chat', spanish: 'gato', german: 'Katze', english: 'cat' },
  fish: { hindi: 'मछली', french: 'poisson', spanish: 'pez', german: 'Fisch', english: 'fish' },
};

export const FILLER_WORDS = new Set([
  'um', 'uh', 'er', 'ah', 'like', 'you know', 'basically', 'literally',
  'actually', 'right', 'okay', 'ok', 'so', 'well', 'just',
]);

export function getDictionary(userEntries: Array<{ word: string; translations: Partial<Record<TargetLanguage, string>> }>): Dictionary {
  const merged: Dictionary = { ...baseDictionary };
  for (const entry of userEntries) {
    merged[entry.word.toLowerCase()] = entry.translations;
  }
  return merged;
}
