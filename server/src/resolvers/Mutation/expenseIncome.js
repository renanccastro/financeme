const { getUserId } = require('../../utils');

const expenseIncome = {
  async saveExpenseIncome(
    parent,
    { id, sheetId, accountId, categoryId, value, budget, title, text, dueDate },
    ctx,
    info
  ) {
    const userId = getUserId(ctx);
    const author = { connect: { id: userId } };
    const sheet = { connect: { id: sheetId } };
    const account = { connect: { id: accountId } };
    const category = { connect: { id: categoryId } };
    const entry = {
      author,
      sheet,
      account,
      category,
      value,
      budget,
      title,
      dueDate,
      text,
    };
    ctx.db.mutation.upsertEntry(
      {
        where: {
          id,
        },
        create: entry,
        update: entry,
      },
      info
    );
  },
};

module.exports = { expenseIncome };
