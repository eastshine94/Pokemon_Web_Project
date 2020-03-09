export default {
    auth: {
      key: process.env.AUTH_KEY || 'prgms-auth-key',
    },
    db: {
      url: process.env.MYSQL_URL || 'mysql://root:123456@localhost:3306/mysql_server',
    },
  };
