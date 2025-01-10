exports.createPagination = (page, limit, totalCount, resourceName) => ({
  page,
  limit,
  totalPage: Math.ceil(totalCount / limit),
  ["total" + resourceName]: totalCount,
});
