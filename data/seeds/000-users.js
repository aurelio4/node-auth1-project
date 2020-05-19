exports.seed = function (knex) {
  // Deletes ALL existing entries
  const users = [{
      username: "normaluser",
      password: "qweasd"
    },
    {
      username: "adminuser",
      password: "asdzxc"
    }
  ]

  return knex('users').insert(users)
};