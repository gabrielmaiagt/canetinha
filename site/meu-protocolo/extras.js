/* =====================================================================
   PRODUTOS EXTRAS vendidos dentro do app (/meu-protocolo)
   Mesmo conteúdo vai no PDF de entrega da Kirvano (tools/pdf_extras.js).
   codigo = o que destrava no app. Vai impresso no PDF e na URL de obrigado (?libera=codigo).
   ===================================================================== */
const EXTRAS = {
  doces: {
    codigo: "DOCE7K2",
    nome: "Doces Liberados do Seu Tipo",
    emoji: "🍫",
    preco: "19,90", de: "47,00",
    checkout: "https://pay.kirvano.com/db02ec18-947b-4017-95dd-502b6d88be90",
    gancho: "A vontade de doce é o que mais faz largar a dieta. Aqui estão os doces que o seu tipo aceita.",
    bullets: ["24 doces e lanches, 6 pra cada tipo sanguíneo", "Sem açúcar refinado e sem nada da sua lista vermelha", "Pudim, brigadeiro, sorvete, bolo de caneca e mais", "Prontos em até 15 minutos, com ingrediente de mercado"],
    intro: "Doce não é proibido. O que trava o seu corpo é o açúcar refinado junto com o que o seu tipo rejeita. Todos os doces abaixo usam só o que está na sua lista verde e servem pra comer até 4 vezes por semana, de preferência depois do almoço.",
    porTipo: {
      O: [
        ["🍫", "Brigadeiro de banana", ["2 bananas maduras", "1 colher de cacau em pó 100%", "1 colher de óleo de coco"], ["Amassa a banana e leva ao fogo baixo com o cacau e o óleo de coco.", "Mexe por 8 minutos até desgrudar da panela.", "Esfria, enrola e passa no cacau."]],
        ["🍮", "Pudim de ovo sem leite", ["3 ovos", "200 ml de leite de coco", "2 colheres de mel", "Essência de baunilha"], ["Bate tudo no liquidificador.", "Coloca em potinhos e assa em banho-maria a 180 °C por 35 minutos.", "Gela por 2 horas."]],
        ["🍍", "Abacaxi grelhado com canela", ["4 fatias de abacaxi", "Canela em pó", "1 colher de óleo de coco"], ["Grelha o abacaxi no óleo de coco, 3 minutos de cada lado.", "Polvilha canela na hora de servir."]],
        ["🍦", "Sorvete de manga", ["2 mangas em cubos congeladas", "4 colheres de leite de coco"], ["Bate no processador até virar creme.", "Come na hora ou volta 30 minutos pro congelador."]],
        ["🥥", "Cocadinha de forno", ["1 xícara de coco ralado sem açúcar", "1 ovo", "1 colher de mel"], ["Mistura tudo e faz bolinhas.", "Assa a 180 °C por 15 minutos até dourar."]],
        ["🍌", "Banana assada com castanha", ["1 banana", "Castanha-do-pará picada", "Canela"], ["Corta a banana ao meio no comprimento.", "Assa 10 minutos e cobre com castanha e canela."]],
      ],
      A: [
        ["🫐", "Creme de frutas vermelhas", ["1 xícara de frutas vermelhas congeladas", "2 colheres de aveia", "100 ml de leite de soja"], ["Bate tudo até ficar cremoso.", "Serve gelado com mais frutas por cima."]],
        ["🍎", "Maçã assada com aveia", ["1 maçã", "1 colher de aveia", "Canela e 1 colher de mel"], ["Tira o miolo da maçã.", "Recheia com aveia, mel e canela.", "Assa a 180 °C por 25 minutos."]],
        ["🍪", "Cookie de aveia e ameixa", ["1 xícara de aveia", "1 ovo", "4 ameixas picadas", "1 colher de mel"], ["Mistura tudo e faz 8 cookies.", "Assa a 180 °C por 15 minutos."]],
        ["🍐", "Pera cozida com gengibre", ["2 peras", "1 rodela de gengibre", "Canela em pau"], ["Cozinha as peras em 1 copo de água com gengibre e canela por 15 minutos.", "Serve morna com a calda."]],
        ["🍫", "Mousse de cacau com tofu", ["200 g de tofu macio", "2 colheres de cacau 100%", "2 colheres de mel"], ["Bate tudo no liquidificador.", "Gela 1 hora."]],
        ["🧁", "Bolo de caneca de aveia", ["3 colheres de aveia", "1 ovo", "1 colher de mel", "Fermento e canela"], ["Mistura tudo na caneca.", "Micro-ondas por 2 minutos."]],
      ],
      B: [
        ["🍮", "Pudim de iogurte", ["2 potes de iogurte natural", "1 colher de gelatina sem sabor", "2 colheres de mel", "Baunilha"], ["Hidrata a gelatina e mistura no iogurte com mel e baunilha.", "Gela 3 horas."]],
        ["🍌", "Brigadeiro de banana com leite", ["2 bananas", "3 colheres de leite em pó", "1 colher de cacau 100%"], ["Leva tudo ao fogo baixo mexendo por 8 minutos.", "Esfria e enrola."]],
        ["🍦", "Frozen de iogurte e uva", ["1 pote de iogurte natural", "1 xícara de uva congelada"], ["Bate até virar sorvete.", "Come na hora."]],
        ["🧀", "Cheesecake de pote", ["Ricota", "Iogurte natural", "Mel", "Geleia de uva sem açúcar"], ["Bate a ricota com iogurte e mel.", "Monta no pote com a geleia por cima.", "Gela 1 hora."]],
        ["🍉", "Picolé de melancia", ["3 xícaras de melancia", "Suco de 1 limão"], ["Bate e coa.", "Coloca em forminhas e congela 4 horas."]],
        ["🧁", "Bolo de banana de caneca", ["1 banana", "1 ovo", "3 colheres de aveia", "Canela"], ["Amassa a banana, mistura tudo na caneca.", "Micro-ondas por 2 minutos."]],
      ],
      AB: [
        ["🍇", "Creme de uva com iogurte", ["1 xícara de uva sem semente congelada", "1 pote de iogurte natural"], ["Bate até ficar cremoso.", "Serve com nozes."]],
        ["🍍", "Mousse de abacaxi", ["1 xícara de abacaxi", "1 pote de iogurte natural", "1 colher de gelatina sem sabor"], ["Bate o abacaxi com o iogurte.", "Mistura a gelatina hidratada e gela 3 horas."]],
        ["🥝", "Kiwi com ricota e mel", ["2 kiwis", "2 colheres de ricota", "1 colher de mel"], ["Corta o kiwi em rodelas.", "Cobre com ricota batida com mel."]],
        ["🍪", "Cookie de aveia e nozes", ["1 xícara de aveia", "1 ovo", "Nozes picadas", "1 colher de mel"], ["Mistura e faz 8 cookies.", "Assa a 180 °C por 15 minutos."]],
        ["🍮", "Pudim de ovo com iogurte", ["3 ovos", "1 pote de iogurte natural", "2 colheres de mel"], ["Bate tudo.", "Assa em banho-maria a 180 °C por 30 minutos e gela."]],
        ["🍉", "Granita de melancia e limão", ["3 xícaras de melancia", "Suco de 1 limão"], ["Bate, coloca numa travessa e congela.", "Raspa com o garfo a cada 30 minutos, 3 vezes."]],
      ],
    },
  },

  barriga: {
    codigo: "BARRIGA4M9",
    nome: "Barriga Chapada 21 Dias",
    emoji: "🔥",
    preco: "27,00", de: "67,00",
    checkout: "https://pay.kirvano.com/3ca854bc-b816-4001-8e65-de91fc63f325",
    gancho: "Desinchou mas a barriguinha ainda tá lá? É o intestino travado. Esse protocolo destrava em 21 dias.",
    bullets: ["Shot da manhã e chá da noite feitos pro seu tipo", "3 fases de 7 dias: destravar, secar e firmar", "Lista do que fermenta e estufa no seu tipo", "Rotina de 5 minutos por dia, com check diário no app"],
    intro: "A Dieta do Sangue tira do prato o que inflama. O Barriga Chapada cuida do que ficou parado: intestino lento, gases e retenção na barriga. São 21 dias em 3 fases, com um shot de manhã e um chá à noite feitos com o que o seu tipo aceita.",
    shots: {
      O: [["Shot da manhã", "Suco de 1 limão + 1 rodela de gengibre ralado + 1 pitada de cúrcuma + 50 ml de água morna. Toma em jejum, num gole."], ["Chá da noite", "Chá de hortelã com 3 cravos e casca de abacaxi. 1 xícara, 1 hora antes de dormir."]],
      A: [["Shot da manhã", "Suco de 1 limão + 1 colher de chá de linhaça hidratada + 50 ml de água morna. Toma em jejum."], ["Chá da noite", "Chá de camomila com erva-doce. 1 xícara, 1 hora antes de dormir."]],
      B: [["Shot da manhã", "50 ml de água morna + suco de meio limão + 1 rodela de gengibre ralado. Toma em jejum."], ["Chá da noite", "Chá de hortelã com gengibre. 1 xícara, 1 hora antes de dormir."]],
      AB: [["Shot da manhã", "Suco de 1 limão + 50 ml de água morna + 1 colher de chá de chia hidratada. Toma em jejum."], ["Chá da noite", "Chá verde fraco com hortelã até as 17h, ou camomila se for tomar à noite."]],
    },
    estufa: {
      O: ["Repolho cru", "Brócolis cru (cozido pode)", "Refrigerante e água com gás", "Chiclete"],
      A: ["Feijão de qualquer tipo", "Repolho", "Água com gás", "Adoçante artificial"],
      B: ["Milho e pipoca", "Lentilha", "Refrigerante", "Fritura"],
      AB: ["Feijão e grão-de-bico", "Repolho cru", "Refrigerante", "Excesso de café"],
    },
    fases: [
      ["Fase 1 · Dias 1 a 7 · Destravar", ["Shot da manhã todo dia em jejum", "2,5 litros de água", "Verdura cozida no almoço e no jantar (cru estufa no começo)", "Nada da lista do que estufa", "Massagem na barriga no sentido horário, 2 minutos antes de dormir"]],
      ["Fase 2 · Dias 8 a 14 · Secar", ["Shot da manhã + chá da noite", "Jantar até 19h30", "Caminhada de 15 minutos depois do almoço", "Uma refeição por dia com verdura crua", "Sem sal no jantar"]],
      ["Fase 3 · Dias 15 a 21 · Firmar", ["Shot da manhã 5 vezes na semana", "Chá da noite todo dia", "Exercício de barriga (prancha) 3 x 20 segundos", "Mastigar 20 vezes cada garfada", "Foto de lado no dia 21 pra comparar com o dia 1"]],
    ],
  },

  fase2: {
    codigo: "META8P3",
    nome: "Fase 2 · Meta Final 60 Dias",
    emoji: "🎯",
    preco: "37,00", de: "97,00",
    checkout: "https://pay.kirvano.com/74c366ec-85f5-431d-8104-f3b5bfd2d0e1",
    gancho: "Os 30 dias tiram até 10 kg. Se a sua meta é mais, a Fase 2 continua de onde você parou.",
    bullets: ["Mais 60 dias de cardápio do seu tipo (dias 31 a 90)", "Plano anti-platô: o que fazer quando a balança para", "Cardápio de fim de semana e de festa", "Manutenção pra não voltar nenhum quilo"],
    intro: "Entre a 3ª e a 5ª semana é comum o peso parar. Não é a dieta que parou de funcionar: o corpo se acostumou. A Fase 2 muda o cardápio a cada 2 semanas pra ele não se acostumar, e traz o plano pra quando a balança travar.",
    plato: [
      ["Troca a ordem do prato", "Come primeiro a verdura, depois a proteína e por último o carboidrato. Faz isso por 5 dias."],
      ["Dia de carboidrato baixo", "2 vezes na semana, tira o carboidrato do jantar e dobra a verdura."],
      ["Jantar mais cedo", "Por 7 dias, jantar até 19h. Dá 13 horas de jejum até o café."],
      ["Reconta a água", "Platô junto com pouca água é retenção. Volta pros 2,5 litros e faz 3 dias da Água Desincha."],
      ["Mede a cintura", "Se a balança parou mas a cintura baixou, você está trocando gordura por músculo. Continua."],
    ],
    fds: ["Sábado: uma refeição livre, não o dia livre", "Churrasco: proteína da sua lista verde + salada; pula o pão de alho e a farofa", "Festa: come antes de sair (proteína + verdura) pra chegar sem fome", "Bebida: prefere 1 taça de vinho seco a cerveja; alterna com água", "Domingo: Água Desincha em jejum e volta ao cardápio no almoço"],
    manut: ["Pese-se toda segunda de manhã", "Subiu 1 kg: 3 dias de cardápio 100% + Água Desincha", "Subiu 2 kg: refaz a Fase 1 do Barriga Chapada ou a semana Desincha", "Regra 80/20 pra sempre", "Volta um alimento da lista vermelha por vez e observa 2 dias"],
    // refeições extras pro cardápio dos dias 31 a 90 ({p} {c} {o} = porções pelo peso)
    meals: {
      O: { almoco: ["Picadinho de carne ({p} g) com quiabo + abóbora", "Peixe ao molho de ervas ({p} g) + espinafre + batata-doce ({c} col.)", "Almôndegas de patinho ({p} g) ao sugo de abóbora + salada", "Frango ao curry ({p} g) com couve + arroz ({c} col.)", "Carne de panela ({p} g) com abobrinha + mandioca ({c} col.)"], jantar: ["Wrap de alface com carne moída ({p} g)", "Caldo verde sem batata com carne ({p} g)", "Peixe ({p} g) com legumes no papelote", "Omelete de {o} ovos com abobrinha e cebola", "Sopa de legumes com frango desfiado ({p} g)"] },
      A: { almoco: ["Moqueca de peixe ({p} g) + arroz integral ({c} col.)", "Hambúrguer de tofu ({p} g) + salada + quinoa ({c} col.)", "Peixe com crosta de linhaça ({p} g) + legumes", "Grão-de-bico ({c} col.) com espinafre + cenoura", "Sardinha ({p} g) com abobrinha + arroz integral ({c} col.)"], jantar: ["Sopa de missô com tofu ({p} g)", "Peixe ({p} g) com purê de abóbora", "Omelete de {o} ovos com espinafre", "Salada de quinoa ({c} col.) com legumes assados", "Caldo de legumes com gengibre"] },
      B: { almoco: ["Carne assada ({p} g) + purê de inhame ({c} col.) + salada", "Peixe com legumes ({p} g) + arroz ({c} col.)", "Escondidinho de batata-doce com carne ({p} g)", "Omelete de forno de {o} ovos com queijo branco + salada", "Cordeiro ou carne magra ({p} g) + repolho refogado + arroz ({c} col.)"], jantar: ["Caldo de inhame com carne ({p} g)", "Salada de folhas com queijo branco e {o} ovos", "Peixe ({p} g) com legumes", "Sopa de abóbora com ricota", "Carne moída ({p} g) com pimentão"] },
      AB: { almoco: ["Peixe ao forno ({p} g) + arroz ({c} col.) + salada de pepino", "Atum ({p} g) com quinoa ({c} col.) e legumes", "Tofu ({p} g) com brócolis + batata-doce ({c} col.)", "Omelete de {o} ovos com ricota + arroz ({c} col.)", "Sardinha ({p} g) + beterraba + arroz ({c} col.)"], jantar: ["Creme de abobrinha com tofu ({p} g)", "Peixe ({p} g) com salada verde", "Omelete de {o} ovos com espinafre", "Sopa de legumes com atum ({p} g)", "Salada de quinoa ({c} col.) com pepino"] },
    },
  },
};

/* =====================================================================
   UPSELLS do funil (/sangue/up1, up2, up3). Não aparecem na vitrine do app:
   só liberam pra quem comprou. "X" = upsell completo, "D" = downsell.
   ===================================================================== */
const UPSELLS = {
  acel: {
    codigos: { ACEL21X: "full", ACEL21D: "down" },
    nome: "Acelerador 21 Dias", emoji: "⚡",
    intro: "21 dias no modo intensivo. Você tira de uma vez tudo o que o seu sangue rejeita e segue o cardápio enxuto de cada fase. O resultado que viria em 30 dias começa a aparecer antes.",
    fases: [
      ["Dias 1 a 7 · Limpeza", "Sai tudo o que o seu sangue rejeita de uma vez, inclusive o que está na lista Zero Absoluto. Entra o suco da manhã do seu tipo. Carboidrato só no almoço."],
      ["Dias 8 a 14 · Queima", "O jantar vira sopa ou salada com proteína. Entra o chá do seu tipo antes de dormir. Jantar até 19h30."],
      ["Dias 15 a 21 · Firmeza", "Os alimentos da lista verde voltam aos poucos: carboidrato também no jantar, 3 vezes na semana. É o que segura o resultado."],
    ],
    zero: {
      O: ["Pão de qualquer tipo", "Leite e queijo", "Cuscuz, milho e tapioca", "Feijão", "Açúcar e refrigerante", "Bebida alcoólica"],
      A: ["Carne vermelha e embutidos", "Leite e queijo amarelo", "Feijão-carioca", "Batata inglesa", "Açúcar e refrigerante", "Bebida alcoólica"],
      B: ["Frango e peito de peru", "Milho, cuscuz e tapioca", "Trigo e pão", "Amendoim", "Açúcar e refrigerante", "Bebida alcoólica"],
      AB: ["Carne vermelha e frango", "Milho, cuscuz e tapioca", "Feijão", "Mais de 1 café por dia", "Açúcar e refrigerante", "Bebida alcoólica"],
    },
    bebidas: {
      O: [["Suco da manhã", "1 fatia de abacaxi + 1 folha de couve + 1 rodela de gengibre + 200 ml de água gelada. Bate e toma sem coar, em jejum."], ["Chá da noite", "Hortelã com gengibre e 2 cravos. 1 xícara, 1 hora antes de dormir."]],
      A: [["Suco da manhã", "Meia maçã + 1 punhado de espinafre + suco de meio limão + 200 ml de água. Em jejum."], ["Chá da noite", "Camomila com erva-doce. 1 xícara, 1 hora antes de dormir."]],
      B: [["Suco da manhã", "1 fatia de abacaxi + meia beterraba pequena + 1 rodela de gengibre + 200 ml de água. Em jejum."], ["Chá da noite", "Hortelã com canela em pau. 1 xícara, 1 hora antes de dormir."]],
      AB: [["Suco da manhã", "1 fatia de abacaxi + meio pepino + suco de meio limão + 200 ml de água. Em jejum."], ["Chá da noite", "Camomila com hortelã. 1 xícara, 1 hora antes de dormir."]],
    },
    // {p} {c} {o} = porções pelo peso, igual ao cardápio principal
    menu: {
      O: { cafe: ["{o} ovos mexidos com espinafre", "Omelete de {o} ovos com couve", "{o} ovos cozidos + 1 fatia de abacaxi", "Omelete de {o} ovos com abobrinha"], almoco: ["Carne magra ({p} g) + brócolis + arroz ({c} col.)", "Peixe ({p} g) + couve + abóbora", "Patinho moído ({p} g) com abobrinha + batata-doce ({c} col.)", "Frango ({p} g) + quiabo + arroz ({c} col.)", "Sardinha ({p} g) + salada verde + batata-doce ({c} col.)"], jantar: ["Sopa de abóbora com carne desfiada ({p} g)", "Salada verde com {o} ovos cozidos e azeite", "Caldo de legumes com frango desfiado ({p} g)", "Peixe grelhado ({p} g) + salada de folhas"] },
      A: { cafe: ["Mingau de aveia ({c} col.) com água e frutas vermelhas", "Tofu mexido com cúrcuma", "{o} ovos mexidos com espinafre", "Aveia ({c} col.) com maçã e linhaça"], almoco: ["Peixe ({p} g) + brócolis + arroz integral ({c} col.)", "Tofu ({p} g) + legumes + quinoa ({c} col.)", "Sardinha ({p} g) + salada + arroz integral ({c} col.)", "Peixe ensopado ({p} g) com abóbora", "Frango ({p} g) + abobrinha + arroz integral ({c} col.)"], jantar: ["Sopa de legumes com tofu ({p} g)", "Caldo de abóbora com gengibre", "Peixe grelhado ({p} g) + salada verde", "Creme de espinafre com {o} ovos cozidos"] },
      B: { cafe: ["Iogurte natural com banana", "{o} ovos mexidos + queijo branco", "Omelete de {o} ovos com ricota", "Inhame ({c} col.) com {o} ovos"], almoco: ["Carne magra ({p} g) + arroz ({c} col.) + salada", "Peixe ({p} g) + brócolis + batata-doce ({c} col.)", "Patinho moído ({p} g) com repolho + arroz ({c} col.)", "Bife ({p} g) + couve + inhame ({c} col.)", "Peixe ensopado ({p} g) com pimentão + arroz ({c} col.)"], jantar: ["Sopa de legumes com carne desfiada ({p} g)", "Salada de folhas com {o} ovos e ricota", "Caldo de inhame com carne ({p} g)", "Peixe grelhado ({p} g) + salada verde"] },
      AB: { cafe: ["Iogurte natural com aveia ({c} col.)", "{o} ovos mexidos + 1 fatia de abacaxi", "Tofu mexido com cúrcuma", "Omelete de {o} ovos com ricota"], almoco: ["Peixe ({p} g) + brócolis + arroz ({c} col.)", "Atum ({p} g) + salada + batata-doce ({c} col.)", "Tofu ({p} g) + legumes + quinoa ({c} col.)", "Sardinha ({p} g) + beterraba + arroz ({c} col.)", "Peixe ensopado ({p} g) com cenoura + arroz ({c} col.)"], jantar: ["Sopa de legumes com tofu ({p} g)", "Salada de atum ({p} g) com folhas", "Creme de abobrinha com ricota", "Peixe grelhado ({p} g) + salada verde"] },
    },
  },

  intest: {
    codigos: { INTEST7X: "full", INTEST7D: "down" },
    nome: "Protocolo Intestino do Seu Tipo", emoji: "🌿",
    intro: "7 dias pra limpar e destravar o intestino só com o que o seu tipo aceita. Faça antes ou junto com a primeira semana do protocolo.",
    ordem: {
      O: [["Ao acordar", "1 copo de água morna com suco de meio limão e 1 pitada de cúrcuma."], ["30 min depois", "Café da manhã normal do seu cardápio."], ["Antes de dormir", "1 colher de sopa de azeite + chá de hortelã com gengibre."]],
      A: [["Ao acordar", "1 copo de água morna com 1 colher de chá de linhaça hidratada na noite anterior."], ["30 min depois", "Café da manhã normal do seu cardápio."], ["Antes de dormir", "Chá de camomila com erva-doce + 2 ameixas secas."]],
      B: [["Ao acordar", "1 copo de água morna com suco de meio limão e 1 rodela de gengibre."], ["30 min depois", "Café da manhã com 1 pote de iogurte natural."], ["Antes de dormir", "Chá de hortelã com canela + 1 fatia de mamão."]],
      AB: [["Ao acordar", "1 copo de água morna com 1 colher de chá de chia hidratada e limão."], ["30 min depois", "Café da manhã com iogurte natural."], ["Antes de dormir", "Chá de camomila + 2 ameixas secas."]],
    },
    ingredientes: {
      O: { usar: ["Limão", "Cúrcuma", "Gengibre", "Azeite", "Couve", "Abacaxi", "Hortelã"], evitar: ["Farelo de trigo", "Aveia", "Leite fermentado", "Psyllium com suco de laranja"] },
      A: { usar: ["Linhaça", "Ameixa seca", "Camomila", "Erva-doce", "Cenoura", "Maçã", "Aveia"], evitar: ["Kombucha muito ácida", "Pimenta", "Leite com mamão", "Laranja"] },
      B: { usar: ["Iogurte natural", "Mamão", "Gengibre", "Hortelã", "Banana", "Beterraba", "Azeite"], evitar: ["Pipoca", "Farinha de milho", "Gergelim", "Amendoim"] },
      AB: { usar: ["Chia", "Iogurte natural", "Ameixa seca", "Kiwi", "Pepino", "Limão", "Camomila"], evitar: ["Pimenta", "Laranja", "Excesso de café", "Banana verde"] },
    },
    passos: [
      ["Dia 1", "Começa a ordem certa (manhã e noite). 2,5 litros de água. Corta fritura."],
      ["Dia 2", "Ordem certa + verdura cozida no almoço e no jantar."],
      ["Dia 3", "Ordem certa + 1 fruta da lista 'usar' no lanche."],
      ["Dia 4", "Ordem certa + caminhada de 15 minutos depois do almoço."],
      ["Dia 5", "Ordem certa + jantar até 19h30."],
      ["Dia 6", "Ordem certa + massagem na barriga no sentido horário antes de dormir, 2 minutos."],
      ["Dia 7", "Ordem certa + repete o dia que você se sentiu melhor."],
    ],
    esperar: ["Dias 1 e 2: pode dar mais gases. É o intestino voltando a trabalhar.", "Dias 3 e 4: a maioria nota o intestino soltando.", "Dias 5 e 6: a barriga amanhece mais baixa.", "Dia 7: menos inchaço depois de comer. Daqui em diante, mantém só a água da manhã."],
    menu: {
      O: ["Almoço: peixe com couve refogada · Jantar: sopa de abóbora", "Almoço: carne magra com abobrinha · Jantar: caldo de legumes", "Almoço: frango com quiabo · Jantar: omelete de espinafre", "Almoço: sardinha com salada · Jantar: sopa de abóbora", "Almoço: patinho com brócolis cozido · Jantar: peixe com folhas", "Almoço: peixe com abóbora · Jantar: caldo de legumes", "Almoço: carne de panela com cenoura · Jantar: omelete com couve"],
      A: ["Almoço: peixe com cenoura · Jantar: sopa de legumes", "Almoço: tofu com abobrinha · Jantar: caldo de abóbora", "Almoço: sardinha com salada cozida · Jantar: creme de espinafre", "Almoço: peixe ensopado · Jantar: sopa de legumes com tofu", "Almoço: frango com brócolis cozido · Jantar: caldo de abóbora", "Almoço: lentilha com cenoura · Jantar: peixe grelhado", "Almoço: tofu com legumes · Jantar: creme de abobrinha"],
      B: ["Almoço: carne com beterraba · Jantar: sopa de legumes", "Almoço: peixe com repolho cozido · Jantar: iogurte com mamão", "Almoço: omelete com legumes · Jantar: caldo de inhame", "Almoço: bife com couve · Jantar: sopa de legumes", "Almoço: peixe com batata-doce · Jantar: salada cozida com ovos", "Almoço: patinho com abobrinha · Jantar: caldo de legumes", "Almoço: peixe ensopado · Jantar: iogurte com banana"],
      AB: ["Almoço: peixe com pepino · Jantar: sopa de legumes", "Almoço: atum com legumes cozidos · Jantar: creme de abobrinha", "Almoço: tofu com brócolis · Jantar: iogurte com kiwi", "Almoço: sardinha com beterraba · Jantar: caldo de legumes", "Almoço: omelete com ricota · Jantar: sopa de legumes com tofu", "Almoço: peixe com cenoura · Jantar: creme de abobrinha", "Almoço: atum com arroz · Jantar: iogurte com ameixa"],
    },
  },

  familia: {
    codigos: { FAMILIA3: "full", FAMILIA1: "down" },
    nome: "Protocolo da Família", emoji: "👨‍👩‍👧",
    intro: "Cada pessoa da casa com o próprio tipo e o próprio cardápio, e uma cozinha só.",
    trocas: [
      ["Um come carne, o outro não pode", "Faz a proteína em duas panelas pequenas: carne pra um, peixe ou ovo pro outro. O resto do prato é igual."],
      ["Feijão no almoço", "Quem é O ou AB troca o feijão por mais verdura ou abóbora. Quem é B pode comer."],
      ["Café da manhã", "Ovo serve pros 4 tipos. Faz ovo pra todo mundo e cada um completa com a fruta da sua lista."],
      ["Lanche das crianças", "Banana pro O e o B, maçã pro A, uva pro AB. Iogurte natural serve pro B e o AB."],
      ["Pão em casa", "Se alguém da casa é A ou B, um pão integral pequeno pode, mas fica fora da vista de quem é O."],
    ],
  },
};
if (typeof module !== "undefined") module.exports = { EXTRAS, UPSELLS };
