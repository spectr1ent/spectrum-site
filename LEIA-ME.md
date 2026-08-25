# Spectrum, estrutura do site

Site estático em HTML, CSS e JavaScript puro. Sem framework, sem build, sem
dependência que quebre. Sobe no GitHub Pages e roda em `spectrument.com.br`.

---

## Árvore de arquivos

```
/
├── index.html                    Home
├── producao-tecnica.html
├── locacao.html
├── estrutura-e-metodo.html
├── booking-e-cobertura.html
├── contato.html
├── CNAME                         domínio para o GitHub Pages
├── .nojekyll                     desliga o processamento do Jekyll
├── robots.txt
├── sitemap.xml
├── 404.html
└── assets/
    ├── css/
    │   ├── styles.css            tokens, base e componentes
    │   └── media.css             CAMADA DE TROCA, o único que você edita
    ├── js/
    │   └── main.js
    ├── logo/
    │   ├── spectrum-simbolo.svg          oficial, prata e azul
    │   ├── spectrum-simbolo-branco.svg   monocromático claro
    │   ├── spectrum-simbolo-mono.svg     herda a cor do texto
    │   ├── icone-32.png / icone-180.png / icone-512.png
    └── img/                      vazia hoje, recebe a fotografia depois
```

---

## Por que ele sobe hoje sem nenhuma foto

Nada no layout depende de imagem. Os fundos são desenhados em CSS, a partir do
vocabulário da própria empresa:

**Feixes de refletor no hero.** Dois cones recortados e desfocados, descendo do
topo. É luz de palco, não é foto de palco.

**Barra de espectro.** Um analisador de espectro montado em CSS, gerado por
JavaScript com alturas estáveis. É o nome da empresa virando forma, e vocabulário
de áudio, luz e vídeo ao mesmo tempo.

**Grão.** Uma textura de ruído em SVG a 3,5 por cento de opacidade sobre os
blocos escuros. Sem ela, degradê em preto vira faixa listrada em tela ruim.

**Fio de luz nos cards.** Um filete de 1px no topo de cada card, no lugar de
sombra. Lê como metal escovado e conversa com o prateado da marca.

**Parede tipográfica.** Enquanto não há logotipo dos clientes nem retrato dos
sócios, os nomes aparecem em Orbitron dentro de uma grade. É uma solução usada
por agências, não parece espaço vazio esperando imagem.

---

## Como trocar as imagens depois

Você edita **um arquivo só**: `assets/css/media.css`.

**1.** Salve a foto em `assets/img/`, em JPG, com no mínimo 2400px de largura.

**2.** Abra `assets/css/media.css` e descomente o bloco correspondente. Cada
bloco já vem com a máscara escura calibrada para o texto continuar legível.

```css
--foto-hero:
  linear-gradient(100deg, rgba(13,13,13,.94) 8%, rgba(13,13,13,.72) 52%, rgba(13,13,13,.88) 100%),
  url("../img/hero.jpg");
```

**3.** Salve e publique. Nada mais precisa mudar, em nenhuma página.

Blocos disponíveis: `--foto-hero`, `--foto-card`, `--foto-chamada`,
`--foto-socio`, mais um bloco opcional para dar uma foto diferente a cada uma
das três portas.

Se a foto ficar ruim, comente a linha de novo e o fundo padrão volta na hora.
A troca é reversível.

---

## Como trocar o logo

O símbolo entra por CSS, não por tag `<img>`. Por isso ele é trocado em todas as
páginas de uma vez, numa linha só de `media.css`:

```css
--logo-simbolo:url("../logo/spectrum-simbolo.svg");
```

Aceita SVG ou PNG. Se um dia chegar o vetor oficial de um designer, ou se você
preferir usar um PNG, basta apontar para o novo arquivo.

O logotipo escrito **SPECTRUM ENTERTAINMENT** não é imagem: é texto em Orbitron.
Escala sem perder nitidez, é lido pelo Google e pesa zero.

### Sobre o SVG atual

O símbolo foi obtido por conversão direta do seu PNG. As camadas prata e azul
foram separadas por cor, vetorizadas e remontadas. O contorno é o do arquivo
original, não um redesenho. Resultado: 1,5 KB, nítido em qualquer tamanho,
recolorível por CSS.

---

## Publicação

O passo a passo completo, escrito para ser seguido sem conhecimento técnico,
está em `PUBLICAR.md`. Resumo:

**1.** Crie o repositório no GitHub e suba o conteúdo desta pasta na raiz.

**2.** Em Settings, Pages, marque Deploy from a branch, escolha `main` e a pasta
`/ (root)`.

**3.** Em Custom domain, escreva `spectrument.com.br`. O arquivo `CNAME` já está
no repositório.

**4.** No registro.br, em DNS, aponte:

| Tipo | Nome | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | SEU-USUARIO.github.io. |

**5.** Espere a propagação, de vinte minutos a algumas horas. Depois volte ao
GitHub Pages e marque **Enforce HTTPS**. O certificado é gratuito e renova
sozinho.

---

## Formulário de orçamento

O GitHub Pages não processa formulário, então o envio passa por um serviço
externo. O código já está pronto para o **Web3Forms**, que é gratuito e não
pede cartão.

A chave de acesso **já está instalada** em `contato.html`. Ela fica visível no
código da página e isso é normal: a chave só define para qual e-mail entregar,
não dá acesso a nada.

O envio foi testado com a requisição interceptada. Sai correto, com todos os
campos e com as opções marcadas agrupadas numa linha só.

Se um dia precisar trocar o endereço que recebe as solicitações, gere uma chave
nova no Web3Forms e substitua o valor de `access_key` em `contato.html`.

O formulário envia sem recarregar a página, junta as opções marcadas numa linha
só para o e-mail chegar legível, e tem campo armadilha contra robô.

---

## Pendências conhecidas

**Fontes.** Hoje vêm do Google Fonts. Hospedar os arquivos WOFF2 no próprio
repositório deixa o carregamento mais rápido e tira uma dependência externa.
Otimização, não bloqueio.

**Página de cases.** Nasce quando a fotografia própria chegar. A navegação já
está dimensionada para receber mais um item sem quebrar.

**Razão social e CNPJ.** Marcados no rodapé como pendentes.
