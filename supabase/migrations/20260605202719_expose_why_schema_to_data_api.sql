alter role authenticator set pgrst.db_schemas =
  'public, graphql_public, axis, capital, arcade, jasiverse, chronos, why';

notify pgrst, 'reload config';
