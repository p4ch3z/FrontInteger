import { ApolloClient, InMemoryCache } from "@apollo/client";

export const investiTaskClient = new ApolloClient({
  uri: import.meta.env.VITE_INVESTITASK_URI,
  cache: new InMemoryCache(),
});

export const expertsTeamClient = new ApolloClient({
  uri: import.meta.env.VITE_EXPERTSTEAM_URI,
  cache: new InMemoryCache(),
});

export const newsPhotoClient = new ApolloClient({
  uri: import.meta.env.VITE_NEWSPHOTO_URI,
  cache: new InMemoryCache(),
});

export const authClient = new ApolloClient({
  uri: import.meta.env.VITE_AUTH_URI,
  cache: new InMemoryCache(),
});
