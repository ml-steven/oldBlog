'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { INTEGER, DATE, TEXT } = Sequelize;
    await queryInterface.createTable('articles', {
      articleId: { type: INTEGER, primaryKey: true, autoIncrement: true, field: 'article_id' },
      userId: { type: INTEGER, field: 'user_id' },
      articleTitle: { type: TEXT, field: 'article_title' },
      articleContent: { type: TEXT('long'), field: 'article_content' },
      articleViews: { type: INTEGER, field: 'article_views' },
      articleCommentCount: { type: INTEGER, field: 'article_comment_count' },
      articleDate: { type: DATE, field: 'article_date' },
      articleLikeCount: { type: INTEGER, field: 'article_like_count' },
      sortId: { type: INTEGER, field: 'sort_id' },
      labelId: { type: INTEGER, field: 'label_id' },
    });
  },

  down: async queryInterface => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('articles');
  },
};
