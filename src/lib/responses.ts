import { Locale } from '@/i18n/request'

/**
 * Localized AI responses for each locale and mode
 * Contains culturally appropriate responses in each language
 */
export type { Locale }

export interface LocalizedResponses {
  greetings: string[]
  general: string[]
  analyze: string[]
  rewrite: string[]
  thinking: string[]
  image: string[]
  modes: {
    smooth: string[]
    funny: string[]
    short: string[]
    nerd: string[]
    savage: string[]
  }
}

// English responses
export const enResponses: LocalizedResponses = {
  greetings: [
    "Hey! I'm DonLeo, your personal wingman. What can I help you with today?",
    "What's up? I'm here to help you navigate the dating world. What's on your mind?",
    "Yo! DonLeo here. Ready to help you level up your dating game. What do you need?",
  ],
  general: [
    "That's a great question. Let me think about it... In my experience, honesty mixed with a little confidence goes a long way.",
    "Here's my take — don't overthink it. Most people are just as nervous as you are. Be genuine and you'll be fine.",
    "Look, I've seen a lot of situations like this. The key is keeping it light and showing genuine interest.",
    "Honestly? You're overthinking this. Send it already. Confidence is attractive.",
    "My advice? Keep it short, keep it real. If they're interested, they'll respond. If not, their loss — next!",
  ],
  analyze: [
    "Alright, looking at this conversation... I'm sensing some interest but they're playing it cool. A little playful banter could help.",
    "From what I see, you're doing great! They're responding well. Just keep the momentum going and don't be afraid to make a move.",
    "Hmm, they're being a bit brief. Could be busy, could be low interest. I'd suggest one more solid attempt, then pivot if needed.",
    "Actually, this looks promising! They're investing in the conversation. Time to suggest meeting up maybe?",
  ],
  rewrite: [
    "Here's a polished version: 'Hey! I'd love to continue this over coffee. When are you free?' — direct but chill.",
    "Try this: 'You seem cool. Want to grab a drink this weekend?' — confident and straightforward.",
    "How about: 'I'm enjoying talking to you. Dinner this Friday?' — shows interest without being overwhelming.",
  ],
  thinking: [
    "Based on what you've shared, I'd say they're interested but taking it slow. They're probably testing the waters to see if you're genuine.",
    "Here's the vibe I'm getting: they like you but don't want to seem too eager. Match their energy and occasionally lead a bit.",
    "My read? They're waiting for you to make a move. Sometimes you gotta take charge of the situation.",
  ],
  image: [
    "Got it! Let me take a look... Okay, I see the conversation. They're definitely interested — notice how they keep responding with questions?",
    "Nice! So from what I'm seeing, the energy is good. They're investing time in replies. My advice? Ask them out soon.",
    "Interesting... The conversation's flowing well. I'm liking your chances here. Want help crafting the next move?",
  ],
  modes: {
    smooth: [
      "I've really enjoyed getting to know you better. Would you want to grab coffee this weekend?",
      "You seem like someone I'd vibe well with. Dinner and drinks this Friday?",
      "I'll be honest — I'm interested in getting to know you better. Any plans for the weekend?",
      "You've been on my mind lately. Let's continue this conversation over dinner?",
      "I'd love to take you out properly. Are you free next Saturday?"
    ],
    funny: [
      "Are you a magician? Because whenever I look at your photos, everyone else disappears ✨",
      "On a scale of 1 to America, how free are you for dinner tonight? 🇺🇸",
      "I'd tell you a joke about pizza, but it's a little too cheesy... unlike us maybe? 🍕",
      "You had me at 'hey'. Seriously though, drinks this week?",
      "I'm not a photographer, but I can definitely picture us together 📸"
    ],
    short: [
      "You've got great taste in music 🎵",
      "Love that. Same energy.",
      "Facts. 💯",
      "Tell me more.",
      "Valid point. Also, you're cute."
    ],
    nerd: [
      "That's totally something Ted Lasso would say. Are you secretly a fan too?",
      "You seem cool — this is coming from someone who's seen The Office 7 times, so trust my judgment",
      "Breaking Bad references aside, you seem genuinely interesting. Coffee soon?",
      "I have a theory that you're secretly a Marvel fan. Prove me wrong over drinks?",
      "You're giving main character energy. What's your origin story?"
    ],
    savage: [
      "Bold of you to assume I have plans this weekend. So... what are we doing?",
      "I'd ask for your Netflix password, but I'd rather just take you out instead",
      "You're trouble, and I'm usually smart enough to avoid that. But for you? Make an exception.",
      "Most people bore me in 5 minutes. You've managed to keep me interested. Impressive.",
      "I'd say you're out of my league, but I don't believe in leagues. Drinks?"
    ]
  }
}

// Spanish responses
export const esResponses: LocalizedResponses = {
  greetings: [
    "¡Oye! Soy DonLeo, tu wingman personal. ¿En qué puedo ayudarte hoy?",
    "¿Qué tal? Estoy aquí para ayudarte a navegar el mundo de las citas. ¿Qué tienes en mente?",
    "¡Yo! DonLeo aquí. Listo para ayudarte a subir de nivel tu juego de citas. ¿Qué necesitas?",
  ],
  general: [
    "Esa es una gran pregunta. Déjame pensarlo... En mi experiencia, la honestidad mezclada con un poco de confianza va muy lejos.",
    "Aquí está mi opinión — no lo pienses demasiado. La mayoría de la gente están tan nerviosos como tú. Sé genuino y estarás bien.",
    "Mira, he visto muchas situaciones como esta. La clave es mantenerlo ligero y mostrar interés genuino.",
    "¿Honestamente? Estás pensando demasiado. Envíalo ya. La confianza es atractiva.",
    "¿Mi consejo? Manténlo corto, manténlo real. Si están interesados, responderán. Si no, su pérdida — ¡siguiente!",
  ],
  analyze: [
    "Bien, mirando esta conversación... Siento algo de interés pero están jugando con calma. Un poco de bantero juguetón podría ayudar.",
    "Por lo que veo, ¡lo estás haciendo genial! Están respondiendo bien. Solo mantén el momento y no tengas miedo de hacer un movimiento.",
    "Hmm, están siendo un poco breves. Podrían estar ocupados, podría ser poco interés. Sugeriría un intento más sólido, luego pivota si es necesario.",
    "¡Esto se ve prometedor! Están invirtiendo en la conversación. ¿Hora de sugerir reunirse quizás?",
  ],
  rewrite: [
    "Aquí está una versión pulida: '¡Oye! Me encantaría continuar esto sobre un café. ¿Cuándo estás libre?' — directo pero tranquilo.",
    "Prueba esto: 'Pareces genial. ¿Quieres tomar una bebida este fin de semana?' — confiada y directa.",
    "¿Qué tal: 'Estoy disfrutando hablar contigo. ¿Cenar este viernes?' — muestra interés sin ser abrumador.",
  ],
  thinking: [
    "Basado en lo que has compartido, diría que están interesados pero tomándolo con calma. Probablemente están probando las aguas para ver si eres genuino.",
    "Aquí está el vibe que estoy recibiendo: les gustas pero no quieren parecer demasiado ansiosos. Iguala su energía y ocasionalmente lidera un poco.",
    "¿Mi lectura? Están esperando a que hagas un movimiento. A veces tienes que tomar el control de la situación.",
  ],
  image: [
    "¡Entendido! Déjame mirar... Está bien, veo la conversación. Definitivamente están interesados — ¿notas cómo siguen respondiendo con preguntas?",
    "¡Genial! Por lo que estoy viendo, la energía es buena. Están invirtiendo tiempo en respuestas. ¿Mi consejo? Pídeles que salgan pronto.",
    "Interesante... La conversación está fluyendo bien. Me gustan tus posibilidades aquí. ¿Quieres ayuda para crear el próximo movimiento?",
  ],
  modes: {
    smooth: [
      "Realmente he disfrutado conocerte mejor. ¿Querrías tomar un café este fin de semana?",
      "Pareces alguien con quien llevaría bien. ¿Cena y bebidas este viernes?",
      "Seré honesto — me interesa conocerte mejor. ¿Planes para el fin de semana?",
      "Has estado en mi mente últimamente. Continuemos esta conversación sobre una cena?",
      "Me encantaría sacarte adecuadamente. ¿Estás libre el próximo sábado?"
    ],
    funny: [
      "¿Eres mago? Porque cada vez que miro tus fotos, todos los demás desaparecen ✨",
      "En una escala de 1 a América, qué tan libre estás para cenar esta noche? 🇺🇸",
      "Te contaría un chiste sobre pizza, pero es un poco demasiado cursi... a diferencia de nosotros quizás? 🍕",
      "Me ganaste con 'hey'. En serio though, ¿bebidas esta semana?",
      "No soy fotógrafo, pero definitivamente puedo vernos juntos 📸"
    ],
    short: [
      "Tienes muy buen gusto en música 🎵",
      "Me encanta eso. Misma energía.",
      "Hechos. 💯",
      "Cuéntame más.",
      "Punto válido. También, eres lindo/a."
    ],
    nerd: [
      "Eso es algo que Ted Lasso diría. ¿Eres secretamente fan también?",
      "Pareces genial — esto viene de alguien que ha visto The Office 7 veces, así que confía en mi juicio",
      "Aparte de las referencias de Breaking Bad, pareces genuinamente interesante. ¿Café pronto?",
      "Tengo una teoría de que eres secretamente fan de Marvel. Demuéstrame lo contrario con unas bebidas?",
      "Estás dando energía de personaje principal. ¿Cuál es tu historia de origen?"
    ],
    savage: [
      "Atrevido de tu parte asumir que tengo planes este fin de semana. Entonces... ¿qué estamos haciendo?",
      "Pediría tu contraseña de Netflix, pero preferiría sacarte en su lugar",
      "Eres problemas, y usualmente soy lo suficientemente inteligente para evitar eso. ¿Pero para ti? Hago una excepción.",
      "La mayoría de la gente me aburre en 5 minutos. Has logrado mantenerme interesado. Impresionante.",
      "Diría que estás fuera de mi liga, pero no creo en las ligas. ¿Bebidas?"
    ]
  }
}

// Italian responses
export const itResponses: LocalizedResponses = {
  greetings: [
    "Ehi! Sono DonLeo, il tuo wingman personale. Come posso aiutarti oggi?",
    "Cosa c'è? Sono qui per aiutarti a navigare nel mondo degli appuntamenti. Cosa hai in mente?",
    "Yo! DonLeo qui. Pronto ad aiutarti a portare il tuo gioco di dating al livello successivo. Di cosa hai bisogno?",
  ],
  general: [
    "Questa è una grande domanda. Fammi pensare... Nella mia esperienza, l'onestà mescolata con un po' di fiducia fa molto.",
    "Ecco il mio parere — non pensarci troppo. La maggior parte delle persone è nervosa quanto te. Sii genuino e starai bene.",
    "Senti, ho visto molte situazioni come questa. La chiave è mantenere leggero e mostrare interesse genuino.",
    "Onestamente? Stai pensando troppo. Invialo già. La fiducia è attraente.",
    "Il mio consiglio? Mantienilo breve, mantienilo reale. Se sono interessati, risponderanno. Se no, loro perdita — prossimo!",
  ],
  analyze: [
    "Bene, guardando questa conversazione... Sento un po' di interesse ma stanno giocando con calma. Un po' di battuta giocosa potrebbe aiutare.",
    "Da quello che vedo, lo stai facendo grande! Stanno rispondendo bene. Continua il momento e non aver paura di fare una mossa.",
    "Hmm, sono un po' brevi. Potrebbero essere occupati, potrebbe essere poco interesse. Suggerirei un altro tentativo solido, poi gira se necessario.",
    "Questo sembra promettente! Stanno investendo nella conversazione. Tempo di suggerire di incontrarsi forse?",
  ],
  rewrite: [
    "Ecco una versione lucidata: 'Ehi! Mi piacerebbe continuare questo su un caffè. Quando sei libero?' — diretto ma rilassato.",
    "Prova questo: 'Sembri figo. Vuoi prendere una drink questo weekend?' — sicuro e diretto.",
    "Che ne dici: 'Sto godendo parlare con te. Cena questo venerdì?' — mostra interesse senza essere schiacciante.",
  ],
  thinking: [
    "Basato su quello che hai condiviso, direi che sono interessati ma prendendolo piano. Probabilmente stanno testando le acque per vedere se sei genuino.",
    "Ecco il vibe che ricevo: piaci ma non vogliono sembrare troppo ansiosi. Abbina la loro energia e occasionalmente guida un po'.",
    "La mia lettura? Stanno aspettando che tu faccia una mossa. A volte devi prendere il controllo della situazione.",
  ],
  image: [
    "Ricevuto! Fammi guardare... Ok, vedo la conversazione. Sono definitamente interessati — noti come continuano a rispondere con domande?",
    "Bello! Quindi da quello che vedo, l'energia è buona. Stanno investendo tempo nelle risposte. Il mio consiglio? Chiedi loro di uscire presto.",
    "Interessante... La conversazione scorre bene. Mi piacciono le tue possibilità qui. Vuoi aiuto per creare la prossima mossa?",
  ],
  modes: {
    smooth: [
      "Ho davvero apprezzato conoscerti meglio. Vorresti prendere un caffè questo weekend?",
      "Sembri qualcuno con cui andrei d'accordo. Cena e drink questo venerdì?",
      "Sarò onesto — sono interessato a conoscerti meglio. Piani per il weekend?",
      "Sei stato nella mia mente ultimamente. Continuiamo questa conversazione su una cena?",
      "Mi piacerebbe portarti fuori correttamente. Sei libero il prossimo sabato?"
    ],
    funny: [
      "Sei un mago? Perché ogni volta che guardo le tue foto, tutti gli altri scompaiono ✨",
      "Su una scala da 1 a America, quanto sei libero per cena stasera? 🇺🇸",
      "Ti racconterei una barzelletta sulla pizza, ma è un po' troppo cheesiosa... a differenza di noi forse? 🍕",
      "Mi hai conquistato con 'ehi'. Seriamente though, drink questa settimana?",
      "Non sono un fotografo, ma posso sicuramente vederci insieme 📸"
    ],
    short: [
      "Hai ottimo gusto in musica 🎵",
      "Mi piace quello. Stessa energia.",
      "Fatti. 💯",
      "Dimmi di più.",
      "Punto valido. Inoltre, sei carino/a."
    ],
    nerd: [
      "È qualcosa che Ted Lasso direbbe. Sei segretamente fan anche tu?",
      "Sembri figo — questo viene da qualcuno che ha visto The Office 7 volte, quindi fida del mio giudizio",
      "A parte le referenze di Breaking Bad, sembri genuinamente interessante. Caffè presto?",
      "Ho una teoria che sei segretamente fan di Marvel. Dimmi il contrario su un drink?",
      "Stai dando energia da protagonista. Qual è la tua storia di origine?"
    ],
    savage: [
      "Audace da parte tua presumere che ho piani questo weekend. Quindi... cosa stiamo facendo?",
      "Chiederei la tua password di Netflix, ma preferirei portarti fuori invece",
      "Sei guai, e di solito sono abbastanza intelligente da evitarlo. Ma per te? Faccio un'eccezione.",
      "La maggior parte delle persone mi annoia in 5 minuti. Sei riuscito a mantenere interessato. Impressionante.",
      "Direi che sei fuori dalla mia lega, ma non credo nelle leghe. Drink?"
    ]
  }
}

// French responses
export const frResponses: LocalizedResponses = {
  greetings: [
    "Salut! Je suis DonLeo, ton wingman personnel. Comment puis-je t'aider aujourd'hui?",
    "Quoi de neuf? Je suis ici pour t'aider à naviguer dans le monde des rencontres. Qu'as-tu en tête?",
    "Yo! DonLeo ici. Prêt à t'aider à faire passer ton jeu de dating au niveau supérieur. De quoi as-tu besoin?",
  ],
  general: [
    "C'est une excellente question. Laisse-moi réfléchir... Dans mon expérience, l'honnêteté mélangée à un peu de confiance fait longue route.",
    "Voici mon avis — ne le pense pas trop. La plupart des gens sont aussi nerveux que toi. Sois genuino et tu seras bien.",
    "Écoute, j'ai vu beaucoup de situations comme celle-ci. La clé est de garder léger et de montrer un intérêt genuino.",
    "Franchement? Tu le penses trop. Envoie-le déjà. La confiance est attrayante.",
    "Mon conseil? Garde-le court, garde-le réel. S'ils sont intéressés, ils répondront. Sinon, leur perte — suivant!",
  ],
  analyze: [
    "D'accord, regardant cette conversation... Je sens un certain intérêt mais ils jouent avec calme. Un peu de banter ludique pourrait aider.",
    "D'après ce que je vois, tu te débrouilles bien! Ils répondent bien. Continue le momentum et n'aie pas peur de faire un mouvement.",
    "Hmm, ils sont un peu brefs. Peut-être occupés, peut-être peu d'intérêt. Je suggérerais une autre tentative solide, puis pivote si nécessaire.",
    "En fait, ça looks prometteur! Ils investissent dans la conversation. Temps de suggérer de se réunir peut-être?",
  ],
  rewrite: [
    "Voici une version polie: 'Salut! J'aimerais continuer ça sur un café. Quand es-tu libre?' — direct mais chill.",
    "Essaie ça: 'Tu as l'air cool. Veux-tu prendre un drink ce week-end?' — confiant et direct.",
    "Qu'en penses-tu: 'J'aime te parler. Dîner ce vendredi?' — montre de l'intérêt sans être écrasant.",
  ],
  thinking: [
    "Basé sur ce que tu as partagé, je dirais qu'ils sont intéressés mais prennent doucement. Ils testent probablement les eaux pour voir si tu es genuino.",
    "Voici le vibe que je reçois: tu leur plais mais ils ne veulent pas paraître trop eagres. Fais correspondre leur énergie et occasionnellement mène un peu.",
    "Mon read? Ils attendent que tu fasses un mouvement. Parfois tu dois prendre le contrôle de la situation.",
  ],
  image: [
    "J'ai ça! Laisse-moi regarder... Ok, je vois la conversation. Ils sont définitivement intéressés — remarques comment ils continuent à répondre avec des questions?",
    "Nice! D'après ce que je vois, l'énergie est bonne. Ils investissent du temps dans les réponses. Mon conseil? Demande-leur de sortir bientôt.",
    "Intéressant... La conversation coule bien. J'aime tes chances ici. Tu veux de l'aide pour créer le prochain mouvement?",
  ],
  modes: {
    smooth: [
      "J'ai vraiment apprécié te connaître mieux. Voudrais-tu prendre un café ce week-end?",
      "Tu as l'air de quelqu'un avec qui je m'entendrais bien. Dîner et drinks ce vendredi?",
      "Je serai honnête — je suis intéressé à te connaître mieux. Des plans pour le week-end?",
      "Tu as été dans ma tête ces derniers temps. Continuons cette conversation sur un dîner?",
      "J'aimerais t'inviter correctement. Es-tu libre le prochain samedi?"
    ],
    funny: [
      "Tu es un magicien? Parce que chaque fois que je regarde tes photos, tous les autres disparaissent ✨",
      "Sur une échelle de 1 à Amérique, à quel point es-tu libre pour dîner ce soir? 🇺🇸",
      "Je te raconterais une blague sur la pizza, mais c'est un peu trop cheesy... à la différence de nous peut-être? 🍕",
      "Tu m'as eu à 'salut'. Sérieusement though, drinks cette semaine?",
      "Je ne suis pas photographe, mais je peux sûrement nous voir ensemble 📸"
    ],
    short: [
      "Tu as un excellent goût en musique 🎵",
      "J'aime ça. Même énergie.",
      "Faits. 💯",
      "Dis-m'en plus.",
      "Point valide. Aussi, tu es mignon/ne."
    ],
    nerd: [
      "C'est quelque chose que Ted Lasso dirait. Tu es secrètement fan aussi?",
      "Tu as l'air cool — ça vient de quelqu'un qui a vu The Office 7 fois, donc fais confiance à mon jugement",
      "Hormis les références de Breaking Bad, tu as l'air genuinement intéressant. Café bientôt?",
      "J'ai une théorie que tu es secrètement fan de Marvel. Prouve-moi le contraire sur un drink?",
      "Tu donnes de l'énergie de personnage principal. Quelle est ton histoire d'origine?"
    ],
    savage: [
      "Audacieux de ta part de supposer que j'ai des plans ce week-end. Alors... qu'est-ce qu'on fait?",
      "Je demanderais ton mot de passe Netflix, mais je préférerais juste t'inviter à la place",
      "Tu es problèmes, et je suis habituellement assez intelligent pour éviter ça. Mais pour toi? Je ferai une exception.",
      "La plupart des gens m'ennuient en 5 minutes. Tu as réussi à garder mon intérêt. Impressionnant.",
      "Je dirais que tu es hors de ma ligue, mais je ne crois pas aux ligues. Drinks?"
    ]
  }
}

// German responses
export const deResponses: LocalizedResponses = {
  greetings: [
    "Hey! Ich bin DonLeo, dein persönlicher Wingman. Wie kann ich dir heute helfen?",
    "Was gibt's? Ich bin hier, um dir zu helfen, dich in der Dating-Welt zurechtzufinden. Was hast du im Kopf?",
    "Yo! DonLeo hier. Bereit, dir zu helfen, dein Dating-Spiel auf die nächste Stufe zu heben. Was brauchst du?",
  ],
  general: [
    "Das ist eine großartige Frage. Lass mich nachdenken... Meiner Erfahrung nach geht Ehrlichkeit gemischt mit ein wenig Selbstvertrauen weit.",
    "Hier ist meine Meinung — denke nicht zu viel nach. Die meisten Menschen sind genauso nervös wie du. Sei ehrlich und du wirst fine sein.",
    "Hör zu, ich habe viele Situationen wie diese gesehen. Der Schlüssel ist, es leicht zu halten und echtes Interesse zu zeigen.",
    "Ehrlich? Du denkst zu viel darüber nach. Schick es schon. Selbstvertrauen ist attraktiv.",
    "Mein Rat? Halte es kurz, halte es echt. Wenn sie interessiert sind, werden sie antworten. Wenn nicht, ihr Verlust — nächster!",
  ],
  analyze: [
    "Okay, ich sehe mir dieses Gespräch an... Ich spüre etwas Interesse, aber sie spielen es cool. Ein little playful banter könnte helfen.",
    "Von dem, was ich sehe, machst du großartig! Sie reagieren gut. Halte den Schwung und habe keine Angst, einen Zug zu machen.",
    "Hmm, sie sind ein little kurz. Könnte busy sein, könnte geringes Interesse sein. Ich würde einen weiteren soliden Versuch vorschlagen, dann pivot wenn nötig.",
    "Eigentlich sieht das vielversprechend aus! Sie investieren in das Gespräch. Zeit, sich zu treffen vielleicht?",
  ],
  rewrite: [
    "Hier ist eine polierte Version: 'Hey! Ich würde gerne das bei einem Kaffee fortsetzen. Wann bist du frei?' — direkt aber chill.",
    "Versuche das: 'Du wirkst cool. Willst du dieses Wochenende einen Drink trinken?' — selbstbewusst und direkt.",
    "Wie wäre es: 'Ich genieße es, mit dir zu reden. Dinner dieses Freitag?' — zeigt Interesse, ohne überwältigend zu sein.",
  ],
  thinking: [
    "Basierend auf dem, was du geteilt hast, würde ich sagen, sie sind interessiert, aber nehmen es langsam. Sie testen wahrscheinlich die Gewässer, um zu sehen, ob du ehrlich bist.",
    "Hier ist der Vibe, den ich bekomme: du gefällst ihnen, aber sie wollen nicht zu eaggy wirken. Gleiche ihre Energie aus und führe gelegentlich ein little.",
    "Meine Lesung? Sie warten darauf, dass du einen Zug machst. Manchmal musst du die Kontrolle über die Situation übernehmen.",
  ],
  image: [
    "Habe es! Lass mich looken... Okay, ich sehe das Gespräch. Sie sind definitiv interessiert — merkst du, wie sie immer mit Fragen antworten?",
    "Schön! Von dem, was ich sehe, ist die Energie gut. Sie investieren Zeit in Antworten. Mein Rat? Frag sie bald raus.",
    "Interessant... Das Gespräch fließt gut. Ich mag deine Chancen hier. Willst du Hilfe, den nächsten Zug zu crafting?",
  ],
  modes: {
    smooth: [
      "Ich habe dich wirklich besser kennengelernt. Möchtest du dieses Wochenende einen Kaffee trinken?",
      "Du wirkst wie jemand, mit dem ich gut auskäme. Dinner und Drinks diesen Freitag?",
      "Ich werde ehrlich sein — ich bin daran interessiert, dich besser kennenzulernen. Pläne für das Wochenende?",
      "Du warst mir lately in den Sinn. Lass uns dieses Gespräch bei einem Dinner fortsetzen?",
      "Ich würde dich gerne richtig einladen. Hast du nächsten Samstag Zeit?"
    ],
    funny: [
      "Bist du ein Magier? Weil wann immer ich auf deine Fotos schaue, verschwinden alle anderen ✨",
      "Auf einer Skala von 1 bis Amerika, wie frei bist du heute Abend für ein Dinner? 🇺🇸",
      "Ich würde dir einen Witz über Pizza erzählen, aber er ist ein little zu cheesy... im Gegensatz zu uns vielleicht? 🍕",
      "Du hattest mich bei 'hey'. Ernsthaft though, Drinks diese Woche?",
      "Ich bin kein Fotograf, aber ich kann uns definitiv zusammen sehen 📸"
    ],
    short: [
      "Du hast einen exzellenten Musikgeschmack 🎵",
      "Das liebe ich. Gleiche Energie.",
      "Fakten. 💯",
      "Erzähl mir mehr.",
      "Gültiger Punkt. Außerdem bist du süß/hübsch."
    ],
    nerd: [
      "Das ist etwas, das Ted Lasso sagen würde. Bist du heimlich auch ein Fan?",
      "Du wirkst cool — das kommt von jemandem, der The Office 7 Mal gesehen hat, vertrau also meinem Urteil",
      "Abgesehen von den Breaking Bad-Referenzen wirkst du genuin interessant. Kaffee bald?",
      "Ich habe eine Theorie, dass du heimlich ein Marvel-Fan bist. Beweis mir das Gegenteil bei einem Drink?",
      "Du gibst Hauptcharakter-Energie ab. Was ist deine Ursprungsgeschichte?"
    ],
    savage: [
      "Frech von dir anzunehmen, dass ich dieses Wochenende Pläne habe. Also... was machen wir?",
      "Ich würde nach deinem Netflix-Passwort fragen, aber ich würde dich lieber stattdessen einladen",
      "Du bist Ärger, und normalerweise bin ich smart genug, um das zu vermeiden. Aber für dich? Ich mache eine Ausnahme.",
      "Die meisten Menschen langweilen mich in 5 Minuten. Du hast es geschafft, mein Interesse zu halten. Beeindruckend.",
      "Ich würde sagen, du bist außerhalb meiner Liga, aber ich glaube nicht an Ligen. Drinks?"
    ]
  }
}

/**
 * Get localized responses by locale
 */
export function getResponses(locale: Locale = 'en'): LocalizedResponses {
  const responsesMap: Record<Locale, LocalizedResponses> = {
    en: enResponses,
    es: esResponses,
    it: itResponses,
    fr: frResponses,
    de: deResponses,
  }

  return responsesMap[locale] || enResponses
}

/**
 * Get mode-specific responses by locale
 */
export function getModeResponses(locale: Locale = 'en', mode: keyof LocalizedResponses['modes']): string[] {
  const responses = getResponses(locale)
  return responses.modes[mode] || responses.modes.smooth
}

/**
 * Get a random response from a category by locale
 */
export function getRandomResponse(locale: Locale = 'en', category: keyof Omit<LocalizedResponses, 'modes'>): string {
  const responses = getResponses(locale)
  const categoryResponses = responses[category]
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
}
