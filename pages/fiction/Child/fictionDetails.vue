<template>
	<view id="fiction-details">
		<view class="details">
			<view class="details-img">
				<image :src="imageUrl"></image>
			</view>
			<view class="details-name">
				<view class="details-jies">{{name}}</view>
				<view class="details-jies">{{author}}</view>
				<view class="details-jies">{{status}}</view>
				<view class="details-jies">{{time}}</view>
			</view>
		</view>
		<view class="introduce">{{introduce}}</view>
		<view v-if="jiazai === false " class="content">
			<!-- 列表 -->
			<view class="catalogue" v-for="(i,index) in list2" :key="index" @click="catalogueClick(i.url,index)">{{i.num}}</view>
			<!-- 分页 -->
			<paging :total="listL" activecolor="#000" activebackground="red" :pageSize='100' :footer="true" :current="1"
			 @changes="dd"></paging>
		</view>
	</view>
</template>

<script>
	import paging from '@/components/yang-paging/fy.vue'
	export default {
		components: {
			paging
		},
		data() {
			return {
				imageUrl: '',
				author: '',
				introduce: '',
				name: '',
				status: '',
				time: '',
				list: [],
				listL: null,
				list2: [],
				yi: 0,
				er: 100,
				jiazai: true,
			}
		},
		onLoad(e) {
			uni.showLoading({
				title: '加载中'
			});
			uni.request({
				url: 'http://47.114.147.221?xsurl1=' + e.url, //视频接口地址。
				header: {
					'Content-Type': 'multipart/form-data', //自定义请求头信息,
				},
				success: (res) => {
					this.author = res.data.data.author //作者名字
					this.introduce = res.data.data.introduce //介绍
					this.name = res.data.data.name //书名
					this.status = res.data.data.status // 状态
					this.time = res.data.data.time //时间
					this.imageUrl = res.data.data.cover //图片
					this.list = res.data.list //列表
					this.list2 = res.data.list.slice(this.yi, this.er) //进来的时候展示的列表数
					this.listL = res.data.list.length
					this.jiazai = false
					uni.hideLoading();
				}
			});
		},
		methods: {
			// 点击章节
			catalogueClick(url, index) {
				uni.navigateTo({
					url: './fictionRead?url=' + url + '&flist=' + JSON.stringify(this.list) + '&cIndex=' + index
				})
			},
			// 点击分页
			dd(index) {
				this.yi = ((index - 1) * 100)
				this.er = (index * 100)
				this.list2 = this.list.slice(this.yi, this.er)
			}
		}
	}
</script>

<style>
	#fiction-details {
		background-color: #000000;
		color: #FFFFFF;
	}

	.details {
		width: 100%;
		height: 160px;
		background-color: #808080;
		display: flex;

	}

	.details-img {
		flex: 0 0 40%;
		position: relative;
	}

	.details-name {
		position: relative;
		margin: 15px 0 0 0;
		flex: 0 0 60%;
	}

	.details-img image {
		position: absolute;
		bottom: -20px;
		right: 0;
		width: 80%;
		height: 100%;
	}

	.details-jies {
		margin: 15px 0 0 15px;
		font-size: 12px;
	}

	.details-jies:nth-child(1) {
		font-size: 16px;
		color: #F0AD4E;
	}

	.introduce {
		margin: 40px 10px 0 10px;
		font-size: 14px;
		color: #FFFFFF;
		background-color: #000;
	}

	.catalogue {
		overflow: hidden; //超出一行文字自动隐藏
		text-overflow: ellipsis; //文字隐藏后添加省略号
		white-space: nowrap; //强制不换行
		font-size: 14px;
		margin: 10px 0 0 10px;
	}

	.catalogue:hover {
		color: #007AFF;
	}
</style>
