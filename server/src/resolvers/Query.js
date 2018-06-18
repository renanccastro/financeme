const moment = require('moment');

const { getUserId } = require('../utils');

const entryQuery = (id, dateInitial, dateEnd, sheetId, receiveAccount) => ({
  where: {
    AND: [
      {
        account: {
          receiveAccount,
        },
      },
      {
        sheet: {
          id: sheetId,
          users_some: {
            id,
          },
        },
      },
      {
        dueDate_gte: dateInitial.toISOString(),
        dueDate_lte: dateEnd.toISOString(),
      },
    ],
  },
});

const Query = {
  feed(parent, args, ctx, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info);
  },
  drafts(parent, args, ctx, info) {
    const id = getUserId(ctx);

    const where = {
      isPublished: false,
      author: {
        id,
      },
    };

    return ctx.db.query.posts({ where }, info);
  },

  post(parent, { id }, ctx, info) {
    return ctx.db.query.post({ where: { id } }, info);
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },
  incomesMonth(parent, { date, sheetId }, ctx, info) {
    const id = getUserId(ctx);
    const dateInitial = moment(date).startOf('month');
    const dateEnd = moment(date).endOf('month');
    return ctx.db.query.entries(
      entryQuery(id, dateInitial, dateEnd, sheetId, true),
      info
    );
  },
  expensesMonth(parent, { date, sheetId }, ctx, info) {
    const id = getUserId(ctx);
    const dateInitial = moment(date).startOf('month');
    const dateEnd = moment(date).endOf('month');
    return ctx.db.query.entries(
      entryQuery(id, dateInitial, dateEnd, sheetId, false),
      info
    );
  },
};

module.exports = { Query };
