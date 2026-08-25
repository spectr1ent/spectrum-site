# Publicar o site em spectrument.com.br

Tempo estimado: 40 minutos de trabalho, mais a espera do DNS.
Não é preciso instalar nada nem saber usar Git. Tudo pelo navegador.

---

## AVISO IMPORTANTE, LEIA ANTES DE MEXER NO DNS

Se `comercial@spectrument.com.br` já estiver funcionando, existem registros de
e-mail na zona DNS do domínio, normalmente do tipo **MX** e alguns **TXT**.

**Não apague nada.** Você vai apenas **adicionar** registros novos. Se apagar os
MX, o e-mail da empresa para de receber mensagens na hora.

Antes de qualquer alteração, tire um print da tela da zona DNS inteira. Se algo
der errado, você tem como voltar.

---

# PARTE 1, colocar os arquivos no GitHub

## 1. Criar a conta

Se ainda não tiver, crie em `github.com`. Use o e-mail da empresa. Guarde a
senha e ative a verificação em duas etapas quando ele pedir.

Anote o **nome de usuário** que você escolher. Ele aparece no passo 8.

## 2. Criar o repositório

Clique no `+` no canto superior direito, depois em **New repository**.

- **Repository name:** `spectrument-site`
- **Public**, obrigatoriamente. O GitHub Pages gratuito não funciona em
  repositório privado.
- **Não marque** nenhuma das caixas de Add README, .gitignore ou license.

Clique em **Create repository**.

## 3. Enviar os arquivos

Na tela que aparecer, clique no link **uploading an existing file**.

Abra a pasta `spectrument-site` no seu computador, selecione **o conteúdo de
dentro dela**, não a pasta em si, e arraste tudo para a área de upload do
GitHub. Precisam subir os arquivos soltos (`index.html`, `CNAME`, etc.) e a
pasta `assets` inteira.

Confira que a lista mostra os seis arquivos `.html`, o `CNAME`, o `robots.txt`,
o `sitemap.xml` e a pasta `assets`.

Escreva `primeira versão do site` no campo de descrição e clique em **Commit
changes**.

## 4. Conferir se o CNAME subiu

Na lista de arquivos do repositório, procure um arquivo chamado `CNAME`, sem
extensão. Ele precisa estar lá e conter apenas `spectrument.com.br`.

Se não apareceu, clique em **Add file**, depois **Create new file**, escreva
`CNAME` como nome, escreva `spectrument.com.br` no conteúdo e salve.

O arquivo `.nojekyll` também pode não subir, porque começa com ponto e alguns
sistemas escondem esse tipo de arquivo. Se ele não estiver na lista, crie do
mesmo jeito: **Create new file**, nome `.nojekyll`, conteúdo vazio, salvar.

---

# PARTE 2, ligar o GitHub Pages

## 5. Ativar

No repositório, vá em **Settings**, e no menu da esquerda clique em **Pages**.

Em **Source**, escolha **Deploy from a branch**.
Em **Branch**, escolha `main` e a pasta `/ (root)`.
Clique em **Save**.

## 6. Esperar a primeira publicação

Leva de um a três minutos. Recarregue a página de vez em quando até aparecer um
aviso verde com um endereço parecido com:

```
https://SEU-USUARIO.github.io/spectrument-site/
```

Abra esse endereço. **O site já deve estar funcionando ali.** As imagens e o
estilo podem parecer quebrados nesse endereço temporário, e isso é esperado.
Vai ficar certo quando o domínio próprio entrar.

## 7. Informar o domínio

Ainda em Settings, Pages, no campo **Custom domain**, escreva:

```
spectrument.com.br
```

Clique em **Save**. Vai aparecer um aviso de que a checagem do DNS falhou. É
normal, porque o DNS ainda não foi configurado. É o que vem agora.

## 8. Anotar seu endereço do GitHub

Você vai precisar dele no passo 11. Ele é:

```
SEU-USUARIO.github.io
```

Trocando `SEU-USUARIO` pelo nome de usuário do passo 1, em letras minúsculas.

---

# PARTE 3, apontar o domínio no registro.br

## 9. Entrar

Acesse `registro.br`, faça login, vá em **Meus domínios** e clique em
`spectrument.com.br`.

## 10. Abrir a zona DNS

Procure a aba ou o botão **DNS**, e dentro dele **Editar zona**.

Se o registro.br avisar que o domínio está usando servidores DNS de outro
provedor, você tem duas opções: mudar para os servidores do próprio registro.br
para poder editar ali, ou fazer os passos abaixo no painel do provedor atual.
Os registros a cadastrar são os mesmos nos dois casos.

## 11. Adicionar os registros

Adicione **cinco registros novos**, sem apagar os que já existem.

Quatro registros do tipo A, todos com o campo de nome vazio ou com `@`:

| Nome | Tipo | Dados |
|---|---|---|
| (vazio) | A | `185.199.108.153` |
| (vazio) | A | `185.199.109.153` |
| (vazio) | A | `185.199.110.153` |
| (vazio) | A | `185.199.111.153` |

E um registro do tipo CNAME:

| Nome | Tipo | Dados |
|---|---|---|
| `www` | CNAME | `SEU-USUARIO.github.io.` |

**O ponto final depois de `github.io` faz parte do valor.** Não esqueça dele.

Salve as alterações.

## 12. Esperar

A propagação leva de vinte minutos a algumas horas, em casos raros até 24 horas.

Para acompanhar, entre em `dnschecker.org`, escreva `spectrument.com.br` e
escolha o tipo **A**. Quando a maioria dos pontos do mapa mostrar os endereços
`185.199.x.153`, está pronto.

---

# PARTE 4, ligar o cadeado

## 13. Confirmar a checagem

Volte em Settings, Pages, no GitHub. O aviso de erro no Custom domain deve ter
virado **DNS check successful**, com um sinal verde.

Se ainda estiver vermelho, espere mais e recarregue. Não mexa em nada.

## 14. Forçar HTTPS

Marque a caixa **Enforce HTTPS**.

Se ela estiver cinza e não deixar marcar, o certificado ainda está sendo
emitido. Isso leva de alguns minutos a algumas horas. Volte depois e marque.

O certificado é gratuito e se renova sozinho para sempre. Você não precisa
lembrar disso nunca mais.

---

# PARTE 5, testar antes de divulgar

Abra `https://spectrument.com.br` e confira, um por um:

- [ ] O cadeado aparece na barra do navegador
- [ ] `www.spectrument.com.br` redireciona sozinho para o endereço sem www
- [ ] O símbolo da Spectrum aparece no cabeçalho e na aba do navegador
- [ ] As barras azuis do espectro sobem quando a página carrega
- [ ] Os cinco links do menu abrem, nenhum dá erro 404
- [ ] Abra no celular e confira o menu sanduíche
- [ ] Clique nos links de WhatsApp e e-mail e veja se abrem certo
- [ ] Digite `spectrument.com.br/qualquercoisa` e confira se a página 404
      aparece com o visual do site

## O teste mais importante

Preencha o formulário em `/contato.html` como se você fosse um cliente, com um
e-mail real seu, e envie.

Deve aparecer a mensagem verde de solicitação enviada. Em seguida, o e-mail
chega em `comercial@spectrument.com.br`.

**Procure no spam e na aba de promoções.** A primeira mensagem quase sempre cai
lá. Quando achar, marque como **não é spam** e adicione o remetente aos
contatos. Se você pular esse passo, orçamento de verdade pode se perder sem
ninguém notar.

---

# Como editar o site daqui em diante

Não existe painel de administração. A edição é direta no GitHub e leva menos de
um minuto:

1. Abra o repositório e clique no arquivo que quer mudar.
2. Clique no ícone de lápis, **Edit this file**.
3. Faça a alteração.
4. Clique em **Commit changes**.

Em um ou dois minutos a mudança está no ar. Se algo quebrar, a aba **History**
guarda todas as versões anteriores e permite voltar.

## Onde mexer em cada coisa

| O que mudar | Arquivo |
|---|---|
| Texto de uma página | o `.html` da própria página |
| Fotos e logo | `assets/css/media.css`, só descomentar |
| Cores e tipografia | `assets/css/styles.css`, seção 1, TOKENS |
| Telefone, e-mail, Instagram | rodapé de cada `.html` |
| Razão social e CNPJ | rodapé de cada `.html`, onde está marcado como a incluir |

Depois que tudo estiver no ar, você pode apagar os arquivos `LEIA-ME.md` e
`PUBLICAR.md` do repositório, se preferir que eles não fiquem acessíveis pelo
endereço do site. Eles não afetam o funcionamento.

---

# Se algo der errado

**O site abre sem estilo, todo branco e desalinhado.**
A pasta `assets` não subiu, ou subiu dentro de outra pasta. Confira na raiz do
repositório se existe `assets` e, dentro dela, `css`, `js` e `logo`.

**Erro 404 no domínio, mas o endereço do github.io funciona.**
DNS ainda não propagou, ou o arquivo CNAME sumiu do repositório. Confira os dois.

**O e-mail da empresa parou de receber.**
Um registro MX foi apagado durante o passo 11. Volte ao print que você tirou e
recadastre os registros que faltam.

**O formulário mostra a mensagem vermelha.**
A chave do Web3Forms não foi confirmada por e-mail, ou o limite mensal do plano
gratuito foi atingido. Enquanto isso, a própria mensagem de erro oferece o
WhatsApp e o e-mail ao visitante, então ninguém fica sem conseguir falar com
vocês.
