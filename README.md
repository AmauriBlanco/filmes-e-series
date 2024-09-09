Este é um projeto [Next.js](https://nextjs.org) iniciado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Configurando o Projeto

### Clonando o Repositório

Primeiro, clone o repositório para a sua máquina local:

```bash
git clone https://github.com/AmauriBlanco/filmes-e-series
cd filmes-e-series
```

### Obtendo a Chave da API do The Movie Database (TMDB)
Para utilizar os recursos da API do The Movie Database (TMDB), você precisa de uma chave de API. Siga os passos abaixo para obter a sua:

-Acesse [`The Movie Database`](https://www.themoviedb.org/);
-Crie uma conta ou faça login;

-Vá para a seção de configurações da conta e clique em "API";

-Solicite uma nova chave de API seguindo as instruções do site;

-Após a aprovação, você verá sua chave de API.

### Configurando o Ambiente de Desenvolvimento
-Crie um arquivo `.env` na raiz do seu projeto
-Adicione sua chave de API no arquivo `.env`
```bash
NEXT_PUBLIC_API_KEY=sua_chave_aqui
```

## iniciado com

Primeiro, execute o servidor de desenvolvimento:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

Você pode começar a editar a página modificando `app/page.tsx`. A página atualiza automaticamente conforme você edita o arquivo.

## Learn More

Para saber mais sobre Next.js, consulte os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) - aprenda sobre os recursos e API do Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - um tutorial interativo sobre Next.js.
