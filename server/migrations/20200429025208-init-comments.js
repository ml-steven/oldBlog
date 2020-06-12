'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { INTEGER, TEXT, DATE } = Sequelize;
    await queryInterface.createTable('comments', {
      commentId: { type: INTEGER, primaryKey: true, autoIncrement: true, field: 'comment_id' },
      userId: { type: INTEGER, field: 'user_id' },
      articleId: { type: INTEGER, field: 'article_id' },
      commentLikeCount: { type: INTEGER, field: 'comment_like_count' },
      commentDate: { type: DATE, field: 'comment_date' },
      commentContent: { type: TEXT, field: 'comment_content' },
      parentCommentId: { type: INTEGER, field: 'parent_comment_id' },
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.dropTable('comments');
  },
};
