# 对接文档

## 话题模块
- 删除一条话题
	+ type: post
	+ data: null
	+ response:
		- 200: 删除成功
		- 410: 帖子不存在或者已经删除
		- 403: 没有权限删除帖子

- 更新一条话题
	+ type: post
	+ data: 
		- title: {String} 话题的标题
		- content: {String} 话题的内容
	+ response:
		- 200: 更新成功
		- 410: 帖子不存在或者已经删除
		- 403: 没有权限
		- 500: 内部错误

## 评论模块
- 更新一条评论
	+ type: post
	+ data: 
		- content: {String} 新的评论内容
	+ response:
		- 200: 更新成功
		- 410: 评论不存在或者已经删除
		- 403: 没有权限
		- 500: 内部错误

- 删除一条评论
	+ type: post
	+ data: null
	+ response:
		- 200: 删除成功
		- 410: 评论不存在或者已经删除
		- 403: 没有权限
