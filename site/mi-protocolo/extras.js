/* =====================================================================
   PRODUCTOS EXTRA vendidos dentro de la app (/mi-protocolo) — versión ES
   codigo = lo que desbloquea en la app (va en el PDF y en la URL de agradecimiento ?libera=codigo)
   ===================================================================== */
const EXTRAS = {
  doces: {
    codigo: "DOCE7K2",
    nome: "Postres Liberados de Tu Tipo",
    emoji: "🍫",
    preco: "7.90", de: "19.90",
    checkout: "https://pay.cakto.com.br/tfopgx3",   // Cakto · USD
    gancho: "Las ganas de algo dulce son lo que más hace abandonar la dieta. Aquí están los postres que acepta tu tipo.",
    bullets: ["24 postres y meriendas, 6 para cada tipo de sangre", "Sin azúcar refinada y sin nada de tu lista roja", "Flan, trufas, helado, pastel en taza y más", "Listos en hasta 15 minutos, con ingredientes de supermercado"],
    intro: "Lo dulce no está prohibido. Lo que frena tu cuerpo es el azúcar refinada junto con lo que tu tipo rechaza. Todos los postres de abajo usan solo lo que está en tu lista verde y puedes comerlos hasta 4 veces por semana, de preferencia después del almuerzo.",
    porTipo: {
      O: [
        ["🍫", "Trufas de plátano", ["2 plátanos maduros", "1 cucharada de cacao en polvo 100%", "1 cucharada de aceite de coco"], ["Aplasta el plátano y llévalo a fuego bajo con el cacao y el aceite de coco.", "Revuelve 8 minutos hasta que se despegue de la olla.", "Deja enfriar, forma bolitas y pásalas por cacao."]],
        ["🍮", "Flan de huevo sin leche", ["3 huevos", "200 ml de leche de coco", "2 cucharadas de miel", "Esencia de vainilla"], ["Licúa todo.", "Ponlo en moldecitos y hornea a baño maría a 180 °C por 35 minutos.", "Refrigera 2 horas."]],
        ["🍍", "Piña a la plancha con canela", ["4 rodajas de piña", "Canela en polvo", "1 cucharada de aceite de coco"], ["Dora la piña en el aceite de coco, 3 minutos por lado.", "Espolvorea canela al servir."]],
        ["🍦", "Helado de mango", ["2 mangos en cubos congelados", "4 cucharadas de leche de coco"], ["Procésalo hasta que quede cremoso.", "Cómelo al momento o déjalo 30 minutos más en el congelador."]],
        ["🥥", "Cocaditas al horno", ["1 taza de coco rallado sin azúcar", "1 huevo", "1 cucharada de miel"], ["Mezcla todo y forma bolitas.", "Hornea a 180 °C por 15 minutos hasta dorar."]],
        ["🍌", "Plátano asado con nueces", ["1 plátano", "Nueces de Brasil picadas", "Canela"], ["Corta el plátano a lo largo.", "Hornea 10 minutos y cubre con nueces y canela."]],
      ],
      A: [
        ["🫐", "Crema de frutos rojos", ["1 taza de frutos rojos congelados", "2 cucharadas de avena", "100 ml de leche de soya"], ["Licúa todo hasta que quede cremoso.", "Sírvelo frío con más frutas encima."]],
        ["🍎", "Manzana asada con avena", ["1 manzana", "1 cucharada de avena", "Canela y 1 cucharada de miel"], ["Quita el centro de la manzana.", "Rellénala con avena, miel y canela.", "Hornea a 180 °C por 25 minutos."]],
        ["🍪", "Galletas de avena y ciruela", ["1 taza de avena", "1 huevo", "4 ciruelas picadas", "1 cucharada de miel"], ["Mezcla todo y forma 8 galletas.", "Hornea a 180 °C por 15 minutos."]],
        ["🍐", "Pera cocida con jengibre", ["2 peras", "1 rodaja de jengibre", "Canela en rama"], ["Cocina las peras en 1 vaso de agua con jengibre y canela por 15 minutos.", "Sírvelas tibias con el almíbar."]],
        ["🍫", "Mousse de cacao con tofu", ["200 g de tofu suave", "2 cucharadas de cacao 100%", "2 cucharadas de miel"], ["Licúa todo.", "Refrigera 1 hora."]],
        ["🧁", "Pastel de avena en taza", ["3 cucharadas de avena", "1 huevo", "1 cucharada de miel", "Polvo de hornear y canela"], ["Mezcla todo en la taza.", "Microondas por 2 minutos."]],
      ],
      B: [
        ["🍮", "Flan de yogur", ["2 vasos de yogur natural", "1 cucharada de gelatina sin sabor", "2 cucharadas de miel", "Vainilla"], ["Hidrata la gelatina y mézclala con el yogur, la miel y la vainilla.", "Refrigera 3 horas."]],
        ["🍌", "Trufas de plátano con leche", ["2 plátanos", "3 cucharadas de leche en polvo", "1 cucharada de cacao 100%"], ["Lleva todo a fuego bajo revolviendo 8 minutos.", "Deja enfriar y forma bolitas."]],
        ["🍦", "Frozen de yogur y uva", ["1 vaso de yogur natural", "1 taza de uvas congeladas"], ["Licúa hasta que quede como helado.", "Cómelo al momento."]],
        ["🧀", "Cheesecake en vaso", ["Ricota", "Yogur natural", "Miel", "Mermelada de uva sin azúcar"], ["Bate la ricota con el yogur y la miel.", "Arma en un vaso con la mermelada encima.", "Refrigera 1 hora."]],
        ["🍉", "Paleta de sandía", ["3 tazas de sandía", "Jugo de 1 limón"], ["Licúa y cuela.", "Ponlo en moldes y congela 4 horas."]],
        ["🧁", "Pastel de plátano en taza", ["1 plátano", "1 huevo", "3 cucharadas de avena", "Canela"], ["Aplasta el plátano y mezcla todo en la taza.", "Microondas por 2 minutos."]],
      ],
      AB: [
        ["🍇", "Crema de uva con yogur", ["1 taza de uvas sin semilla congeladas", "1 vaso de yogur natural"], ["Licúa hasta que quede cremoso.", "Sírvelo con nueces."]],
        ["🍍", "Mousse de piña", ["1 taza de piña", "1 vaso de yogur natural", "1 cucharada de gelatina sin sabor"], ["Licúa la piña con el yogur.", "Mezcla la gelatina hidratada y refrigera 3 horas."]],
        ["🥝", "Kiwi con ricota y miel", ["2 kiwis", "2 cucharadas de ricota", "1 cucharada de miel"], ["Corta el kiwi en rodajas.", "Cúbrelo con la ricota batida con miel."]],
        ["🍪", "Galletas de avena y nueces", ["1 taza de avena", "1 huevo", "Nueces picadas", "1 cucharada de miel"], ["Mezcla y forma 8 galletas.", "Hornea a 180 °C por 15 minutos."]],
        ["🍮", "Flan de huevo con yogur", ["3 huevos", "1 vaso de yogur natural", "2 cucharadas de miel"], ["Licúa todo.", "Hornea a baño maría a 180 °C por 30 minutos y refrigera."]],
        ["🍉", "Granizado de sandía y limón", ["3 tazas de sandía", "Jugo de 1 limón"], ["Licúa, ponlo en una bandeja y congela.", "Ráspalo con un tenedor cada 30 minutos, 3 veces."]],
      ],
    },
  },

  barriga: {
    codigo: "BARRIGA4M9",
    nome: "Vientre Plano 21 Días",
    emoji: "🔥",
    preco: "9.90", de: "27.00",
    checkout: "https://pay.cakto.com.br/6arpd93",   // Cakto · USD
    gancho: "¿Te desinflamaste pero la pancita sigue ahí? Es el intestino trabado. Este protocolo lo destraba en 21 días.",
    bullets: ["Shot de la mañana y té de la noche hechos para tu tipo", "3 fases de 7 días: destrabar, secar y reafirmar", "Lista de lo que fermenta e infla a tu tipo", "Rutina de 5 minutos al día, con check diario en la app"],
    intro: "La Dieta del Tipo de Sangre saca del plato lo que inflama. Vientre Plano se encarga de lo que quedó estancado: intestino lento, gases y retención en la barriga. Son 21 días en 3 fases, con un shot en la mañana y un té en la noche hechos con lo que tu tipo acepta.",
    shots: {
      O: [["Shot de la mañana", "Jugo de 1 limón + 1 rodaja de jengibre rallado + 1 pizca de cúrcuma + 50 ml de agua tibia. Tómalo en ayunas, de un trago."], ["Té de la noche", "Té de hierbabuena con 3 clavos de olor y cáscara de piña. 1 taza, 1 hora antes de dormir."]],
      A: [["Shot de la mañana", "Jugo de 1 limón + 1 cucharadita de linaza hidratada + 50 ml de agua tibia. Tómalo en ayunas."], ["Té de la noche", "Té de manzanilla con anís. 1 taza, 1 hora antes de dormir."]],
      B: [["Shot de la mañana", "50 ml de agua tibia + jugo de medio limón + 1 rodaja de jengibre rallado. Tómalo en ayunas."], ["Té de la noche", "Té de hierbabuena con jengibre. 1 taza, 1 hora antes de dormir."]],
      AB: [["Shot de la mañana", "Jugo de 1 limón + 50 ml de agua tibia + 1 cucharadita de chía hidratada. Tómalo en ayunas."], ["Té de la noche", "Té verde suave con hierbabuena hasta las 5 p. m., o manzanilla si lo tomas en la noche."]],
    },
    estufa: {
      O: ["Repollo crudo", "Brócoli crudo (cocido sí)", "Refresco y agua con gas", "Chicle"],
      A: ["Frijoles de cualquier tipo", "Repollo", "Agua con gas", "Endulzante artificial"],
      B: ["Maíz y palomitas", "Lentejas", "Refresco", "Frituras"],
      AB: ["Frijoles y garbanzos", "Repollo crudo", "Refresco", "Exceso de café"],
    },
    fases: [
      ["Fase 1 · Días 1 a 7 · Destrabar", ["Shot de la mañana todos los días en ayunas", "2,5 litros de agua", "Verdura cocida en el almuerzo y la cena (lo crudo infla al principio)", "Nada de la lista de lo que infla", "Masaje en la barriga en sentido horario, 2 minutos antes de dormir"]],
      ["Fase 2 · Días 8 a 14 · Secar", ["Shot de la mañana + té de la noche", "Cena hasta las 7:30 p. m.", "Caminata de 15 minutos después del almuerzo", "Una comida al día con verdura cruda", "Sin sal en la cena"]],
      ["Fase 3 · Días 15 a 21 · Reafirmar", ["Shot de la mañana 5 veces por semana", "Té de la noche todos los días", "Ejercicio de abdomen (plancha) 3 x 20 segundos", "Masticar 20 veces cada bocado", "Foto de perfil el día 21 para comparar con el día 1"]],
    ],
  },

  fase2: {
    codigo: "META8P3",
    nome: "Fase 2 · Meta Final 60 Días",
    emoji: "🎯",
    preco: "12.90", de: "37.00",
    checkout: "https://pay.cakto.com.br/3ffz8na",   // Cakto · USD
    gancho: "Los 30 días bajan hasta 10 kg. Si tu meta es más, la Fase 2 sigue desde donde te quedaste.",
    bullets: ["60 días más de menú de tu tipo (días 31 a 90)", "Plan anti-estancamiento: qué hacer cuando la balanza se detiene", "Menú de fin de semana y de fiestas", "Mantenimiento para no recuperar ni un kilo"],
    intro: "Entre la 3ª y la 5ª semana es común que el peso se detenga. No es que la dieta dejó de funcionar: el cuerpo se acostumbró. La Fase 2 cambia el menú cada 2 semanas para que no se acostumbre, y trae el plan para cuando la balanza se frene.",
    plato: [
      ["Cambia el orden del plato", "Come primero la verdura, después la proteína y al final el carbohidrato. Hazlo durante 5 días."],
      ["Día bajo en carbohidratos", "2 veces por semana, quita el carbohidrato de la cena y duplica la verdura."],
      ["Cena más temprano", "Durante 7 días, cena hasta las 7 p. m. Son 13 horas de ayuno hasta el desayuno."],
      ["Vuelve a contar el agua", "Estancamiento con poca agua es retención. Vuelve a los 2,5 litros y haz 3 días del Agua Desinflama."],
      ["Mide tu cintura", "Si la balanza se detuvo pero la cintura bajó, estás cambiando grasa por músculo. Sigue."],
    ],
    fds: ["Sábado: una comida libre, no un día libre", "Parrillada o asado: proteína de tu lista verde + ensalada; sáltate el pan y las papas", "Fiesta: come antes de salir (proteína + verdura) para llegar sin hambre", "Bebida: mejor 1 copa de vino seco que cerveza; alterna con agua", "Domingo: Agua Desinflama en ayunas y vuelve al menú en el almuerzo"],
    manut: ["Pésate todos los lunes en la mañana", "Subiste 1 kg: 3 días de menú al 100% + Agua Desinflama", "Subiste 2 kg: repite la Fase 1 de Vientre Plano o la semana Desinflama", "Regla 80/20 para siempre", "Reintroduce un alimento de la lista roja a la vez y observa 2 días"],
    // comidas extra para el menú de los días 31 a 90 ({p} {c} {o} = porciones por peso)
    meals: {
      O: { almoco: ["Picadillo de carne ({p} g) con quimbombó + zapallo", "Pescado en salsa de hierbas ({p} g) + espinaca + camote ({c} cdas.)", "Albóndigas de carne magra ({p} g) en salsa de zapallo + ensalada", "Pollo al curry ({p} g) con col rizada + arroz ({c} cdas.)", "Carne guisada ({p} g) con calabacín + yuca ({c} cdas.)"], jantar: ["Tacos de lechuga con carne molida ({p} g)", "Caldo verde sin papa con carne ({p} g)", "Pescado ({p} g) con verduras en papillote", "Omelette de {o} huevos con calabacín y cebolla", "Sopa de verduras con pollo deshebrado ({p} g)"] },
      A: { almoco: ["Pescado en leche de coco ({p} g) + arroz integral ({c} cdas.)", "Hamburguesa de tofu ({p} g) + ensalada + quinoa ({c} cdas.)", "Pescado con costra de linaza ({p} g) + verduras", "Garbanzos ({c} cdas.) con espinaca + zanahoria", "Sardinas ({p} g) con calabacín + arroz integral ({c} cdas.)"], jantar: ["Sopa de miso con tofu ({p} g)", "Pescado ({p} g) con puré de zapallo", "Omelette de {o} huevos con espinaca", "Ensalada de quinoa ({c} cdas.) con verduras asadas", "Caldo de verduras con jengibre"] },
      B: { almoco: ["Carne asada ({p} g) + puré de ñame ({c} cdas.) + ensalada", "Pescado con verduras ({p} g) + arroz ({c} cdas.)", "Pastel de camote con carne ({p} g)", "Omelette al horno de {o} huevos con queso fresco + ensalada", "Cordero o carne magra ({p} g) + repollo salteado + arroz ({c} cdas.)"], jantar: ["Caldo de ñame con carne ({p} g)", "Ensalada de hojas con queso fresco y {o} huevos", "Pescado ({p} g) con verduras", "Sopa de zapallo con ricota", "Carne molida ({p} g) con pimiento"] },
      AB: { almoco: ["Pescado al horno ({p} g) + arroz ({c} cdas.) + ensalada de pepino", "Atún ({p} g) con quinoa ({c} cdas.) y verduras", "Tofu ({p} g) con brócoli + camote ({c} cdas.)", "Omelette de {o} huevos con ricota + arroz ({c} cdas.)", "Sardinas ({p} g) + betabel + arroz ({c} cdas.)"], jantar: ["Crema de calabacín con tofu ({p} g)", "Pescado ({p} g) con ensalada verde", "Omelette de {o} huevos con espinaca", "Sopa de verduras con atún ({p} g)", "Ensalada de quinoa ({c} cdas.) con pepino"] },
    },
  },
};

/* =====================================================================
   UPSELLS del funil (/sangre/up1, up2, up3). No aparecen en la vitrina de la app:
   solo se liberan para quien los compró. "X" = upsell completo, "D" = downsell.
   ===================================================================== */
const UPSELLS = {
  acel: {
    codigos: { ACEL21X: "full", ACEL21D: "down" },
    nome: "Acelerador 21 Días", emoji: "⚡",
    intro: "21 días en modo intensivo. Sacas de una vez todo lo que tu sangre rechaza y sigues el menú reducido de cada fase. El resultado que llegaría en 30 días empieza a aparecer antes.",
    fases: [
      ["Días 1 a 7 · Limpieza", "Sale de una vez todo lo que tu sangre rechaza, incluido lo de la lista Cero Absoluto. Entra el jugo de la mañana de tu tipo. Carbohidrato solo en el almuerzo."],
      ["Días 8 a 14 · Quema", "La cena pasa a ser sopa o ensalada con proteína. Entra el té de tu tipo antes de dormir. Cena hasta las 7:30 p. m."],
      ["Días 15 a 21 · Firmeza", "Los alimentos de la lista verde vuelven de a poco: carbohidrato también en la cena, 3 veces por semana. Es lo que sostiene el resultado."],
    ],
    zero: {
      O: ["Pan de cualquier tipo", "Leche y queso", "Arepa, maíz y tortilla", "Frijoles", "Azúcar y refresco", "Alcohol"],
      A: ["Carne roja y embutidos", "Leche y queso amarillo", "Frijoles", "Papa", "Azúcar y refresco", "Alcohol"],
      B: ["Pollo y pechuga de pavo", "Maíz, arepa y tortilla", "Trigo y pan", "Maní", "Azúcar y refresco", "Alcohol"],
      AB: ["Carne roja y pollo", "Maíz, arepa y tortilla", "Frijoles", "Más de 1 café al día", "Azúcar y refresco", "Alcohol"],
    },
    bebidas: {
      O: [["Jugo de la mañana", "1 rodaja de piña + 1 hoja de col rizada + 1 rodaja de jengibre + 200 ml de agua fría. Licúa y tómalo sin colar, en ayunas."], ["Té de la noche", "Hierbabuena con jengibre y 2 clavos de olor. 1 taza, 1 hora antes de dormir."]],
      A: [["Jugo de la mañana", "Media manzana + 1 puñado de espinaca + jugo de medio limón + 200 ml de agua. En ayunas."], ["Té de la noche", "Manzanilla con anís. 1 taza, 1 hora antes de dormir."]],
      B: [["Jugo de la mañana", "1 rodaja de piña + medio betabel pequeño + 1 rodaja de jengibre + 200 ml de agua. En ayunas."], ["Té de la noche", "Hierbabuena con canela en rama. 1 taza, 1 hora antes de dormir."]],
      AB: [["Jugo de la mañana", "1 rodaja de piña + medio pepino + jugo de medio limón + 200 ml de agua. En ayunas."], ["Té de la noche", "Manzanilla con hierbabuena. 1 taza, 1 hora antes de dormir."]],
    },
    menu: {
      O: { cafe: ["{o} huevos revueltos con espinaca", "Omelette de {o} huevos con col rizada", "{o} huevos cocidos + 1 rodaja de piña", "Omelette de {o} huevos con calabacín"], almoco: ["Carne magra ({p} g) + brócoli + arroz ({c} cdas.)", "Pescado ({p} g) + col rizada + zapallo", "Carne molida magra ({p} g) con calabacín + camote ({c} cdas.)", "Pollo ({p} g) + quimbombó + arroz ({c} cdas.)", "Sardinas ({p} g) + ensalada verde + camote ({c} cdas.)"], jantar: ["Sopa de zapallo con carne deshebrada ({p} g)", "Ensalada verde con {o} huevos cocidos y aceite de oliva", "Caldo de verduras con pollo deshebrado ({p} g)", "Pescado a la plancha ({p} g) + ensalada de hojas"] },
      A: { cafe: ["Avena cocida ({c} cdas.) con agua y frutos rojos", "Tofu revuelto con cúrcuma", "{o} huevos revueltos con espinaca", "Avena ({c} cdas.) con manzana y linaza"], almoco: ["Pescado ({p} g) + brócoli + arroz integral ({c} cdas.)", "Tofu ({p} g) + verduras + quinoa ({c} cdas.)", "Sardinas ({p} g) + ensalada + arroz integral ({c} cdas.)", "Pescado guisado ({p} g) con zapallo", "Pollo ({p} g) + calabacín + arroz integral ({c} cdas.)"], jantar: ["Sopa de verduras con tofu ({p} g)", "Caldo de zapallo con jengibre", "Pescado a la plancha ({p} g) + ensalada verde", "Crema de espinaca con {o} huevos cocidos"] },
      B: { cafe: ["Yogur natural con plátano", "{o} huevos revueltos + queso fresco", "Omelette de {o} huevos con ricota", "Ñame ({c} cdas.) con {o} huevos"], almoco: ["Carne magra ({p} g) + arroz ({c} cdas.) + ensalada", "Pescado ({p} g) + brócoli + camote ({c} cdas.)", "Carne molida magra ({p} g) con repollo + arroz ({c} cdas.)", "Bistec ({p} g) + col rizada + ñame ({c} cdas.)", "Pescado guisado ({p} g) con pimiento + arroz ({c} cdas.)"], jantar: ["Sopa de verduras con carne deshebrada ({p} g)", "Ensalada de hojas con {o} huevos y ricota", "Caldo de ñame con carne ({p} g)", "Pescado a la plancha ({p} g) + ensalada verde"] },
      AB: { cafe: ["Yogur natural con avena ({c} cdas.)", "{o} huevos revueltos + 1 rodaja de piña", "Tofu revuelto con cúrcuma", "Omelette de {o} huevos con ricota"], almoco: ["Pescado ({p} g) + brócoli + arroz ({c} cdas.)", "Atún ({p} g) + ensalada + camote ({c} cdas.)", "Tofu ({p} g) + verduras + quinoa ({c} cdas.)", "Sardinas ({p} g) + betabel + arroz ({c} cdas.)", "Pescado guisado ({p} g) con zanahoria + arroz ({c} cdas.)"], jantar: ["Sopa de verduras con tofu ({p} g)", "Ensalada de atún ({p} g) con hojas", "Crema de calabacín con ricota", "Pescado a la plancha ({p} g) + ensalada verde"] },
    },
  },

  intest: {
    codigos: { INTEST7X: "full", INTEST7D: "down" },
    nome: "Protocolo Intestino de Tu Tipo", emoji: "🌿",
    intro: "7 días para limpiar y destrabar el intestino solo con lo que acepta tu tipo. Hazlo antes o junto con la primera semana del protocolo.",
    ordem: {
      O: [["Al despertar", "1 vaso de agua tibia con jugo de medio limón y 1 pizca de cúrcuma."], ["30 min después", "Desayuno normal de tu menú."], ["Antes de dormir", "1 cucharada de aceite de oliva + té de hierbabuena con jengibre."]],
      A: [["Al despertar", "1 vaso de agua tibia con 1 cucharadita de linaza hidratada la noche anterior."], ["30 min después", "Desayuno normal de tu menú."], ["Antes de dormir", "Té de manzanilla con anís + 2 ciruelas pasas."]],
      B: [["Al despertar", "1 vaso de agua tibia con jugo de medio limón y 1 rodaja de jengibre."], ["30 min después", "Desayuno con 1 vaso de yogur natural."], ["Antes de dormir", "Té de hierbabuena con canela + 1 rebanada de papaya."]],
      AB: [["Al despertar", "1 vaso de agua tibia con 1 cucharadita de chía hidratada y limón."], ["30 min después", "Desayuno con yogur natural."], ["Antes de dormir", "Té de manzanilla + 2 ciruelas pasas."]],
    },
    ingredientes: {
      O: { usar: ["Limón", "Cúrcuma", "Jengibre", "Aceite de oliva", "Col rizada", "Piña", "Hierbabuena"], evitar: ["Salvado de trigo", "Avena", "Leche fermentada", "Psyllium con jugo de naranja"] },
      A: { usar: ["Linaza", "Ciruela pasa", "Manzanilla", "Anís", "Zanahoria", "Manzana", "Avena"], evitar: ["Kombucha muy ácida", "Chile picante", "Leche con papaya", "Naranja"] },
      B: { usar: ["Yogur natural", "Papaya", "Jengibre", "Hierbabuena", "Plátano", "Betabel", "Aceite de oliva"], evitar: ["Palomitas", "Harina de maíz", "Ajonjolí", "Maní"] },
      AB: { usar: ["Chía", "Yogur natural", "Ciruela pasa", "Kiwi", "Pepino", "Limón", "Manzanilla"], evitar: ["Chile picante", "Naranja", "Exceso de café", "Plátano verde"] },
    },
    passos: [
      ["Día 1", "Empieza el orden correcto (mañana y noche). 2,5 litros de agua. Nada de frituras."],
      ["Día 2", "Orden correcto + verdura cocida en el almuerzo y la cena."],
      ["Día 3", "Orden correcto + 1 fruta de la lista 'usar' en la merienda."],
      ["Día 4", "Orden correcto + caminata de 15 minutos después del almuerzo."],
      ["Día 5", "Orden correcto + cena hasta las 7:30 p. m."],
      ["Día 6", "Orden correcto + masaje en la barriga en sentido horario antes de dormir, 2 minutos."],
      ["Día 7", "Orden correcto + repite el día en que te sentiste mejor."],
    ],
    esperar: ["Días 1 y 2: puede haber más gases. Es el intestino volviendo a trabajar.", "Días 3 y 4: la mayoría nota que el intestino se suelta.", "Días 5 y 6: la barriga amanece más baja.", "Día 7: menos hinchazón después de comer. De aquí en adelante, mantén solo el agua de la mañana."],
    menu: {
      O: ["Almuerzo: pescado con col rizada salteada · Cena: sopa de zapallo", "Almuerzo: carne magra con calabacín · Cena: caldo de verduras", "Almuerzo: pollo con quimbombó · Cena: omelette de espinaca", "Almuerzo: sardinas con ensalada · Cena: sopa de zapallo", "Almuerzo: carne molida con brócoli cocido · Cena: pescado con hojas", "Almuerzo: pescado con zapallo · Cena: caldo de verduras", "Almuerzo: carne guisada con zanahoria · Cena: omelette con col rizada"],
      A: ["Almuerzo: pescado con zanahoria · Cena: sopa de verduras", "Almuerzo: tofu con calabacín · Cena: caldo de zapallo", "Almuerzo: sardinas con ensalada cocida · Cena: crema de espinaca", "Almuerzo: pescado guisado · Cena: sopa de verduras con tofu", "Almuerzo: pollo con brócoli cocido · Cena: caldo de zapallo", "Almuerzo: lentejas con zanahoria · Cena: pescado a la plancha", "Almuerzo: tofu con verduras · Cena: crema de calabacín"],
      B: ["Almuerzo: carne con betabel · Cena: sopa de verduras", "Almuerzo: pescado con repollo cocido · Cena: yogur con papaya", "Almuerzo: omelette con verduras · Cena: caldo de ñame", "Almuerzo: bistec con col rizada · Cena: sopa de verduras", "Almuerzo: pescado con camote · Cena: ensalada cocida con huevos", "Almuerzo: carne molida con calabacín · Cena: caldo de verduras", "Almuerzo: pescado guisado · Cena: yogur con plátano"],
      AB: ["Almuerzo: pescado con pepino · Cena: sopa de verduras", "Almuerzo: atún con verduras cocidas · Cena: crema de calabacín", "Almuerzo: tofu con brócoli · Cena: yogur con kiwi", "Almuerzo: sardinas con betabel · Cena: caldo de verduras", "Almuerzo: omelette con ricota · Cena: sopa de verduras con tofu", "Almuerzo: pescado con zanahoria · Cena: crema de calabacín", "Almuerzo: atún con arroz · Cena: yogur con ciruela"],
    },
  },

  familia: {
    codigos: { FAMILIA3: "full", FAMILIA1: "down" },
    nome: "Protocolo de la Familia", emoji: "👨‍👩‍👧",
    intro: "Cada persona de la casa con su propio tipo y su propio menú, y una sola cocina.",
    trocas: [
      ["Uno come carne y el otro no puede", "Haz la proteína en dos ollas pequeñas: carne para uno, pescado o huevo para el otro. El resto del plato es igual."],
      ["Frijoles en el almuerzo", "Quien es O o AB cambia los frijoles por más verdura o zapallo. Quien es B sí puede comerlos."],
      ["Desayuno", "El huevo sirve para los 4 tipos. Haz huevo para todos y cada uno lo completa con la fruta de su lista."],
      ["Merienda de los niños", "Plátano para el O y el B, manzana para el A, uvas para el AB. El yogur natural sirve para el B y el AB."],
      ["Pan en casa", "Si alguien de la casa es A o B, un pan integral pequeño se puede, pero que quede fuera de la vista de quien es O."],
    ],
  },
};

/* ===== COPY de las páginas de venta dentro de la app ({T} = tipo de sangre de la persona) ===== */
EXTRAS.doces.venda = {
  titulo: "No tienes que vivir sin dulces para bajar de peso siendo tipo {T}",
  sub: "24 postres liberados para tu sangre. Cómelos en la tarde, después de la cena, y la balanza sigue bajando.",
  dor: [
    "Vas bien. Te desinflamaste, la ropa ya te cierra mejor. Y entonces llega ese antojo de algo dulce al final de la tarde.",
    "Aguantas un día, dos, tres. Al cuarto, atacas el bote de helado, te sientes culpable y piensas: \"listo, arruiné todo\".",
    "No es falta de fuerza de voluntad. Cortar lo dulce de golpe solo aumenta las ganas. Y es ese ciclo el que hace que casi todo el mundo abandone la dieta en la segunda semana.",
  ],
  porque: "El problema nunca fue lo dulce. Es el ingrediente. El azúcar refinada, la harina blanca y lo de tu lista roja son lo que inflama y retiene el peso en el tipo {T}. Cambia esos ingredientes por los que acepta el tipo {T} y lo dulce vuelve a tu día sin frenar nada.",
  dentro: [
    ["6 postres hechos para el tipo {T}", "Flan, trufas, helado de fruta, pastel en taza y más, solo con ingredientes de tu lista verde."],
    ["Listos en hasta 15 minutos", "Nada de horno por horas. Muchos son de microondas o de licuadora."],
    ["Ingredientes de supermercado", "Nada de tiendas naturistas ni productos caros. Encuentras todo en el supermercado de tu barrio."],
    ["Cuándo comer cada uno", "Cuál va bien en la tarde, cuál después de la cena y cuál sirve para calmar el antojo de madrugada."],
    ["También los postres de los otros tipos", "¿Hay alguien de otro tipo en casa? Vienen los postres de los tipos O, A, B y AB: 24 recetas en total."],
  ],
  faq: [
    ["¿Voy a engordar comiendo dulce?", "No, si son estos. Están hechos sin azúcar refinada y sin nada de tu lista roja, en la porción justa para encajar en el menú."],
    ["¿Necesito algún ingrediente difícil?", "No. Plátano, cacao, huevo, avena, leche o bebida vegetal, miel y frutas. Todo de supermercado."],
    ["¿Cómo lo recibo?", "Al instante. Después del pago los postres aparecen liberados aquí en la app, y el PDF llega a tu correo."],
  ],
};
EXTRAS.barriga.venda = {
  titulo: "¿Te desinflamaste, pero la pancita del tipo {T} todavía no se va?",
  sub: "La grasa que queda debajo del ombligo es la última en salir. Este protocolo de 21 días trabaja justo ahí, con una rutina de 5 minutos al día.",
  dor: [
    "La balanza ya bajó. La cara se afinó. Pero te miras de perfil en el espejo y la barriga sigue ahí.",
    "En la mañana está más chica, y en la noche parece que te tragaste una pelota. El pantalón aprieta después del almuerzo.",
    "Eso no es solo grasa. Buena parte es intestino trabado y alimentos que fermentan en tu tipo de sangre.",
  ],
  porque: "Cada tipo de sangre fermenta alimentos distintos. En el tipo {T}, algunos alimentos que parecen sanos se quedan estancados en el intestino e inflan la barriga todo el día. Cuando sacas esos alimentos y destrabas el intestino en el orden correcto, la barriga primero se desinflama y después empieza a secarse.",
  dentro: [
    ["Shot de la mañana del tipo {T}", "Listo en 2 minutos, en ayunas, para destrabar el intestino temprano."],
    ["Té de la noche del tipo {T}", "Para despertar con la barriga más plana que cuando te acostaste."],
    ["3 fases de 7 días", "Destrabar, secar y reafirmar. Cada fase tiene las reglas del día, y la app te muestra en cuál estás."],
    ["Lista de lo que infla al tipo {T}", "Los alimentos que fermentan en tu sangre, para que los saques del plato durante los 21 días."],
    ["Check diario aquí en la app", "Marcas el shot, el té y las reglas del día. Toma 5 minutos y ves el avance del 1 al 21."],
  ],
  faq: [
    ["¿Tengo que hacer ejercicio?", "No es obligatorio. El protocolo funciona con la alimentación y las bebidas. Si ya caminas, ayuda."],
    ["¿Puedo hacerlo junto con el menú de 30 días?", "Puedes y debes. Fue hecho para ir junto, sin cambiar nada de lo que ya estás haciendo."],
    ["¿Cómo lo recibo?", "Al instante. Después del pago el protocolo aparece liberado aquí en la app, con el día 1 listo, y el PDF llega a tu correo."],
  ],
};
EXTRAS.fase2.venda = {
  titulo: "No te detengas en el día 30. La Fase 2 lleva al tipo {T} hasta tu meta",
  sub: "60 días más de menú para tu tipo y el plan para no recuperar ni un kilo.",
  dor: [
    "Los 30 días funcionan. Pero si tienes más de 10 kg por bajar, llega el día 31 y aparece la duda: \"¿y ahora qué hago?\".",
    "Repetir el mismo menú aburre. Volver a comer como antes te devuelve todo en pocas semanas.",
    "Tarde o temprano la balanza se detiene, y ahí es cuando la mayoría abandona cerca del final.",
  ],
  porque: "El cuerpo se adapta. Después de algunas semanas comiendo igual, aprende a gastar menos y la balanza se frena. La Fase 2 cambia las comidas y el orden de los alimentos del tipo {T} para que el cuerpo no se acostumbre, y te enseña a salir del estancamiento sin pasar hambre.",
  dentro: [
    ["Menú de los días 31 a 90", "Armado día a día para el tipo {T}, con comidas nuevas y las porciones de tu peso. Aparece aquí en la app."],
    ["Plan anti-estancamiento", "Qué hacer la semana en que la balanza no se mueve, paso a paso."],
    ["Fin de semana y fiestas", "Cómo comer en asados, cumpleaños y restaurantes sin perder la semana."],
    ["Mantenimiento", "Las reglas para cuando llegues al peso que quieres y no vuelvas a subir."],
  ],
  faq: [
    ["¿Tengo que terminar los 30 días antes?", "Puedes liberarlo ahora y empezar cuando llegues al día 31. Todo queda guardado en la app."],
    ["¿Y si ya llegué a mi meta?", "Usa la parte de Mantenimiento. Sirve justamente para no recuperar ni un kilo."],
    ["¿Cómo lo recibo?", "Al instante. Después del pago los días 31 a 90 aparecen liberados aquí en la app, y el PDF llega a tu correo."],
  ],
};

if (typeof module !== "undefined") module.exports = { EXTRAS, UPSELLS };
