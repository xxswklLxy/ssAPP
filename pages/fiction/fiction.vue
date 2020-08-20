<template>
	<view class="fiction">
		<view class="content">
			<view class="text-area">
				<!-- 搜索组件(插件) -->
				<search @searchText="searchText" />
			</view>
		</view>
		<!-- 搜索出来的内容 -->
		<view class="video-name" v-for="(i,index) in list" :key="index" @click="VideoName(i.url)">
			<!-- 图片 -->
			<view class="list-name">
				<image v-if="i.hasOwnProperty('cover') !== imageif" style="width: 100px; height: 100px;" :src="i.cover"></image>
				<image v-if="i.hasOwnProperty('cover') == imageif" style="width: 100px; height: 100px;" src="https://www.x23qb.com/modules/article/images/nocover.jpg"></image>
			</view>
			<!-- 小说介绍 -->
			<view class="list-name">
				<!-- 书名 -->
				<text class="name">{{i.name}}</text>
				<!-- 作者名字 -->
				<text class="name" v-show="i.author !== undefined ">作者：{{i.author}}</text>
				<!-- 最新章节 -->
				<text class="name">{{i.num}}</text>
				<!-- 类型 -->
				<text class="name">{{i.tag}}</text>
				<!-- 更新时间 -->
				<text class="name">{{i.time}}</text>
			</view>
			<!-- 分割线 -->
			<view class="fengge"></view>

		</view>
	</view>
</template>

<script>
	// 引入搜索组件
	import Search from "../../components/zy-search/zy-search.vue"
	export default {
		components: {
			Search, //注册搜索组件
		},
		data() {
			return {
				list: [],
				imageif: false
			}
		},
		methods: {
			searchText(searchText) {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: 'http://47.114.147.221?xsname=' + searchText, //搜索内容接口地址。
					header: {
						'Content-Type': 'multipart/form-data' //自定义请求头信息
					},
					success: (res) => {
						this.list = res.data.list //拿到视频列表
						uni.hideLoading(); //停止加载
					}
				});
			},
			VideoName(url) {
				uni.navigateTo({
					url: './Child/fictionDetails?url=' + url
				})

			}
		}
	}
</script>

<style>
	.content {
		overflow: hidden;
	}

	/* .xing-video {
		display: flex;
		flex-wrap: wrap;
	} */

	.video-name {
		width: 100%;
		margin: 10px 0;
		display: flex;
		flex-wrap: wrap;
	}

	.list-name {
		flex: 0 0 30%;
		overflow: hidden;
		margin: 0 0 0 10px;
	}

	.name {
		margin: 5px 0 0 10px;
		font-size: 10px;
		display: block;
	}

	.name:nth-child(1) {
		color: #F0AD4E;
	}

	.name:nth-child(2) {
		color: #333333;

	}

	.name:nth-child(4) {
		color: #4CD964;
	}

	.name:nth-child(3) {
		cursor: pointer;
		color: #007AFF;
		overflow: hidden; //超出一行文字自动隐藏
		text-overflow: ellipsis; //文字隐藏后添加省略号
		white-space: nowrap; //强制不换行
	}

	.fengge {
		width: 100vh;
		height: 3px;
		background-color: #C8C7CC;
	}
</style>
