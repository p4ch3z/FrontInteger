import { ApolloClient, InMemoryCache } from "@apollo/client";

export const investiTaskClient = new ApolloClient({
  uri: "http://127.0.0.1:8000/graphql/",
  cache: new InMemoryCache(),
});

export const expertsTeamClient = new ApolloClient({
  uri: "http://127.0.0.1:8001/graphql/",
  cache: new InMemoryCache(),
});

export const newsPhotoClient = new ApolloClient({
  uri: "http://127.0.0.1:8002/graphql/",
  cache: new InMemoryCache(),
});

export const authClient = new ApolloClient({
  uri: "http://127.0.0.1:8003/graphql/",
  cache: new InMemoryCache(),
});