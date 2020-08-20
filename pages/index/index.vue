<template>
	<view class="content">
		<view class="text-area">
			<!-- 搜索组件(插件) -->
			<search @searchText="searchText" />
		</view>
		<!-- 搜索出来的内容 -->
		<view class="video-name" v-for="(i,index) in list" :key="index">
			<!-- 视频类型 -->
			<text class="name">{{i.genre}}</text>
			<!-- 视频名字 -->
			<text @click="VideoName(i.url)" class="name">{{i.name}}</text>
			<!-- 视频时间 -->
			<text class="name">{{i.time}}</text>
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
				list: [], //视频列表
			}
		},
		methods: {
			searchText(searchText) {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: 'http://47.114.147.221?ysname=' + searchText, //搜索内容接口地址。
					header: {
						'Content-Type': 'multipart/form-data' //自定义请求头信息
					},
					success: (res) => {
						this.list = res.data.list //拿到视频列表
						uni.hideLoading(); //停止加载

					}
				});
			},
			// 点击跳转到对应的视频详情页
			VideoName(url) {
				uni.navigateTo({
					url: '/pages/index/Child/Video?url=' + url
				})
			}
		}
	}
</script>

<style>
	.content{
		overflow: hidden;
	}
	.xing-video {
		display: flex;
		flex-wrap: wrap;
	}

	.video-name {
		margin: 10px 10px;
	}

	.name {
		display: block;
		font-size: 12px;
	}

	.name:nth-child(1) {
		color: #F0AD4E;
	}

	.name:nth-child(3) {
		color: #4CD964;
	}

	.name:nth-child(2):hover {
		cursor: pointer;
		color: #007AFF;
	}

	.fengge {
		width: 100vh;
		height: 3px;
		margin: 0 -10px;
		background-color: #C8C7CC;
	}
</style>
