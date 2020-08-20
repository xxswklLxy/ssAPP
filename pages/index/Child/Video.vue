<template>
	<view>
		<!-- 视频名字 -->
		<view class="video-name">
			{{vName}}
		</view>
		<!-- 视频播放器 -->
		<view class="page-body">
			<view class="page-section">
				<video class="video1" v-if="list.length > 0" :src="src" id="myVideo" controls="controls" @error="videoErrorCallback"
				 autoplay="autoplay">
					<!-- <source :src="src" type="video/mp4" /> -->
				</video>
			</view>
		</view>
		<!-- 正在播放 -->
		<view style="height: 100%;" v-show="num !== '' " class="text-num">正在播放：{{num}}
		</view>
		<view style="height: 100%;" v-show="snum == 'flase' " class="text-num">
			如果视频不能播放请点击：<uni-link :href="onlineurl" :text="num"></uni-link>
		</view>

		<view class="introduce" style="margin: 20px 0 0 10px; position: relative;">
			<view class="introduce-img">
				<view style="display: flex; ">
					<view class="introduce-a">
						<text style="display: block; margin: 0 0 20upx 30upx;  color: #F0AD4E;  font-size: 14px;"> {{idata.Language}}</text>
						<text style="display: block; margin: 0 0 20upx 30upx; font-size:14px;"> {{idata.region}}</text>
						<text style="display: block; margin: 0 0 20upx 30upx; font-size:14px;"> {{idata.Release}}</text>
						<text style="display: block; margin: 0 0 20upx 30upx; font-size:14px; color: #007AFF;"> {{idata.genre}}</text>
						<text style="display: block; margin: 0 0 20upx 30upx;  font-size:14px; color: #4CD964;"> {{idata.time}}</text>	
					</view>
					<view class="introduce-a">
						<image :src="cover" style=" width: 150px; height: 200px;"></image>
					</view>
				</view>
				<text style="display: block; font-size:12px;"> {{idata.introduce}}</text>
				<text style="display: text-overflow: ellipsis;overflow: hidden; block; margin: 20px 0 20upx 0; font-size:12px;"> 演员：{{idata.performer}}</text>
				<text style="display: block; font-size:12px;  color: #DD524D;">目前链接一暂不支持iPhone系统</text>
			</view>
		</view>

		<!-- 视频列表 -->
		<view class="text-list">
			<view class="text-name" v-for="(item,index) in list" :key="index">
				<text :class="{'text-name-corol': textIndex === index}" @click="listName(item.download,index,item.num,item.onlineurl)">{{item.num}}</text>
				<text class="xgcolro">/</text>
				<uni-link :href="item.onlineurl" :text="item.num"></uni-link>
			</view>
		</view>
	</view>
</template>

<script>
	// 外部链接插件
	import uniLink from "@/components/uni-link/uni-link.vue"
	export default {
		components: {
			uniLink
		},
		data() {
			return {
				list: [], //视频集数列表
				src: null, //链接
				textIndex: null,
				vName: '',
				num: '', // 集数名字
				inum: false, //显示正在播放
				snum: true, //判断是否显示外部链接
				onlineurl: null,
				idata: [], //介绍
				cover: '', //图片
				model: '' //手机类型
			}
		},

		onLoad(e) {
			uni.showLoading({
				title: '加载中'
			});
			uni.request({
				url: 'http://47.114.147.221?ysurl=' + e.url, //视频接口地址。
				header: {
					'Content-Type': 'multipart/form-data', //自定义请求头信息,
					// "Content-Security-Policy": "upgrade-insecure-requests"
				},
				success: (res) => {
					this.cover = res.data.data.cover
					this.list = res.data.list
					this.vName = res.data.data.name
					this.idata = res.data.data
					uni.hideLoading();
				}
			});
			uni.getSystemInfo({
				success: function(res) {
					this.model = res.model
				},
			})
		},
		methods: {
			listName(url, index, num, onlineurl) {
				this.textIndex = index
				this.src = url,
					this.num = num,
					this.inum = true,
					this.snum = ''
				this.onlineurl = onlineurl
				setTimeout(() => {
					this.inum = false
				}, 10000)
			},
			videoErrorCallback: function(e) {
				setTimeout(() => {
					if (e.target.errMsg == undefined) {
						uni.showToast({
							icon: 'none',
							title: '视频不存在'
						});
						this.snum = 'flase'
					}
				}, 500)
			},
		}

	}
</script>

<style>
	.video-name {
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
		font-size: 16px;
	}

	#myVideo {
		width: 100%;
	}

	.text-num {
		font-size: 14px;
		height: 50px;
		margin-left: 5px;
	}

	.text-num1 {
		color: #F0AD4E;
	}

	.text-num2 {
		color: #DD524D;
	}

	.text-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 30px 0 0 0;
	}


	.text-name {
		height: 50px;
		flex: 0 0 50%;
		text-align: center;
	}

	.text-name-corol {
		color: #007AFF;
	}

	.xgcolro {
		color: #4CD964;
	}

	.video1 {
		width: 100%;
	}

	.introduce-a {
		flex: 1 0 50%;
		position: relative;
		height: 200px;
		overflow: hidden;
	}

	.introduce-a:nth-child(2) image {
		position: absolute;
		right: 60upx;
		bottom: 30upx;
	}
</style>
