# Relatório Técnico - Eduardo Genes

## 1. Visão Geral da Solução

Este projeto é um Todo List desenvolvido em Angular, entregue inicialmente com bugs críticos e usabilidade comprometida. Assumi o desafio de refatorar, corrigir todos os erros apontados pelo QA e implementar melhorias, incluindo novas funcionalidades e boas práticas de organização do código.

---

## 2. Como Executar a Aplicação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/eduardogenes95/teste-trainee-dev.git
cd teste-trainee-dev
npm install
npm start
```

Acesse [http://localhost:4200](http://localhost:4200) no navegador.

---

## 3. Correção dos Erros Iniciais (`npm start`)

### Problemas encontrados ao rodar `npm start`:

- Dependência do FontAwesome ausente.
- Importações com nomes incorretos de componentes.
- Ausência do script `start` no `package.json`.
- Erros no carregamento de módulos e serviços.

### Soluções aplicadas:

- Instalação das dependências faltantes com `npm install`.
- Correção de nomes de imports (ex: `HeaderComponent`).
- Adição do script `"start": "ng serve"` no `package.json`.
- Ajuste nas importações, injeções de dependência dos serviços e refatoração para organização em módulos (como o LayoutModule).

**Commits relacionados:**

- `chore: adiciona dependência do FontAwesome para uso dos ícones`
- `fix: corrige nome do HeaderComponent para permitir importação`
- `fix: adiciona script start ao package.json`
- `refactor: move HeaderComponent para LayoutModule para melhorar organização`

---

## 4. Relatório de Correção de Bugs

### 1. Tarefa duplicada ao salvar

- **Causa:** Chamada duplicada do método de adicionar tarefa.
- **Solução:** Removida chamada extra do método.
- **Commit:** `fix: corrige bug de duplicação de tarefas ao salvar`

### 2. Só salva uma tarefa por vez

- **Causa:** Restrição lógica que impedia adicionar mais de uma tarefa sem atualizar a página.
- **Solução:** Removida condição que bloqueava múltiplas adições.
- **Commit:** `fix: remove condição que impedia adicionar múltiplas tarefas`

### 3. Botão limpar não estava em português

- **Solução:** Tradução do texto.
- **Commit:** `fix: traduz texto do botão 'Clear All' para 'Limpar Tudo'`

### 4/5. Botões de exibir/ocultar tarefas concluídas com comportamento invertido

- **Causa:** Filtro não aplicado na listagem das tarefas, lógica invertida.
- **Solução:** Ajuste na lógica do filtro e uso do método filtrado no template.
- **Commit:**
  - `fix: corrige lógica de filtro para mostrar/ocultar tarefas concluídas`
  - `fix: ajusta texto do botão de exibir/ocultar tarefas`

### 6/7. Limpar tarefas concluídas sem confirmação e lógica invertida

- **Causa:** Remoção sem diálogo, lógica que removia as erradas.
- **Solução:** Uso do SweetAlert2 para confirmação e ajuste da lógica.
- **Commit:**
  - `fix: corrige o botão 'Limpar Tarefas Concluídas' para remover apenas as concluídas`
  - `fix: adiciona confirmação para limpar tarefas concluídas e traduz textos de confirmação`

### 8. Botão Editar não funcional

- **Causa:** Falta de integração entre componentes para editar e atualizar tarefa.
- **Solução:** Implementado edição inline e update da tarefa.
- **Commit:** `fix: botão de editar tarefa agora permite editar o título inline e salva corretamente`

### 9. Botões desalinhados e 10. Botão remover sem destaque

- **Solução:** CSS para alinhar botões e destacar em vermelho ação destrutiva.
- **Commit:**
  - `style: organizar botões de ação 'Editar' e 'Remover' do todo-item no layout`
  - `style: destaca botão remover em vermelho e traduz mensagem de confirmação`

### 11. Falta de barra de rolagem

- **Solução:** CSS para habilitar scroll na lista.
- **Commit:** `style: implementa barra de rolagem na lista de tarefas com muitos itens`

### 12/13. Adição de tarefas em branco

- **Solução:** Validação usando `.trim()` para impedir cadastro de tarefas vazias ou só de espaços.
- **Commit:** `fix: adiciona validação para não permitir cadastro de tarefa sem título`

---

## 5. Relatório de Implementação de Melhorias

- **Ordenação alfabética (A-Z):**

  - Commit: `feat: adiciona botão para ordenar tarefas de A a Z`

- **Adicionar tarefa pelo Enter e foco automático:**

  - Commit: `feat: adiciona foco automático ao input e permite adicionar tarefa com Enter`

- **Adicionar múltiplas tarefas com pipe |:**

  - Commit: `feat: permite adicionar múltiplas tarefas separando por | (pipe)`

- **Filtro de palavras ofensivas:**

  - Commit:
    - `feat: implementa filtro de palavras ofensivas com bad-words`
    - `feat: adiciona filtro de palavras ofensivas em português usando bad-words com lista customizada`

- **Exportar para PDF:**

  - Commit: `feat: adiciona botão para exportar tarefas em PDF usando a lib 'jsPDF'`

- **Alerts modernos com SweetAlert2:**

  - Commits:
    - `chore: instala as dependências 'sweetalert2' e 'ngx-sweetalert2' para alerts customizados`
    - `refactor: substitui o confirm padrão por alertas do SweetAlert2 nos componentes de tarefas`
    - `refactor: centraliza uso do SweetAlert2 em confirmarExclusao no service. Remove alertas duplicados do componente e melhora organização do código.`

- **Refatoração para Módulos Angular:**

  - Commit: `refactor: move HeaderComponent para LayoutModule para melhorar organização`

---

## 6. Débito Técnico

Durante o desenvolvimento, alguns pontos exigiram mais pesquisa e criatividade para resolver. Para superar os desafios, utilizei a documentação, fóruns, exemplos de outros projetos e contei com a ajuda de IA de forma responsável para comparar soluções.

### Principais desafios enfrentados

- **Filtros de tarefas concluídas/ativas:**  
  A lógica original estava confusa e a exibição dos botões invertida. Testei diferentes abordagens, usando muitos `console.log` e testes manuais até acertar o comportamento esperado. Mas na verdade, fiquei procurando uma dificuldade que nao existia de fato.

- **Edição inline de tarefas:**  
  Para permitir que o usuário editasse o título diretamente na lista, precisei ajustar a comunicação entre componentes e entender como fazer o Angular atualizar o input corretamente, exigindo várias tentativas e pesquisas.

- **Centralização de alertas com SweetAlert2:**  
  Substituí os alerts nativos por modais do SweetAlert2, melhorando a experiência visual e acessibilidade. Implementar foi simples, mas o desafio foi evitar repetição de código e garantir a responsividade da UI, o que me levou a criar um serviço dedicado para os alertas.

- **Filtro de palavras impróprias:**  
  A integração da biblioteca `bad-words` com TypeScript deu um pouco de trabalho, principalmente para ajustar as tipagens e importar uma lista personalizada em português, pq ela so filtra em ingles. Ai tentei utilizar outra lib, mas nao deu certo e tive que recorrer a uma solução customizada. Pesquisei bastante como adaptar a biblioteca para atender ao contexto do projeto.

- **Exportação para PDF:**  
  Ao implementar a exportação das tarefas em PDF usando a `jsPDF`, aprendi sobre as limitações e boas práticas para gerar arquivos no navegador, além de integrar essa funcionalidade ao design da aplicação.

### Aprendizados

- Integração de bibliotecas exige atenção à compatibilidade de tipos, principalmente em projetos com TypeScript.
- Refatoração de serviços, organização de módulos e integração de bibliotecas são essenciais para manter o código limpo e sustentável.
- Boas práticas de UX/UI, como alertas customizados e confirmações para ações críticas, fazem diferença na experiência do usuário.
- Manipular estado e lidar com operações assíncronas em Angular foi um ponto importante de evolução.
- paciencia e persistência foram as chaves para resolver os desafios.
- entender a logica de toda a aplicação é uma das coisas mais importantes para resolver os desafios com qualidade. 


Apesar dessas dificuldades, consegui entregar todas as funcionalidades exigidas e evoluí bastante no domínio do Angular e das boas práticas.
Peço que avalie o código e me diga o que eu poderia melhorar.

---

## 7. Sugestões de Futuras Melhorias

- **Testes automatizados (unitários e de integração):**  
  Seria interessante adicionar testes para garantir que as principais funcionalidades (adicionar, editar e remover tarefas, etc.) continuem funcionando após futuras alterações no código.

- **Aprimorar experiência de UX/UI:**  
  Apesar dos avanços e correções, gostaria de ter investido mais tempo em aprimorar a experiência de UX/UI. Existem diversos detalhes que poderiam deixar o sistema mais intuitivo e agradável visualmente, como microinterações, feedbacks visuais ainda mais claros e um layout mais moderno. Por conta do foco nas correções e implementação das funcionalidades exigidas, foquei primeiro no funcionamento, mas acredito que investir em UX/UI pode elevar bastante o nível do projeto em versões futuras.

- **Aprimorar acessibilidade (ARIA, navegação por teclado, etc):**  
  Incluir recursos para tornar a aplicação mais acessível, como melhor navegação por teclado, leitores de tela e utilização de padrões ARIA.

- **Tema escuro/claro alternável:**  
  Oferecer ao usuário a opção de alternar entre tema escuro e claro para melhorar a experiência visual, especialmente em ambientes com pouca luz.

- **Histórico de alterações e desfazer exclusões:**  
  Implementar um sistema de histórico que permita visualizar modificações feitas nas tarefas e desfazer ações como exclusões acidentais.

- **Integração com API externa para persistência de dados em nuvem:**  
  Salvar e recuperar tarefas usando uma API real (por exemplo, Firebase ou Supabase), para que o usuário possa acessar suas tarefas em diferentes dispositivos.


---

## 8. Decisões e Considerações

- **Centralização dos Alerts:** Optei por criar um serviço dedicado para os modais de confirmação SweetAlert2, eliminando repetições e facilitando manutenção e evolução da UI.
- **Commits Atômicos:** Segui o padrão Conventional Commits para garantir um histórico limpo e rastreável.
- **Organização de Componentes:** Mantive a estrutura em módulos, componentes e services separados, seguindo boas práticas Angular para escalabilidade.
- **Validação e UX:** Todos os formulários têm validação para garantir integridade dos dados e experiência do usuário.
- **Refatoração contínua:** Vários métodos foram simplificados e documentados com comentários para facilitar a leitura e entendimento.
- **Refatoração de módulos:** Mudei a declaração do HeaderComponent do AppModule para o LayoutModule, tornando a arquitetura mais modular, escalável e limpa. Inclusive, estava dando erro de duplicação de componentes.

### consideração finais:

- Acredito que o tempo sempre influencia na organização e polimento do código, mas aprendi que a prioridade número um é entregar a solução funcionando e garantir que tudo atenda ao que foi pedido. Depois de resolver os problemas e entregar as funcionalidades, aí sim é possível investir em melhorias, refino e testes extras.

- Gostei bastante da experiência desse desafio, precisei sair da zona de conforto, pesquisar bastante e colocar a mão na massa mesmo sem saber todas as respostas de primeira. Isso só reforçou como gosto de resolver problemas e buscar soluções práticas.

- Agradeço pela oportunidade de participar do processo seletivo, fico disponivel para quaisquer esclarecimentos e estou animado para as próximas fases e espero contribuir cada vez mais no processo!


---

**Eduardo Genes**\
Fortaleza, CE – 2025\
[linkedin.com/in/eduardogenes](https://www.linkedin.com/in/eduardogenes)\
[eduardogenes95@gmail.com](mailto:eduardogenes95@gmail.com)
