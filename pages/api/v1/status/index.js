async function status(request, response) {
  const updateAt = new Date().toISOString();

  return response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: "1",
        opened_connections: 0,
        max_connections: 0,
      },
    },
  });
}

export default status;
