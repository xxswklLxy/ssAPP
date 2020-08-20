<template>
	<view class="redBook" :style="{ height: set.screenHeight,background:set.background, }">
		<view v-if="contentIf">
			<lz-red-book ref="lzRedBook" :bookText="content_text" :scrollDirection="set.scrollDirection" :bookStyle="{ background:set.background,'font-size':set.fontSize+'px','line-height':set.lineHeight+'px','color':set.fontColor}"
			 @clickCenter="clickCenter" @scrollEnd="scrollEnd" @scrollStart="scrollStart"></lz-red-book>
		</view>
		<!-- 遮罩层上部分 -->
		<view class="mask-top" :style="{top:mask.showMask2?0:-100+'upx','background':mask.background}" style="opacity:0.8">
			<view style="letter-spacing: 5px;">
				<view @click="shangyc" class="return"></view><text class="text-top" style="padding: 0 50px;">{{boxNum}}</text>
			</view>
		</view>
		<!-- 遮罩层下部分 -->
		<view class="mask-bottom" style="opacity:0.98" :style="{bottom:mask.showMask?0:-300+'upx','background':mask.background}">
			<view class="v1">
				<view class="slider-warp">
					字体：
					<slider class="slider" block-size="20" activeColor="#FFCC33" :step="2" backgroundColor="#000000" block-color="#8A6DE9"
					 :value="set.fontSize" @change="sliderChange($event,'fontSize')" min="18" max="30" />
				</view>
				<view class="slider-warp">
					间距：
					<slider class="slider" block-size="20" activeColor="#FFCC33" :step="2" backgroundColor="#000000" block-color="#8A6DE9"
					 :value="set.lineHeight" @change="sliderChange($event,'padding')" min="26" max="40" />
				</view>
			</view>
			<view class="v1">
				滚动方向：
				<uni-tag text="左右" :inverted="set.scrollDirection=='topBottom' ? true : false" type="primary" @click="changeScrollDirection('leftRight')"
				 size="small" />
				<uni-tag text="上下" :inverted="set.scrollDirection=='leftRight' ? true : false" type="primary" @click="changeScrollDirection('topBottom')"
				 size="small" style="color: #333333; margin-left: 10px;" />
			</view>
			<view class="v2">
				<view v-for="(item,index) in arr" :key="index" :class="mask.backgroundIndex==index?'color-warp':''" class="v1-color"
				 @click="changeBackground(index)">
					<uni-icons type="smallcircle-filled" size="26" :color="item.color"></uni-icons>
				</view>
			</view>
			<view class="v3">
				<view @click="openDir">
					<view class="v3-item" @tap="show">
						<uni-icons type="settings" size="20"></uni-icons>目录
					</view>
				</view>
			</view>
		</view>
		<view>
			<!--属性 direction：left(默认右往左滑动) right(左往右滑动)-->
			<drawer :show="drawerShow" @cancel="cancel" @ensure="ensure">
				<view class="catalogue-list">
					<view @click="catalogueClick(i.url,index)" :class="{'dir-list-color':index == dirIndex}" class="catalogue" v-for="(i,index) in flist"
					 :key="index">{{i.num}}</view>
				</view>
				<view @click="catalogueExit " class="catalogue-list-x">X</view>
			</drawer>
		</view>

	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				drawerShow: false,
				drawerShow2: false,
				mask: { //遮罩层
					showMask: false,
					showMask2: true,
					background: '#fff',
					backgroundIndex: 0,
				},
				set: {
					background: '#f0f0f0', //页面背景颜色
					fontSize: 18, //字体大小
					lineHeight: 33, //字体间距
					fontColor: '#000', //字体颜色
					scrollDirection: 'leftRight', //滚动方向leftRight左右，上下topBottom
				},
				arr: [{
						background: '#f0f0f0', //背景色
						maskBg: '#fff', //遮罩层色
						fontColor: '#524d51', //字体颜色
						color: '#f5f5f5', //选择圆圈颜色
					},
					{
						background: '#d8c9aa', //背景色
						maskBg: '#f3e4c3', //遮罩层色
						fontColor: '#3c2506', //字体颜色
						color: '#e0d1aa', //选择圆圈颜色
					},
					{
						background: '#daba94', //背景色
						maskBg: '#f8dcb4', //遮罩层色
						fontColor: '#3c2506', //字体颜色
						color: '#d8b784', //选择圆圈颜色
					},
					{
						background: '#cfb793', //背景色
						maskBg: '#f8dcb4', //遮罩层色
						fontColor: '#674923', //字体颜色
						color: '#d6b781', //选择圆圈颜色
					},
					{
						background: '#aac9aa', //背景色
						maskBg: '#cdeccd', //遮罩层色
						fontColor: '#2c1e1e', //字体颜色
						color: '#abcaab', //选择圆圈颜色
					},
					{
						background: '#333b3d', //背景色
						maskBg: '#313439', //遮罩层色
						fontColor: '#7e8894', //字体颜色
						color: '#626a75', //选择圆圈颜色
					}
				],
				//正文
				content_text: null,
				boxNum: '',
				contentIf: false,
				flist: [],
				url: '',
				dirIndex: null
			};
		},
		onLoad(e) {
			this.dirIndex = e.cIndex
			this.flist = JSON.parse(e.flist)
			this.url = e.url
			// #ifdef APP-PLUS
			plus.navigator.setFullscreen(true); //隐藏状态栏
			//#endif
			this.requestTask()
		},
		methods: {
			requestTask() {
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: 'http://47.114.147.221?xsurl2=' + this.url, //视频接口地址。
					header: {
						'Content-Type': 'multipart/form-data', //自定义请求头信息,
					},
					success: (res) => {
						this.content_text = String(res.data.content)
						this.boxNum = res.data.num
						this.contentIf = true
						uni.hideLoading();
					}
				});
			},
			shangyc() {
				uni.navigateBack()
			},
			//点击中间
			clickCenter() {
				let that = this
				that.mask.showMask = !that.mask.showMask
			},
			//滚动到最后一页
			scrollEnd() {
				if (this.dirIndex >= this.flist.length - 1) {
					uni.showToast({
						title: '已经是最后一页了'
					});
				} else {
					this.url = this.flist[++this.dirIndex].url
					this.contentIf = true
					this.requestTask()
					this.contentIf = false
				}

			},
			//滚动到第一页
			scrollStart() {
				if (this.dirIndex <= 0) {
					uni.showToast({
						title: '已经是第一页了'
					});
				} else {
					this.url = this.flist[--this.dirIndex].url
					this.contentIf = true
					this.requestTask()
					this.contentIf = false
				}
			},
			//滑块设置字体间距或大小
			sliderChange(e, type) {
				let that = this
				that.$refs.lzRedBook.init()
				if (type == 'fontSize') {
					that.set.fontSize = e.detail.value
				} else {
					that.set.lineHeight = e.detail.value
				}
				//重新计算页面页数
				uni.$emit('lz-red-book-change')
			},
			//修改滚动方向
			changeScrollDirection(text) {
				let that = this
				that.set.scrollDirection = text
				//重新计算页面页数
				uni.$emit('lz-red-book-change', 'changeScrollDirection')
			},
			//修改背景颜色
			changeBackground(index) {
				let that = this
				that.mask.backgroundIndex = index
				that.set.background = that.arr[index].background //背景颜色
				that.set.fontColor = that.arr[index].fontColor //字体颜色
				that.mask.background = that.arr[index].maskBg //遮罩背景色

			},
			// 点击章节
			catalogueClick(url, index) {

				this.dirIndex = index
				this.url = url
				this.contentIf = true
				this.requestTask()
				this.cancel()
				this.contentIf = false
			},
			// 点击 X 取消抽屉
			catalogueExit() {
				this.cancel()
			},

			openDir() {
				this.clickCenter()
			},
			//显示抽屉
			show() {
				this.drawerShow = true;
			},
			//取消抽屉
			cancel() {
				this.drawerShow = false;
			},

		}
	};
</script>

<style scoped lang="scss">
	.redBook {
		width: 100%;
		height: 100%;

		.mask-top {
			position: fixed;
			height: 50px;
			text-align: center;
			line-height: 50px;
			transition: all 0.2s;
			width: 100%;
			z-index: 1000;
			margin: auto;
			border-radius: 0 0 4px 4px;
			font-size: 14px;
			overflow: hidden; //超出一行文字自动隐藏
			text-overflow: ellipsis; //文字隐藏后添加省略号
			white-space: nowrap; //强制不换行
		}

		.uni-title {
			overflow: scroll;
		}

		.mask-bottom {
			position: fixed;
			height: 300upx;
			transition: all 0.2s;
			width: 100%;
			z-index: 1000;
			margin: auto;
			border-radius: 10px 10px 0 0;
			font-size: 14px;
			padding: 10px;
			box-sizing: border-box;

			.v1 {
				width: 100%;
				display: flex;
				align-items: center;

				.slider-warp {
					display: flex;
					flex: 1;
					align-items: center;

					.slider {
						flex: 1;
					}
				}
			}

			.v2 {
				display: flex;
				width: 100%;
				justify-content: space-around;
				margin-top: 10px;

				.color-warp {
					border: 1px solid #6d583b;
					border-radius: 50%;
					width: 26px;
					height: 26px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.v3 {
				margin-top: 10px;

				.v3-item {
					width: 100px;
					height: 30px;
					background: #f7f7f7;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}

	.catalogue-list {
		padding: 50px 0 50px 0;
		width: 100%;
		background-color: #000000;
		color: #F8F8F8;
	}

	.catalogue {
		width: 100%;
		overflow: hidden; //超出一行文字自动隐藏
		text-overflow: ellipsis; //文字隐藏后添加省略号
		white-space: nowrap; //强制不换行
		height: 50px;
		text-indent: 10px;
		line-height: 50px;
		border-bottom: 1px solid #C8C7CC;

	}

	.dir-list-color {
		color: #007AFF;
	}

	.catalogue-list-x {
		position: fixed;
		bottom: 10px;
		width: 40px;
		height: 40px;
		font-size: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 35%;
		background-color: #4CD964;
		right: 10px;
		color: #FFFFFF;
	}

	.return {
		position: absolute;
		left: 10px;
		top: 15px;
		width: 14px;
		height: 14px;
		border-left: 4px solid #007AFF;
		border-bottom: 4px solid #4CD964;
		transform: rotate(45deg);
	}

	.text-top {
		overflow: hidden; //超出一行文字自动隐藏
		text-overflow: ellipsis; //文字隐藏后添加省略号
		white-space: nowrap; //强制不换行
	}
</style>
