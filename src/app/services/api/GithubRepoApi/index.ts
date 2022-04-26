import { rootApi } from '../';

import { GithubRepo } from './types';

export const GithubRepoApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getAllGithubRepo: builder.query<GithubRepo[], void>({
      query: () => `/githubrepo`,
    }),

    getGithubRepoById: builder.query<GithubRepo, number>({
      query: (id: number) => `/githubrepo/${id}`,
    }),

    getGithubRepoByUsername: builder.query<GithubRepo[], string>({
      query: (username: string) =>
        `/users/${username}/repos?type=all&sort=updated`,
    }),

    saveGithubRepo: builder.mutation<GithubRepo, GithubRepo>({
      query: (payload: GithubRepo) => ({
        url: `/githubrepo`,
        method: 'POST',
        body: payload,
      }),
    }),

    updateGithubRepo: builder.mutation<GithubRepo, GithubRepo>({
      query: (payload: GithubRepo) => ({
        url: `/GithubRepo`,
        method: 'PUT',
        body: payload,
      }),
    }),

    deleteGithubRepo: builder.mutation<GithubRepo, number>({
      query: (id: number) => ({
        url: `/githubrepo/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetGithubRepoByIdQuery,
  useGetAllGithubRepoQuery,
  useSaveGithubRepoMutation,
  useUpdateGithubRepoMutation,
  useDeleteGithubRepoMutation,
  useGetGithubRepoByUsernameQuery,
} = GithubRepoApi;
