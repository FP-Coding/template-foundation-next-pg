// const exec = require("node:child_process");
import { exec } from "node:child_process";

const checkPostgres = () => {
  exec("docker exec postgres_db pg_isready --host localhost", handleReturn);

  function handleReturn(err, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    process.stdout.write(
      "\n🟢 O Banco de dados está pronto e recebendo conexões!\n",
    );
  }
};

process.stdout.write("\n\n🔴 Aguardando o banco de dados aceitar conexões");
checkPostgres();
